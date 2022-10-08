import { Empty } from 'antd'
import "antd/dist/antd.css";
import styles from '../styles/components/Empty.module.css'

type Props = {
  description?: string
}

const EmptyList = (props: Props) => {
  return <div className="h-[35rem] flex justify-center items-center">
    <Empty description={props.description} className={`${styles['ant-empty']}`} />
  </div>
}

export default EmptyList
