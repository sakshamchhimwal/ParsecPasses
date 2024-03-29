import { config } from 'dotenv';
config();

function getGoogleOAuthURL() {
    const rootUrl = "https://accounts.google.com/o/oauth2/auth";

    const options = {
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        client_id: process.env.GOOGLE_CLIENT_ID,
        access_type: "offline",
        response_type: "code",
        prompt: "consent",
        scope: [
            "https://www.googleapis.com/auth/userinfo.email",
        ].join(" "),
    };

    const qs = new URLSearchParams(options);

    return `${rootUrl}?${qs.toString()}`;
}

export default getGoogleOAuthURL;