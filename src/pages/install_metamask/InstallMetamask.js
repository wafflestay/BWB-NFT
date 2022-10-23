import React, {useEffect} from "react";
import {useHistory} from "react-router-dom";
import LogoMetamask from "../../assets/images/metamask_icon_001.svg";
import Bnb_main_logo from "../../assets/images/bwb_Logo.svg";
import {useSelector} from "react-redux";

function SelectNetwork(props) {
    let history = useHistory();
    const {account} = useSelector((store) => store.wallet);

    useEffect(() => {
        console.log(account);
        if (account) {
            history.push("/select-network");
        }
    }, [account]);


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
                    <div className="select_network_img">
                        <img src={LogoMetamask} alt=""/>
                    </div>
                    <a href="https://metamask.io/" target="_blank">
                        <button className="select_network_btn">METAMASK 설치하기</button>
                    </a>
                </div>
            </div>
        </>
    );
}

export default SelectNetwork;
