import axios from "axios";
import React, {useRef, useState} from "react";
import MintBoxLogo from "../../../assets/images/ft_logo.svg";
import UploadPhoto from "../../../assets/images/uploadImg.svg";
import Web3 from 'web3'
import {ERC721} from "../../../utils/abi/ERC721";
import {useSelector} from "react-redux";
import {contracts} from "../../../utils/web3/contracts";
import {getNetworkName} from "../../../utils/web3/networks";
import {Modal} from "react-bootstrap";
import {ERC1155} from "../../../utils/abi/ERC1155";

function MintNft({onClick}) {
    const [currentFile, setCurrentFile] = useState(undefined);
    const imageRef = useRef("");
    const artworkNameRef = useRef("");
    const descriptionRef = useRef("");
    const nftMintWalletRef = useRef("");
    const nftMintCountRef = useRef("");
    const [artworkName, setArtworkName] = useState("");
    const [nftMintWallet, setNftMintWallet] = useState("");
    const [nftMintCount, setNftMintCount] = useState("");
    const [description, setDescription] = useState("");
    const [imageSrc, setImageSrc] = useState("");
    const [showLoading, setShowLoading] = useState(false);
    const {account, isConnectedWallet, networkId} = useSelector((store) => store.wallet);


    function fileImageThumbNailUpload(e) {
        setCurrentFile(e.target.files[0]);
        setImageSrc(URL.createObjectURL(e.target.files[0]));
        imageRef.current = URL.createObjectURL(e.target.files[0]);
    }

    async function handleArtworkName(e) {
        setArtworkName(e.target.value);
        artworkNameRef.current = e.target.value;
    }
    async function handleMintWallet(e) {
        setNftMintWallet(e.target.value);
        nftMintWalletRef.current = e.target.value;
    }
    async function handleMintCount(e) {
        setNftMintCount(e.target.value);
        nftMintCountRef.current = e.target.value;
    }
    async function handleDescription(e) {
        setDescription(e.target.value);
        descriptionRef.current = e.target.value;
    }

    const handleMintNft = async () => {

        if (currentFile === undefined || artworkName === '' || description === '') {
            alert("Please enter values");
            return;
        }

        let formData = new FormData();
        formData.append("image", currentFile);
        formData.append("name", artworkName);
        formData.append("description", description);

        const config = {
            headers: {
                "content-type": "multipart/form-data",
            },
        };
        try {
            setShowLoading(true);
            const res = await axios.post("http://3.34.127.20:8080/api/nft/generateMetadata", formData, config);
            console.log(res);
            const ipfsUrl = res.data.data.metadata;
            console.log(ipfsUrl);
            const provider = window['ethereum'];
            const web3 = new Web3(provider);
            const contractERC1155 = new web3.eth.Contract(ERC1155, contracts["erc1155_contract"][networkId]);
            console.log(contractERC1155)
            // iltimos code yozganda e'tibor bn yozing, bu sizzi ishiz man yordam qilyapman tushunmagan joyizga
            const gasLimitMint = await contractERC1155.methods.mint(nftMintWallet, nftMintCount, ipfsUrl).estimateGas({
                from: account
            });
            console.log(gasLimitMint);
            const result = await contractERC1155.methods.mint(nftMintWallet, nftMintCount, ipfsUrl)
                .send({
                    from: account,
                    gas: gasLimitMint
                });
            console.log(result);
            setShowLoading(false);
            onClick(2);
        } catch (e) {
            alert(e);
            setShowLoading(false);
        }

    };

    return (
        <>
            <div className="container">
                <div className="row mint_nft_box ">

                    <div className="col-md-4 mt-3 mb-20">
                        <div className="upload_box_area">
                            <div className="img_wrapper">
                                {imageSrc.length === 0 && (
                                    <div>
                                        <div className="upload_file">
                                            <div className="add_file_img text-center">
                                                <img src={UploadPhoto} alt=""/>
                                                <p className="add_file_img_text">
                                                    <b> 이미지 업로드 </b>
                                                </p>
                                            </div>
                                        </div>

                                        <input
                                            type="file"
                                            title="Upload Artwork"
                                            accept="image/*"
                                            onChange={(e) => fileImageThumbNailUpload(e)}
                                        />
                                    </div>
                                )}
                            </div>

                            {imageSrc.length !== 0 && (
                                <div onClick={() => setImageSrc("")} className="upload_file ">
                                    <div className="upload_file_size">
                                        <img src={imageSrc} alt="" className="add_file_img"/>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-md-7 mt-3">
                        <div className="detail_field">
                            <div className="detail_label">NFT 발행 체인</div>
                            <div>
                                <input type="text" disabled={true} value={getNetworkName(networkId) === "polygon"
                                && "롤리곤 체인" || getNetworkName(networkId) === "ethereum" && "이더리움 체인" || getNetworkName(networkId) === "klaytn" && "클레이튼 체인"
                                }
                                       className="detail_block"/>
                            </div>
                        </div>
                        <div className="detail_field">
                            <div className="detail_label">NFT 발행 이름</div>
                            <div>
                                <input type="text" className="detail_block" onChange={handleArtworkName }/>
                            </div>
                        </div>
                        <div className="detail_field">
                            <div className="detail_label">NFT 발행 지갑</div>
                            <div>
                                <input type="text" className="detail_block" onChange={handleMintWallet}/>
                            </div>
                        </div>
                        <div className="detail_field">
                            <div className="detail_label">NFT 개수</div>
                            <div>
                                <input type="text" className="detail_block" onChange={handleMintCount}/>
                            </div>
                        </div>
                        <div className="detail_field">
                            <div className="detail_label">NFT 발행 설명</div>
                            <div>
                <textarea
                    onChange={handleDescription}
                    type="text"
                    rows="4"
                    cols="50"
                    className="detail_textarea"
                />
                            </div>
                        </div>
                        <div>
                            <button
                                className="red_classic_btn ml-auto"
                                onClick={() => handleMintNft()}
                            >
                                발행하기
                            </button>
                        </div>
                    </div>
                    <div className="text-right mt-5 col-lg-12">
                        <img src={MintBoxLogo} alt=""/>
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

export default MintNft;
