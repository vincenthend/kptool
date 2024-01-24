import * as React from 'react'
import {
  Button,
  Card, Col,
  DatePicker, Row,
  Select,
  SelectProps,
  Space,
  Table,
  TableProps
} from 'antd'
import {
  CloseCircleOutlined, DeleteOutlined,
  LockOutlined, PlusCircleOutlined,
  SettingOutlined
} from '@ant-design/icons'
import LockExcludeSelect from '../LockExcludeSelect'
import { useAppendableData } from './useAppendableData'

interface Props {
  
}

interface Data {
  uid: string
}

function SchedulerApp(props: Props): JSX.Element {
  const {addWeek, deleteWeek} = useAppendableData()
  const columns: TableProps['columns'] = [
    {
      key: 'date',
      title: 'Date',
      render: () => <DatePicker allowClear={false} style={{width: '100%'}} />,
      width: 150,
    },
    {
      key: 'person_wl',
      title: 'WL',
      render: () => <LockExcludeSelect />,
      width: 200,
    },
    {
      key: 'person_singer',
      title: 'Singer',
      render: () => <LockExcludeSelect />,
      width: 200,
    },
    {
      key: 'person_music',
      title: 'Music',
      render: () => <LockExcludeSelect />,
      width: 200,
    },
    {
      key: 'person_av',
      title: 'AV',
      render: () => <LockExcludeSelect />,
      width: 200,
    },
    {
      key: 'delete',
      render: () => <Button danger icon={<DeleteOutlined />} />,
      width: 32
    }
  ]

  return <>
    <Card title={'KP Scheduler'} extra={<><Space><Button icon={<SettingOutlined />} /></Space></>}>
      <Table columns={columns} rowKey={'uid'} dataSource={[{uid: '1'}]} pagination={false} size={'small'} />
      <Button style={{width: '100%'}} icon={<PlusCircleOutlined />} onClick={addWeek}>
        Add
      </Button>
    </Card>
  </>
}

export default SchedulerApp
