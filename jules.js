module.exports = {
  "command": {
    "argv": [],
    "arguments": {
      "command": "help",
      "file": null
    },
    "run": function() {
      this.argv = process.argv;
      if (this.argv.length >= 2) {
        this.arguments.file = argv[1];
      }
    }
  },
  "test": {
    "run": function() {
    }
  },
  "run": function() {
    console.log('hi!');
  },
  "package": {
    "data": {
      "name": "jules",
      "version": "0.0.0",
      "description": "json manipulation tool",
      "main": "jules.js",
      "scripts": {
        "test": "node test"
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
};
