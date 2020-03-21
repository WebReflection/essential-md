const {log, error, info, ok, warn, clear, prompt} = require('../cjs');

log('Start');
log('nope');
clear();
log('ok');
error(1, 2, 3);
info(1, 2, 3);
ok(1, 2, 3);
warn(1, 2, 3);

log`${'o'}${'k'}`;
error`${1}${2}${3}`;
info`${1}${2}${3}`;
ok`${1}${2}${3}`;
warn`${1}${2}${3}`;

log('# Header 1');
log('## Header 2');
log('some *bold* text **!**');
log('some _underlined_ text *!*');
log('some -dimmed- text *!*');
log('some ~striked~ text *!*');
log('some `single ~line~` code `*which* _is_ unaffected` *!*');
log(`some
'''
  multiLine(code);
  this.should.be('**unaffected**');
'''
too`);
log(`
This is a list:

  * **first** item
  * **second** item

And this is some quote:

> quote **line**
> **quote** line
`);

prompt('Are *you* satisfied?\n').then(value => console.log('Answer:', value));
