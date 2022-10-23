export const GOOGLE_CLIENT_ID = "602155554954-8dack63147koi2leh25errst3abli8n9.apps.googleusercontent.com"
export const GOOGLE_CLIENT_SECRET = "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"

export const KAKAO_CLIENT_ID = "c7b06b05735fdb561d0678761b7314cc"
export const KAKAO_CLIENT_SECRET = "cKtJUmqIV3yFK5bRmlVU4A57bpl7ceZ2"

export const NAVER_CLIENT_ID = "2fgItflhMjYZxG6dSw04"
export const NAVER_CLIENT_SECRET = "PypLvAiU6Z"

//자신이 설정한 redirect_uri의 공통된 부분
export const OAUTH_REDIRECT_URI = "http://localhost:3000/auth/"

//구글에서는 scope를 email, profile로 설정 (token 바로 받아온다)
export const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/auth?client_id=" + GOOGLE_CLIENT_ID +
    "&redirect_uri=" + OAUTH_REDIRECT_URI + "google" +
    "&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile" +
    "&response_type=token" +
    "&include_granted_scopes=true"

//카카오에서는 response_type을 코드로 하여 보안코드를 먼저 받아왔다.
export const KAKAO_AUTH_URL = "https://kauth.kakao.com/oauth/authorize?client_id=" + KAKAO_CLIENT_ID +
    "&redirect_uri=" + OAUTH_REDIRECT_URI + "kakao" +
    "&response_type=code" +
    "&scope=profile_nickname,profile_image,account_email,gender"

export const KAKAO_TOKEN_URL = "https://kauth.kakao.com/oauth/token?client_id=" + KAKAO_CLIENT_ID +
    "&client_secret=" + KAKAO_CLIENT_SECRET +
    "&redirect_uri=" + OAUTH_REDIRECT_URI + "kakao" +
    "&grant_type=authorization_code" +
    "&code="

//네이버에서도 프론트엔드에서 토큰을 받는 것이 불가능했기에 response_type을 토큰으로 해서 먼저 가져왔다.
export const NAVER_AUTH_URL = "https://nid.naver.com/oauth2.0/authorize?client_id=" + NAVER_CLIENT_ID +
    "&redirect_uri=" + OAUTH_REDIRECT_URI + "naver" +
    "&response_type=token" +
    "&state=state"

export const NAVER_TOKEN_URL = "https://nid.naver.com/oauth2.0/token?client_id=" + NAVER_CLIENT_ID +
    "&client_secret=" + NAVER_CLIENT_SECRET +
    "&redirect_uri=" + OAUTH_REDIRECT_URI + "naver" +
    "&grant_type=authorization_code" +
    "&code="