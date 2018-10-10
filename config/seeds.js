/**
 * Sails Seed Settings
 * (sails.config.seeds)
 *
 * Configuration for the data seeding in Sails.
 *
 * For more information on configuration, check out:
 * http://github.com/frostme/sails-seed
 */
module.exports.seeds = {
    acl: {
      data: [
        {
          user_id: 'admin',
          location:  '/',
          action:   'admin'
        }
      ],
      unique: ['user_id', 'location', 'action']
    }
  }