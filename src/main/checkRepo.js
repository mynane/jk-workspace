/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const path = require('path');
const fs = require('fs');
const request = require('request');

const {
  isMainThread,
  parentPort,
  workerData,
  threadId,
  MessageChannel,
  MessagePort,
  Worker,
} = require('worker_threads');
const GitHub = require('../common/GitHub');

async function workerThread() {
  console.log(1);
  const { user, repo } = workerData;
  // let receivedBytes = 0;
  // let totalBytes = 0;

  // const req = request({
  //   method: 'GET',
  //   uri: patchUrl,
  // });

  // const out = fs.createWriteStream(path.join(baseDir, downloadFile));
  // req.pipe(out);

  // req.on('response', (data) => {
  //   // 更新总文件字节大小
  //   totalBytes = parseInt(data.headers['content-length'], 10);
  // });

  // req.on('data', (chunk) => {
  //   receivedBytes += chunk.length;
  //   const percentage = (receivedBytes * 100) / totalBytes;
  //   parentPort.postMessage({ type: 'progress', percentage });
  // });

  // req.on('end', () => {
  //   parentPort.postMessage({ type: 'finished', percentage: 100 });
  // });

  const data = await GitHub.latestReleases(user, repo);
  console.log('data: ', data);
  parentPort.postMessage(data);

  // parentPort.on('message', msg => {
  //   console.log(`worker: receive ${msg}`);
  //   if (msg === 5) { process.exit(); }
  //   parentPort.postMessage(msg);
  // }),
  // parentPort.postMessage(workerData);
}

workerThread();
