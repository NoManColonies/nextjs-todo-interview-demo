import { NextPage } from "next";
import { Menu, Typography } from 'antd'
import "antd/dist/antd.css";
import styles from '../../styles/TodoList.module.css'
import Search from "../../components/search";
import { useTodo } from "../../hooks/todo";
import ColumnHeader from "../../components/columnHeader";
import Todo from "../../components/Todo";
import { TodoType } from "../../stores/slices/todo";
import { useAuth } from "../../hooks/auth";
import { useCallback, useEffect, useMemo, useState } from "react";
import EmptyList from "../../components/EmptyList";
import { CheckCircleOutlined, ExclamationCircleOutlined, ClockCircleOutlined, DownOutlined } from '@ant-design/icons';
import TodoDrawer from "../../components/Drawer";

const { Title } = Typography

function sanitizeRegExpSearchString(search: string) {
  return new RegExp(search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'))
}

function useOnSelected(cb: (value: TodoType) => void) {
  return (value: any) => {
    switch (value.key) {
      case 'todo': {
        cb(TodoType.TODO)
        break
      }
      case 'doing': {
        cb(TodoType.DOING)
        break
      }
      case 'done': {
        cb(TodoType.TODO)
        break
      }
      default:
        break
    }
  }
}

const TodoList: NextPage = () => {
  const [{ todos }] = useTodo()
  const [{ user }] = useAuth()
  const [search, setSearch] = useState('')
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
  const [todoType, setTodoType] = useState(TodoType.TODO)

  const isMobile = useCallback(
    () => windowSize.width <= 800, 
    [windowSize])

  const filteredTodos = useMemo(() => todos
      .filter(filter => filter
        .title
        .match(sanitizeRegExpSearchString(search))), 
    [todos, search])

  const todoList = useMemo(() => filteredTodos
      .filter(todo => todo.type === TodoType.TODO)
      .filter(todo => todo.createdBy === user), 
    [filteredTodos, user])
  const doingList = useMemo(() => filteredTodos
      .filter(todo => todo.type === TodoType.DOING)
      .filter(todo => todo.createdBy === user), 
    [filteredTodos, user])
  const doneList = useMemo(() => filteredTodos
      .filter(todo => todo.type === TodoType.DONE)
      .filter(todo => todo.createdBy === user), 
    [filteredTodos, user])

  useEffect(() => {
    if (window) {
      const handleResize = () => {
        setWindowSize({
          height: window.innerHeight,
          width: window.innerWidth
        })
      }

      handleResize()

      window.addEventListener('resize', handleResize)

      return () => window.removeEventListener('resize', handleResize)
    }
  }, [setWindowSize])

  return (
    <div className="w-screen h-screen bg-[#F7F6F8]">
      <div className={`flex justify-center items-center ${isMobile() ? 'h-[13vh]' : 'h-[6rem]'}`}>
        <Menu 
          mode="horizontal"
          defaultSelectedKeys={['task']}
          className={`${styles['ant-menu']} ${isMobile() ? '' : styles['ant-menu-desktop']}`}
          onSelect={useOnSelected(setTodoType)}
        >
          <Menu.SubMenu key='task' icon={<DownOutlined />} title='Notes'>
            <Menu.Item icon={<ExclamationCircleOutlined />} key="todo">
              Todo
            </Menu.Item>
            <Menu.Item icon={<ClockCircleOutlined />} key="doing">
              Doing
            </Menu.Item>
            <Menu.Item icon={<CheckCircleOutlined />} key="done">
              Done
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
        <Title className={`${styles['ant-typography']}`} level={2}>Tasks</Title>
      </div>
      <div className={isMobile() ? 'px-5' : 'px-10'}>
        <Search onChange={setSearch} />
      </div>
      <div className={`${isMobile() ? 'mb-4 mx-5 mt-2' : 'grid grid-cols-3 mx-4 mt-4'} gap-4`}>
        <div className={`${(isMobile() && todoType === TodoType.TODO) || !isMobile() ? '' : 'hidden'}`}>
          {!isMobile() && <ColumnHeader title="Todos" type={TodoType.TODO} />}
          {todoList.length ? 
          <div className={`${isMobile() ? 'h-[65vh] ' : 'h-[75vh]' }overflow-auto`}>
            {todoList
              .map(todo => 
                <Todo title={todo.title} content={todo.content} key={todo.id} id={todo.id} type={todo.type} />
              )}
          </div> :
          <EmptyList description="Empty task" />
          }
        </div>
        <div className={`${(isMobile() && todoType === TodoType.DOING) || !isMobile() ? '' : 'hidden'}`}>
          {!isMobile() && <ColumnHeader title="Doings" type={TodoType.DOING} />}
          {doingList.length ? 
          <div className={`${isMobile() ? 'h-[65vh] ' : 'h-[75vh]' }overflow-auto`}>
            {doingList
              .map(todo => 
                <Todo title={todo.title} content={todo.content} key={todo.id} id={todo.id} type={todo.type} />
              )}
          </div> :
          <EmptyList description="No ongoing task left" />
          }
        </div>
        <div className={`${(isMobile() && todoType === TodoType.DONE) || !isMobile() ? '' : 'hidden'}`}>
          {!isMobile() && <ColumnHeader title="Dones" type={TodoType.DONE} />}
          {doneList.length ? 
          <div className={`${isMobile() ? 'h-[65vh] ' : 'h-[75vh]' }overflow-auto`}>
            {doneList
              .map(todo => 
                <Todo title={todo.title} content={todo.content} key={todo.id} id={todo.id} type={todo.type} />
              )}
          </div> :
          <EmptyList description="Empty completed task list" />
          }
        </div>
        {isMobile() && 
        <div className="h-[10vh] flex justify-center items-center">
          <TodoDrawer type={todoType} editMode={false} isMobile={true} />
        </div>
        }
      </div>
    </div>
  )
}

export default TodoList
