'use strict';
/*!
 * (c) 2020, Andrea Giammarchi (ISC)
 */

const readline = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('readline'));

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

// emd transformer
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
    [/^[ \t]*>([ \t]?)/gm, '\x1B[7m \x1B[0m '],

    // restore code after parsing
    [/\x01(\d+)/g, (_, $1) => code[$1]]
  ]
  .reduce((s, [re, place]) => s.replace(re, place), maybeTagOrStr(...args));
};
exports.emd = emd;

// log
const log = (...args) => $log('\x1B[2K' + emd(...args));
exports.log = log;

// colors
const color = c => (...args) => `\x1B[${c}m${maybeTagOrStr(...args)}\x1B[0m`;
const blue = color(34);
exports.blue = blue;
const yellow = color(33);
exports.yellow = yellow;
const green = color(32);
exports.green = green;
const red = color(31);
exports.red = red;

// extras
const extra = (fn, prefix) => (...args) => fn(emd('\x1B[2K' + prefix + maybeTagOrStr(...args)));
const error = extra($error, red(' **Error** '));
exports.error = error;
const info = extra($info, blue(' **Info** '));
exports.info = info;
const ok = extra($log, green(' **OK** '));
exports.ok = ok;
const warn = extra($warn, yellow(' **Warning** '));
exports.warn = warn;

// utils
const clear = (lines = 1) => {
  while (lines--)
    log('\x1B[2A');
};
exports.clear = clear;

const prompt = (question) => new Promise($ => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true
  });
  rl.question('\x1B[2K' + emd(question), answer => {
    rl.close();
    clear();
    $(answer);
  });
});
exports.prompt = prompt;
