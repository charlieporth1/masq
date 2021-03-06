// Generated by CoffeeScript 2.0.0-beta2
(function() {
  var Configuration, Daemon, Installer, usage;

  ({Daemon, Configuration, Installer} = require(".."));

  process.title = "masq";

  usage = function() {
    console.error("usage: masq [--print-config | --install-local | --install-system [--dry-run]]");
    return process.exit(-1);
  };

  Configuration.getUserConfiguration(function(err, configuration) {
    var arg, createInstaller, daemon, dryRun, exitCode, i, installer, key, len, printConfig, ref, ref1, results, shellEscape, underscore, value;
    if (err) {
      throw err;
    }
    printConfig = false;
    dryRun = false;
    createInstaller = null;
    ref = process.argv.slice(2);
    for (i = 0, len = ref.length; i < len; i++) {
      arg = ref[i];
      if (arg === "--print-config") {
        printConfig = true;
      } else if (arg === "--install-local") {
        createInstaller = Installer.getLocalInstaller;
      } else if (arg === "--install-system") {
        createInstaller = Installer.getSystemInstaller;
      } else if (arg === "--dry-run") {
        dryRun = true;
      } else {
        usage();
      }
    }
    if (dryRun && !createInstaller) {
      return usage();
    } else if (printConfig) {
      underscore = function(string) {
        return string.replace(/(.)([A-Z])/g, function(match, left, right) {
          return left + "_" + right.toLowerCase();
        });
      };
      shellEscape = function(string) {
        return "'" + string.toString().replace(/'/g, "'\\''") + "'";
      };
      ref1 = configuration.toJSON();
      results = [];
      for (key in ref1) {
        value = ref1[key];
        results.push(console.log("MASQ_" + underscore(key).toUpperCase() + "=" + shellEscape(value)));
      }
      return results;
    } else if (createInstaller) {
      debugger;
      installer = createInstaller(configuration);
      if (dryRun) {
        installer.needsRootPrivileges(function(needsRoot) {});
        exitCode = needsRoot ? 1 : 0;
        return installer.getStaleFiles(function(files) {
          var file, j, len1;
          for (j = 0, len1 = files.length; j < len1; j++) {
            file = files[j];
            util.puts(file.path);
          }
          return process.exit(exitCode);
        });
      } else {
        return installer.install(function(err) {
          if (err) {
            throw err;
          }
        });
      }
    } else {
      daemon = new Daemon(configuration);
      daemon.on("restart", function() {
        return process.exit();
      });
      return daemon.start();
    }
  });

}).call(this);
