module.exports = {
  "targets": {
    "main": {
      "build": function() {
      }
    },
    "test": {
      "run": function() {
      }
    },
    "pkg": {
      "data": {
        "name": "jules",
        "version": "0.0.0",
        "description": "json manipulation tool",
        "main": "jules.js",
        "scripts": {
          "pkg": "node -e \"require('./jules').targets.pkg.build()\"",
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
        var fs = require('fs');
        fs.writeFile('./package.json', JSON.stringify(this.data, null, 2) + "\n", 'utf8');
      }
    }
  }
};
