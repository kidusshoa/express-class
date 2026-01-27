import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const BackButton = ({ destination = '/' }) => {
    return (
        <div className='flex'>
            <Link
                to={destination}
                className='btn btn-primary'
                style={{ padding: '0.5rem 1rem' }}
            >
                <ArrowLeft size={20} />
            </Link>
        </div>
    );
};

export default BackButton;
