import { Drawer, Form, Divider, Input } from 'antd'
import { PlusCircleFilled } from '@ant-design/icons';
import { useCallback, useState } from 'react';
import { TodoType } from '../stores/todo';
import styles from '../styles/components/TodoDrawer.module.css'

type Props = {
  type: TodoType
}

const TodoDrawer = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const openDrawer = useCallback(() => setIsOpen(true), [setIsOpen])
  const closeDrawer = useCallback(() => setIsOpen(false), [setIsOpen])

  return (
    <>
      <PlusCircleFilled 
        className={`${styles['anticon-plus-circle']}`} 
        onClick={openDrawer} 
      />
      <Drawer
        placement='bottom'
        closable={false}
        open={isOpen}
        onClose={closeDrawer}
      >
        <Form
          name='todo'
          onFinish={console.log}
        >
          <Form.Item
            name="title"
            rules={[{ required: true, message: 'Please input title' }]}
            className="text-lg"
          >
            <Input bordered={false} placeholder='Task title' size='large' />
          </Form.Item>
          <Divider />
          <Form.Item
            name='content'
            rules={[{ required: true, message: 'Please input desciption' }]}
          >
            <Input.TextArea 
              showCount 
              bordered={false} 
              placeholder='Task description' 
              style={{ height: 180 }}
            />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  )
}

export default TodoDrawer
