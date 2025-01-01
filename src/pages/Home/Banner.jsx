import React from 'react';
import { easeInOut, motion } from "framer-motion"
import book2 from '../../assets/Books/Book2.jpg'
import book1 from '../../assets/Books/Book1.jpg'


const Banner = () => {
    return (
        <div className="hero bg-pink-100 rounded-md my-4 min-h-96">
            <div className="hero-content flex-col lg:flex-row-reverse ml-28">
                <div className='flex-1'>
                    <motion.img
                        src={book2}
                        animate={{ y: [50, 100, 50] }}
                        transition={{ duration: 10, repeat: Infinity }}
                        className="max-w-sm w-64 rounded-t-[40px] rounded-br-[40px] border-l-8 border-b-4 border-pink-700 shadow-2xl" />
                    <motion.img
                        src={book1}
                        animate={{ x: [100, 150, 100] }}
                        transition={{ duration: 10, delay: 5, repeat: Infinity }}
                        className="max-w-sm w-64 rounded-t-[40px] rounded-br-[40px] border-l-8 border-b-4 border-pink-700 shadow-2xl" />
                </div>
                <div className='flex-1'>

                    <motion.h1
                        animate={{ x: 50 }}
                        transition={{ duration: 2, delay: 1, ease: easeInOut, repeat: Infinity }}
                        className="text-5xl font-bold">Latest <motion.span animate={{ color: ['#ecff33', '#33ffe3', '#ffa233'] }} transition={{ duration: 1.5, repeat: Infinity }}>Books</motion.span> For You!</motion.h1>
                    <p className="py-6">
                        Find your next favorite book with our curated collection of bestsellers, classics, and hidden gems—stories you'll love await!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Banner;