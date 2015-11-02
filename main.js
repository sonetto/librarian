'use strict';

require('rmrf')('build');
require('mkdirp').sync('build');

let fs = require('fs');

fs.symlinkSync('../assets', 'build/assets');

global.hash = {};

hash.nav = {};

let glob = require('glob');

glob.sync('nav/**/*').forEach(function(path) {
    require('./loadNavTree')(path);
});

{
    let docPaths = glob.sync('doc/**/*.lbr');

    docPaths.forEach(function(path) {
        require('./loadDocFrontMatter')(path);
    });

    docPaths.forEach(function(path) {
        require('./renderDoc')(path);
    });
}

fs.writeFileSync('build/hash.json', JSON.stringify(hash));