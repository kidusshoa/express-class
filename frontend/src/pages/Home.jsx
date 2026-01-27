import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { PlusCircle, Info, Edit, Trash2 } from 'lucide-react';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5000/books')
            .then((response) => {
                setBooks(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    return (
        <div className='container'>
            <div className='flex' style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <h1 className='title' style={{ marginBottom: 0 }}>Books List</h1>
                <Link to='/books/create' className='btn btn-primary'>
                    <PlusCircle size={20} />
                    Add Book
                </Link>
            </div>
            {loading ? (
                <Spinner />
            ) : (
                <div className='grid'>
                    {books.map((book) => (
                        <div key={book._id} className='card'>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <span style={{ backgroundColor: 'var(--accent)', color: 'var(--secondary)', padding: '0.25rem 0.75rem', borderRadius: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
                                    {book.publishedYear}
                                </span>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                                    {book._id.slice(-6)}
                                </span>
                            </div>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>{book.title}</h2>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>by {book.author}</p>

                            <div className='flex' style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1rem', marginTop: 'auto' }}>
                                <Link to={`/books/details/${book._id}`} style={{ color: 'var(--primary)' }}>
                                    <Info size={20} />
                                </Link>
                                <Link to={`/books/edit/${book._id}`} style={{ color: 'var(--accent)' }}>
                                    <Edit size={20} />
                                </Link>
                                <Link to={`/books/delete/${book._id}`} style={{ color: '#ef4444' }}>
                                    <Trash2 size={20} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
