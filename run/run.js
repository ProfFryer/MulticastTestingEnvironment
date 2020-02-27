// NODEjs routines for setting up the firewalls between nodes
// (C) 2019 Sam Fryer 

const http = require("http");
var url = require('url');
const exec = require('child_process').execSync;

// Unblock a given IP.  Note that if the rule doesn't exist, it's OK.
function unblock(ip) {
  var msg = 'error';
  var cmd = 'iptables -D INPUT -i eth0 -s '+ip+' -j DROP';
  console.log('Running: ' + cmd + '\n');
  msg = exec(cmd);
  return msg;
}

// Block a given IP.  Should only be called once
// or call unblock the same number of times that you called this!
function block(ip) {
  var msg = 'error';
  var cmd = 'iptables -A INPUT -i eth0 -s '+ip+' -j DROP';
  console.log('Running: ' + cmd + '\n');
  msg = exec(cmd);
  return msg + '\n';
}

// Block a percentage of packets coming in.  Should only be called once
// or call unindrop the same number of times that you called this!
function indrop(percentage) {
  var msg = 'error';
  var cmd = 'iptables -A INPUT -i eth0 -m statistic --mode random --probability '+percentage+' -j DROP';
  console.log('Running: ' + cmd + '\n');
  msg = exec(cmd);
  return msg + '\n';
}

// Undo the percentage drop.  Should be called the same number of times that you called indrop!
function unindrop(percentage) {
  var msg = 'error';
  var cmd = 'iptables -D INPUT -i eth0 -m statistic --mode random --probability '+percentage+' -j DROP';
  console.log('Running: ' + cmd + '\n');
  msg = exec(cmd);
  return msg + '\n';
}

// Configure our HTTP server running on port 8080
// The url will be something like http://172.18.0.21:8080/?unblock=172.18.0.23
var server = http.createServer(function (request, response) {
  var queryData = url.parse(request.url, true).query;
  response.writeHead(200, {"Content-Type": "text/plain"});

  try {
    // find and block any requested IPs
    if (queryData.block) {
      var blocktype = typeof queryData.block;
      // Have to check if it's only one or many
      if (blocktype === 'string') {
        var bret = block(queryData.block);  
        response.write('Results: '+bret);
        response.write('GoodBye ' + queryData.block + '\n');
      } 
      else {
        for (let ip of queryData.block) {
          var bret = block(ip);  
          response.write('Results: '+bret);
          response.write('GoodBye ' + ip + '\n');
        }
      }
    }

    // find and unblock any requested IPs
    if (queryData.unblock) {
      var blocktype = typeof queryData.unblock;
      if (blocktype === 'string') {
        var bret = unblock(queryData.unblock);  
        response.write('Results: '+bret);
        response.write('Hello ' + queryData.unblock + '\n');
      } 
      else {
        for (let ip of queryData.unblock) {
          var bret = block(ip);  
          response.write('Results: '+bret);
          response.write('Hello ' + ip + '\n');
        }
      }
    }

    // find and block any requested IPs
    if (queryData.indrop) {
      var droptype = typeof queryData.indrop;

      // Have to check if it's only one or many
      if ((droptype === 'string') || (droptype === 'number')){
        var bret = indrop(queryData.indrop);  
        response.write('Results: '+bret);
        response.write('Some incoming packets are dropped with probability p=' + queryData.indrop + ' \n');
      } 
      else {
        response.write('Error -- Only one drop command allowed! '+droptype);
      }
    }

    // find and block any requested IPs
    if (queryData.unindrop) {
      var droptype = typeof queryData.unindrop;

      // Have to check if it's only one or many
      if ((droptype === 'string') || (droptype === 'number')){
        var bret = unindrop(queryData.unindrop);  
        response.write('Results: '+bret);
        response.write('Stopped dropping incoming at p=' + queryData.unindrop + '\n');
      } 
      else {
        response.write('Error -- Only one undrop command allowed!');
      }
    }




  } catch (err) {
    response.write('Got Error!!!\n');
  }
  response.end('Finished!\n');
});

// Start listening!
server.listen(8080);
