/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'fatboymine-pool',
    environment: environment,
    rootURL: '/',
    locationType: 'hash',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
		
      COIN: 'PIRL',
      CoinName: 'Pirl',		
      // API host and port
      ApiUrl: '//pirl.fatboymine.com/',

      // HTTP mining endpoint
      HttpHost: 'http://pirl.fatboymine.com',
      HttpPort2b: 9100,
	  HttpPort4b: 9101,
	  HttpPort9b: 9102,

      // Stratum mining endpoint
      StratumHost: 'pirl.fatboymine.com',
      StratumPort2b: 8100,
	  StratumPort4b: 8101,
	  StratumPort9b: 8102,

      // Fee and payout details
      PoolFee: '1%',
      PayoutThreshold: '0.05 PIRL',
	  PayoutInterval: '2m',
      Unit: 'PIRL',
      EtherUnit: 'PIRL',

      // For network hashrate (change for your favourite fork)
	  BlockReward: 10,
      BlockTime: 14.67
    }
  };

  if (environment === 'development') {
    /* Override ApiUrl just for development, while you are customizing
      frontend markup and css theme on your workstation.
    */
    ENV.APP.ApiUrl = 'http://localhost:8080/'
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
