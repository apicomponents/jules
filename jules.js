module.exports = {
  "build": function() {
    this.targets.package.build();
    this.targets.bin.build();
  },
  "run": function() {
    var args = process.argv.slice(2);

    if (args.length < 1) {
      console.log('Usage: jules file [command] [path] [args...]');
      process.exit();
    }
    var file = args[0];

    var command_name;
    if (args.length < 2) {
      command_name = 'get';
    } else {
      command_name = args[1];
    }

    var command = this.commands[command_name];
    if (typeof command === 'object' && command !== null) {
      command.file = file;
      var before = command.before;
      if (typeof before == "string") {
        before = this.helpers[before];
      }
      if (before) {
        if (before.length == 1) {
          before.call(command, runCommand);
        } else {
          before.call(command);
          runCommand();
        }
      }

      function runCommand() {
        command.run();
      }
    } else {
      console.error('The command ' + JSON.stringify(command_name) + ' is not supported.');
      process.exit();
    }
  },
  "helpers": {
    "readFile": function(done) {
      var that = this;
      require('fs').readFile(this.file, 'utf8', function(err, data) {
        if (err) throw err;
        that.data = JSON.parse(data);
        done();
      });
    }
  },
  "commands": {
    "get": {
      "usage": "jules file get [path]",
      "before": "readFile",
      "run": function() {
        console.log(JSON.stringify(this.data, null, 2));
      }
    }
  },
  "targets": {
    "bin": {
      "src": [
        "#!/usr/bin/env node",
        "require('./jules').run();"
      ],
      "build": function() {
        require('fs').writeFile('./bin.js', this.src.join("\n") + "\n", 'utf8');
      }
    },
    "main": {
      "build": function() {
      }
    },
    "test": {
      "run": function() {
      }
    },
    "package": {
      "data": {
        "name": "jules",
        "version": "0.0.0",
        "description": "json manipulation tool",
        "main": "jules.js",
        "bin": "bin.js",
        "dependencies": {},
        "scripts": {
          "build": "node -e \"require('./jules').build()\"",
          "test": "node -e \"require('./jules').targets.test.run()\""
        },
        "repository": {
          "type": "git",
          "url": "git@github.com:benatkin/jules.git"
        },
        "keywords": [
          "json",
          "manipulation",
          "editor"
        ],
        "author": "Ben Atkin",
        "license": "MIT"
      },
      "build": function() {
        require('fs').writeFile('./package.json', JSON.stringify(this.data, null, 2) + "\n", 'utf8');
      }
    }
  }
};
