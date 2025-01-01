import React from 'react';
import { Fade, Zoom } from 'react-awesome-reveal';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const AddBooks = () => {
    const { user } = useAuth()
    const navigate = useNavigate()

    const handleAddBooks = e => {
        // e.preventDefault();
        // const formData = new FormData(e.target)
        // // console.log(formData.entries())
        // const initialData = Object.fromEntries(formData.entries)
        // const {...newBook} = initialData;
        // newBook.tags = newBook.tags.split('\n')
        // console.log(newBook)
        e.preventDefault();
        const formData = new FormData(e.target);
        const initialData = Object.fromEntries(formData.entries());
        const { ...newBook } = initialData;
        newBook.tags = newBook.tags.split('\n'); // Convert tags to an array
        // console.log(newBook);


        fetch('https://boi-poka-server-eta.vercel.app/books', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newBook)

        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Book added",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/yourBooks')
                }
            })


    }
    return (
        <div className='bg-pink-100 p-4 rounded-lg mb-6'>
            <Zoom>
                <h2 className='text-2xl font-extrabold flex justify-center'>Add Your Books</h2>
            </Zoom>

            <form onSubmit={handleAddBooks} className="card-body">

                {/* form first row */}
                <Fade cascade>
                    <div className='flex flex-col lg:flex-row gap-5'>
                        <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text">Book Name</span>
                            </label>
                            <input type="text" name='bookName' placeholder="Book Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text">Author</span>
                            </label>
                            <input type="text" name='author' placeholder="Author" className="input input-bordered" required />
                        </div>
                    </div>
                </Fade>
                {/* form second row */}
                <Fade cascade>
                    <div className='flex flex-col lg:flex-row gap-5'>

                        <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text">Book Genre</span>
                            </label>
                            <input type="text" name='category' placeholder="Genre" className="input input-bordered" required />
                        </div>
                        <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input type="text" name='price' placeholder="Price" className="input input-bordered" required />
                        </div>

                    </div>
                </Fade>
                {/* form third row */}
                <Fade cascade>
                    <div className='flex flex-col lg:flex-row gap-5'>
                        <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text">Publisher</span>
                            </label>
                            <input type="text" name='publisher' placeholder="Publisher" className="input input-bordered" required />
                        </div>
                        <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text">Publication Year</span>
                            </label>
                            <input type="text" name='yearOfPublishing' placeholder="Year" className="input input-bordered" required />
                        </div>
                    </div>
                </Fade>
                <Fade cascade>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Tags</span>
                        </label>

                        <textarea className="textarea textarea-bordered" placeholder="Each tags in new Line" name='tags' required></textarea>
                    </div>
                </Fade>

                <Fade cascade>

                    <div className='flex flex-col lg:flex-row gap-5'>

                        <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text">Total Page</span>
                            </label>
                            <input type="text" name='totalPages' placeholder="Number of pages" className="input input-bordered" required />
                        </div>
                        <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text">Rating</span>
                            </label>
                            <input type="text" name='rating' placeholder="Provide Real Rating" className="input input-bordered" required />
                        </div>
                    </div>
                </Fade>


                <Fade cascade>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <input type="text" name='review' placeholder="Description" className="input input-bordered" required />

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input type="text" name='image' placeholder="Photo url" className="input input-bordered" required />

                    </div>
                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text">User Email</span>
                        </label>
                        <input type="email" defaultValue={user?.email} name='email' placeholder="User Email" className="input input-bordered" required />
                    </div>
                    <div className="form-control mt-6">
                        <button type='submit' className="btn bg-pink-400 text-white">Add Book</button>
                    </div>
                </Fade>
            </form>
        </div >
    );
};

export default AddBooks;