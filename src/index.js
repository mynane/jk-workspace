/* eslint-disable promise/always-return */
const { generatorPatchZip, patchResource } = require('resource-diff-patch');
const path = require('path');
console.log('generatorPatchZip: ', generatorPatchZip);

generatorPatchZip(
  path.join(__dirname, './babel-master.zip'),
  path.join(__dirname, './core-js-master.zip'),
  path.join(__dirname, './'),
  'a.patch'
)
  .then((patchResourceZipPath) => {
    console.log(patchResourceZipPath);

    // eslint-disable-next-line promise/catch-or-return
    patchResource(
      path.join(__dirname, './babel-master.zip'),
      '/Users/shijinhua/Documents/TS/jk-workspace/src/a.patch.zip',
      path.join(__dirname, './'),
      'b.new'
    ).then((res) => {
      console.log(res);
    });
  })
  .catch((e) => {
    console.log(e);
  });
