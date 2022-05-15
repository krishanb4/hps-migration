import contractAbi from '../config/abi/contractabi.json';
import { ethers } from "ethers";
import { notifysuccess } from '../utils/toastHelper';
import BigNumber from 'bignumber.js';

const RPC_URL_BSC = 'https://bsc-dataseed.binance.org/'
const RPC_URL_ROPSTON = 'https://ropsten.infura.io/v3/09bcc0646ff04b2f844b23be91e375f7'


const contractAddress = "0x4Fd32530c0b627a42FCc4f1fA90ec3F270661BC9";
const provider_main = new ethers.providers.JsonRpcProvider(RPC_URL_ROPSTON);

export const mint = async (web3:any) => {

    
    const signer = web3.getSigner();
    let contract = new ethers.Contract(contractAddress , contractAbi,signer);
    
  await contract.mint().then(function (res:any, err:any) {
    notifysuccess(`Transaction success!`)
  });
    
}

export const totalSupply = async () => {

  let contract = new ethers.Contract(contractAddress , contractAbi,provider_main);
  let balance = await contract.totalSupply();
  console.log('updating nft buy amount every 1s')
  return Number(balance);
}