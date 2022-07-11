import {Button, Col, Form, Input, Row, Divider} from 'antd';
import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import restClient from '../utils/restClient';
import {register} from '../utils/Config';
import { NotifSuccess, NotifError } from '../components/Notification';

const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 8},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
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

function Register() {

    const history = useHistory();
    const [form] = Form.useForm();

    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [password, setPassword] = useState('');


    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handleFullnameChange = (event) => {
        setFullname(event.target.value);
    }
    
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const onFinish = async (body) => {
        try {
            const registerData = await restClient.post(register, body)

            if (registerData.status === 201) {
                NotifError('error', registerData.message)
            }

            if (registerData.status === 200) {
                history.push('/')
                NotifSuccess('success', registerData.message)
            }

        }catch (err) {
            console.log(err);
            NotifError('error', err)
        }
    };

    async function onRegister() {

        const body = {
          "username": username,
          "fullname": fullname,
          "password": password,
        };

        onFinish(body);
      }

    return (
        <Row type="flex" justify="center" align="middle" style={{minHeight: '80vh'}}>
            <Col xs={6} lg={6}>
                  <h2 style={{marginLeft: 185}}><b>Welcome to Movie App</b></h2>
                   <Divider style={{marginLeft: 100}} />
                  <h2 style={{marginLeft: 270}}>Sign Up</h2>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    initialValues={{}}
                    scrollToFirstError
                >
                    <Form.Item
                        name="username"
                        values={username}
                        onChange={handleUsernameChange}
                        label="Username"
                    >
                        <Input type="text" />
                    </Form.Item>

                    <Form.Item
                        name="fullname"
                        values={fullname}
                        onChange={handleFullnameChange}
                        label="Fullname"
                    >
                    <Input type="text" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        values={password}
                        onChange={handlePasswordChange}
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                    <Input.Password type="password" />
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" onClick={() => {onRegister();}} style={{marginLeft: 110}}>
                            Register
                        </Button>
                        <div style={{marginLeft: 50}}>
                            <br/>
                            <br/>
                            Already Registered !<a href="/">&nbsp;&nbsp;Login Now</a>
                        </div>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );

}

export default Register;