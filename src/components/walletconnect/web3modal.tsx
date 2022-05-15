import React from 'react';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";





export default function web3Modalreturn() {

    const providerOptions = {

        walletconnect: {
            package: WalletConnectProvider,
            options: {
                rpc: {
                    1: 'https://bsc-dataseed.binance.org/',
                    56: 'https://bsc-dataseed.binance.org/',
                },
                bridge: 'https://bridge.walletconnect.org',
                qrcode: true,
            }
        },

    };

    const web3Modalreturn = new Web3Modal({
        cacheProvider: false, // optional
        network: "binance",
        providerOptions // required
    });
    return web3Modalreturn;
}
// export default web3Modalreturn;
