import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('account', { path: '/account/:login' }, function() {
    this.route('payouts');
    this.route('rewards');
  });
  this.route('not-found');

  this.route('blocks', function() {
    this.route('mature');
    this.route('immature');
    this.route('pending');
  });

  this.route('help', function() {
    this.route('getwork');
    this.route('nice');
  });
  
  this.route('help-ru', function() {
    this.route('getwork-ru');
    this.route('nice-ru');
  });

  this.route('help-ua', function() {
    this.route('getwork-ua');
    this.route('nice-ua');
  });
  
  this.route('payments');
  this.route('miners');
  this.route('about');
  this.route('about-ru');
  this.route('about-ua');
});

export default Router;
