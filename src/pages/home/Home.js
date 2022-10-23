import React, {useEffect, useState} from "react";
import profileImg from "../../assets/images/profileImg.svg";
import Bnb_main_logo from "../../assets/images/bwb_Logo.svg";
import {useSelector} from "react-redux";
import MintNft from "./mint_nft/MintNft";
import MyNft from "./my_nft/MyNft";
import useWallet from "../../hooks/useWallet";
import LogoEth from "../../assets/images/ethereum-40px.svg";
import LogoKlay from "../../assets/images/klaytn-40px.svg";
import LogoPolygon from "../../assets/images/polygon-40px.svg";
import {getNetworkName} from "../../utils/web3/networks";
import {GET} from "../../utils/api";
import {Link} from "react-router-dom";
function Home() {
    const [activeTab, setActiveTab] = useState(1);
    const {account, isConnectedWallet,networkId} = useSelector((store) => store.wallet);
    const {logoutWallet} = useWallet();

    async function logout() {
        await logoutWallet();
    }

    useEffect(() => {
        selectPaymentTab(activeTab)
    }, [activeTab]);

    async function selectPaymentTab(tabNumber) {
        setActiveTab(tabNumber);
    }

    return (
        <>
            <div className=" gameFi_upper_dark_bg ">
                <div className=" gameFi_bg_003  justify-content-center  min-h-100vh pb-200">

                    <div className="select_network_title_001 pt-150">
                        <span>NFT</span> 발행 플랫폼
                    </div>
                    <div className="text-center">
                        <img src={Bnb_main_logo}/>
                    </div>
                    <div className={isConnectedWallet ? "user_address" : "d-none"}>
                        <div className="user_address_img">
                            {getNetworkName(networkId) === "polygon"
                            && <img src={LogoPolygon} alt=""/> || getNetworkName(networkId) === "ethereum" && <img src={LogoEth} alt=""/> || getNetworkName(networkId) === "klaytn" && <img src={LogoKlay} alt=""/>
                            }
                        </div>
                        <div className="user_wallet_address">
                            {formatWalletAddress(account)}
                        </div>
                        <button className="default_btn" onClick={() => {
                            logout()
                        }}>로그아웃
                        </button>
                    </div>
                    <div className="tabs mt-150">
                        <ul>
                            <li onClick={() => selectPaymentTab(1)}>
                <span className={activeTab === 1 ? "active" : ""}>
                  NFT 발행
                </span>
                            </li>
                            <li onClick={() => selectPaymentTab(2)}>
                <span className={activeTab === 2 ? "active" : ""}>
                  나의 NFT
                </span>
                            </li>
                        </ul>
                    </div>

                    {activeTab === 1 && <MintNft onClick={setActiveTab}/>}
                    {activeTab === 2 && <MyNft/>}
                </div>
            </div>


        </>
    );
}

export default Home;

function formatWalletAddress(walletAddress) {
    var firstPart = walletAddress.substr(0, 8);
    var secondPart = walletAddress.substr(-8);
    return firstPart + "...." + secondPart;
}
