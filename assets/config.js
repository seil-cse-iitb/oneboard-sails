var CONFIG={
    "BACKEND_DOMAIN": window.location.host,
}
io.sails.url = 'http://'+CONFIG.BACKEND_DOMAIN;
io.sails.transports = ['websocket'];
io.sails.autoConnect = true;