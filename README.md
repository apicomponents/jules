# jules

Query and manipulate JSON using JSON Pointer.

# Usage

## pretty print file

    $ jules location.json /
    {
      "city": "Boulder",
      "state": "CO"
    }
    
## get a node

    $ jules location.json /city
    Boulder
    $ jules location.json /city get
    Boulder

When a node contains a string, just the contents will be shown, with a newline added. To get the JSON form of the string:

    $ jules location.json /city get-json
    "Boulder"

## set a node

    $ jules location.json /
    {
      "city": "Boulder",
      "state": "CO"
    }

Update an existing node with `set`:

    $ jules location.json /city set Denver
    $ jules location.json /
    {
      "city": "Denver",
      "state": "CO"
    }

Add a new node with `set`:

    $ jules location.json /state set CO
    $ jules location.json /country set US
    $ jules location.json /
    {
      "city": "Denver",
      "state": "CO",
      "country": "US"
    }

To use the argument as a string when it's valid JSON, use set-str:

    $ jules example.json
    {}
    $ jules example.json foo set []
    {
      "foo": []
    }
    $ jules example.json bar set-str []
    {
      "foo": [],
      "bar": "[]"
    }

## edit a node

To open part or all of the document in an editor, use the *edit* command:

    $ jules location.json / edit
    $ jules location.json /city edit

If it's a string, the string data will be shown in the editor. When it is saved, the last newline will be omitted.

To edit a string as JSON, rather than the JSON string at a node:

    $ jules location.json /city edit-json

To save the modified data as a string, even if it's valid JSON:

    $ jules location.json /city edit-str

## move a node

    $ jules location.json /state mv /province

## remove a node

    $ jules location.json /
    {
      "city": "Boulder",
      "state": "CO"
    }

The `rm` command removes the selected node (much like jQuery):

    $ jules location.json /state rm
    $ jules location.json
    {
      "city": "Denver"
    }

## add elements to an array

    $ jules blog-entry.json /
    {
      "title": "Ralph Waldo Emerson quote",
      "body": "A foolish consistency is the hobgoblin of little minds",
      "tags": ["consistency"]
    }
    $ jules blog-entry.json /tags
    ["consistency"]

Use the `append` command to append to an array node:

    $ jules blog-entry.json /tags append opinions
    $ jules blog-entry.json /tags
    ["consistency", "opinions"]

If you give muliple values, multiple values will be appended:

    $ jules blog-entry.json /tags append minds foolish
    $ jules blog-entry.json /tags
    ["consistency", "opinions", "minds", "foolish"]

To insert in a certain position, use `insert` with the index before the value(s):

    $ jules blog-entry.json /tags insert 0 quote
    $ jules blog-entry.json /tags
    ["quote", "consistency", "opinions", "minds", "foolish"]

## wrap a value in an object, and unwrap

## wrap a value in an array, and unwrap

## convert an array to an object

## convert an object to an array

# Design Principles

* Edits files in place. Make sure you're using version control.
