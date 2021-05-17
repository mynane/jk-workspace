import { app } from 'electron';
import path from 'path';

export default class Constants {
  // 用户目录
  static HOME = app.getPath('home');

  // 工作目录
  static JKWS = path.join(Constants.HOME, '.jkworkspace');

  // 缓存目录
  static CACHES = path.join(Constants.JKWS, './caches');

  // 扩展目录
  static EXTENSIONS = path.join(Constants.JKWS, './extensions');

  // 配置文件
  static CONFIG = path.join(Constants.CACHES, './manifest.json');

  // 请求前缀
  static BASE_URL = 'http://localhost:5000';

  // 定时检查时间间隔
  static DELAY = 60 * 60 * 1000;
}
