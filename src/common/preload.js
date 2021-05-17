// 在webview
const { ipcRenderer } = require('electron');
const { v4: uuidv4 } = require('uuid');

// eslint-disable-next-line func-names
(function (w) {
  function JKTool(options) {
    this.moduleID = options.moduleID;
    this.info = {};
    this.initialized = false;
    this.callBack = {};

    this.init(this.moduleID);
  }

  JKTool.prototype = {
    constructor: JKTool,
    init() {
      ipcRenderer.on(`reply`, (event, { uuid, data }) => {
        if (this.callBack[uuid]) {
          this.callBack[uuid](data);
        }
      });
    },
    download(patchUrl, callback) {
      const uuid = uuidv4();
      this.callBack[uuid] = callback;
      ipcRenderer.send('download', {
        patchUrl,
        uuid,
        moduleID: 'home',
      });
    },
    checkRepo(user, repo, callback) {
      const uuid = uuidv4();
      this.callBack[uuid] = callback;
      ipcRenderer.send('checkRepo', {
        user,
        repo,
        uuid,
      });
    },
  };

  w.JKTool = JKTool;
})(window);
