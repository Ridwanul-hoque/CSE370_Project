import React, { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';

const ListedBooks = () => {
    const [books, setBooks] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', address: '', phone: '' });
    const [totalBeforePurchase, setTotalBeforePurchase] = useState(0);

    const { user } = useAuth()

    useEffect(() => {
        fetch(`https://boi-poka-server-eta.vercel.app/books-cart?email=${user.email}`)
            .then(res => res.json())
            .then(data => setBooks(data))

    }, [user.email])


    const handleRemove = (id) => {
        fetch(`https://boi-poka-server-eta.vercel.app/books-cart/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    setBooks(books.filter(book => book._id !== id));
                }
            });
    };
    const handleBuyAll = () => {
        setTotalBeforePurchase(totalPrice);
        fetch(`https://boi-poka-server-eta.vercel.app/books-cart?email=${user.email}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    setBooks([]); // Clear all books after purchase
                    setIsModalOpen(true);

                    setTimeout(() => {
                        setFormData({ name: '', address: '', phone: '' });
                        setIsModalOpen(false);  // Close the modal after 4 seconds
                    }, 1000);
                }
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const totalPrice = books.reduce((sum, book) => sum + parseFloat(book.price || 0), 0);

    return (
        <div className="overflow-x-auto">
            <div className="mb-4 flex justify-between items-center p-4 bg-gray-100 rounded-lg">
                <div className="text-xl font-bold">Total Price: ৳ {totalPrice.toFixed(2)}</div>
                <button onClick={handleBuyAll} className="btn bg-pink-600 text-white">Buy All</button>
            </div>
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>Book Name</th>
                        <th>Admin</th>
                        <th>Price(BDT)</th>
                        <th>Delete</th>
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
                                            <div className="font-bold">{book.author}</div>
                                            <div className="text-sm opacity-50">{book.publisher}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {book.email}

                                </td>
                                <td>
                                    <div>৳ {book.price}</div>
                                </td>
                                <th>
                                    <button onClick={() => handleRemove(book._id)} className="btn btn-ghost btn-xs bg-pink-800 text-white">Remove</button>
                                </th>
                            </tr>)
                    }


                </tbody>
            </table>
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                <div className="flex flex-col gap-4">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your name"
                        className="input input-bordered w-full"
                    />
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Enter your address"
                        className="input input-bordered w-full"
                    />
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                        className="input input-bordered w-full"
                    />
                </div>
            </div>


            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 mb-4 animate-bounce">
                            <svg
                                className="w-10 h-10 text-green-600"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-center">Thank you for purchasing!</h3>
                        <div className="mt-4 text-center">
                            <p><strong>Total Price:</strong> ৳ {totalBeforePurchase.toFixed(2)}</p>
                            <p><strong>Name:</strong> {formData.name}</p>
                            <p><strong>Address:</strong> {formData.address}</p>
                            <p><strong>Phone:</strong> {formData.phone}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


export default ListedBooks;