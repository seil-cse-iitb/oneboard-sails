module.exports.mqtt = {
	_hookTimeout: 20000,
	// broker : 'mqtt://mqtt.seil.cse.iitb.ac.in',
	connect:{
		port : 1883	,
		clientId : 'oneboard_hook_mqtt_client',
		will:{
			topic:"server/disconnect",
			payload:JSON.stringify({msg:'i am off-line'}),
			qos:0,
			clean:true
		},
	},
	publishOption:{
		qos:0,
		retain : false,
		dup : false
	},
	subscribeOption:{
		qos:0
	},
	topics : [
		"data/+/temp/#",
		"data/+/dht/#"
	],
	handler : require('../mqtt/handler.js')
}
