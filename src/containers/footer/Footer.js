import React from 'react'

import Logo from '../../assets/images/footer/logo.svg'

// icons

function Footer() {

	return (
		<>
			<footer className="footer">
				<div className="footer_content">
					<div className="container">
						<div className="d-flex justify-content-between align-items-center flex-wrap">
							<div className="d-flex align-items-center flex-wrap">
								<div className="footer_item">
									HOME
									<div className="footer_vertical_border"></div>
								</div>
								<div className="footer_item">
									WHO WEARE
									<div className="footer_vertical_border"></div>
								</div>
								<div className="footer_item">
									WHAT  WEDO
									<div className="footer_vertical_border"></div>
								</div>
								<div className="footer_item">
									SECURE NFT VERIFICATION
									<div className="footer_vertical_border"></div>
								</div>
								<div className="footer_item">
									OUR PARTNER
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="container pb-60">
					<div className="d-flex align-items-center">
						<div className="me-5">
							<img src={Logo} alt="" />
						</div>
						<div className="footer_text">
							LOCATION <br />
							SEOUL OFFICE: 502, 8, Gyeonggyojang-gil, Jongno-gu, Seoul, Korean <br /> <br />

							CONTACT <br />
							PartnerShip: admin@m95.co.kr│Sales: tommy@m95.co.kr
						</div>
					</div>
				</div>
			</footer>
		</>
	)
}

export default Footer