import React from 'react';
import { Link } from 'react-router-dom';

const LatestBookCard = ({ book }) => {
    const { id, image, bookName, price, author, publisher, tags = [], category, rating, totalPages, yearOfPublishing } = book;

    return (
        <div>
            <Link to={`/books/${id}`}>
                <div className="card bg-base-100 w-96 shadow-xl p-8">
                    <figure className='bg-pink-200 py-8 rounded-2xl'>
                        <img src={image} className='h-[166px]' alt={bookName} />
                    </figure>
                    <div className="card-body">
                        <div className='flex justify-start gap-4'>
                            {tags.length > 0 ? (
                                tags.map((tag, idx) => (
                                    <button key={idx} className="btn btn-xs bg-pink-800 text-white">
                                        {tag}
                                    </button>
                                ))
                            ) : (
                                <span className="text-gray-500">No tags</span>
                            )}
                        </div>
                        <h2 className="card-title">
                            {bookName}
                            <div className="badge badge-secondary">NEW</div>
                        </h2>
                        <p>By: {author}</p>
                        <div className='text-xs flex'>
                            <p>Published By: {publisher}</p>
                            <div className="border-l border-gray-300 mx-2"></div>
                            <p>Published In: {yearOfPublishing}</p>
                        </div>
                        <div className="border-t-2 border-dashed"></div>
                        <div className="card-actions justify-between flex">
                            <div className="badge badge-outline">{category}</div>
                            <div><span className='font-bold'>Pages:</span> {totalPages}</div>
                            <div className='font-bold'>Price: <span className='font-bold text-pink-950'>BDT {price}</span></div>
                            <div className='flex justify-between'>
                                <div className='mr-2'><span className='font-bold mr-1'>Ratings:</span>{rating}</div>
                                <div className="rating">
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" defaultChecked />
                                    <input type="radio" name="rating-" className="mask mask-star-2 bg-orange-400" />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-200" />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-90" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default LatestBookCard;
