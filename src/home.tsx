import React from 'react';
import { render } from 'react-dom';
import Home from './home/index';
import './renderer/common/common.less';

render(
  <Home />,
  document.getElementById('root')
);
