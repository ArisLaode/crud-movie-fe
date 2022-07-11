
import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import {Layout , Row, Col, Image} from 'antd';
import StarRatingComponent from 'react-star-rating-component';
import { StarFilled} from '@ant-design/icons';
import restClient from '../utils/restClient';
import {readMovie} from '../utils/Config';
import HeaderHome from '../components/headerHome';

const { Content } = Layout;


function Index() {

  const [movies, setMovies] = useState([]);

	const getMovieRequest = async (body) => {

		const resListMovie = await restClient.post(readMovie, body)
    setMovies(resListMovie.results);
	};


	useEffect(() => {
    const body = {}
		getMovieRequest(body);
	}, []);


  return (
    <Layout style={{ minHeight: '95vh' }}>
      <HeaderHome />
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
            </Col>
          ))}              
        </Row>
        </div>
      </Content>
      </Layout>
  );
};


export default Index;
