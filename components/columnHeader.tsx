import { TodoType } from "../stores/todo"
import TodoDrawer from "./Drawer"

type Props = {
  title: string
  type: TodoType
}

const ColumnHeader = (props: Props) => {
  return (
    <div className="bg-[#FDBD03] p-2 text-white rounded-lg relative">
      <div className="text-center">{props.title}</div>
      <TodoDrawer type={props.type} editMode={false} />
    </div>
  )
}

export default ColumnHeader
