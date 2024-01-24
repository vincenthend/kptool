import React from 'react';
import { CalendarOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Layout, Menu, theme } from 'antd';
import SchedulerApp from '../components/SchedulerApp'

const {  Content, Sider } = Layout;

const items = [
  {
    key: 'scheduler',
    icon: <CalendarOutlined />,
    label: 'Scheduler',
    component: SchedulerApp
  }
]

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()
  const [selectedKeys, setSelectedKeys] = React.useState(['scheduler']);

  const content = items.find(item => item.key === selectedKeys[0])
  const Component = content?.component

  return (
    <Layout style={{height: '100vh'}}>
      <Sider collapsed>
        <Menu theme="dark" mode="inline" onSelect={({key}) => setSelectedKeys([key])} selectedKeys={selectedKeys} items={items} />
      </Sider>
      <Layout>
        <Content style={{ margin: '24px 16px 0' }}>
          {Component && <Component />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;