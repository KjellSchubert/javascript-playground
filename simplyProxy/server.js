// This helps testing FD cases like FD-5751 by adding latency (and logging) to CDS traffic by going
// thru a local CDS proxy.
//
// To use this proxy with FD (and usually wireshark) do the following:
//   * npm install; node server.js
//   * in FD's ServerConnection.xml <add key="baseEndpoint" value="http://slave007:11023/cds" />
//     Verify your credentials work, you should see traffic in wireshark using filter "ip.addr == 192.168.128.188 and http"
//   * in FD's ServerConnection.xml <add key="baseEndpoint" value="http://localhost:8008/cds" />
//    This now delays & forwards all HTTP requests. Wireshark will still show the delayed requests.
// You can also test this with [curl localhost:8008] vs [curl http://slave007:11023]
//
// I'd rather have used https://github.com/nodejitsu/node-http-proxy but couldnt get it to work.

var latencyInMs = 5000;
var proxiedServer = "http://slave007:11023"; // works
//var proxiedServer = "https://desktop.mmodal.com:443"; // doesnt work, should work with node-http-proxy though
var localPort = 8008; // in FD's serverconnection.xml you put endpoint http://localhost:8008/cds

var bouncy = require('bouncy');
var moment = require('moment');
var requestCounter = 0;

function getFormattedTime() {
  return moment().format('h:mm:ss');
}

var server = bouncy(function(req, res, bounce) {
  var requestX = ++requestCounter;
  console.info(getFormattedTime() + " received request #" + requestX + " "  + req.method + " " + req.url);
  setTimeout(function() {
    console.info(getFormattedTime() + " forwarded request #" + requestX + " " + req.method + " " + req.url);

    if (req.url === "/CdsRedirect") {
		res.writeHead(200, {"Content-Type": "text/html"});
		res.end();
		return;
	}

    bounce(proxiedServer);
  }, latencyInMs);
});
server.listen(localPort);