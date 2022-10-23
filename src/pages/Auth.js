import {GOOGLE_AUTH_URL, KAKAO_AUTH_URL, NAVER_AUTH_URL} from "../utils/constants";

function Auth() {

    return (
        <div className="auth_social_buttons">
            <button className="auth_social_button" style={{backgroundColor:"#3266cf"}}>
                <a href={GOOGLE_AUTH_URL}>
                    <div style={{color:"white"}}>
                        Continue with GOOGLE
                    </div>
                    <div className="auth_social_button_image">
                        {/*<img src={google} alt="" />*/}
                    </div>
                </a>
            </button>
            <button className="auth_social_button" style={{backgroundColor:"#F5DA0C"}}>
                <a href={KAKAO_AUTH_URL}>
                    <div style={{color:"#2E1413"}}>
                        Continue with KAKAO
                    </div>
                    <div className="auth_social_button_image" style={{border:"2px solid #2E1413"}}>
                        {/*<img src={kakao} alt="" />*/}
                    </div>
                </a>
            </button>
            <button className="auth_social_button" style={{backgroundColor:"#1AC049"}}>
                <a href={NAVER_AUTH_URL} style={{color:"white"}}>
                    <div>
                        Continue with NAVER
                    </div>
                    <div className="auth_social_button_image" style={{border:"2px solid white"}}>
                        {/*<img src={naver} alt="" />*/}
                    </div>
                </a>
            </button>
        </div>
    )
}

export default Auth