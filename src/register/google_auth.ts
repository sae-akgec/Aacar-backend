import * as googleAuth from 'google-auth-library';
import { Credentials } from 'google-auth-library/build/src/auth/credentials';

import * as config from '../../config.js';

const scope: string = 'https://mail.google.com/';
const code: string = config.token;

export const credentials = {
	"web": {
		"client_id": config.clientID,
		"project_id": config.projectID,
		"auth_uri": "https://accounts.google.com/o/oauth2/auth",
		"token_uri": "https://oauth2.googleapis.com/token",
		"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
		"client_secret": config.clientSecret,
		"redirect_uris": ["https://localhost:3000"],
		"javascript_origins": ["https://localhost:3000"]
	}
}

export function getAuthorizeUrl(callback: (err: any, url: string) => any): void {
	const oauth2Client = new googleAuth.OAuth2Client(credentials.web.client_id, credentials.web.client_secret, credentials.web.redirect_uris[0]);

	const authUrl = oauth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: scope
	});

	callback(null, authUrl);
}

export function getAccessToken(callback: (err: any, token?: Credentials | null) => any): void {
	const oauth2Client = new googleAuth.OAuth2Client(credentials.web.client_id, credentials.web.client_secret, credentials.web.redirect_uris[0]);

	oauth2Client.getToken(code, (err, token) => {
		if (err) return console.log(err);

		callback(null, token);
	});
}

export const tokens: Credentials = {
	access_token: config.accessToken,
	token_type: 'Bearer',
	refresh_token: config.refreshToken,
	expiry_date: config.expiryDate
};