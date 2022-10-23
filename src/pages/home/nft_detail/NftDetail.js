import React, {useEffect, useState} from "react";
import MintBoxLogo from "../../../assets/images/ft_logo.svg";
import profileImg from "../../../assets/images/profileImg.svg";
import Bnb_main_logo from "../../../assets/images/bwb_Logo.svg";
import {useSelector} from "react-redux";
import LogoEth from "../../../assets/images/ethereum-40px.svg";
import axios from 'axios'
import {useParams} from "react-router-dom";
import {getNetworkName} from "../../../utils/web3/networks";
import LogoKlay from "../../../assets/images/klaytn-40px.svg";
import LogoPolygon from "../../../assets/images/polygon-40px.svg";
import {Modal} from "react-bootstrap";
import moment from "moment";
import {GET} from "../../../utils/api";

function NftDetail() {
    const {contract_address, token_id} = useParams();
    const [nftDetail, setNftDetail] = useState([]);
    const [showLoading, setShowLoading] = useState(false);
    const {account, isConnectedWallet, networkId} = useSelector((store) => store.wallet);

    async function getNftDetail() {
        try {
            setShowLoading(true);
            const response = await GET("/api/nft/detail?contract_address=" + contract_address + "&token_id=" + token_id);
            console.log(response.data.nft);
            setNftDetail(response.data.nft);
            setShowLoading(false);
        } catch (e) {
            alert(e);
            setShowLoading(false);
        }
    }

    useEffect(() => {
        getNftDetail()
    }, []);


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
                            {(() => {
                                switch (nftDetail.network) {
                                    case 4:
                                    case 1:
                                        return <img src={LogoEth} alt=""/>;
                                    case 8217:
                                    case 1001:
                                        return <img src={LogoKlay} alt=""/>;
                                    case 137:
                                    case 80001:
                                        return <img src={LogoPolygon} alt=""/>;
                                }
                            })()}
                        </div>
                        <div className="user_wallet_address">
                            {formatWalletAddress(account)}
                        </div>
                    </div>
                    <div className="container mt-200">
                        <div className="row mint_nft_box">
                            <div className="col-lg-12">
                                <div className="breadcrumb_area">
                                    {getNetworkName(networkId) === "polygon"
                                    && "볼리곤 체인" || getNetworkName(networkId) === "ethereum" && "이더리움 체인" || getNetworkName(networkId) === "klaytn" && "클레이튼 체인"
                                    }
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 mb-3">
                                <div className="card card_content_area">
                                    <img
                                        className="card-img-top"
                                        src={nftDetail.token_image}
                                        alt="Card image cap"
                                    />
                                    <div className="card-body">
                                        <div className="card-title">{nftDetail.token_name}</div>
                                        {(() => {
                                            switch (nftDetail.network) {
                                                case 4:
                                                case 1:
                                                    return <img src={LogoEth} alt=""/>;
                                                case 8217:
                                                case 1001:
                                                    return <img src={LogoKlay} alt=""/>;
                                                case 137:
                                                case 80001:
                                                    return <img src={LogoPolygon} alt=""/>;
                                            }
                                        })()}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-7">

                                <div className="detail_field">
                                    <div className="detail_label">NFT 발행 체인</div>
                                    <div>
                                        <input type="text" disabled={true} value={getNetworkName(nftDetail.network)}
                                               className="detail_block"/>
                                    </div>
                                </div>
                                <div className="detail_field">
                                    <div className="detail_label">NFT 발행 이름</div>
                                    <div>
                                        <input disabled={true} type="text" value={nftDetail.token_name} className="detail_block"/>
                                    </div>
                                </div>
                                <div className="detail_field">
                                    <div className="detail_label">NFT 개수</div>
                                    <div>
                                        <input disabled={true} type="text" value={nftDetail.token_quantity} className="detail_block"/>
                                    </div>
                                </div>

                                <div className="detail_field">
                                    <div className="detail_label">NFT 발행 설명</div>
                                    <div>
                <textarea
                    disabled={true}
                    value={nftDetail.token_description}
                    type="text"
                    rows="4"
                    cols="50"
                    className="detail_textarea"
                />
                                    </div>
                                </div>
                                <div className="detail_field">
                                    <div className="detail_label">NFT 발행 날짜 / 시간</div>
                                    <div>
                                        <input type="text" disabled={true} value={moment(nftDetail.minted_at * 1000).format(
                                            'DD.MM.yyyy hh:mm:ss'
                                        )} className="detail_block"/>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right mt-5 col-lg-12">
                                <img src={MintBoxLogo} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                size="cd"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showLoading}
                onHide={() => setShowLoading(false)}
                className="loadingModal"
            >
                <div className="lds-roller">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </Modal>

        </>
    );
}

export default NftDetail;

function formatWalletAddress(walletAddress) {
    var firstPart = walletAddress.substr(0, 8);
    var secondPart = walletAddress.substr(-8);
    return firstPart + "...." + secondPart;
}
