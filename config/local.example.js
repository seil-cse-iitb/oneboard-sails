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

  security: {
    cors: {
      allRoutes: true,
      allowOrigins: ['http://localhost:4200'],
      allowCredentials: false,
      allowRequestHeaders: ['*'],
      allowResponseHeaders: ['*']
    },
  },
  baseUrl: "http://localhost:1337",
  datastores: {
    default: {
      url: 'mysql://oneboard:password@mysql.seil.cse.iitb.ac.in:3306/oneboard',
    }
  },
  mqtt: {
    broker: 'mqtt://mqtt.seil.cse.iitb.ac.in',
  },
  saltRounds:10,
};