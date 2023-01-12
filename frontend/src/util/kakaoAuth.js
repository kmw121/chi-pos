const CLIENT_ID = "07030fde952adb60be217a2ef0f85931";
const REDIRECT_URI = "http://chi-pos.com/oauth/callback/kakao";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
