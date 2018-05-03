interface AuthConfig {
    clientID: string;
    domain: string;
    callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
    clientID: 'ZZPIa2gbVJpsHn_CeNDGbymjaw3ukR05',
    domain: 'dcecilia.auth0.com',
    callbackURL: 'http://localhost:4200/callback'
};

// clientID: 'ZZPIa2gbVJpsHn_CeNDGbymjaw3ukR05',
//     domain: 'dcecilia.auth0.com',
//     responseType: 'token id_token',
//     audience: 'https://dcecilia.auth0.com/userinfo',
//     redirectUri: 'http://localhost:3000/callback',
//     scope: 'openid'
