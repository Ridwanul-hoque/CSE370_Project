import React, { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import { Link } from 'react-router-dom';

const MyBooks = () => {
    const [books, setBooks] = useState([])

    const { user } = useAuth()

    useEffect(() => {
        fetch(`http://localhost:5000/books?email=${user.email}`)
            .then(res => res.json())
            .then(data => setBooks(data))

    }, [user.email])
    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>Book Name</th>
                        <th>Admin</th>
                        <th>Update</th>

                    </tr>
                </thead>
                <tbody>

                    {
                        books.map((book, index) =>
                            <tr>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={book.image}
                                                    alt={book.bookName} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{book.bookName}</div>
                                            <div className="text-sm opacity-50">{book.author}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {book.email}

                                </td>
                                <td><Link to={`/updateBooks/${book._id}`}>
                                    <button className="btn btn-ghost btn-xs bg-green-800 text-white">
                                        Update
                                    </button>
                                </Link></td>
                            </tr>)
                    }


                </tbody>
            </table>
        </div>
    );
};

export default MyBooks;