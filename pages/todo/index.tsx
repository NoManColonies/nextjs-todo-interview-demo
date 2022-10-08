import { NextPage } from "next";
import { Typography } from 'antd'
import "antd/dist/antd.css";
import styles from '../../styles/TodoList.module.css'
import Search from "../../components/search";
import { useTodo } from "../../hooks/todo";
import ColumnHeader from "../../components/columnHeader";
import Todo from "../../components/Todo";
import { TodoType } from "../../stores/todo";

const { Title } = Typography

const TodoList: NextPage = () => {
  const [{ todos }] = useTodo()
  return (
    <div className="w-screen h-screen bg-[#F7F6F8]">
      <div className="flex justify-center items-center h-[6rem]">
        <Title className={`${styles['ant-typography']}`}>Tasks</Title>
      </div>
      <div className="px-10">
        <Search />
      </div>
      <div className="grid grid-cols-3 mt-4 gap-4 mx-4">
        <div className="">
          <ColumnHeader title="Todos" type={TodoType.TODO} />
          <div className="h-[35rem] overflow-auto">
            <Todo title="test title" content="text sentence asldjaskldjslakjdslakdjslkjdlskajdlaskjdlksajdlksajdlksajdlk" />
            <Todo title="test title" content="text sentence asldjaskldjslakjdslakdjslkjdlskajdlaskjdlksajdlksajdlksajdlk" />
            <Todo title="test title" content="text sentence asldjaskldjslakjdslakdjslkjdlskajdlaskjdlksajdlksajdlksajdlk" />
            <Todo title="test title" content="text sentence asldjaskldjslakjdslakdjslkjdlskajdlaskjdlksajdlksajdlksajdlk" />
            <Todo title="test title" content="text sentence asldjaskldjslakjdslakdjslkjdlskajdlaskjdlksajdlksajdlksajdlk" />
          </div>
        </div>
        <div>
          <ColumnHeader title="Doings" type={TodoType.DOING} />
        </div>
        <div>
          <ColumnHeader title="Dones" type={TodoType.DONE} />
        </div>
      </div>
    </div>
  )
}

export default TodoList
