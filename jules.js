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
  }
};
