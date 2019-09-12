var CONFIG = {
  "BACKEND_DOMAIN": window.location.host + window.location.pathname,
  "IITBSSO": {
    name: 'iitbsso',
    url: window.location.origin + window.location.pathname + 'auth/iitbsso/callback/',
    clientId: 'aNU4hoiX5bdH0XMisOhZVa92CSKfEHio0lqGDBs3',
    redirectUri: window.location.origin + window.location.pathname,
    authorizationEndpoint: 'https://gymkhana.iitb.ac.in/sso/oauth/authorize',
    optionalUrlParams: ['scope'],
    scope: ['ldap'],
    scopePrefix: '',
    scopeDelimiter: ' '
  },
  "muRon":{
    host:"http://10.129.149.33",
    port:"8766"
  }
}
io.sails.url = 'http://' + CONFIG.BACKEND_DOMAIN;
io.sails.transports = ['websocket'];
io.sails.autoConnect = true;