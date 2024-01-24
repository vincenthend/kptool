import * as React from 'react'
import { Button, Card, DatePicker, Space, Table, TableProps } from 'antd'
import {
  DeleteOutlined,
  PlusCircleOutlined,
  SettingOutlined
} from '@ant-design/icons'
import LockExcludeSelect from '../LockExcludeSelect'
import { useAppendableData } from './useAppendableData'
import { v4 } from 'uuid'
import dayjs from 'dayjs'

interface Props {

}

interface WeekScheduleData {
  uid: string
  date: number
}

function SchedulerApp(props: Props): JSX.Element {
  const {
    addRow,
    deleteRow,
    resetData,
    setData,
    updateData,
    state
  } = useAppendableData<WeekScheduleData>({
    initialData: [],
    rowKey: 'uid',
    getValue: (state) => {
      console.log(state)
      const nextDate = state?.length ? dayjs(state[state.length - 1].date).add(1, 'week') : dayjs().day(6).startOf('day')
      return {
        uid: v4(),
        date: nextDate.valueOf()
      }
    }
  })

  const columns: TableProps<WeekScheduleData>['columns'] = [
    {
      key: 'date',
      title: 'Date',
      render: (data) => <DatePicker allowClear={false} style={{width: '100%'}}
        value={dayjs(data.date)}/>,
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
      render: () => <LockExcludeSelect/>,
      width: 200,
    },
    {
      key: 'person_music',
      title: 'Music',
      render: () => <LockExcludeSelect/>,
      width: 200,
    },
    {
      key: 'person_av',
      title: 'AV',
      render: () => <LockExcludeSelect/>,
      width: 200,
    },
    {
      key: 'delete',
      render: (data) => <Button danger icon={<DeleteOutlined/>}
        onClick={() => deleteRow(data.uid)}/>,
      width: 32
    }
  ]

  return <>
    <Card title={'KP Scheduler'}
      extra={<><Space><Button icon={<SettingOutlined/>}/></Space></>}>
      <Table
        columns={columns}
        rowKey={'uid'}
        dataSource={state}
        pagination={false}
        size={'small'}
      />
      <Button style={{width: '100%'}} icon={<PlusCircleOutlined/>}
        onClick={addRow}>
        Add
      </Button>
    </Card>
  </>
}

export default SchedulerApp
