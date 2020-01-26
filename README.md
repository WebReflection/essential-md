# essential-md

[![Build Status](https://travis-ci.com/WebReflection/essential-md.svg?branch=master)](https://travis-ci.com/WebReflection/essential-md) [![Coverage Status](https://coveralls.io/repos/github/WebReflection/essential-md/badge.svg?branch=master)](https://coveralls.io/github/WebReflection/essential-md?branch=master)

<sup>**Social Media Photo by [Anastasiia Kamil](https://unsplash.com/@nastyakamil) on [Unsplash](https://unsplash.com/)**</sup>

A minimalistic markdown like utility to log:

  * headers
  * bold text
  * underlined text
  * dimmed text
  * striked text
  * lists of items
  * quotes
  * multi or single line code, to keep its content unaffected
  * clear 1 up to N previous lines
  * prompt to ask questions (for anything fancier, see [prompts](https://www.npmjs.com/package/prompts))

## API

Every exported method can be used either as function or as template literal tag.

  * `emd` to transform content into a string
  * `log` to convert and `console.log(...)` the result right away
  * `error` to `console.error` a bold red `Error:` in front of the message
  * `info` to `console.info` a bold blue `Info:` in front of the message
  * `warn` to `console.warn` a bold yellow `Warning:` in front of the message
  * `clear` to clear any previous logged line (`clear(1)`, `clear(7)`, ... default `1`)
  * `prompt` to ask questions (`prompt('What is your name?').then(...)`)
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
