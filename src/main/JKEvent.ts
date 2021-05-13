/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import { ipcMain, app } from 'electron';
import path from 'path';
import { Worker, isMainThread } from 'worker_threads';
import StreamDownload from './StreamDownload';

const home = app.getPath('home');

class JKEvent {
  constructor() {
    this.initEvent();
  }

  /**
   * initEvent
   */
  public initEvent() {
    this.initDownloadEvent();
  }

  /**
   * initDownloadEvent
   */
  public initDownloadEvent() {
    ipcMain.on('download', (event: any, data) => {
      const { patchUrl } = data;
      try {
        const worker = new Worker(path.join(__dirname, './downloader.js'), {
          workerData: {
            patchUrl,
            baseDir: path.join(home, './.jkworkspace'),
            downloadFile: 'babel-master.zip',
          },
        });
        worker.on('message', (msg) => {
          event.reply(data.moduleID, { data: msg, ...data });
        });
        // const streamDownload = new StreamDownload();
        // streamDownload.downloadFile(
        //   patchUrl,
        //   path.join(home, './.jkworkspace'),
        //   'babel-master.zip',
        //   (type: string, percentage: number) => {
        //     console.log(data);
        //     event.reply(data.moduleID, { data: { type, percentage }, ...data });
        //   }
        // );
      } catch (error) {}

      // event.reply(data.moduleID, { data: { key: 12312 }, ...data });
    });
  }
}

export default new JKEvent();
