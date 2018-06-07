import Ember from 'ember';
var p = new Ping();
var site = "https://fatboymine.com";
var selector = "ping-pool";

export function startPing(address, selector) {
  p.ping(address, function(err, data) {
    if (err) {
      data = data + " " + err;
    }
    
    document.getElementById(selector).innerHTML = data;
  });
}


export function startPingHelper() {
  var address = arguments[0];
  var selector = arguments[1];
  
	return startPing(address, selector);
}

export default Ember.Helper.helper(startPingHelper);