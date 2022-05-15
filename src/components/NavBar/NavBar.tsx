import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, NavbarContainer, NavLogo, NavIcon, MenuIcon, Menu, MenuItem, MenuLink, MenuItemBtn, MenuLinkBtn } from '../StyledComponents/styles'
import { connectWallet, disconnectWallet, changeNetwork } from '../walletconnect/connection';
import { AppState } from '../../redux/store';
import { BiMenu, BiX } from "react-icons/bi";
import HpsImage from "../images/hps.png"




const NavBar: React.FC = () => {

    const dispatch = useDispatch();
    const { address, connected, networkID } = useSelector(
        (state: AppState) =>
            state.reducer
    );
    const [shortAddress, setShortAddress] = useState('');
    useEffect(() => {
        if (!connected) {
            return;
        }
        setShortAddress(`${address.slice(0, 6)}...${address.slice(-4)}`);
    }, [connected, address]);
    useEffect(() => {
        if (networkID !== Number(process.env.REACT_APP_NETWORK_ID)) {
            changeNetwork();
        }
        dispatch(connectWallet());
    }, [dispatch, networkID]);

    const connectToWallet = () => {
        dispatch(connectWallet());
    };
    const diConnectToWallet = () => {
        dispatch(disconnectWallet());
    };

    const changeNetworkToBsc = () => {
        changeNetwork();
    }

    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);

    return (
        <>
            <Nav>
                <NavbarContainer>
                    <NavLogo to="/">
                        <NavIcon src={HpsImage} width="50px;" />
                        BillionHappiness
                    </NavLogo>
                    <MenuIcon onClick={handleClick}>
                        {click ? <BiX /> : <BiMenu />}
                    </MenuIcon>
                    <Menu onClick={handleClick} click={click}>
                        <MenuItemBtn>
                            {networkID === Number(process.env.REACT_APP_NETWORK_ID) ? (
                                <>
                                    <MenuLinkBtn onClick={connected ? diConnectToWallet : connectToWallet}>{connected ? shortAddress : 'Connect'}</MenuLinkBtn>
                                </>
                            ) : (
                                <>
                                    <MenuLinkBtn onClick={changeNetworkToBsc}>Wrong Network</MenuLinkBtn>
                                </>
                            )
                            }
                        </MenuItemBtn>
                    </Menu>

                </NavbarContainer>


            </Nav>
        </>

    )
}

export default NavBar;