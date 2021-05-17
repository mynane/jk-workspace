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

function workerThread() {
  console.log(2);
  const { patchUrl, baseDir, downloadFile } = workerData;
  let receivedBytes = 0;
  let totalBytes = 0;

  const req = request({
    method: 'GET',
    uri: patchUrl,
  });

  const out = fs.createWriteStream(path.join(baseDir, downloadFile));
  req.pipe(out);

  req.on('response', (data) => {
    // 更新总文件字节大小
    totalBytes = parseInt(data.headers['content-length'], 10);
  });

  req.on('data', (chunk) => {
    receivedBytes += chunk.length;
    const percentage = (receivedBytes * 100) / totalBytes;
    parentPort.postMessage({ type: 'progress', percentage });
  });

  req.on('end', () => {
    parentPort.postMessage({ type: 'finished', percentage: 100 });
  });

  // parentPort.on('message', msg => {
  //   console.log(`worker: receive ${msg}`);
  //   if (msg === 5) { process.exit(); }
  //   parentPort.postMessage(msg);
  // }),
  // parentPort.postMessage(workerData);
}

workerThread();
