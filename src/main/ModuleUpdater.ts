import { app, ipcMain } from 'electron';
import path from 'path';
import StreamDownload from './StreamDownload';

const home = app.getPath('home');

class ModuleUpdater {
  public moduleId: string;

  public streamDownload: StreamDownload = new StreamDownload();

  constructor(moduleId: string, url: string) {
    this.moduleId = moduleId;

    this.streamDownload.downloadFile(
      url,
      path.join(home, './jkworkspace'),
      'v0.0.1.zip',
      (type: string, percentage: number) => {
        switch (type) {
          case 'progress':
            ipcMain.emit(`${this.moduleId}-progress`, percentage);
            break;
          case 'finished':
            ipcMain.emit(`${this.moduleId}-finished`, percentage);
            break;
          default:
            break;
        }
      }
    );
  }
}

export default ModuleUpdater;
