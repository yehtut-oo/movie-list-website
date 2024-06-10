import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, Button, Placeholder, Row, Col } from 'react-bootstrap';
import { CiBookmark } from "react-icons/ci";
import { IoBookmark } from "react-icons/io5";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import noimage from '../assets/images/no-image.png';
import 'react-lazy-load-image-component/src/effects/blur.css';
import "./MovieCard.css";

const BookmarkCard = ({ title, poster_path, id, handleDelete }) => {

    const path = `https://image.tmdb.org/t/p/original${poster_path}`;

    return (
        <>
            <Link to={`/movie/${id}`}>
                <Card style={{width : "18rem", marginBottom: "1.5rem", border: "none"}}>
                    {poster_path === null ? (
                        <LazyLoadImage 
                        src={noimage}
                        placeholderSrc={path}
                        effect='blur'
                        className="movie-image"
                        />
                    ) : (
                        <LazyLoadImage 
                        src={path}
                        placeholderSrc={path}
                        effect='blur'
                        className="movie-image"
                        />
                    )}
                </Card>
            </Link>
            
            <Container>
                <Row>
                    <Col md={{span:8}}>
                        <p>{title}</p>
                    </Col>
                    <Col>
                    <Button id="add-btn" onClick={() => handleDelete(id)}>Delete</Button>  
                    </Col>
                </Row>
            </Container>
            
        </>
    )
}

export default BookmarkCard;

{/* <Card.Img 
    className="movie-image"
    variant="top" 
    src={`https://image.tmdb.org/t/p/original${path}`}
    loading="lazy"
    onLoadStart={() => setIsLoading(true)}
    onLoadedData={() => setIsLoading(false)}
    /> */}