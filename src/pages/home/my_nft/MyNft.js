import React, {useEffect, useState} from "react";
import ethereum_n from "../../../assets/images/ethereum_n.svg";
import klayton_n from "../../../assets/images/klayton_n.svg";
import polyugon_n from "../../../assets/images/polyugon_n.svg";
import LogoEth from "../../../assets/images/ethereum-40px.svg";
import LogoKlay from "../../../assets/images/klaytn-40px.svg";
import LogoPolygon from "../../../assets/images/polygon-40px.svg";
import {useSelector} from "react-redux";
import {GET} from "../../../utils/api";
import {NETWORK_TYPE} from "../../../utils/helper/helper";
import {networks} from "../../../utils/web3/networks";
import {Link} from "react-router-dom";
import {Modal} from "react-bootstrap";

function MyNft() {
    const [activeTab, setActiveTab] = useState(0);
    const [nftList, setNftList] = useState([]);
    const [showLoading, setShowLoading] = useState(false);
    const {account, isConnectedWallet} = useSelector((store) => store.wallet);

    const [totalNftCount, setTotalNftCount] = useState({
        total_polygon: 0, total_klaytn: 0, total_ethereum: 0
    })

    function selectPaymentTab(tabNumber) {
        setActiveTab(tabNumber);
    }

    useEffect(() => {
        getNftList(activeTab);
    }, [activeTab]);

    async function getNftList(tabNumber) {
        setShowLoading(true)
        setNftList([]);
        const response = await GET("/api/nft/list?wallet_address=" + account + "&size=100&page=1&network=" + tabNumber);
        console.log(response.data.items);
        setNftList(response.data.items);
        setShowLoading(false);
    }

    async function getNftTotal() {
        const response = await GET("/api/nft/total?wallet_address=" + account);
        console.log(response);
        setTotalNftCount(response.data);
    }

    useEffect(() => {
        getNftTotal();
    }, [account]);

    return (<>
        <div className="container">
            <div className="row">
                <div className="col-lg-6 nft_amount_box">
                    <div className="">
                        <img src={ethereum_n} alt=""/>
                        <p className="nft_amount">{totalNftCount.total_ethereum}</p>
                        <div className="nft_channel">이더리움 체인 발행된 NFT</div>
                    </div>
                </div>
                <div className="col-lg-6 nft_amount_box border-none">
                    <div className="">
                        <img src={polyugon_n} alt=""/>
                        <p className="nft_amount">{totalNftCount.total_polygon}</p>
                        <div className="nft_channel">폴리곤 체인 발행된 NFT</div>
                    </div>
                </div>
                {/*<div className="col-lg-4 nft_amount_box border-none">*/}
                {/*    <div className="">*/}
                {/*        <img src={klayton_n} alt=""/>*/}
                {/*        <p className="nft_amount">{totalNftCount.total_klaytn}</p>*/}
                {/*        <div className="nft_channel">클레이튼 체인 발행된 NFT</div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
            <div className="row">
                <div className="select_network_title_001 mt-200">
                    <span>NFT</span> 발행 플랫폼
                </div>
                <div className="tabs">
                    <ul className="justify-content-between">
                        <li onClick={() => selectPaymentTab(0)}>
                            <span className={activeTab === 0 ? "active" : ""}>ALL</span>
                        </li>
                        <li onClick={() => selectPaymentTab(networks[NETWORK_TYPE.ETHEREUM].networkId)}>
                <span className={activeTab === networks[NETWORK_TYPE.ETHEREUM].networkId ? "active" : ""}>
                  이더리움 - NFT
                </span>
                        </li>
                        <li onClick={() => selectPaymentTab(networks[NETWORK_TYPE.POLYGON].networkId)}>
                <span className={activeTab === networks[NETWORK_TYPE.POLYGON].networkId ? "active" : ""}>
                  폴리곤 - NFT
                </span>
                        </li>
                {/*        <li onClick={() => selectPaymentTab(networks[NETWORK_TYPE.KLAYTN].networkId)}>*/}
                {/*<span className={activeTab === networks[NETWORK_TYPE.KLAYTN].networkId ? "active" : ""}>*/}
                {/*  클레이튼 - NFT*/}
                {/*</span>*/}
                {/*        </li>*/}
                    </ul>
                </div>
            </div>
            {activeTab === 0 && <div className="row">
                {nftList.map((item, index) => (<div className="col-lg-3 col-md-6 mb-3">
                    <Link to={'/nft-detail/' + item.nft.contract_address + '/' + item.nft.token_id}>
                        <div className="card card_content_area">
                            <img
                                className="card-img-top"
                                src={item.nft.token_image}
                                alt="Card image cap"
                            />
                            <div className="card-body">
                                <div className="card-title">{item.nft.token_name}</div>
                                {(() => {
                                    switch (item.nft.network) {
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
                    </Link>

                </div>))}
                {

                }
            </div>}
            {activeTab === networks[NETWORK_TYPE.ETHEREUM].networkId && <div className="row">
                {nftList.map((item, index) => (
                    <div className="col-lg-3 col-md-6 mb-3">
                    <Link to={'/nft-detail/' + item.nft.contract_address + '/' + item.nft.token_id}>
                        <div className="card card_content_area">
                            <img
                                className="card-img-top"
                                src={item.nft.token_image}
                                alt="Card image cap"
                            />
                            <div className="card-body">
                                <div className="card-title">{item.nft.token_name}</div>
                                {(() => {
                                    switch (item.network) {
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
                    </Link>

                </div>))}
                {

                }
            </div>}
            {activeTab === networks[NETWORK_TYPE.POLYGON].networkId && <div className="row">
                {nftList.map((item, index) => (<div className="col-lg-3 col-md-6 mb-3">
                    <Link to={'/nft-detail/' + item.nft.contract_address + '/' + item.nft.token_id}>
                        <div className="card card_content_area">
                            <img
                                className="card-img-top"
                                src={item.nft.token_image}
                                alt="Card image cap"
                            />
                            <div className="card-body">
                                <div className="card-title">{item.nft.token_name}</div>
                                {(() => {
                                    switch (item.network) {
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
                    </Link>

                </div>))}
                {

                }
            </div>}
            {activeTab === networks[NETWORK_TYPE.KLAYTN].networkId && <div className="row">
                {nftList.map((item, index) => (<div className="col-lg-3 col-md-6 mb-3">
                    <Link to={'/nft-detail/' + item.nft.contract_address + '/' + item.nft.token_id}>
                        <div className="card card_content_area">
                            <img
                                className="card-img-top"
                                src={item.nft.token_image}
                                alt="Card image cap"
                            />
                            <div className="card-body">
                                <div className="card-title">{item.nft.token_name}</div>
                                {(() => {
                                    switch (item.network) {
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
                    </Link>

                </div>))}
                {

                }
            </div>}
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
    </>);
}

export default MyNft;
