import { defaultBaseSortFn } from "match-sorter";
import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import SignIn from "../pages/SignIn/SignIn";
import BooksDetails from "../pages/BooksDetails/BooksDetails";
import PrivateRoute from "./PrivateRoute";
import AddBooks from "../pages/AddBooks/AddBooks";
import MyBooks from "../pages/MyBooks/MyBooks";
import ListedBooks from "../pages/ListedBooks/ListedBooks";
import UpdateBooks from "../pages/UpdateBooks/UpdateBooks";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <h2>Route Not Found</h2>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/books/:id',
                element: <PrivateRoute><BooksDetails></BooksDetails></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5005/books/${params.id}`)
            },
            {
                path: 'addBook',
                element: <PrivateRoute><AddBooks></AddBooks></PrivateRoute>
            },
            {
                path: 'updateBooks/:id',
                element: <PrivateRoute><UpdateBooks></UpdateBooks></PrivateRoute>
            },
            {
                path: 'listedBooks',
                element: <PrivateRoute><ListedBooks></ListedBooks></PrivateRoute>
            },
            {
                path: 'yourBooks',
                element: <PrivateRoute><MyBooks></MyBooks></PrivateRoute>
            },
            {
                path: 'register',
                element: <Register></Register>
            },
            {
                path: 'signIn',
                element: <SignIn></SignIn>
            }
        ]
    },
]);


export default router;