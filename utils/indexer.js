let fs = require('fs');
let path = require('path');
let crypto = require('crypto')
let appVersion = require('../package.json').version

/**
 * Generate a SHA1 of the file, can be used rather than the hid?
 *
 * @param {Object} file
 * @returns
 */
function generateSha(file) {
  let hash = crypto.createHmac('sha1', JSON.stringify(file))
  return hash.digest('hex')
}

/**
 * Generates an id for the type.
 *
 * @param {Object} file
 */
function generateHid(file) {
  let name = file.name + file.author;

  return name.split('')
    .reduce((prev, next) => {
      return (next.charCodeAt(0) << 8) ^ prev;
    }).toString() + (new Date()).getMilliseconds();
}


const build = async ({type_library}) => {

  let custom_types = [];

  fs.readdir(type_library, (err, files) => {
    if (err)
      throw err;

    /**
     * Carry on if no errors
     */
    files.forEach(async (file, index) => {
      if (fs.lstatSync(path.join(type_library, file)).isDirectory()) {
        console.info('[INFO] There seems to be a directory director, what shall we dictate?');
        // TODO: Make the types be split by [username]/[type]/...files
          // this would allow tagging with .accepted notes and also codeowner tag a dir
        // split up the build function and make it recursive to one level.
        // will help to look for the accepted thing and also the other stuff
        return;
      }

      var file = fs.readFileSync(path.join(type_library, file));

      file = JSON.parse(file);

      custom_types.push({
        id: index + 1,
        _version: appVersion,
        hid: generateHid(file),
        sha: generateSha(file),
        name: file.name,
        author: file.author,
        status: file.status,
        username: file.username || null,
        description: file.description,
        custom_type: file.custom_type
      });
    });

    fs.writeFileSync(path.join('public', 'index.json'), JSON.stringify({ data: custom_types }, null, 2));
  });
}

build({
  type_library: 'custom_types'
});
