import React, {useEffect} from "react";
import LogoEth from "../../assets/images/ethereum-40px.svg";
import LogoKlaytn from "../../assets/images/klaytn-40px.svg";
import LogoPolygon from "../../assets/images/polygon-40px.svg";
import Bnb_main_logo from "../../assets/images/bwb_Logo.svg";
import {useHistory} from "react-router-dom";
import useWallet from "../../hooks/useWallet";
import {NETWORK_TYPE, WALLET_TYPE} from "../../utils/helper/helper";
import {useSelector} from "react-redux";

function SelectNetwork() {
    let history = useHistory();

    const {selectNetwork,connectWallet} = useWallet();

    const {isConnectedWallet, networkId} = useSelector((store) => store.wallet);

    useEffect(() => {
        if (isConnectedWallet && networkId !== null && networkId !== undefined) {
            history.push("/home");
        }
    }, [isConnectedWallet, networkId]);

    const handleNetworkSwitch = async (networkName) => {
        await selectNetwork(networkName);
    };


    return (
        <>
            <div className=" gameFi_upper_dark_bg">
                <div
                    className=" gameFi_bg_002 d-flex flex-column justify-content-center align-items-center min-h-100vh">
                    <div className="select_network_title_001">
                        <span>NFT</span> 발행 플랫폼
                    </div>
                    <div className="text-center">
                        <img src={Bnb_main_logo}/>
                    </div>

                    <div className="main_login_text_001">
                        NFT를 발행할 체인을 선택해 주세요.
                    </div>
                    <div className="select_network_area">
                        <div
                            className="networks"
                            onClick={() => handleNetworkSwitch(NETWORK_TYPE.ETHEREUM)}
                        >
                            <img src={LogoEth} alt=""/>
                            <button className="networks_button">이더리움 체인</button>
                        </div>
                        <div
                            className="networks"
                            onClick={() => handleNetworkSwitch(NETWORK_TYPE.POLYGON)}
                        >
                            <img src={LogoPolygon} alt=""/>
                            <button className="networks_button">폴리곤 체인</button>
                        </div>
                        {/*<div*/}
                        {/*    className="networks"*/}
                        {/*    onClick={() => handleNetworkSwitch(NETWORK_TYPE.KLAYTN)}*/}
                        {/*>*/}
                        {/*    <img src={LogoKlaytn} alt=""/>*/}
                        {/*    <button className="networks_button">클레이튼 체인</button>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </>
    );
}

export default SelectNetwork;
