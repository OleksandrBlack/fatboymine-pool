var p = new Ping();
var ua = "https://ella.fatboymine.com";
var ru = "https://esn.solopool.org";
var selector_ua = "ping-ua";
var selector_ru = "ping-ru";

function startPingUa(address, selector_ua) {
  p.ping(address, function(err, data) {
    if (err) {
      data = data + " " + err;
    }
    
    document.getElementById(selector_ua).innerHTML = data;
  });
}
function startPingRu(address, selector_ru) {
  p.ping(address, function(err, data) {
    if (err) {
      data = data + " " + err;
    }
    
    document.getElementById(selector_ru).innerHTML = data;
  });
}

startPingUa(ua, selector_ua);
startPingRu(ru, selector_ru);

setInterval(function() {
	startPingUa(ua, selector_ua);
	startPingRu(ru, selector_ru);
}, 10000);
