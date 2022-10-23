import React, {useEffect} from "react";
import {useHistory} from "react-router-dom";
import metamask_connect from "../../assets/images/metamask_connect.svg";

import Bnb_main_logo from "../../assets/images/bwb_Logo.svg";
import {useSelector} from "react-redux";
import useWallet from "../../hooks/useWallet";
import {WALLET_TYPE} from "../../utils/helper/helper";

function ConnectWallet() {
    let history = useHistory();
    const {account} = useSelector((store) => store.wallet);

    const {connectWallet} = useWallet();

    useEffect(() => {
        console.log(account);
        if (account) {
            history.push("/select-network");
        }
    }, [account]);

    function handleMetamask() {
        connectWallet(WALLET_TYPE.METAMASK);
    }

    return (
        <>
            <div className="gameFi_upper_dark_bg  ">
                <div
                    className=" gameFi_bg_002 d-flex flex-column justify-content-center align-items-center min-h-100vh">
                    <div className="select_network_title_001">
                        <span>NFT</span> 발행 플랫폼
                    </div>
                    <div className="text-center">
                        <img src={Bnb_main_logo}/>
                    </div>

                    <div className="main_login_text_001">
                        NFT 발행하기 위해 지갑을 연결을 먼저해 주세요.
                    </div>
                    <div className="select_network_area">
                        <div className="networks">
                            <img src={metamask_connect} alt=""/>
                                <button className="networks_button" onClick={() => handleMetamask()}>메타마스크 지갑</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ConnectWallet;
