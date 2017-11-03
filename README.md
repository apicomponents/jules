# jules

Filter JSON using ES2015+ (splats & stuff)

## Usage

`cat input.json | jules <javascript-expression>`

## Examples

``` bash
echo '{"hello": "world", "if": "test"}' | jules '{hello, from_if: _.if}'
```

## LICENSE

[MIT](http://bat.mit-license.org/).
