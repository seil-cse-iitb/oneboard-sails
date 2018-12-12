/**
 * Local environment settings
 *
 * Use this file to specify configuration settings for use while developing
 * the app on your personal system.
 *
 * For more information, check out:
 * https://sailsjs.com/docs/concepts/configuration/the-local-js-file
 */

module.exports = {

  // Any configuration settings may be overridden below, whether it's built-in Sails
  // options or custom configuration specifically for your app (e.g. Stripe, Mailgun, etc.)
  
    // location heirarchy root path
    location_root:"location-heirarchy",
    security:{
      cors: {
        allRoutes: true,
        allowOrigins: ['http://localhost'],
        allowCredentials: false,
        allowRequestHeaders: ['*'],
        allowResponseHeaders: ['*']
      },
    },
    baseUrl:"http://seil.cse.iitb.ac.in/oneboard",
    permissions:{
      adminUsername : 'admin',
      adminEmail : 'admin@example.com',
      adminPassword : 'admin1234'
    },
    datastores:{
      default:{
        url: 'mysql://oneboard:password@mysql.seil.cse.iitb.ac.in:3306/oneboard',
      }
    },
    mqtt:{
    	broker : 'mqtt://mqtt.seil.cse.iitb.ac.in',
    }
};