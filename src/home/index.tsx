import React, { useEffect, useRef, useState } from 'react';
import { Button, Input, Progress } from 'antd';
import { remote } from 'electron';

const {Init} = remote.require('./common/electron');

// import './index.less';

export interface IHomeProps {
  [key: string]: any;
}

let jktool = new JKTool({ moduleID: 'mian' });

const Home: React.FC<IHomeProps> = props => {
  const ref = useRef(null);
  const [list, setLists] = useState(Init.loadLocalConfig());

  const [progress, setProgress] = useState(0);

  const download = () => {
    jktool.download(`https://github.com/mynane/jk-about/releases/download/v0.1.2/build.zip`, (data) => {
      setProgress(data.percentage);
    });
  };

  useEffect(() => {
    // setTimeout(() => {
    //   download();
    // }, 3000);

    console.log(Init.loadLocalConfig())
  }, [])

  return (
    <div className="home" ref={ref} style={{display: 'inline-block'}}>
      {
        list.map((l) => {
          return <div>{l.appId}: {l.latest}</div>
        })
      }

      <Input placeholder="请输入" onBlur={(e) => {
        console.log(e.target.value)
        const match = e.target.value.match(/https?:\/\/github\.com\/([a-zA-a\d]+)\/([a-zA-a\d-_]+)/);

        jktool.checkRepo(match[1], match[2], (res) => {
          console.log(res)
        })
        console.log('match: ', match);
      }} />
    </div>
  );
};

export default Home;
