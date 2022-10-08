import { Drawer, Form, Divider, Input, Button } from 'antd'
import { PlusCircleFilled } from '@ant-design/icons';
import { useCallback, useEffect, useState } from 'react';
import { TodoType } from '../stores/todo';
import styles from '../styles/components/TodoDrawer.module.css'
import { CreateTodoCb, UpdateTodoCb, useTodo } from '../hooks/todo';
import { useAuth } from '../hooks/auth';
import { useRouter } from 'next/router';
import { User } from '../stores/slices/user';
import { TodoContent, TodoEditContent } from '../stores/slices/todo';

type Props = {
  type: TodoType
  editMode: boolean
  id?: string
  title?: string
  content?: string
  isOpen?: boolean
  manualOpenCb?: () => void
  manualCloseCb?: () => void
  isMobile?: boolean
}

function useInjectUser(
  todoCb: CreateTodoCb | UpdateTodoCb, 
  drawerCb: () => void, 
  editMode: boolean, 
  type: TodoType, 
  user?: User, 
  id?: string
) {
  return (value: TodoContent | TodoEditContent) => {
    if (user) {
      if (!editMode)
        (todoCb as CreateTodoCb)({ ...value as TodoContent, type, createdBy: user }) 
      else
        id && (todoCb as UpdateTodoCb)({ ...value as TodoEditContent, id }) 
    }
    drawerCb()
  }
}

const TodoDrawer = (props: Props) => {
  const [{ user }] = useAuth()
  const [, { useCreateTodo, useEditTodo }] = useTodo()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const openDrawer = useCallback(() => setIsOpen(true), [setIsOpen])
  const closeDrawer = useCallback(() => setIsOpen(false), [setIsOpen])

  useEffect(() => {
    if (!user)
      router.replace('/login')
  }, [user, router])

  return (
    <>
      {props.editMode ? 
        <></> : 
        <PlusCircleFilled 
          className={`${props.isMobile ? styles['anticon-plus-circle-mobile'] : styles['anticon-plus-circle']}`} 
          onClick={openDrawer} 
        />
      }
      <Drawer
        placement={props.isMobile ? 'top' : 'bottom'}
        closable={false}
        open={props.isOpen !== undefined ? props.isOpen : isOpen}
        onClose={props.manualCloseCb ? props.manualCloseCb : closeDrawer}
      >
        <Form
          name='todo'
          onFinish={useInjectUser(
            props.editMode ? useEditTodo : useCreateTodo, 
            props.manualCloseCb ? props.manualCloseCb : closeDrawer, 
            props.editMode, 
            props.type, 
            user, 
            props.id
          )}
          initialValues={{
            title: props.title,
            content: props.content
          }}
        >
          <Form.Item
            name="title"
            rules={[{ required: true, message: 'Please input title' }]}
            className="text-lg"
          >
            <Input bordered={false} placeholder='Task title' size='large'  />
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
          <Form.Item>
            <Button 
              htmlType="submit" 
              className={`${styles['ant-btn']}`}
            >{props.editMode ? 'Update':'Create'} Todo Task</Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  )
}

export default TodoDrawer
