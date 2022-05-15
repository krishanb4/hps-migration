import Web3 from "web3";
import Web3Modal from "web3modal";
import 'react-toastify/dist/ReactToastify.css';
import { Dispatch } from 'redux';
import * as types from '../../constants/actionConstants';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { WalletActions } from '../../redux/reducer'
import { providers } from "ethers";
import { notifyerror } from "../../utils/toastHelper"

export default function create() {
    return true;
}

export const disconnectWallet = () => async (dispatch: Dispatch<WalletActions>) => {

    try {
        localStorage.removeItem('WEB3_CONNECT_CACHED_PROVIDER');
        dispatch({
            type: types.HOME_DISCONNECT_WALLET_SUCCESS,
            payload: {
                web3: "",
                loading: false,
                connected: false,
                address: "",
                networkID: Number(process.env.REACT_APP_NETWORK_ID)

            }
        })
    } catch (err) {
        notifyerror("user rejected");
    }

}

export const connectWallet = () => async (dispatch: Dispatch<WalletActions>) => {

    try {
        const providerOptions = {
            walletconnect: {
                package: WalletConnectProvider,
                options: {
                    rpc: {
                        1: 'https://bsc-dataseed.binance.org/',
                        56: 'https://bsc-dataseed.binance.org/',
                        97: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
                    },
                    bridge: 'https://bridge.walletconnect.org',
                    qrcode: true,
                },
            }
        };

        const web3Modal = new Web3Modal({
            cacheProvider: true,
            providerOptions // required
        });

        const provider = await web3Modal.connect();

        const web3 = new Web3(provider);
        const web3Provider = new providers.Web3Provider(provider);


        const accounts = await web3.eth.getAccounts();
        const address = accounts[0];
        let networkId = await web3.eth.getChainId();


        if (networkId === 86) {
            networkId = Number(process.env.REACT_APP_NETWORK_ID);
        }
        dispatch({
            type: types.HOME_CONNECT_WALLET_SUCCESS,
            payload: {
                web3: web3Provider,
                loading: false,
                connected: true,
                address: address,
                networkID: networkId

            }
        })

        const subscribeProvider = (web3Provider: any) => {
            if (!provider.on) {
                return;
            }
            provider.on("accountsChanged", async (accounts: string) => {
                console.log('account changed ' + accounts[0]);
                if (accounts[0]) {
                    dispatch({
                        type: types.HOME_CONNECT_WALLET_SUCCESS,
                        payload: {
                            web3: web3Provider,
                            loading: false,
                            connected: true,
                            address: accounts[0],
                            networkID: networkId

                        }
                    })
                } else {
                    dispatch({
                        type: types.HOME_CONNECT_WALLET_SUCCESS,
                        payload: {
                            web3: web3Provider,
                            loading: false,
                            connected: false,
                            address: "",
                            networkID: networkId

                        }
                    })
                }
            });

            // Subscribe to chainId change
            provider.on("chainChanged", async (networkId: any) => {
                if (networkId === "0x38") {
                    networkId = 56;
                }
                dispatch({
                    type: types.HOME_NETWORK_CHANGED,
                    payload: {
                        web3: web3Provider,
                        loading: false,
                        connected: true,
                        address: address,
                        networkID: networkId

                    }
                })
            });

            // Subscribe to session disconnection
            provider.on("disconnect", async () => {
                dispatch({
                    type: types.HOME_CONNECT_WALLET_SUCCESS,
                    payload: {
                        web3: "",
                        loading: false,
                        connected: false,
                        address: "",
                        networkID: networkId

                    }
                })
            });


        };
        subscribeProvider(web3Provider);
    } catch (err) {
        notifyerror("user rejected");
    }

}

export const changeNetwork = () => {
    const chainId = Number(process.env.REACT_APP_NETWORK_ID);
    if (window.ethereum) {
        try {
            window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: Web3.utils.toHex(chainId) }],
            }).then().catch()

        } catch (error) {
            console.error(error);
        }
    }
}

