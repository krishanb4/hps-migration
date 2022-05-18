import * as types from '../constants/actionConstants';

export interface ApprovalDefualts {
    isApproved: boolean,
    approveAmount: number,
    isApproving: boolean,
}

const defaultApprovestate: ApprovalDefualts = {
    isApproved: false,
    approveAmount: 0,
    isApproving: false
}

export interface DefaultStateI {
    web3: any,
    loading: boolean,
    connected: boolean,
    address: string,
    networkID: number,
    hpsBalance: number,

}

const defaultState: DefaultStateI = {
    web3: "",
    loading: false,
    connected: false,
    address: '',
    networkID: 0,
    hpsBalance: 0,

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
interface AccountChange {
    type: typeof types.HOME_ACCOUNTS_CHANGED;
    payload: DefaultStateI;
}

interface ApprovedState {
    type: typeof types.FETCH_APPROVAL_DATA;
    payload: ApprovalDefualts;
}
interface ApprovedTrue {
    type: typeof types.FETCH_APPROVAL_DATA_APPROVED;
    payload: ApprovalDefualts;
}

interface IsApproving {
    type: typeof types.FETCH_APPROVAL_DATA_APPROVING;
    payload: ApprovalDefualts;
}


interface WalletReset {
    type: typeof types.HOME_CONNECT_WALLET_RESET;
    payload: typeof defaultState;
}

interface ApprovalReset {
    type: typeof types.APPROVAL_DATA_RESET;
    payload: typeof defaultApprovestate;
}


export type WalletActions = ConnectedWallet | ConnectingWallet | DisconnectedWallet | NetworkChange | AccountChange | WalletReset;
export type ApprovalActions = ApprovedState | ApprovedTrue | IsApproving | ApprovalReset;

export const approvalreducer = (state: ApprovalDefualts = defaultApprovestate, action: ApprovalActions) => {
    switch (action.type) {
        case types.APPROVAL_DATA_RESET:
            return defaultApprovestate;
        case types.FETCH_APPROVAL_DATA:
            return {
                ...state,
                isApproved: false,
                approveAmount: 0,
                isApproving: false

            }
        case types.FETCH_APPROVAL_DATA_APPROVED:
            return {
                ...state,
                isApproved: true,
                approveAmount: action.payload.approveAmount,
                isApproving: false

            }
        case types.FETCH_APPROVAL_DATA_APPROVING:
            return {
                ...state,
                isApproved: false,
                approveAmount: 0,
                isApproving: true

            }

        default:
            return state;
    }
}

export const reducer = (state: DefaultStateI = defaultState, action: WalletActions): DefaultStateI => {
    switch (action.type) {
        case types.HOME_CONNECT_WALLET_RESET:
            return defaultState;
        case types.HOME_CONNECT_WALLET_SUCCESS:
            return {
                ...state,
                web3: action.payload.web3,
                loading: false,
                connected: true,
                address: action.payload.address,
                networkID: action.payload.networkID,
                hpsBalance: action.payload.hpsBalance,

            }

        case types.HOME_DISCONNECT_WALLET_SUCCESS:
            return {
                ...state,
                web3: action.payload.web3,
                loading: false,
                connected: false,
                address: action.payload.address,
                networkID: action.payload.networkID,
                hpsBalance: action.payload.hpsBalance,

            }
        case types.HOME_NETWORK_CHANGED:
            return {
                ...state,
                web3: action.payload.web3,
                loading: true,
                connected: true,
                address: action.payload.address,
                networkID: action.payload.networkID,
                hpsBalance: action.payload.hpsBalance,

            }
        case types.HOME_ACCOUNTS_CHANGED:
            return {
                ...state,
                web3: action.payload.web3,
                loading: true,
                connected: true,
                address: action.payload.address,
                networkID: action.payload.networkID,
                hpsBalance: action.payload.hpsBalance,

            }
        default:
            return state;
    }
}