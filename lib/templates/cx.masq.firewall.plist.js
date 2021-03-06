module.exports = function(__obj) {
  if (!__obj) __obj = {};
  var __out = [], __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  }, __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
  __safe = __obj.safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  if (!__escape) {
    __escape = __obj.escape = function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };
  }
  (function() {
    (function() {
      __out.push('<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">\n<plist version="1.0">\n<dict>\n        <key>Label</key>\n        <string>cx.masq.firewall</string>\n        <key>ProgramArguments</key>\n        <array>\n                <string>/bin/sh</string>\n                <string>-c</string>\n                <string>\n                  sysctl -w net.inet.ip.forwarding=1;\n                  echo "rdr pass proto tcp from any to any port {');
    
      __out.push(__sanitize(this.dstPort));
    
      __out.push(',');
    
      __out.push(__sanitize(this.httpPort));
    
      __out.push('} -> 127.0.0.1 port ');
    
      __out.push(__sanitize(this.httpPort));
    
      __out.push('" | pfctl -a "com.apple/250.MasqFirewall" -Ef -\n                </string>\n        </array>\n        <key>RunAtLoad</key>\n        <true/>\n        <key>UserName</key>\n        <string>root</string>\n</dict>\n</plist>\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}