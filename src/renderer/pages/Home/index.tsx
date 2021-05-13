/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from 'react'
import { Button } from 'antd'
import './index.less'
import WebView from '../../components/WebView';

export interface IHomeProps {
  [key: string]: any;
}

const Home: React.FC<IHomeProps> = (props) => {
  const { } = props;

  return (
    <div className="home">
      <WebView />
    </div>
  );
};

export default Home;
