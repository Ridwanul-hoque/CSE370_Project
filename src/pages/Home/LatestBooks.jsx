import React, { useEffect, useState } from 'react';
import LatestBookCard from './LatestBookCard';

const LatestBooks = () => {
    const [books, setBooks] = useState([])
    useEffect(() => {
        fetch('https://boi-poka-server-eta.vercel.app/books')
            .then(res => res.json())
            .then(data => setBooks(data))

    }, [])
    return (
        <div>
            <div className='grid grid-cols-1 sm:grid_cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                    books.map(book => <LatestBookCard key={book._id} book={book}></LatestBookCard>)
                }
            </div>

        </div>
    );
};

export default LatestBooks;