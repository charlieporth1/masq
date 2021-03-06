// Generated by CoffeeScript 2.0.0-beta2
(function() {
  var DnsServer, NS_C_IN, NS_RCODE_NXDOMAIN, NS_T_A, dnsserver;

  dnsserver = require("dnsserver");

  NS_T_A = 1;

  NS_C_IN = 1;

  NS_RCODE_NXDOMAIN = 3;

  module.exports = DnsServer = class DnsServer extends dnsserver.Server {
    constructor(configuration) {
      super();
      this.configuration = configuration;
      this.on("request", this.handleRequest);
    }

    listen(port, callback) {
      this.bind(port);
      return typeof callback === "function" ? callback() : void 0;
    }

    handleRequest(req, res) {
      var pattern, q, ref;
      pattern = this.configuration.dnsDomainPattern;
      q = (ref = req.question) != null ? ref : {};
      if (q.type === NS_T_A && q.class === NS_C_IN && pattern.test(q.name)) {
        res.addRR(q.name, NS_T_A, NS_C_IN, 600, "127.0.0.1");
      } else {
        res.header.rcode = NS_RCODE_NXDOMAIN;
      }
      return res.send();
    }

  };

}).call(this);
