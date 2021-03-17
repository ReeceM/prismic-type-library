let fs = require('fs');
let path = require('path');
let crypto = require('crypto')

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


const build = async () => {

  let custom_types = [];

  fs.readdir('custom_types', (err, files) => {
    if (err)
      throw err;

    /**
     * Carry on if no errors
     */
    files.forEach((file, index) => {
      var file = fs.readFileSync(path.join('custom_types', file));
      file = JSON.parse(file);

      custom_types.push({
        id: index + 1,
        hid: generateHid(file),
        sha: generateSha(file),
        name: file.name,
        author: file.author,
        username: file.username || null,
        description: file.description,
        custom_type: file.custom_type
      });
    });


    fs.writeFileSync(path.join('public', 'index.json'), JSON.stringify({ data: custom_types }, null, 2));
  });
}

build();
