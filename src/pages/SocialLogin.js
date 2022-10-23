import {useDispatch} from "react-redux";
import {useEffect} from "react";
import axios from "axios";
import {KAKAO_TOKEN_URL} from "../utils/constants";
import {POST} from "../utils/api";

function SocialLogin(props) {

    const socialName = props.match.params.social
    //해당부분은 response_type을 어떤걸로 했느냐에 따라서 달라졌다.
    var params = socialName === "google" ? props.history.location.hash.substring(1) : socialName === "kakao" ? props.history.location.search.substring(1) : props.history.location.hash.substring(1)

    const dispatch = useDispatch()

    useEffect(() => {
        getAccessToken(params)
    }, [params])

    const getAccessToken = async (params) => {
        if (socialName === "google") {
            params = params.split("&")
            var param = new Array()
            var key, value
            for (var i = 0; i < params.length; i++) {
                key = params[i].split("=")[0]
                value = params[i].split("=")[1]
                param[key] = value
            }

            const access_token = param["access_token"];
            const {data} = await POST('/auth/v1/user/socialLogin', {socialName, access_token})
            console.log(data)

        } else if (socialName === "kakao") {
            const res = await axios.post(KAKAO_TOKEN_URL + params.substring(5));
            console.log(res);
            const access_token = res.data.access_token;
            const {data} = await POST('/auth/v1/user/socialLogin', {socialName, access_token})
            console.log(data)

        } else if (socialName === "naver") {
            params = params.split("&")
            var param = new Array()
            var key, value
            for (var i = 0; i < params.length; i++) {
                key = params[i].split("=")[0]
                value = params[i].split("=")[1]
                param[key] = value
            }
            const access_token = param["access_token"];
            const {data} = await POST('/auth/v1/user/socialLogin', {socialName, access_token})
            console.log(data)

        }
    }
    return (
        <div>

        </div>
    )
}

export default SocialLogin