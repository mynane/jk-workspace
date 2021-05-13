import React, { useEffect, useRef, useState } from 'react';
import { Button, Progress } from 'antd';
// import './index.less';

export interface IHomeProps {
  [key: string]: any;
}

let count = 0;

let jktool = new JKTool({ moduleID: 'mian' });

const Home: React.FC<IHomeProps> = props => {
  const ref = useRef(null);

  const [progress, setProgress] = useState(0);

  const download = () => {
    jktool.download(`http://10.248.110.211:5000/loldtmodbud.zip`, (data) => {
      setProgress(data.percentage);
    });
  };

  useEffect(() => {
    setTimeout(() => {
      download();
    }, 3000);
  }, [])

  return (
    <div className="home" ref={ref} style={{display: 'inline-block'}}>
      <Button type="primary" onClick={download}>下载</Button>
      <Progress type="circle" percent={parseInt(progress, 10)} />
    </div>
  );
};

export default Home;
