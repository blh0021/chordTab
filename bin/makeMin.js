var UglifyJS = require('uglify-js');
var fs = require('fs');

var result = UglifyJS.minify('src/tab.js', {
  mangle: true,
  compress: {
    sequences: true,
    dead_code: true,
    conditionals: true,
    booleans: true,
    unused: true,
    if_return: true,
    join_vars: true,
    drop_console: true
  }
});

fs.writeFileSync('src/tab.min.js', result.code);
