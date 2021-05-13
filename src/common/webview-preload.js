// 在webview
const { ipcRenderer } = require('electron');
// eslint-disable-next-line func-names
(function (w) {
  function JKTool(options) {
    this.moduleID = options.moduleID;
    this.info = {};
    this.initialized = false;
  }

  JKTool.prototype = {
    constructor: JKTool,
    download() {
      ipcRenderer.send('download');
    },
  };

  w.JKTool = JKTool;
})(window);
