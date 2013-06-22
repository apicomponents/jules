module.exports = {
  "build": function() {
    this.targets.package.build();
    this.targets.bin.build();
  },
  "usage": [
    'Usage: jules file.json /path command [args...]',
    '       jules file.json /path    (shows the data at path)',
    '       jules file.json          (shows the data at the root)',
    '',
    'The path is a json pointer. A forward slash by itself points to the root.',
    '',
    'To view a list of commands, run `jules help`.',
    'To view help about a specific command, run `jules help <command>`.'
  ],
  "run": function() {
    var args = process.argv.slice(2);

    if (args.length < 1) {
      console.log(this.usage.join("\n"));
      process.exit();
    }
    var file = args[0];

    var path;
    if (args.length < 2) {
      path = '/';
    } else {
      path = args[1];
    }

    var command_name;
    if (args.length < 3) {
      command_name = 'show';
    } else {
      command_name = args[2];
    }

    var command = this.commands[command_name];
    command.args = args.slice(3);
    if (typeof command === 'object' && command !== null) {
      command.file = file;
      command.path = path;

      var tasks = [], i;

      if (typeof command.validate == "function") {
        tasks.push(command.validate);
      }

      if (Array.isArray(command.before)) {
        for (i=0; i < command.before.length; i++) {
          tasks.push(command.before[i]);
        }
      } else if (typeof command.before == 'string' || typeof command.before == 'function') {
        tasks.push(command.before);
      }

      tasks.push(command.run);

      if (Array.isArray(command.after)) {
        for (i=0; i < command.after.length; i++) {
          tasks.push(command.after[i]);
        }
      } else if (typeof command.after == 'string' || typeof command.after == 'function') {
        tasks.push(command.after);
      }

      for (i=0; i < tasks.length; i++) {
        if (typeof tasks[i] == "string") {
          tasks[i] = this.helpers[tasks[i]];
        }
      }

      nextTask();

      function nextTask() {
        if (tasks.length == 0) return;

        var task = tasks.shift();
        if (task.length == 1) {
          task.call(command, nextTask);
        } else {
          task.call(command);
          nextTask();
        }
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
    },
    "writeFile": function(done) {
      require('fs').writeFile(this.file, JSON.stringify(this.data, null, 2) + "\n", function(err) {
        if (err) throw err;
        done();
      });
    },
    "parsePath": function() {
      var path = this.path[0] == '/' ? this.path.substring(1) : this.path;
      this.pathArray = path.length > 0 ? path.split("/") : [];
      for (var i=0; i < this.pathArray.length; i++) {
        this.pathArray[i] = decodeURIComponent(this.pathArray[i]);
      }
    },
    "getPath": function() {
      var node = this.data;
      for (var i=0; i < this.pathArray.length; i++) {
        if (node.hasOwnProperty(this.pathArray[i])) {
          node = node[this.pathArray[i]];
        } else {
          return;
        }
      }
      this.pathData = node;
    },
    "setPath": function() {
      var node = this.data;
      var pathArray = this.pathArray.slice();
      var key = '';
      while (pathArray.length > 0) {
        key = pathArray.shift();
        if (pathArray.length == 0) {
          node[key] = this.pathData;
          break;
        } else {
          if (typeof node[key] == 'undefined') {
            node[key] = {};
          } else if (typeof node[key] != 'object' || node[key] == null) {
            console.error('A non-object element already exists above the given path.');
            process.exit();
          }
          node = node[key];
        }
      }
    }
  },
  "commands": {
    "show": {
      "before": ["readFile", "parsePath", "getPath"],
      "run": function() {
        if (typeof this.pathData !== 'undefined') {
          console.log(JSON.stringify(this.pathData, null, 2));
        }
      }
    },
    "get": {
      "before": ["readFile", "parsePath", "getPath"],
      "run": function() {
        if (typeof this.pathData !== 'undefined') {
          console.log(JSON.stringify(this.pathData, null, 2));
        }
      }
    },
    "set": {
      "before": ["readFile", "parsePath", "getPath"],
      "after": ["setPath", "writeFile"],
      "validate": function() {
        if (this.args.length < 1) {
          var message = [
            'A path to the node must be provided.',
            '',
            'Usage: jules file.json /path/to/node set <data>'
          ];
          console.error(message.join("\n"));
          process.exit();
        }
      },
      "run": function() {
        var pathData;
        try {
          pathData = JSON.parse(this.args[0]);
        } catch (e) {
          pathData = this.args[0];
        }
        this.pathData = pathData;
      }
    },
    "keys": {
      "before": ["readFile", "parsePath", "getPath"],
      "run": function() {
        if (typeof this.pathData == 'object' && this.pathData !== null) {
          var keys = Object.keys(this.pathData);
          for (i=0; i < keys.length; i++) {
            console.log(keys[i]);
          }
        }
      }
    },
    "jkeys": {
      "before": ["readFile", "parsePath", "getPath"],
      "run": function() {
        if (typeof this.pathData == 'object' && this.pathData !== null) {
          var keys = Object.keys(this.pathData);
          for (i=0; i < keys.length; i++) {
            console.log(JSON.stringify(keys[i]));
          }
        }
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
