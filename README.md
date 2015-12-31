# jules

Edit JSON using the command line and the EDITOR.

## Usage

`jules <command> [options] [arguments...]`

## Commands

### edit

```
jules edit [options] path jsonpath
```

Opens the editor to edit the contents of the node referenced by jsonpath. If
the file is saved, it updates the node. If not, the file is not modified.

Options:

`--string`

Places the contents of the node directly in the editor, without quotes. If it
is saved, saves it as a string. Remembers whether there was a newline at the
end of the string, and if there was not one, doesn't add a newline unless
it is saved with two newlines (since vim automatically adds a newline).

## LICENSE

[MIT](http://bat.mit-license.org/).
