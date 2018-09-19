/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

module.exports.custom = {

  /**************************************************************************
  *                                                                         *
  * The base URL to use during development.                                 *
  *                                                                         *
  * • No trailing slash at the end                                          *
  * • `http://` or `https://` at the beginning.                             *
  *                                                                         *
  * > This is for use in custom logic that builds URLs.                     *
  * > It is particularly handy for building dynamic links in emails,        *
  * > but it can also be used for user-uploaded images, webhooks, etc.      *
  *                                                                         *
  **************************************************************************/
  baseUrl: 'http://10.129.149.33:1337',

  /**************************************************************************
  *                                                                         *
  * The TTL (time-to-live) for various sorts of tokens before they expire.  *
  *                                                                         *
  **************************************************************************/
  passwordResetTokenTTL: 24 * 60 * 60 * 1000,// 24 hours
  emailProofTokenTTL: 24 * 60 * 60 * 1000,// 24 hours

  /**************************************************************************
  *                                                                         *
  * The extended length that browsers should retain the session cookie      *
  * if "Remember Me" was checked while logging in.                          *
  *                                                                         *
  **************************************************************************/
  rememberMeCookieMaxAge: 30 * 24 * 60 * 60 * 1000, // 30 days

  /**************************************************************************
  *                                                                         *
  * Automated email configuration                                           *
  *                                                                         *
  * Sandbox Mailgun credentials for use during development, as well as any  *
  * other default settings related to "how" and "where" automated emails    *
  * are sent.                                                               *
  *                                                                         *
  * (https://app.mailgun.com/app/domains)                                   *
  *                                                                         *
  **************************************************************************/
  // mailgunDomain: 'sandboxaa1234fake678.mailgun.org',
  // mailgunSecret: 'key-fakeb183848139913858e8abd9a3',
  //--------------------------------------------------------------------------
  // /\  Configure these to enable support for automated emails.
  // ||  (Important for password recovery, verification, contact form, etc.)
  //--------------------------------------------------------------------------

  // The sender that all outgoing emails will appear to come from.
  fromEmailAddress: 'noreply@example.com',
  fromName: 'The SEIL Oneboard Team',

  // Email address for receiving support messages & other correspondences.
  internalEmailAddress: 'support+development@example.com',

  // Whether to require proof of email address ownership any time a new user
  // signs up, or when an existing user attempts to change their email address.
  verifyEmailAddresses: false,

  /**************************************************************************
  *                                                                         *
  * Billing & payments configuration                                        *
  *                                                                         *
  * (https://dashboard.stripe.com/account/apikeys)                          *
  *                                                                         *
  **************************************************************************/
  // stripePublishableKey: 'pk_test_Zzd814nldl91104qor5911gjald',
  // stripeSecret: 'sk_test_Zzd814nldl91104qor5911gjald',
  //--------------------------------------------------------------------------
  // /\  Configure these to enable support for billing features.
  // ||  (Or if you don't need billing, feel free to remove them.)
  //--------------------------------------------------------------------------

  /***************************************************************************
  *                                                                          *
  * Any other custom config this Sails app should use during development.    *
  *                                                                          *
  ***************************************************************************/
  // Config options for auth using IITBSSO
  iitbsso: {
    name: 'iitbsso',
    clientId: 'aNU4hoiX5bdH0XMisOhZVa92CSKfEHio0lqGDBs3',
    clientSecret: 'FyH1kK6JwOETeC01uMX9gmxb88yYJpLGqYfVHMzMicnkqdgJdnSvhpQcnQLSaAvxGp5UmQIqBJPW5ytXtIkDBbNG8woILrKvKqK1YK264PtX88adWJ574aWhK7WHhLvH',
    // redirectURI: this.baseUrl,
    authorizationURI: 'https://gymkhana.iitb.ac.in/sso/oauth/authorize',
    tokenURI: 'https://gymkhana.iitb.ac.in/sso/oauth/token/',
    userURI: 'https://gymkhana.iitb.ac.in/sso/user/api/user/?fields=email,roll_number,username',
    scope: ['ldap']
  }

};
