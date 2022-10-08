import { Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons';
import TodoDrawer from './Drawer';
import { TodoType } from '../stores/todo';
import { DeleteTodoCb, useTodo } from '../hooks/todo';

type Props = {
  title: string
  content: string
  id: string
  type: TodoType
}

function useInjectedId(id: string, cb: DeleteTodoCb) {
  return () => cb(id)
}

const Menu = (props: Props) => {
  const [, { useDeleteTodo }] = useTodo()

  return (
    <div className='flex flex-col'>
      <TodoDrawer type={props.type} editMode={true} id={props.id} title={props.title} content={props.content} />
      <Button>
        <DeleteOutlined onClick={useInjectedId(props.id, useDeleteTodo)} />Delete task
      </Button>
      <Button onClick={() => console.log('clicked')}>Test button</Button>
    </div>
  )
}

export default Menu
