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
		
      COIN: 'ETH',
      CoinName: 'Ethereum',		
      // API host and port
      ApiUrl: '//eth.fatboymine.com/',

      // HTTP mining endpoint
      HttpHost: 'http://eth.fatboymine.com',
      2bHttpPort: 8888,
	  4bHttpPort: 8899,
	  9bHttpPort: 9999,

      // Stratum mining endpoint
      StratumHost: 'eth.fatboymine.com',
      2bStratumPort: 8008,
	  4bStratumPort: 8009,
	  9bStratumPort: 9009,

      // Fee and payout details
      PoolFee: '0.75%',
      PayoutThreshold: '0.05 ETH',

      // For network hashrate (change for your favourite fork)
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
