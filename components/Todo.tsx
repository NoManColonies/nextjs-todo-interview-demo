import { Typography } from 'antd'
import styles from '../styles/components/Todo.module.css'

type Props = {
  title: string
  content: string
}

const { Title } = Typography

const Todo = (props: Props) => {
  return (
    <div className={`${styles['todo']}`} >
      <Title level={3} className={`${styles['ant-typography']}`}>{props.title}</Title>
      <span className='break-words'>{props.content}</span>
    </div>
  )
}

export default Todo
