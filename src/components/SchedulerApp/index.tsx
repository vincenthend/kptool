import * as React from 'react'
import { Button, Card, Space } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import SettingsModal from './SettingsModal'
import SchedulerFormTable from './SchedulerFormTable'

interface Props {}



function SchedulerApp(props: Props): JSX.Element {
  return (
    <>
      <Card
        title={'KP Scheduler'}
        extra={
          <>
            <Space>
              <Button icon={<SettingOutlined />} />
            </Space>
          </>
        }
      >
        <SchedulerFormTable />
      </Card>
      <SettingsModal />
    </>
  )
}

export default SchedulerApp
