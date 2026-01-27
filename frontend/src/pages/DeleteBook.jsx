import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteBook = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const handleDeleteBook = () => {
        setLoading(true);
        axios
            .delete(`http://localhost:5000/books/${id}`)
            .then(() => {
                setLoading(false);
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                alert('An error happened. Please Check console');
                console.log(error);
            });
    };

    return (
        <div className='container'>
            <BackButton />
            <h1 className='title' style={{ marginTop: '2rem' }}>Delete Book</h1>
            {loading ? <Spinner /> : ''}
            <div className='card' style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Are You Sure You want to delete this book?</h3>
                <button
                    className='btn btn-danger'
                    style={{ width: '100%', padding: '1rem' }}
                    onClick={handleDeleteBook}
                >
                    Yes, Delete it
                </button>
            </div>
        </div>
    );
};

export default DeleteBook;
