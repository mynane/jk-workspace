import React from 'react'
import './index.less'

export interface IIconfontProps {
  [key: string]: any;
}

const IconFont: React.FC<IIconfontProps> = props => {
  const { type } = props;
  return (
    <i className={`iconfont ${type}`}></i>
  );
};

export default IconFont;
