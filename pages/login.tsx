import { NextPage } from "next";
import { Typography, Input, Button } from 'antd';
import "antd/dist/antd.css";
import styles from '../styles/Login.module.css'

const { Title } = Typography;

const Login: NextPage = () => {
  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <Title className={styles['ant-typography']}>Todo list demo</Title>
      <div className="flex justify-between flex-col h-[9rem]">
        <Input placeholder="Username" />
        <Input.Password placeholder="Password" />
        <Button className={styles['ant-btn']}>Login</Button>
      </div>
    </div>
  )
}

export default Login
