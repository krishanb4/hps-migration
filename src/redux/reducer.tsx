import * as types from '../constants/actionConstants';



export interface DefaultStateI {
    web3: any;
    loading: boolean
    connected: boolean,
    address: string,
    networkID: number,
}

const defaultState: DefaultStateI = {
    web3: "",
    loading: false,
    connected: false,
    address: '',
    networkID: 0
};

export interface ConnectedWallet {
    type: typeof types.HOME_CONNECT_WALLET_SUCCESS;
    payload: DefaultStateI
}

export interface DisconnectedWallet {
    type: typeof types.HOME_DISCONNECT_WALLET_SUCCESS;
    payload: DefaultStateI
}

interface ConnectingWallet {
    type: typeof types.HOME_CONNECT_WALLET_BEGIN;
    payload: DefaultStateI;
}
interface NetworkChange {
    type: typeof types.HOME_NETWORK_CHANGED;
    payload: DefaultStateI;
}

export type WalletActions = ConnectedWallet | ConnectingWallet | DisconnectedWallet | NetworkChange;


export const reducer = (state: DefaultStateI = defaultState, action: WalletActions): DefaultStateI => {
    switch (action.type) {
        case types.HOME_CONNECT_WALLET_SUCCESS:
            return {
                ...state,
                web3: action.payload.web3,
                loading: false,
                connected: true,
                address: action.payload.address,
                networkID: action.payload.networkID

            }

        case types.HOME_DISCONNECT_WALLET_SUCCESS:
            return {
                ...state,
                web3: action.payload.web3,
                loading: false,
                connected: false,
                address: action.payload.address,
                networkID: action.payload.networkID

            }
        case types.HOME_NETWORK_CHANGED:
            return {
                ...state,
                web3: action.payload.web3,
                loading: false,
                connected: true,
                address: action.payload.address,
                networkID: action.payload.networkID

            }
        default:
            return state;
    }
}