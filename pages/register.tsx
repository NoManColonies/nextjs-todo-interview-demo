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
  const [{ errorMessage, registerStatus }, { useRegister, useClearStatus: useClearRegisterStatus }] = useAuth()
  const router = useRouter()

  useEffect(() => {
    switch (registerStatus) {
      case AuthActionStatus.SUCCESS: {
        message.success('Registration successful', 3, useClearRegisterStatus)
        router.replace('/login')
        break
      }
      case AuthActionStatus.FAILURE: {
        if (errorMessage)
          message.error(errorMessage, 3, useClearRegisterStatus)
        break
      }
      default: {
        break
      }
    }
  }, [errorMessage, registerStatus, useClearRegisterStatus, router])

  return (
    <Form 
      name="register"
      className="flex justify-center items-center h-screen flex-col"
      onFinish={useRegister}
    >
      <Title className={styles['ant-typography']}>Todo list demo</Title>
      <div className="flex justify-between flex-col h-[12rem]">
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
        <Form.Item
          label=""
          name="confirm-password"
          dependencies={['pasword']}
          rules={[
            { required: true, message: 'Please input your password!' },
            ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
          ]}
        >
          <Input.Password placeholder="Confirm password" />
        </Form.Item>
        <div className={`${styles['center-section']} h-[3rem]`}>
          <Link href="/login">
            <a className="mb-1">already have account? click here to login</a>
          </Link>
          <Form.Item>
            <Button 
              className={styles['ant-btn']}
              htmlType="submit"
            >Register</Button>
          </Form.Item>
        </div>
      </div>
    </Form>
  )
}

export default Login
