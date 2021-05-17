/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import { ipcMain, app } from 'electron';
import path from 'path';
import { Worker } from 'worker_threads';
import throttle from 'lodash/throttle';
import Constants from '../utils/Constants';

export class JKEvent {
  constructor() {
    this.initEvent();
  }

  static download(
    patchUrl: string,
    baseDir: string,
    downloadFile: string,
    callback: (msg: any) => void
  ) {
    try {
      const worker = new Worker(path.join(__dirname, './downloader.js'), {
        workerData: {
          patchUrl,
          baseDir,
          downloadFile,
        },
      });
      worker.on(
        'message',
        throttle((msg) => {
          callback(msg);
        }, 100)
      );
    } catch (error) {}
  }

  static checkRepo(user: string, repo: string, callback: (msg: any) => void) {
    try {
      const worker = new Worker(path.join(__dirname, './checkRepo.js'), {
        workerData: {
          user,
          repo,
        },
      });
      worker.on(
        'message',
        throttle((msg) => {
          callback(msg);
        }, 100)
      );
    } catch (error) {}
  }

  /**
   * initEvent
   */
  public initEvent() {
    this.initDownloadEvent();
    this.initCheckRepo();
  }

  /**
   * initDownloadEvent
   */
  public initDownloadEvent() {
    ipcMain.on('download', (event: any, data) => {
      const { patchUrl } = data;
      JKEvent.download(
        patchUrl,
        Constants.CACHES,
        'babel-master.zip',
        (msg: any) => {
          event.reply('reply', { data: msg, ...data });
        }
      );
    });
  }

  /**
   * initCheckRepo
   */
  public initCheckRepo() {
    ipcMain.on('checkRepo', (event: any, data) => {
      const { user, repo } = data;
      JKEvent.checkRepo(user, repo, (msg: any) => {
        event.reply('reply', { data: msg, ...data });
      });
    });
  }
}

export default new JKEvent();
