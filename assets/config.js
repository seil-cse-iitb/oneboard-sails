var CONFIG={
    "BACKEND_DOMAIN": window.location.host,
    "IITBSSO":{
        name: 'iitbsso',
        url: window.location.origin + '/auth/iitbsso/callback',
        clientId: 'aNU4hoiX5bdH0XMisOhZVa92CSKfEHio0lqGDBs3',
        redirectUri: window.location.origin,
        authorizationEndpoint: 'https://gymkhana.iitb.ac.in/sso/oauth/authorize',
        optionalUrlParams: ['scope'],
        scope:['ldap'],
        scopePrefix:'',
        scopeDelimiter: ' '
      }
}
io.sails.url = 'http://'+CONFIG.BACKEND_DOMAIN;
io.sails.transports = ['websocket'];
io.sails.autoConnect = true;