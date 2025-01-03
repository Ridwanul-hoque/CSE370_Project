import React, { useEffect, useState } from 'react';
import LatestBookCard from './LatestBookCard';

const LatestBooks = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetch('http://localhost:5005/books')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setBooks(data);
                    setFilteredBooks(data); // Store books data
                } else {
                    throw new Error('Invalid response format');
                }
            })
            .catch(err => {
                console.error('Error fetching books:', err);
                setError('Failed to load books.');
            });
    }, []);
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = books.filter(book =>
            book.bookName.toLowerCase().includes(query)
        );
        setFilteredBooks(filtered);
    };

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search books by name"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="input input-bordered w-full max-w-xs"
                />
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {filteredBooks.length > 0 ? (
                    filteredBooks.map(book => (
                        <LatestBookCard key={book.id} book={book} />
                    ))
                ) : (
                    <p>No books found.</p>
                )}
            </div>
        </div>
    );
};

export default LatestBooks;
