/* eslint-disable react/no-danger */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { Tooltip } from 'antd'
import { observer } from "mobx-react-lite"
import { HashRouter, Route, Switch, Link, withRouter } from 'react-router-dom';
import IconFont from '../components/IconFont';
import routes from '../config/router.config';
import './index.less'
import menuStore, { homeMenu, MenuStore } from '../strore/menu.store';
import WebView from '../components/WebView';


export interface IMenu {
  current: any;
  menuStroe: MenuStore;
  [key: string]: any;
}

export const Menu: React.FC<IMenu> = (props) => {
  const { menuStroe, current } = props;
  const { menus = [], active } = menuStroe;
  return (
    <div className="left">
      {menus.map((r: any) => {
        const avtive = active?.appId === r.appId
        return (
          <div key={r.path} className={`menu ${avtive ? 'active' : ''}`}>
            <Tooltip placement="right" mouseEnterDelay={0.5} title={r.name}>
              <a
                href="javascript:void(0);"
                onClick={() => {
                  menuStroe?.setActive(r);
                }}
              >
                <IconFont type={r.icon} />
              </a>
            </Tooltip>
          </div>
        );
      })}
    </div>
  );
};

export interface ILayoutProps {
  menuStore: MenuStore;
  [key: string]: any;
}
const Layout: React.FC<ILayoutProps> = observer(props => {
  const { active, menus } = menuStore;
  const [ current, setCurrent ] = useState(active);

  const isHome = active?.path.includes(__dirname);

  useEffect(() => {
    if (active?.appId !== homeMenu?.appId) {
      setCurrent(active);
    }
  }, [active?.appId]);

  return (
    <div className="container">
      <Menu menuStroe={menuStore} current={current} />
      <WebView src={homeMenu?.path ?? ''} show={isHome} />
      <WebView src={current?.path ?? ''} show={!isHome} />
    </div>
  );
});

export default Layout;
