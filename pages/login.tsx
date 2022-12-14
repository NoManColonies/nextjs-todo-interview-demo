import { NextPage } from "next";
import { Typography, Input, Button, Form, message } from 'antd';
import "antd/dist/antd.css";
import styles from '../styles/Login.module.css'
import Link from 'next/link'
import { useAuth } from "../hooks/auth";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { AuthActionStatus } from "../stores/slices/user";

const { Title } = Typography;

const Login: NextPage = () => {
  const [{ user, errorMessage, loginStatus }, { useLogin, useClearStatus }] = useAuth()
  const router = useRouter()

  useEffect(() => {
    switch (loginStatus) {
      case AuthActionStatus.SUCCESS: {
        if (user) 
          message.success(`Welcome ${user.username}`, 3, useClearStatus)
        router.replace('/todo')
        break
      }
      case AuthActionStatus.FAILURE: {
        if (errorMessage)
          message.error(errorMessage, 3, useClearStatus)
        break
      }
      default:
        break
    }
  }, [errorMessage, useClearStatus, loginStatus, router, user])

  return (
    <Form 
      name="login" 
      className="flex justify-center items-center h-screen flex-col"
      onFinish={useLogin}
    >
      <Title className={styles['ant-typography']}>Todo list demo</Title>
      <div className={`${styles['center-section']} h-[9rem]`}>
        <Form.Item
          label=""
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          label=""
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <div className={`${styles['center-section']} h-[3rem]`}>
          <Link href="/register">
            <a className="mb-1">not have account? click here to register</a>
          </Link>
          <Form.Item>
            <Button 
              className={styles['ant-btn']} 
              htmlType="submit"
            >Login</Button>
          </Form.Item>
        </div>
      </div>
    </Form>
  )
}

export default Login
