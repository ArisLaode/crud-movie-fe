
import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import {Layout , Row, Col, Image, Divider, Space, Button,  Form, Input, InputNumber, Modal, Upload} from 'antd';
import StarRatingComponent from 'react-star-rating-component';
import Header from "../components/Header";
import BreadCrumb from "../components/BreadCrumb";
import { StarFilled, EditOutlined, DeleteOutlined, UploadOutlined} from '@ant-design/icons';
import restClient from '../utils/restClient';
import {updateMovie, readMovie, deleteMovie} from '../utils/Config';
import { NotifUpdateSuccess, NotifDeleteSuccess, NotifError } from '../components/Notification';
import { useHistory } from 'react-router-dom';

const { Content } = Layout;

const CollectionUpdateForm = ({ dataEdit, visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  if (dataEdit != null) {
      form.setFieldsValue({
          "id": dataEdit.id,
          "title": dataEdit.title,
          "rating": dataEdit.rating,
          "owned": dataEdit.owned,
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
      <Modal
          visible={visible}
          title="Update Movie"
          okText="Submit"
          cancelText="Cancel"
          onCancel={onCancel}
          onOk={() => {
              form
              .validateFields()
              .then((values) => {
                  form.resetFields();
                  onCreate(values);
              })
              .catch((info) => {
                  console.log('Validate Failed:', info);
              });
          }}
      >
          <Form
              form={form}
              name="basic"
              labelCol={{
                  span: 8,
              }}
              wrapperCol={{
                  span: 16,
              }}
              initialValues={{
              }}
              autoComplete="off"
          >
              <Form.Item
                  label="Title"
                  name="title"
                  rules={[
                    {
                      required: true,
                      message: "Title is required!"
                    }
                  ]}
              >
                  <Input />
              </Form.Item>

              <Form.Item
                  label="Rating"
                  name="rating"
                  rules={[
                    {
                      required: true,
                      message: "Rating is required!"
                    }
                  ]}
              >
                  <InputNumber />
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
              <Form.Item
                  label="Owned"
                  name="owned"
                  rules={[
                    {
                      required: true,
                      message: "Title is required!"
                    }
                  ]}
              >
                  <Input />
              </Form.Item>
              <Form.Item
                  wrapperCol={{
                      offset: 8,
                      span: 16,
                  }}
              >

              </Form.Item>
          </Form>
      </Modal>
  );
};


const CollectionsUpdatePage = ({ valueData }) => {
  const history = useHistory();
  const [isEditing, setIsEditing] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);

  const resetEditing = () => {
      setIsEditing(false);
      setEditingAccount(null);
    };

  const onEditAccount = (valueData) => {
      setIsEditing(true);
      setEditingAccount({ ...valueData });
    }

  const onCreate = async (values) => {
      setIsEditing(false);
      const file = values.image[0].originFileObj;
      const base64 = await convertBase64(file);
      var payload = {
          id: editingAccount.id,
          title: values.title,
          rating: values.rating,
          image: base64,
          owned: values.owned,
      }

      const resultCreateMovie = await restClient.post(updateMovie, payload)
      if (resultCreateMovie.status === 201) {
          history.push('/home')
          NotifError('error', resultCreateMovie.message)
      }

      if (resultCreateMovie.status === 200) {
          history.push('/home')
          NotifUpdateSuccess('success', resultCreateMovie.message)
      }
      resetEditing()
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

  return (
      <div>
          <EditOutlined
              onClick={() => {
                  onEditAccount(valueData);
              }} 
          />
          <CollectionUpdateForm
              dataEdit={editingAccount}
              visible={isEditing}
              onCreate={onCreate}
              onCancel={() => {
                  setIsEditing(false);
              }}
          />
      </div>
  );
};

function Home() {

  const history = useHistory();
  const [movies, setMovies] = useState([]);

	const getMovieRequest = async (body) => {

		const resListMovie = await restClient.post(readMovie, body)
    setMovies(resListMovie.results);
	};

  const onDeleteComment = (movie) => {
    Modal.confirm({
      title: "You want to delete this movie?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        restClient.post(deleteMovie, { "id": movie.id });
        NotifDeleteSuccess('success');
        setMovies((pre) => {
          return pre.filter((movie) => movie.id);
        });
      },

    });
  };


	useEffect(() => {
    const body = {}
		getMovieRequest(body);
	}, []);


  return (
    <Layout style={{ minHeight: '95vh' }}>
      <Header />
      <BreadCrumb />
      <Content
      style={{
        padding: '0 50px',
      }}
      >
        <div className="site-layout-content">
        <Row gutter={16}>
          {movies.map((movie, index) => (
            <Col key={index} span={8}>
                <p>
                  <b>{movie.title}</b>
                </p>
                <p>
                  <Image
                    width={300}
                    height={200}
                    alt={movie.title}
                    src={movie.image}
                    preview={false}
                  />
                </p>
                <p>
                  <b>Rating : {movie.rating}</b><br />
                  <StarRatingComponent 
                    name="rate2" 
                    editing={false}
                    renderStarIcon={() => <span><StarFilled /></span>}
                    starCount={10}
                    value={movie.rating}
                  />
                </p>
                <p><i>Created by <b>{movie.owned}</b></i></p>
                <Space>
                  <CollectionsUpdatePage valueData={movie} />
                  <DeleteOutlined
                    onClick={() => {
                      onDeleteComment(movie);
                    }}
                    style={{ color: "red", marginLeft: 7 }}
                  />
                </Space>
                <Divider />
            </Col>
          ))}
        
        </Row>
        </div>
      </Content>
      </Layout>
  );
};


export default Home;
