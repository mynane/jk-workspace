/* eslint-disable global-require */
/* eslint-disable import/newline-after-import */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Spin } from 'antd';
import React, { useEffect, useRef } from 'react';
import { remote } from 'electron';
// import * as app from 'electron';
// import { app } = require.resolve("electron");
import './index.less';
import path from 'path';

const home = remote.app.getPath('home');


export interface IWebViewProps {
  src: string;
  [key: string]: any;
}

const WebView: React.FC<IWebViewProps> = (props) => {
  const { src, show = false } = props;
  const ref: any = useRef(null);
  const maskRef: any = useRef(null);
  useEffect(() => {
    // console.log(electron.getPath('home'))

    const loadstart = () => {
      maskRef.current.style.display = 'flex';
    };

    const loadstop = () => {
      maskRef.current.style.display = 'none';
    };

    const domready = () => {
      ref?.current?.openDevTools();
    };

    ref?.current?.addEventListener('did-start-loading', loadstart);
    ref?.current?.addEventListener('did-stop-loading', loadstop);
    ref?.current?.addEventListener('dom-ready', domready);
    // ref?.current?.addEventListener('did-fail-load', failload);


    ref?.current?.addEventListener('ipc-message', (event) => {
      console.log(event.channel);
      // Prints "pong"
      // ref?.current?.send('ping');
    });

    // ref?.current?.send('ping');
  }, []);

  return (
    <div
      className="webview"
      style={
        show
          ? { zIndex: 1000, display: 'block' }
          : { zIndex: -1, display: 'none' }
      }
    >
      <webview
        ref={ref}
        src={src}
        webpreferences="nodeIntegration=true"
        useragent="Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko"
        style={{ width: '100%', height: '100%' }}
        // preload={`file://${__dirname}/common/webview-preload.js`}
        preload={`file://${__dirname}/common/preload.js`}
      />
      <div className="webview-mask" ref={maskRef}>
        <Spin />
      </div>
    </div>
  );
};

export default WebView;
