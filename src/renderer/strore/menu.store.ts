/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
import { makeAutoObservable } from 'mobx';
import { remote } from 'electron';
import path from 'path';
import fs from 'fs';
import routes from '../config/router.config';

const home = remote.app.getPath('home');

export interface IMenu {
  name: string;
  path: string;
  component?: string;
  icon: string;
  keepalive?: boolean;
  origin?: { [key: string]: any };
}

export const homeMenu = {
  name: '首页',
  path: path.join(__dirname, 'home.html'),
  icon: 'icon-home',
  keepalive: true,
};

export class MenuStore {
  public menus: IMenu[] = [homeMenu];

  public active?: IMenu = homeMenu;

  constructor() {
    makeAutoObservable(this);
    this.getExtensions();
  }

  /**
   * getExtensions
   */
  public getExtensions() {
    const menus: IMenu[] = [];
    const extensionPath: string = path.join(home, '.jkworkspace/extensions');
    const extensions = fs.readdirSync(
      path.join(home, '.jkworkspace/extensions')
    );

    for (const extension of extensions) {
      const stat = fs.statSync(path.join(extensionPath, extension));
      if (stat.isDirectory()) {
        try {
          const package = fs.readFileSync(
            path.join(extensionPath, extension, 'package.json')
          );
          const packageJSON = JSON.parse(package.toString());

          menus.push({
            name: packageJSON.name,
            path: path.join(extensionPath, extension, 'index.html'),
            icon: packageJSON.icon,
            origin: packageJSON,
          });
        } catch (error) {
          console.log(error);
        }
      }
    }

    this.menus = [...this.menus, ...menus];
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
