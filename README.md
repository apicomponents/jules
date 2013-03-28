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
    "Boulder"

## set a node

    $ jules location.json city Denver
    $ jules location.json
    {
      "city": "Denver",
      "state": "CO"
    }

## remove a node

    $ jules location.json state .remove
    $ jules location.json
    {
      "city": "Denver"
    }
    
## set a new node

    $ jules location.json
    {
      "city": "Denver"
    }
    $ jules location.json state CO
    $ jules location.json country US
    $ jules location.json
    {
      "city": "Denver",
      "state": "CO",
      "country": "US"
    }

## add an element to an array

    $ jules blog-entry.json
    {
      "title": "Ralph Waldo Emerson quote",
      "body": "A foolish consistency is the hobgoblin of little minds",
      "tags": ["consistency"]
    }
    $ jules blog-entry.json tags
    ["consistency"]
    $ jules blog-entry.json tags .push opinions
    ["consistency", "opinions"]
    $ jules blog-entry.json
    {
      "title": "Ralph Waldo Emerson quote",
      "body": "A foolish consistency is the hobgoblin of little minds",
      "tags": ["consistency", "opinions"]
    }

# Design Principles

* Nothing extra for simple stuff. Just the data. get and set are
  implicit
* Edits files. Make sure you're using version control.
