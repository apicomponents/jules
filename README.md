# jules

Query and manipulate JSON using the command line.

## Usage

```
jules <command> [arguments...]
jules <file> [selector] [value]
```

`jules`, like `git`, is command-centric. The command is the first argument
and the way the rest of the arguments will be treated is determined by the
command. Named arguments (like `--no-pager`) are global, used by a single
command, or shared between multiple commands (but not all of them).

For [xtreme](http://cloudatlas.wikia.com/wiki/An_Orison_of_Sonmi-451)
convenience, there is a default command, used when a filename with an
extension is given as the first argument. This passes all the arguments to
the `getset` command.

## Commands

### get

```
get [selector]
```

Gets the value at *selector* and pretty-prints it. If the selector is
omitted, pretty-prints the whole document.

### set

```
set selector [value]
```

Sets the value at *selector*.

### getset

```
getset [selector] [value]
```

If a value is given, runs the `set` command. Otherwise, runs the `get`
command. The default command.

## Topics

### selector

The selector is a [jsone](https://github.com/benatkin/jsone) reference,
using dots and brackets.

### pretty-printing

Pretty-printing is done by `JSON.stringify` with two spaces for
indentation.

## LICENSE

[MIT](http://bat.mit-license.org/).
