/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as path from 'path';
import * as fs from 'fs';

const request = require('request');

class StreamDownload {
  public downloadCallback = (_type: string, _percentage: number): void => {};

  /**
   * showProgress
   */
  public showProgress(received: number, total: number) {
    const percentage = (received * 100) / total;
    // 用回调显示到界面上
    this.downloadCallback('progress', percentage);
  }

  /**
   * downloadFile
   */
  public downloadFile(
    patchUrl: string,
    baseDir: string,
    downloadFile: string,
    callback: (_type: string, _percentage: number) => void
  ) {
    this.downloadCallback = callback; // 注册回调函数

    let receivedBytes = 0;
    let totalBytes = 0;

    const req = request({
      method: 'GET',
      uri: patchUrl,
    });

    const out = fs.createWriteStream(path.join(baseDir, downloadFile));
    req.pipe(out);

    req.on('response', (data: any) => {
      // 更新总文件字节大小
      totalBytes = parseInt(data.headers['content-length'], 10);
    });

    req.on('data', (chunk: any[]) => {
      // 更新下载的文件块字节大小
      receivedBytes += chunk.length;
      this.showProgress(receivedBytes, totalBytes);
    });

    req.on('end', () => {
      // TODO: 检查文件，部署文件，删除文件
      this.downloadCallback('finished', 100);
    });
  }
}

export default StreamDownload;
