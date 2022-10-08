import { Typography, Menu } from 'antd'
import { EllipsisOutlined, DeleteOutlined, EditOutlined, CheckCircleOutlined, ExclamationCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import styles from '../styles/components/Todo.module.css'
import { TodoType } from '../stores/slices/todo';
import { DeleteTodoCb, MoveTodoCb, useTodo } from '../hooks/todo';
import TodoDrawer from './Drawer';
import { useCallback, useState } from 'react';

type Props = {
  title: string
  content: string
  id: string
  type: TodoType
}

type OpenEditDrawerCb = () => void

const { Title } = Typography

function useOnSelected(
  deleteCb: DeleteTodoCb, 
  editCb: OpenEditDrawerCb, 
  moveCb: MoveTodoCb, 
  props: Props
) {
  return (value: any) => {
    switch (value.key) {
      case 'delete': {
        deleteCb(props.id)
        break
      }
      case 'edit': {
        editCb()
        break
      }
      case 'todo': {
        moveCb({ id: props.id, type: TodoType.TODO })
        break
      }
      case 'doing': {
        moveCb({ id: props.id, type: TodoType.DOING })
        break
      }
      case 'done': {
        moveCb({ id: props.id, type: TodoType.DONE })
        break
      }
      default:
        break
    }
  }
}

const Todo = (props: Props) => {
  const [, { useDeleteTodo, useMoveTodo }] = useTodo()
  const [isOpen, setIsOpen] = useState(false)
  const openDrawer = useCallback(() => setIsOpen(true), [setIsOpen])
  const closeDrawer = useCallback(() => setIsOpen(false), [setIsOpen])

  return (
    <div className={`${styles['todo']}`} >
      <Title level={3} className={`${styles['ant-typography']}`}>{props.title}</Title>
      <TodoDrawer 
        type={props.type} 
        editMode={true} 
        id={props.id} 
        title={props.title} 
        content={props.content} 
        isOpen={isOpen} 
        manualOpenCb={openDrawer} 
        manualCloseCb={closeDrawer} 
      />
      <Menu 
        mode='horizontal' 
        defaultSelectedKeys={['settings']}
        className={`${styles['ant-menu']}`}
        onSelect={useOnSelected(useDeleteTodo, openDrawer, useMoveTodo, props)}
        selectedKeys={[]}
      >
        <Menu.SubMenu icon={<EllipsisOutlined />} key="setting" title="">
          <Menu.Item icon={<EditOutlined />} key="edit">
            Edit task
          </Menu.Item>
          <Menu.Item icon={<DeleteOutlined />} key="delete">
            Delete task
          </Menu.Item>
          {props.type !== TodoType.TODO && 
          <Menu.Item icon={<ExclamationCircleOutlined />} key="todo">
            Move task to Todo
          </Menu.Item>}
          {props.type !== TodoType.DOING && 
          <Menu.Item icon={<ClockCircleOutlined />} key="doing">
            Move task to Doing
          </Menu.Item>}
          {props.type !== TodoType.DONE && 
          <Menu.Item icon={<CheckCircleOutlined />} key="done">
            Move task to Done
          </Menu.Item>}
        </Menu.SubMenu>
      </Menu>
      <span className='break-words'>{props.content}</span>
    </div>
  )
}

export default Todo
