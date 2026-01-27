import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowBook = () => {
    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5555/books/${id}`)
            .then((response) => {
                setBook(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    return (
        <div className='container'>
            <BackButton />
            <h1 className='title' style={{ marginTop: '2rem' }}>Show Book</h1>
            {loading ? (
                <Spinner />
            ) : (
                <div className='card' style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <div style={{ marginBottom: '1rem' }}>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Id</span>
                        <div style={{ fontWeight: 500 }}>{book._id}</div>
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Title</span>
                        <div style={{ fontWeight: 500 }}>{book.title}</div>
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Author</span>
                        <div style={{ fontWeight: 500 }}>{book.author}</div>
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Publish Year</span>
                        <div style={{ fontWeight: 500 }}>{book.publishYear}</div>
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Create Time</span>
                        <div style={{ fontWeight: 500 }}>{new Date(book.createdAt).toString()}</div>
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Last Update Time</span>
                        <div style={{ fontWeight: 500 }}>{new Date(book.updatedAt).toString()}</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowBook;
