/* eslint-disable no-async-promise-executor */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/no-loop-func */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-return-await */
/* eslint-disable class-methods-use-this */
import { ensureDirSync, ensureFileSync, readJsonSync } from 'fs-extra';
import path from 'path';
import fs from 'fs';
import { JKEvent } from '../main/JKEvent';
import { getRemoteConfig } from '../services';
import Constants from '../utils/Constants';
import GitHub from './GitHub';
import { queue } from '../utils';
const extract = require('extract-zip');

let mainWindow: {
  webContents: { send: (arg0: string, arg1: any[]) => void };
} | null = null;

export class Init {
  public isupdating = false;

  constructor() {
    this.checkPath();
    this.interval();
  }

  /**
   * interval
   */
  public interval() {
    this.checkConfig();
    setInterval(() => {
      this.checkConfig();
    }, Constants.DELAY);
  }

  /**
   * checkPath
   */
  public checkPath() {
    ensureDirSync(Constants.EXTENSIONS);
    ensureDirSync(Constants.CACHES);
  }

  /**
   * checkConfig
   */
  public async checkConfig() {
    if (!this.isupdating) {
      this.isupdating = true;
      const localConfig = await Init.loadLocalConfig();
      this.updatorModules(localConfig);
    }
  }

  /**
   * load
   */
  public async load(local: any) {
    return new Promise(async (resolve, reject) => {
      ensureDirSync(path.join(Constants.CACHES, local.appId));
      ensureDirSync(path.join(Constants.EXTENSIONS, local.appId));
      const latest = await GitHub.latestReleases(local.owner, local.repo);

      if (local.latest !== latest.tag_name) {
        JKEvent.download(
          `https://github.com/${local.owner}/${local.repo}/releases/download/${latest.tag_name}/build.zip`,
          path.join(Constants.CACHES, local.appId),
          `${latest.tag_name}.zip`,
          async (msg) => {
            if (msg.type === 'finished') {
              try {
                await extract(
                  path.join(
                    Constants.CACHES,
                    local.appId,
                    `${latest.tag_name}.zip`
                  ),
                  {
                    dir: path.join(
                      Constants.EXTENSIONS,
                      local.appId,
                      latest.tag_name
                    ),
                  }
                );
                Init.setLocalConfig(local.appId, { latest: latest.tag_name });
                resolve({ ...local, latest: latest.tag_name });
              } catch (error) {
                reject(error);
              }
            }
          }
        );
      } else {
        resolve(local);
      }
    });
  }

  /**
   * updatorModules
   */
  public updatorModules(locals: any[]) {
    const promiseAll = [];
    for (const local of locals) {
      promiseAll.push(this.load(local));
    }
    queue(promiseAll)
      .then((nlocals) => {
        mainWindow?.webContents.send('module-update', nlocals);
        this.isupdating = false;
      })
      .catch((err) => {
        this.isupdating = false;
      });
  }

  /**
   * loadLocalConfig
   */
  static loadLocalConfig() {
    ensureFileSync(Constants.CONFIG);
    try {
      return readJsonSync(Constants.CONFIG);
    } catch (error) {
      return [];
    }
  }

  static async setLocalConfig(appId: string, config: any) {
    const oConfig = await Init.loadLocalConfig();

    for (let i = 0; i < oConfig.length; i++) {
      const c = oConfig[i];
      if (c.appId === appId) {
        oConfig[i] = { ...c, ...config };
        break;
      }
    }

    fs.writeFileSync(Constants.CONFIG, JSON.stringify(oConfig));
  }

  /**
   * loadRemoteConfig
   */
  public async loadRemoteConfig() {
    return await getRemoteConfig();
  }
}

const init = new Init();

export default {
  init,
  addMain(main: any) {
    mainWindow = main;
  },
};
