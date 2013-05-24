# jules

Query and manipulate JSON.

# Usage

## pretty print file

    $ jules location.json
    {
      "city": "Boulder",
      "state": "CO"
    }
    
## get a node

    $ jules location.json city
    Boulder

## set a node

    $ jules location.json city set Denver
    $ jules location.json
    {
      "city": "Denver",
      "state": "CO"
    }

## remove a node

    $ jules location.json state remove
    $ jules location.json
    {
      "city": "Denver"
    }
    
## set a new node

    $ jules location.json
    {
      "city": "Denver"
    }
    $ jules location.json state set CO
    $ jules location.json country set US
    $ jules location.json
    {
      "city": "Denver",
      "state": "CO",
      "country": "US"
    }

## specify the root node

The root node is specified with `.`.

    $ jules example.json
    {}
    $ jules example.json . set 3
    $ jules example.json
    3

## add an element to an array

    $ jules blog-entry.json
    {
      "title": "Ralph Waldo Emerson quote",
      "body": "A foolish consistency is the hobgoblin of little minds",
      "tags": ["consistency"]
    }
    $ jules blog-entry.json tags
    ["consistency"]
    $ jules blog-entry.json tags add opinions
    ["consistency", "opinions"]
    $ jules blog-entry.json
    {
      "title": "Ralph Waldo Emerson quote",
      "body": "A foolish consistency is the hobgoblin of little minds",
      "tags": ["consistency", "opinions"]
    }

## set multiple properties

    $ jules example.json
    {
      "foo": 15,
      "bar": {
        "baz": null
      }
    }
    $ jules example.json . set quux 19 bar.baz test
    {
      "foo": 15,
      "bar": {
        "baz": "test"
      },
      "quux": 19
    }

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
