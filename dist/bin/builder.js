#!/usr/bin/env node

var Core, Promise, program, tmp;

Promise = require('bluebird');

program = require('commander');

tmp = require('tmp');

Core = require('../core');

program.version('0.3.0').usage('<keywords>').description('Currently supports CoffeeScript, JSX, Jade, SCSS and Markdown.');

program.command('build [source] [dist]').description('build dist from source').option('--tmp [dir]', 'Temporary dir').action(function(src, dist, opts) {
  if (opts.tmp) {
    return new Core(src, dist, opts.tmp).build();
  } else {
    return tmp.dir(function(err, dir) {
      return new Core(src, dist, dir).build();
    });
  }
});

program.parse(process.argv);

if (!program.args.length) {
  return program.help();
}
