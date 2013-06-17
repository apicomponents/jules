module.exports = {
  "build": function() {
    this.targets.package.build();
    this.targets.bin.build();
  },
  "run": function() {
    console.log('Hello, world.');
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
