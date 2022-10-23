import React, {useEffect} from 'react'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import InstallMetamask from "../pages/install_metamask/InstallMetamask";
import ConnectWallet from "../pages/connect_wallet/ConnectWallet"
import SelectNetwork from "../pages/select_network/SelectNetwork";
import NftDetail from '../pages/home/nft_detail/NftDetail';
import Home from "../pages/home/Home";
import useWallet from "../hooks/useWallet";
import {useSelector} from "react-redux";
import {WALLET_TYPE} from "../utils/helper/helper";

function Index() {
    const {connectWallet} = useWallet();
    const { isConnectedWallet, walletType, isMetamaskWalletInstalled} = useSelector((store) => store.wallet);

    useEffect(async () => {
        console.log(walletType);
        console.log(isConnectedWallet);
        if (isConnectedWallet) {
            if (walletType === WALLET_TYPE.METAMASK) {
                connectMetamask();
            }
        }
        handleAccount();
    }, []);

    const handleAccount = async () => {
        if (walletType === WALLET_TYPE.METAMASK) {
            window.ethereum.on('accountsChanged', async (accounts) => {
                console.log(accounts);
                if (accounts.length > 0) {
                    await connectWallet(WALLET_TYPE.METAMASK);
                } else {
                    // await logoutWallet();
                }
            });
        }
    };

    async function connectMetamask() {
        console.log("M")
        connectWallet('Metamask');
    }

    async function connectKaikas() {
        console.log("K")
        connectWallet('Kaikas');
    }

    return (
        <BrowserRouter>
            <Switch>

                <Route exact path="/" render={() => (
                       !isMetamaskWalletInstalled ? (
                        <ConnectWallet
                        handleMetamaskConnect={() => connectMetamask()}
                        handleKaikasConnect={() => connectKaikas()}/>
                    ) : (
                        <InstallMetamask/>
                    )
                
                )}/>
                <Route exact path="/connect-wallet" render={() => (
                     !isMetamaskWalletInstalled ? (
                        <ConnectWallet
                        handleMetamaskConnect={() => connectMetamask()}
                        handleKaikasConnect={() => connectKaikas()}/>
                    ) : (
                        <InstallMetamask/>
                    )
                   
                )}/>
                <Route exact path="/select-network" render={() => (
                    !isConnectedWallet ? (
                        <Redirect to="/connect-wallet"/>
                    ) : (
                        <SelectNetwork/>
                    )
                )}/>

                <Route exact path="/nft-detail/:contract_address/:token_id" render={() => (
                    !isConnectedWallet ? (
                        <Redirect to="/connect-wallet"/>
                    ) : (
                        <NftDetail/>
                    )
                )}/>

                <Route exact path="/home" render={() => (

                    !isConnectedWallet ? (
                        <Redirect to="/connect-wallet"/>
                    ) : (
                        <Home />
                    )

                )}/>

       
            </Switch>
        </BrowserRouter>
    )

}

export default Index;