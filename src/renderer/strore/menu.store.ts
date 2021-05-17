/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
import { makeAutoObservable } from 'mobx';
import { ipcRenderer, remote } from 'electron';
import path from 'path';
import fs from 'fs';
import { readJsonSync } from 'fs-extra';
const Constants = remote.require('./utils/Constants').default;
const { Init } = remote.require('./common/electron');

export interface IMenu {
  appId: string;
  name: string;
  latest: string;
  path: string;
  component?: string;
  icon: string;
  keepalive?: boolean;
  origin?: { [key: string]: any };
}

export const homeMenu = {
  appId: 'mynane/home',
  name: '首页',
  latest: 'v1.0.0',
  path: path.join(__dirname, 'home.html'),
  icon: 'icon-home',
  keepalive: true,
};

export class MenuStore {
  public menus: IMenu[] = [homeMenu];

  public active?: IMenu = homeMenu;

  constructor() {
    makeAutoObservable(this);
    this.interval();
  }

  /**
   * interval
   */
  public interval() {
    this.getExtensions();
    ipcRenderer.on('module-update', (_event, data) => {
      this.getExtensions(data);
    });
  }

  /**
   * getExtensions
   */
  public getExtensions(_modules?: any[]) {
    const menus: IMenu[] = [];
    const modules = _modules ?? Init.loadLocalConfig();

    for (const module of modules) {
      try {
        const modulePath = path.join(
          Constants.EXTENSIONS,
          module.appId,
          module.latest,
          'build'
        );
        const stat = fs.statSync(modulePath);

        if (stat.isDirectory()) {
          const packageJSON = readJsonSync(
            path.join(modulePath, 'package.json')
          );
          const temp = {
            appId: module.appId,
            name: packageJSON.jkc?.name ?? 'unknown',
            latest: module.latest,
            path: path.join(modulePath, 'index.html'),
            icon: packageJSON.jkc?.icon ?? 'icon-help',
          };
          if (this.active?.appId === module?.appId) {
            this.active = temp;
          }
          menus.push(temp);
        }
      } catch (error) {
        console.log(error);
      }
    }

    this.menus = [homeMenu, ...menus];
  }

  /**
   * active
   */
  public setActive(p: string) {
    this.active = p;
  }

  /**
   * push
   */
  public push(menu: IMenu) {
    this.menus.push(menu);
  }
}

const menuStore = new MenuStore();

export default menuStore;
