import React from 'react'
import './index.less'

export interface IAboutProps {
  [key: string]: any;
}

const About: React.FC<IAboutProps> = props => {
  const { } = props;
  return (
    <div>
      about
    </div>
  );
};

export default About;
