import React, { useState } from 'react';
import { CodeSandboxOutlined, InboxOutlined, BookOutlined  } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import userImageSrc from '../../images/user.jpg';

const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

const HomeMenu: React.FC = () => {
  const [openKeys, setOpenKeys] = useState(['sub1']);

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  const auth: string = localStorage.getItem('user') || '';

  return (
   <>          
    { auth ?
   <Menu
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      style={{ width: 256 }}
    >
          <Menu.Item key={"icon"} style={{height:"150px", pointerEvents: "none",marginBottom: "-20px",marginTop:"40px"}}>
          <img  
                  src={userImageSrc}
                  alt="logo"
                  className='process-image report-image'>
              </img>          
              </Menu.Item >

          < Menu.Item key={"name"} style={{ pointerEvents: "none"}}>
            <span style={{ fontSize: "18px", pointerEvents: "none"}}>({JSON.parse(auth).username})</span>
          </Menu.Item>

        <Menu.Item style={{marginTop:"30px"}}>
          <BookOutlined />
            <Link to='/'>Reports</Link>
        </Menu.Item >

        <Menu.Item >
            <InboxOutlined/>
            <Link to='/companies'>Companies</Link>
        </Menu.Item >

        <Menu.Item key={"icon"} >
            <CodeSandboxOutlined />
            <Link to='/products'>Products</Link>
        </Menu.Item >
   
    </Menu>:null }
    </>
  );
};

export default HomeMenu;