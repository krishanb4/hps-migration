import React, { useEffect, ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import ArrowImg from '../images/double-down-arrows.svg'
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux/store';
import { connectWallet, changeNetwork } from '../walletconnect/connection';
import { hpsBalance } from '../../utils/callHelpers';

const Main = styled.div`
    font-family: "Poppins", sans-serif;
    min-height: 100vh;
    ackground: linear-gradient(to right top,#ed8729,#b16932);
    display: grid;
    align-items: center;
    justify-content: center;
    width: 100%;
`

const WholeThing = styled.div`
    position: relative;
`

const Section = styled.div`
    background: white;
    width: 100%;
    border: solid 2px #000;
    background: linear-gradient(
        to right bottom,
        rgba(255, 255, 255, 0.7),
        rgba(255, 255, 255, 0.3)
    );
    border-radius: 2rem;
    z-index: 2;
    backdrop-filter: blur(2rem);
    padding: 8px;
    @media only screen and (max-width:700px){
        max-width: 368px;
    }
`

const Card = styled.div`
    display: flex;
    background: linear-gradient(
    to left top,
    rgba(255, 255, 255, 0.8),
    rgba(255, 255, 255, 0.5)
  );
    border-radius: 1rem;
    border: solid 2px #000;
    margin: 2rem 0rem;
    margin-top: 43px;
    padding: 2rem;
    box-shadow: 6px 6px 20px rgba(122, 122, 122, 0.212);
    justify-content: space-between;
    @media only screen and (max-width:700px){
    max-width: 350px;
    }

    flex-direction: column-reverse;
`

const Arrow = styled.div`
    border-radius: 1000px;
    height: 26px;
    width: 48px;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    position: relative;
    left: calc(50% - 38px);
    border: 4px solid rgb(25,27,31);
    margin-top: -50px;
    margin-bottom: -50px;
    padding: 0px;
    padding-left: 14px;
    padding-top: 1px;
    top: 5px;
        
`
const ValueSection = styled.div`
    display: flex;
    flex-flow: row nowrap;
    -webkit-box-align: center;
    align-items: center;
    padding: 1rem 1rem 0.75rem;
    
    @media only screen and (max-width:700px){
    max-width: 300px;
    }
`

const TokenButton = styled.button`
    -webkit-box-align: center;
    align-items: center;
    font-size: 24px;
    font-weight: 500;
    background-color: #f98024;
    color: rgb(255, 255, 255);
    border-radius: 16px;
    box-shadow: rgb(0 0 0 / 8%) 0px 6px 10px;
    outline: none;
    cursor: pointer;
    user-select: none;
    border: none;
    height: 2.4rem;
    width: initial;
    padding: 0px 8px;
    -webkit-box-pack: justify;
    justify-content: space-between;
    margin-right: 12px;
    border: solid 2px #000;

`

const TokenButtonSpan = styled.span`
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
    width: 100%;

`

const TokenButtonSpanDiv = styled.div`
    width: 100%;
    display: flex;
    padding: 0px;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: start;
    justify-content: flex-start;
`

const TokenNameSpan = styled.span`
    margin: 0px 0.25rem;
    font-size: 18px;
`

const TokenImage = styled.img`
    width: 24px;
    height: 24px;
    border-radius: 24px;
    box-shadow: rgb(0 0 0 / 8%) 0px 6px 10px;
    background-color: rgb(255, 255, 255);
`

const CurrencyInputbalance = styled.div`
    -webkit-box-pack: end;
    justify-content: flex-end;
    display: flex;
    flex-flow: row nowrap;
    -webkit-box-align: center;
    align-items: center;
    color: rgb(255, 255, 255);
    font-size: 0.75rem;
    line-height: 1rem;
    padding: 0px 1rem 1rem;
`

const CurrencyBalance = styled.div`
    -webkit-box-pack: justify;
    justify-content: space-between;
    width: 100%;
    display: flex;
    padding: 0px;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: start;
    justify-content: flex-start;
`

const CurrencyBalanceview = styled.div`
    height: 17px;
    width: fit-content;
    width: 100%;
    display: flex;
    padding: 0px;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: start;
    justify-content: flex-start;
`

const Balance = styled.div`
    display: inline;
    cursor: pointer;
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    font-weight: 800;
    font-size: 20px;
    color: #000;
`

const ValueInput = styled.input`
    color: rgb(12 12 12);
    position: relative;
    font-weight: 500;
    outline: none;
    border: none;
    flex: 1 1 auto;
    background-color: rgb(33 36 41 / 0%);
    font-size: 24px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0px;
    appearance: textfield;
    text-align: right;
`
const SwapButton = styled.button`
    padding: 16px;
    width: 100%;
    font-weight: 500;
    text-align: center;
    border-radius: 20px;
    outline: none;
    border: 1px solid transparent;
    color: white;
    text-decoration: none;
    display: grid;
    -webkit-box-pack: center;
    justify-content: center;
    flex-wrap: nowrap;
    -webkit-box-align: center;
    align-items: center;
    cursor: pointer;
    position: relative;
    z-index: 1;
    will-change: transform;
    transition: transform 450ms ease 0s;
    transform: perspective(1px) translateZ(0px);
    background-color: #f98024;
    color: rgb(255 255 255);
    font-size: 16px;
    font-weight: 500;
    border: solid 2px #000;
`

const Gridsection = styled.div`
    display: grid;
    grid-auto-rows: auto;
    row-gap: 12px;
`
const SliderInput = styled.div`
    margin-bottom: 5px;
    position:relative;
 top:50%;
 left:50%;
 transform:translate(-50%,-50%);
 width:500px;
 height:60px;
 padding:30px;
 padding-left: 40px;
 background:#fcfcfc;
 border-radius:20px;
 display:flex;
 align-items:center;
 box-shadow:0px 15px 40px #7E6D5766;
 @media only screen and (max-width:700px){
    max-width: 300px;
    }

`

const SliderValue = styled.p`
    font-size:26px;
    font-weight:600;
    font-family: Open Sans;
    padding-left:30px;
    color:#f98024;
`

const Input = styled.input`
  display: block;
  -webkit-appearance:none !important;
 width:100%;
 height:2px;
 background:#000;
 border:none;
 outline:none;
 ::-webkit-slider-thumb {
 -webkit-appearance:none !important;
 width:30px;
 height:30px;
 background:#fcfcfc;
 border:2px solid #000;
 border-radius:50%;
 cursor:pointer;
 ::-webkit-slider-thumb:hover {
 background:#000;
}

`;
const SwapCard: React.FC = () => {

    const dispatch = useDispatch();

    const { web3, address, connected, networkID } = useSelector(
        (state: AppState) =>
            state.reducer
    );

    const connectToWallet = () => {
        dispatch(connectWallet());
    };

    const [amount, setState] = useState("");
    const [amountsame, setNewValue] = useState("");

    const handleChange = (event: ChangeEvent<{ value: string }>) => {
        setState(event?.currentTarget?.value);
        setNewValue(amount);
        const percentage = ((Number(event?.currentTarget?.value) / HpsBalance) * 100).toFixed(0);
        if (Number(percentage) > 100) {
            setSlider(100);
        } else if (Number(percentage) < 0) {
            setSlider(0);
        } else {
            setSlider(Number(percentage));
        }

    }
    useEffect(() => {
        const newHPS = (Number(amount)).toString();
        setNewValue(newHPS);
    }, [amount, setNewValue])

    const [HpsBalance, hpsBalanceSet] = useState(0);

    const [slider, setSlider] = useState(0);

    const onSlide = (e: any) => {
        setSlider(e.target.value);
        const newValue = ((HpsBalance * e.target.value) / 100).toFixed(6).toString();
        setState(newValue)
    };
    const changeNetworkToBsc = () => {
        changeNetwork();
    }
    useEffect(() => {

        async function fetchData() {
            const addresstopass = address.toString()
            if (addresstopass) {
                hpsBalance(addresstopass).then((value) => {
                    const minted: number = value;
                    hpsBalanceSet(minted)
                });
            }
        }
        setInterval(() =>

            fetchData()
            , 3000);
    }, [address]);

    return (
        <>
            <Main>
                <WholeThing>
                    <Section>
                        <Gridsection>
                            <div>

                                <Card>
                                    <ValueSection>
                                        <TokenButton>
                                            <TokenButtonSpan>
                                                <TokenButtonSpanDiv>
                                                    <TokenImage src="https://tokens.1inch.io/0xeda21b525ac789eab1a08ef2404dd8505ffb973d.png" />
                                                    <TokenNameSpan>
                                                        HPS
                                                    </TokenNameSpan>

                                                </TokenButtonSpanDiv>
                                            </TokenButtonSpan>
                                        </TokenButton>
                                        <ValueInput type="text" value={amount} defaultValue="" onChange={handleChange} pattern="^[0-9]*[.,]?[0-9]*$" placeholder="0.0" />

                                    </ValueSection>
                                    <CurrencyInputbalance>
                                        <CurrencyBalance>
                                            <CurrencyBalanceview>
                                                <Balance>HPS Balance: {HpsBalance}</Balance>
                                            </CurrencyBalanceview>
                                        </CurrencyBalance>
                                    </CurrencyInputbalance>
                                </Card>
                                <Arrow>
                                    <img src={ArrowImg} width="50%" alt="" />
                                </Arrow>
                                <Card>
                                    <ValueSection>
                                        <TokenButton>
                                            <TokenButtonSpan>
                                                <TokenButtonSpanDiv>
                                                    <TokenImage src="https://tokens.1inch.io/0xeda21b525ac789eab1a08ef2404dd8505ffb973d.png" />
                                                    <TokenNameSpan>
                                                        HPS
                                                    </TokenNameSpan>

                                                </TokenButtonSpanDiv>
                                            </TokenButtonSpan>
                                        </TokenButton>
                                        <ValueInput type="text" readOnly value={amountsame} pattern="^[0-9]*[.,]?[0-9]*$" placeholder="0.0" />
                                    </ValueSection>
                                    <CurrencyInputbalance>
                                        <CurrencyBalance>
                                            <CurrencyBalanceview>
                                                <Balance>You will get new HPS</Balance>
                                            </CurrencyBalanceview>
                                        </CurrencyBalance>
                                    </CurrencyInputbalance>
                                </Card>
                            </div>
                            <SliderInput>
                                <Input
                                    type="range"
                                    name="slider"
                                    min="0"
                                    max="100"
                                    value={slider}
                                    onChange={onSlide}
                                />
                                <SliderValue>
                                    {slider}%
                                </SliderValue>
                            </SliderInput>
                            <div>
                                {networkID === Number(process.env.REACT_APP_NETWORK_ID) ? (
                                    <>
                                        <SwapButton onClick={connected ? async () => "resffr" : connectToWallet}>{connected ? 'Swap' : 'Unlock Wallet'}</SwapButton>
                                    </>
                                ) : (
                                    <>
                                        <SwapButton onClick={changeNetworkToBsc}>Wrong Network</SwapButton>
                                    </>
                                )}

                            </div>
                        </Gridsection>
                    </Section>
                </WholeThing>

            </Main>
        </>
    )
}


export default SwapCard;