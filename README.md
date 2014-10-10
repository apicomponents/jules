# jules
[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/benatkin/jules?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Query and manipulate JSON using the command line.

# Usage

## pretty print file

    $ jules get location.json
    {
      "city": "Boulder",
      "state": "CO"
    }
    
## get a node

    $ jules get location.json city
    Boulder

When a node contains a string, just the contents will be shown, with a newline added.
To get the JSON form of a string, use the `-j` flag:

    $ jules get -j location.json city
    "Boulder"

## put a node

Since `jules` is being designed for web developers it uses HTTP concepts. To replace
a node with some content, use `put`:

    $ jules location.json . put '{"city": "Boulder", "state": "CO"}'

Update an existing node with `put`:

    $ jules location.json put city Denver
    $ jules location.json get
    {
      "city": "Denver",
      "state": "CO"
    }

Add a new node with `put`:

    $ jules location.json put country US
    $ jules location.json get
    {
      "city": "Denver",
      "state": "CO",
      "country": "US"
    }

To use the argument as a string when it's valid JSON, use `-s`:

    $ jules example.json get .
    {}
    $ jules example.json bar put -s []
    {
      "foo": [],
      "bar": "[]"
    }

## edit a node

To open part or all of the document in an editor, use the *edit* command:

    $ jules location.json edit
    $ jules location.json edit city

If it's a string, the string data will be shown in the editor. When it is saved, the last newline will be omitted.

To edit a string as JSON, rather than the JSON string at a node:

    $ jules location.json edit -j city

To save the modified data as a string, even if it's valid JSON:

    $ jules location.json edit -s /city

## move a node

    jules mv <src-file> <src-ref> <dest-ref>

    $ jules mv location.json state province

## remove a node

The `rm` command removes the selected node:

    $ jules rm location.json state
    $ jules get location.json
    {
      "city": "Denver"
    }

## add elements to an array

    $ jules get blog-entry.json
    {
      "title": "Ralph Waldo Emerson quote",
      "body": "A foolish consistency is the hobgoblin of little minds",
      "tags": ["consistency"]
    }

Use the `push` command to append to an array node:

    $ jules push blog-entry.json tags opinions
    $ jules get blog-entry.json tags
    ["consistency", "opinions"]

If you give muliple values, multiple values will be appended:

    $ jules push blog-entry.json tags minds foolish
    $ jules get blog-entry.json tags
    ["consistency", "opinions", "minds", "foolish"]

To insert in a certain position, use `insert` with the index before the value(s):

    $ jules insert blog-entry.json tags 0 quote
    $ jules get blog-entry.json tags
    ["quote", "consistency", "opinions", "minds", "foolish"]

To add at a certain position, use `unshift`:

    $ jules unshift blog-entry.json tags hobgoblin
    $ jules unshift blog-entry.json tags
    ["hobgoblin", "quote", "consistency", "opinions", "minds", "foolish"]

## wrap a value in an object, and unwrap

## wrap a value in an array, and unwrap

## convert an array to an object

## convert an object to an array

# Design Principles

* Edits files in place. Make sure you're using version control.
