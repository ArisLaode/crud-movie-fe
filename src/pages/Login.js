
import {
  Form,
  Input,
  Row,
  Col,
  Button,
  Checkbox,
  Divider
} from 'antd';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import restClient from '../utils/restClient';
import {login} from '../utils/Config';
import { NotifLoginSuccess, NotifError } from '../components/Notification';


const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};


function Login() {

    const [form] = Form.useForm();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleUsernameChange = (event) => {
      setUsername(event.target.value);
    }
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    }

    const onFinishLogin = async (body) => {
      try {

        let loginApps = await restClient.post(login, body)

        if (loginApps.status === 401) {
          NotifError('error', loginApps.message)
        }

        if (loginApps.status === 403) {
          NotifError('error', loginApps.message)
        }

        if (loginApps.status === 200) {
          localStorage.setItem("username", loginApps.username);
          localStorage.setItem("token", loginApps.token);
          history.push('/home')
          NotifLoginSuccess('success', loginApps.message)
        }
        console.log(loginApps);

      }catch (err) {
        console.log(err);
        NotifError('error', err)
      }
    };

    async function onLogin() {
      const body = {
        "username": username,
        "password": password
      };
      onFinishLogin(body);
    }

    return (
        <Row type="flex" justify="center" align="middle" style={{ minHeight: '80vh' }}>
            <Col xs={6} lg={6} >
                
                  <h2 style={{marginLeft: 185}}><b>Welcome to Movie App</b></h2>
                  <Divider style={{marginLeft: 100}} />
                  <h2 style={{marginLeft: 270}}>Sign In</h2>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="login"
                    initialValues={{}}
                    scrollToFirstError
                >
                    <Form.Item
                        name="username"
                        values={username}
                        onChange={handleUsernameChange}
                        label="Username"
                    >
                        <Input type="text"/>
                    </Form.Item>
            
                    <Form.Item
                    name="password"
                    onChange={handlePasswordChange}
                    values={password}
                    label="Password"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                    >
                    <Input.Password  type="password" />
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout} name="remember" valuePropName="checked" style={{marginLeft: 5}}>
                    <div>
                      <Checkbox>Remember me</Checkbox> 
                      </div>
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" onClick={() => {onLogin();}} style={{marginLeft: 110}}>
                        Login
                    </Button>
                    <div style={{marginLeft: 20}}>
                      <br />
                      Don't Have an Account?&nbsp; <a href="register">Create an Account</a>
                    </div>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );

}

export default Login;