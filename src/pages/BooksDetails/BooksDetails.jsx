import React from 'react';
import { useLoaderData } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';

const BooksDetails = () => {
    const { user } = useAuth()


    const book = useLoaderData()

    const { _id, ...OtherInfo } = book
    const { image, review, bookName, author,
        publisher, price, rating, category } = book




    const handleBuyNow = () => {
        const bookData = { ...OtherInfo, userEmail: user?.email };
        fetch('https://boi-poka-server-eta.vercel.app/books-cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success',
                        text: 'Book added to cart',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                      })
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'Book Did not added cart',
                        icon: 'error',
                        confirmButtonText: 'Cool'
                      })
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('An error occurred while adding the book to the cart.');
            });

    }

    // console.log(book)
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="card bg-base-100 image-full w-96 shadow-xl">
                <figure>
                    <img
                        src={image}
                        alt={bookName} />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{bookName}</h2>
                    <p>By: {author}</p>
                    <p>Published By: {publisher}</p>
                    <p>{review}</p>
                    <div className='flex justify-between'>
                        <div>
                            <p>Genre: {category}</p>
                            <p>Ratings: {rating}</p>
                        </div>
                        <div>
                            <p>Price: BDT {price}</p>
                        </div>
                    </div>

                    <p></p>
                    <div className="card-actions justify-end">
                        <button onClick={handleBuyNow} className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BooksDetails;