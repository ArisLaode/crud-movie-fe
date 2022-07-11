
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Form, Input, InputNumber,Button, Row, Col, Layout, Upload, Space } from "antd";
import Header from "../components/Header";
import BreadCrumb from "../components/BreadCrumb";
import { UploadOutlined} from '@ant-design/icons';
import { NotifSuccess, NotifError } from '../components/Notification';
import restClient from "../utils/restClient";
import { createMovie } from "../utils/Config";
import { useHistory } from 'react-router-dom';

const { Content } = Layout;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function AddMovie() {

  const history = useHistory();
  const [form] = Form.useForm();
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState(0);
  const username = localStorage.getItem("username");

  const handleTitleeChange = (event) => {
      setTitle(event.target.value);
  }

  const handleRatingChange = (event) => {
      setRating(event.target.value);
  }
  
  const onCreateMovie = async (values) => {

    const file = values.image[0].originFileObj;
    const base64 = await convertBase64(file);

    const body = {
      "title": title,
      "rating": rating,
      "image": base64,
      "owned": username
    };

    try {

        const resultCreateMovie = await restClient.post(createMovie, body)
        if (resultCreateMovie.status === 201) {
            history.push('/add-movie')
            NotifError('error', resultCreateMovie.message)
        }

        if (resultCreateMovie.status === 200) {
            history.push('/home')
            NotifSuccess('success', resultCreateMovie.message)
        }

    }catch (err) {
        console.log(err);
        NotifError('error', err)
    }
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result)
      }

      fileReader.onerror = (error) => {
        reject(error);
      }

    })
  }

  const getFile = (e) => {
    console.log(e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  

  return (
    <Layout style={{ minHeight: '95vh' }}>
      <Header />
      <BreadCrumb />
      <Content
      style={{
        padding: '0 50px'
      }}
      >
        <div className="site-layout-content">
        <Row type="flex" justify="center" align="middle" style={{minHeight: '50vh'}}>
          <Col xs={6} lg={6}>
            <Space
              direction="vertical"
              size="middle"
              style={{
                display: 'flex',
              }}
            >
              <Form
                {...layout}
                  form={form}
                  name="register"
                  onFinish={onCreateMovie}
                  initialValues={{}}
                  scrollToFirstError
              >

                <Form.Item
                  label="Title"
                  name="title"
                  required
                  tooltip="This is a required field"
                  values={title}
                  onChange={handleTitleeChange}
                  rules={[
                    {
                      required: true,
                      message: "Please enter movie title!",
                    },
                  ]}
                >
                  <Input placeholder="Movie Title" />
                </Form.Item>
                <Form.Item
                  label="Rating"
                  name="rating"
                  tooltip="This is a required field"
                  values={rating}
                  onChange={handleRatingChange}
                  rules={[
                    {
                      required: true,
                      message: "Please enter movie rating!",
                    },
                  ]}
                >
                  <InputNumber placeholder="Rating" />
                </Form.Item>
                <Form.Item 
                  label='Image'
                  name="image"
                  tooltip="Image is a required field"
                  valuePropName="fileList"
                  getValueFromEvent={getFile}
                  rules={[
                    {
                      required: true,
                    },
                  ]}                
                  >
                    <Upload listType="picture">
                      <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" style={{marginLeft: 50}}>
                        Add Movie
                    </Button>
                </Form.Item>
              </Form>
            </Space>
          </Col>
        </Row>
      </div>
      </Content>
      </Layout>
  );
};


export default AddMovie;
