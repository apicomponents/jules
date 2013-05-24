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

## remove a node

    $ jules location.json /
    {
      "city": "Boulder",
      "state": "CO"
    }

The `remove` command removes the selected node (much like jQuery):

    $ jules location.json /state remove
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

## force a string

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

# Design Principles

* Edits files. Make sure you're using version control.
