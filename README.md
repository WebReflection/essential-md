# essential-md

A minimalistic markdown like utility to log:

  * headers
  * bold text
  * underlined text
  * dimmed text
  * striked text
  * lists of items
  * quotes
  * multi or single line code, to keep its content unaffected

## API

Every exported method can be used either as function or as template literal tag.

  * `emd` to transform content into a string
  * `log` to convert and `console.log(...)` the result right away
  * `error` to `console.error` a bold red `Error:` in front of the message
  * `info` to `console.info` a bold blue `Info:` in front of the message
  * `warn` to `console.warn` a bold yellow `Warning:` in front of the message
  * `ok` to `console.log` a bold green `OK:` in front of the message
  * `blue`, `green`, `red`, and `yellow`, to easily color some part of the text

## Examples

```js
const {log, green, red} = require('essential-md');

log`
# This is a header

With some extra content, plus:

  * a ${green`green`} text
  * a ${red`red`} text

... and literally **nothing else**
`;
```

## The `essential-md` Markdown flavour

  * `# header` or `#header#` to have top header
  * `## header` or `## header ##` to have less relevant headers
  * `*bold*` or `**bold**` to have bold text
  * `_underlined_` or `__underlined__` to have underlined text
  * `-dim-` or `--dim--` to have dimmed text (not on Windows though, Windows doesn't understand dimmed text ...)
  * `~strike~` or `~~strike~~` to strike the text
  * `'''` or 3 backticks to have multi-line code
  * single backtick to have inline code
  * a line starting with a space and one of these `*+-.` chars to have lists
  * a line starting with `>` to quote text

That's all folks!
