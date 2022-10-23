import React from 'react';
import {useDispatch} from 'react-redux';
import {
    clearWallet,
    setAccount,
    setIsWalletConnected,
    setNetworkId,
    setWallet,
    setWalletType
} from '../store/wallet/wallet.slice';
import {WALLET_TYPE} from "../utils/helper/helper";
import {networks} from "../utils/web3/networks";

const useWallet = () => {
    const dispatch = useDispatch();

    const handleMetaMask = (networkName) => {
        console.log("M1")
        if (isMetamaskWalletInstalled()) {
            getMetamaskAccount(networkName);
        } else {
            alert('Please install MetaMask');
        }
    };

    const handleKaikas = () => {
        console.log("K1")
        if (isKaikasWalletInstalled()) {
            getKaikasAccount();
        } else {
            alert('Please install Kaikas');
        }
    }

    const handleClick = (type) => {
        if (type === WALLET_TYPE.METAMASK) {
            handleMetaMask();
        } else if (type === WALLET_TYPE.KAIKAS) {
            handleKaikas();
        }
    };

    async function getMetamaskAccount() {
        const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
        const account = accounts[0];

        const data = {
            account: account,
            walletType: "Metamask",
            isConnectedWallet: true,
        }

        dispatch(setWallet(data))

    }

    const changeNetwork = async (networkName) => {
        console.log(networkName);
        console.log(networks)
        try {
            await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [
                    {chainId: networks[networkName].chainId}
                ],
            });
            const chainId = networks[networkName].networkId;
            console.log(chainId);
            dispatch(setNetworkId(chainId));
        } catch (error) {
            console.log(error);
            if (error.code === 4902) {
                if (!window.ethereum) throw new Error("No crypto wallet found");
                await window.ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [
                        {
                            ...networks[networkName],
                        },
                    ],
                });
                const chainId = networks[networkName].networkId;
                console.log(chainId);
                dispatch(setNetworkId(chainId));
            }
        }

    };

    async function getKaikasAccount() {
        const accounts = await window.klaytn.enable();
        const account = accounts[0];
        const data = {
            account: account,
            walletType: "Kaikas",
            isConnectedWallet: true,
        }
        dispatch(setWallet(data))
    }

    function isMetamaskWalletInstalled() {
        return window.ethereum !== undefined
    }

    function isKaikasWalletInstalled() {
        return window.klaytn !== undefined
    }

    const logoutWallet = () => {
        console.log("LOGOUT");
        dispatch(setAccount(null));
        dispatch(setNetworkId(null));
        dispatch(setWalletType(null));
        dispatch(setIsWalletConnected(false));
        dispatch(clearWallet);
    };

    return {
        connectWallet: handleClick,
        logoutWallet: logoutWallet,
        selectNetwork: changeNetwork
    };
};

export default useWallet;
