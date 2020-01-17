/**
 * (c) 2020 Andrea Giammarchi (ISC)
 */

const {
  log: $log,
  error: $error,
  info: $info,
  warn: $warn
} = console;

const trim = /^(?:\r\n|\n|\r)|(?:\r\n|\n|\r)$/g;

const maybeTagOrStr = (...args) => {
  const {length} = args;
  if (1 < length) {
    const [t] = args;
    if (t instanceof Array && t.length === length && t.hasOwnProperty('raw')) {
      const out = [t[0]];
      for (let i = 1; i < length; i++)
        out.push(args[i], t[i]);
      args = out;
    }
  }
  return args.join('');
};

// main
const emd = (...args) => {
  const code = [];
  const hide = (_, $1, $2, $3) => `\x01${
    code.push($1 + ($2 === '`' ? $3 : $3.replace(trim, ''))) - 1
  }`;
  return [
    // drop `code` before parsing
    [/(^|[^\\])((?:`|'){2,})([\s\S]+?)\2(?!`)/g, hide],
    [/(^|[^\\])(`)(.+?)\2/gm, hide],

    // ## headers
    [/^[ \t]*(\#{2,})[ \t]*(.+?)\1?([\r\n]+|$)/gm, '\x1B[7m $2 \x1B[0m$3'],
    [/^[ \t]*(\#)[ \t]*(.+?)\1?([\r\n]+|$)/gm, '\x1B[7m\x1B[1m $2 \x1B[0m$3'],

    // *bold*, _underline_, -dim-, ~strike~
    [/(\*{1,2})(?=\S)(.*?)(\S)\1/g, '\x1B[1m$2$3\x1B[0m'],
    [/(_{1,2})(?=\S)(.*?)(\S)\1/g, '\x1B[4m$2$3\x1B[0m'],
    [/(-{1,2})(?=\S)(.*?)(\S)\1/g, `\x1B[2m\$2\$3\x1B[0m`],
    [/(~{1,2})(?=\S)(.*?)(\S)\1/g, '\x1B[9m$2$3\x1B[0m'],

    // * list, > quote
    [/^([ \t]+)[*+-.]([ \t]+)/gm, '$1\u2022$2'],
    [/^[ \t]*>([ \t]?)/gm, '\x1B[7m \x1B[0m ']
  ]
  .reduce((s, [re, place]) => s.replace(re, place), maybeTagOrStr(...args))
  // restore code after parsing
  .replace(/\x01(\d+)/g, (_, $1) => code[$1]);
};

// colors
const blue = (...args) => `\x1B[34m${maybeTagOrStr(...args)}\x1B[0m`;
const green = (...args) => `\x1B[32m${maybeTagOrStr(...args)}\x1B[0m`;
const red = (...args) => `\x1B[31m${maybeTagOrStr(...args)}\x1B[0m`;
const yellow = (...args) => `\x1B[33m${maybeTagOrStr(...args)}\x1B[0m`;

// log
const log = (...args) => $log(emd(...args));

// extras
const ok = (...args) => log(green(' **OK** ') + maybeTagOrStr(...args));
const error = (...args) => $error(emd(red(' **Error** ') + maybeTagOrStr(...args)));
const info = (...args) => $info(emd(blue(' **Info** ') + maybeTagOrStr(...args)));
const warn = (...args) => $warn(emd(yellow(' **Warning** ') + maybeTagOrStr(...args)));

module.exports = {emd, log, error, info, ok, warn, blue, green, red, yellow};