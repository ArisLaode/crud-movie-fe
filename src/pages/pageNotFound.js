import { Button, Result, Row, Col, Layout } from 'antd';
import { Link } from 'react-router-dom';
import Header from "../components/Header";
import BreadCrumb from "../components/BreadCrumb";

const { Content } = Layout;

const PageNotFound = () => (
  <Layout style={{ minHeight: '95vh' }}>
  <Header />
  <BreadCrumb />
  <Content
  style={{
    padding: '0 50px',
  }}
  >
    <div className="site-layout-content">
      <Row type="flex" justify="center" align="middle" style={{ minHeight: '80vh' }}>
      <Col xs={6} lg={6} >
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={<Link to="/home"><Button type="primary">Back Home</Button></Link>}
        />
      </Col>
      </Row>
    </div>
  </Content>
  </Layout>

);

export default PageNotFound;