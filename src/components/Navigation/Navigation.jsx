import Loader from '@/components/layout/Loader'
import { Suspense, lazy } from 'react'
import { Toaster } from "react-hot-toast"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import ProtectedRoute from '../auth/ProtectedRoute'
import AuthProtected from '../auth/AuthProtected'
const Home = lazy(() => import("@/pages/Home"))
const Login = lazy(() => import("@/pages/Login"))
const Signup = lazy(() => import("@/pages/Signup"))
const Search = lazy(() => import("@/pages/Search"))
const Restaurant = lazy(() => import("@/pages/Restaurant"))
const Cart = lazy(() => import("@/pages/Cart"))
const ComingSoon = lazy(() => import("@/pages/ComingSoon"))
const Orders = lazy(() => import("@/pages/Orders"))
const PageNotFound = lazy(() => import("../shared/PageNotFound"))
const Navigation = ({authLoading}) => {
    return (
        <BrowserRouter>
            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route element={<ProtectedRoute authLoading={authLoading} />}>
                        <Route path='/orders' element={<Orders />} />
                    </Route>
                    <Route element={<AuthProtected authLoading={authLoading}/>}>
                        <Route path='/login' element={<Login />} />
                        <Route path='/signup' element={<Signup />} />
                    </Route>
                    <Route path='/' element={<Home />} />
                    <Route path='/coming-soon' element={<ComingSoon />} />
                    <Route path='/search' element={<Search />} />
                    <Route path='/restaurant/:id' element={<Restaurant />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path="*" element = {<PageNotFound />} />
                </Routes>
            </Suspense>
            <Toaster position='top-right' />
        </BrowserRouter>
    )
}

export default Navigation