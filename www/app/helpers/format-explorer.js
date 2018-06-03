import Ember from 'ember';

export function formatExplorer(params /*, hash*/) {
  var url = 'https://poseidon.pirl.io/explorer/';
  var type = params[0];
  var value = params[1];
  return url + type + '/' + value;
}

export default Ember.Helper.helper(formatExplorer);