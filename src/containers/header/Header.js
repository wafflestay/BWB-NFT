import React, {useState, useEffect, useRef} from 'react'
import {Link, useNavigate} from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Navbar from 'react-bootstrap/Navbar'
import {useWeb3React} from "@web3-react/core";
import {formatEther} from '@ethersproject/units'
import {injected} from "../../pages/game/connectors";
import Logo from '../../assets/images/logo.svg'
import TemporaryLogo from '../../assets/images/temporary_logo.svg'
import Web3 from "web3";
import LogoMetamask from '../../assets/images/metamask_icon_001.svg'
import {useSelector} from "react-redux";

function Header(props) {
    const [loadingModal, setLoadingModal] = useState(false);

    const {account, isConnectedWallet} = useSelector((store) => store.wallet);
    useEffect(() => {
        console.log(account)
    }, [account]);

    function logout() {
        props.handleLogout();
    }

    return (
        <>

            <nav className="sticky navbar fixed-top navbar-expand-lg navbar-dark fade_down_effect">
                <div className="container-fluid nav-container">
                    <div className="navbar_logo">
                        <Link to="/">
                            <img src={Logo} alt=""/>
                        </Link>
                    </div>
                    <button className="navbar-toggler box-shadow-none navbar-light" type="button"
                            data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                            aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Navbar.Collapse id="navbarNavAltMarkup">
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">

                            <ul className="navbar-nav m-auto">
                                <div className="d-lg-flex align-items-center">

                                    <li className="nav-item">
                                        <Link className="nav-link" to="/">Game</Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link className="nav-link" to="/withdrawal-funds">Swap</Link>
                                    </li>


                                </div>
                            </ul>


                        </div>
                    </Navbar.Collapse>
                    {/*className={  gameNumbber ===1 ? 'select_game_image_block_active' : 'select_game_image_block'}*/}
                    <div className={isConnectedWallet ? 'user_address' : 'd-none'}>
                        <div className="user_address_img">
                            <img src={LogoMetamask} alt=""/>
                        </div>
                        {account}
                    </div>
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </nav>
            <Modal
                {...props}
                size="cd"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={loadingModal}
                onHide={() => setLoadingModal(false)}
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
    )
}

export default Header