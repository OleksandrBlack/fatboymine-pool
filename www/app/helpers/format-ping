import Ember from 'ember';
var p = new Ping();

export function startPing(address, selector) {
  p.ping(address, function(err, data) {
    if (err) {
      data = data + " " + err;
    }
    
    document.getElementById(selector).innerHTML = data;
  });
}


export function startPingHelper(args) {
  var address = args[0];
  var selector = args[1];
  
	return startPing(address, selector);
}

export default Ember.Helper.helper(startPingHelper);