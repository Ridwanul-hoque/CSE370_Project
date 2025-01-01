import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateBooks = () => {
    const { id } = useParams(); // Get the book ID from the route
    const navigate = useNavigate();
    const [book, setBook] = useState(null); // To store book data

    useEffect(() => {
        // Fetch the book data by ID
        fetch(`https://boi-poka-server-eta.vercel.app/books/${id}`)
            .then((res) => res.json())
            .then((data) => setBook(data))
            .catch((error) => console.error('Error fetching book:', error));
    }, [id]);

    const handleUpdateBook = (event) => {
        event.preventDefault();
        const form = event.target;
        const updatedBook = {
            bookName: form.bookName.value,
            author: form.author.value,
            category: form.category.value,
            price: form.price.value,
            publisher: form.publisher.value,
            yearOfPublishing: form.yearOfPublishing.value,
            tags: form.tags.value.split('\n'),
            totalPages: form.totalPages.value,
            rating: form.rating.value,
            review: form.review.value,
            image: form.image.value,
            email: form.email.value,
        };

        // Send the updated book data to the server
        fetch(`https://boi-poka-server-eta.vercel.app/books/${id}?email=${updatedBook.email}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedBook),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Book Update",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/yourBooks');
                }
            })
            .catch((error) => console.error('Error updating book:', error));

    };

    if (!book) {
        return <p>Loading...</p>; // Show a loading message while fetching data
    }

    return (
        <div className='bg-pink-100 p-4 rounded-lg mb-6'>
            <h2 className='text-2xl font-extrabold flex justify-center'>Update Your Book</h2>
            <form onSubmit={handleUpdateBook} className="card-body">
                <div className='flex flex-col lg:flex-row gap-5'>
                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text">Book Name</span>
                        </label>
                        <input
                            type="text"
                            name='bookName'
                            defaultValue={book.bookName}
                            className="input input-bordered"
                            required
                        />
                    </div>
                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text">Author</span>
                        </label>
                        <input
                            type="text"
                            name='author'
                            defaultValue={book.author}
                            className="input input-bordered"
                            required
                        />
                    </div>
                </div>
                <div className='flex flex-col lg:flex-row gap-5'>
                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text">Book Genre</span>
                        </label>
                        <input
                            type="text"
                            name='category'
                            defaultValue={book.category}
                            className="input input-bordered"
                            required
                        />
                    </div>
                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input
                            type="text"
                            name='price'
                            defaultValue={book.price}
                            className="input input-bordered"
                            required
                        />
                    </div>
                </div>
                <div className='flex flex-col lg:flex-row gap-5'>
                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text">Publisher</span>
                        </label>
                        <input
                            type="text"
                            name='publisher'
                            defaultValue={book.publisher}
                            className="input input-bordered"
                            required
                        />
                    </div>
                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text">Publication Year</span>
                        </label>
                        <input
                            type="text"
                            name='yearOfPublishing'
                            defaultValue={book.yearOfPublishing}
                            className="input input-bordered"
                            required
                        />
                    </div>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Tags</span>
                    </label>
                    <textarea
                        className="textarea textarea-bordered"
                        name='tags'
                        defaultValue={book.tags?.join('\n')}
                        required
                    ></textarea>
                </div>
                <div className='flex flex-col lg:flex-row gap-5'>
                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text">Total Page</span>
                        </label>
                        <input
                            type="text"
                            name='totalPages'
                            defaultValue={book.totalPages}
                            className="input input-bordered"
                            required
                        />
                    </div>
                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text">Rating</span>
                        </label>
                        <input
                            type="text"
                            name='rating'
                            defaultValue={book.rating}
                            className="input input-bordered"
                            required
                        />
                    </div>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <input
                        type="text"
                        name='review'
                        defaultValue={book.review}
                        className="input input-bordered"
                        required
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Photo URL</span>
                    </label>
                    <input
                        type="text"
                        name='image'
                        defaultValue={book.image}
                        className="input input-bordered"
                        required
                    />
                </div>
                <div className="form-control flex-1">
                    <label className="label">
                        <span className="label-text">User Email</span>
                    </label>
                    <input
                        type="email"
                        name='email'
                        defaultValue={book.email}
                        className="input input-bordered"
                        readOnly
                    />
                </div>
                <div className="form-control mt-6">
                    <button type='submit' className="btn bg-pink-400 text-white">Update Book</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateBooks;
