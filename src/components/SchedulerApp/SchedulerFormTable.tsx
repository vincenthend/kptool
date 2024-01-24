import * as React from 'react'
import { Button, DatePicker, Table, TableProps } from 'antd'
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { useAppendableData } from './useAppendableData'
import dayjs from 'dayjs'
import { v4 } from 'uuid'
import LockExcludeSelect from '../LockExcludeSelect'
import { WeekScheduleData } from '../../types'

interface Props {}

function SchedulerFormTable(props: Props): JSX.Element {

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
        value={dayjs(data.date)} onChange={(date) => updateData(data.uid, 'date', date?.valueOf())}/>,
      width: 150,
    },
    //TODO: Make it dynamic, data source
    {
      key: 'person_wl',
      title: 'WL',
      render: (data) => <LockExcludeSelect onSelect={(value) => updateData(data.uid, 'person_wl', value)} />,
      width: 200,
    },
    {
      key: 'person_singer',
      title: 'Singer',
      render: (data) => <LockExcludeSelect onSelect={(value) => updateData(data.uid, 'person_singer', value)} />,
      width: 200,
    },
    {
      key: 'person_music',
      title: 'Music',
      render: (data) => <LockExcludeSelect onSelect={(value) => updateData(data.uid, 'person_music', value)} />,
      width: 200,
    },
    {
      key: 'person_av',
      title: 'AV',
      render: (data) => <LockExcludeSelect onSelect={(value) => updateData(data.uid, 'person_av', value)} />,
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
    <Table
      columns={columns}
      rowKey={'uid'}
      dataSource={state}
      pagination={false}
      size={'small'}
    />
    <Button style={{width: '100%'}} icon={<PlusCircleOutlined/>}
      onClick={() => addRow()}>
      Add
    </Button>
  </>
}

export default SchedulerFormTable
