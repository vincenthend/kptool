import { Button, Col, Row, Select, SelectProps } from 'antd'
import * as React from 'react'
import { CloseCircleOutlined, LockOutlined } from '@ant-design/icons'

enum SelectMode {
  LOCK,
  EXCLUDE
}

function LockExcludeSelect(props: SelectProps) {
  const [mode, setMode] = React.useState(SelectMode.LOCK);

  return <Row gutter={8} wrap={false}>
    <Col flex={'auto'}>
      <Select {...props} style={{width: '100%'}} mode={mode === SelectMode.EXCLUDE ? 'multiple' : undefined} showSearch />
    </Col>
    <Col>
      <Button
        type={'link'}
        onClick={() => setMode((mode) => mode === SelectMode.LOCK ? SelectMode.EXCLUDE : SelectMode.LOCK)}
        style={{color: mode === SelectMode.LOCK ? 'gold' : 'red'}}
        icon={mode === SelectMode.LOCK ? <LockOutlined /> : <CloseCircleOutlined />}/>
    </Col>
  </Row>
}

export default LockExcludeSelect