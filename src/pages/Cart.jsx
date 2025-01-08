import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout'
import Container from '../components/layout/Container'
import AddAddressAccordion from '../components/specific/AddAddressAccordion'
import AddressCard from '../components/specific/AddressCard'
import CartDetail from '../components/specific/CartDetail'
import { selectItems } from '../redux/cart'

const Cart = () => {

    const cartItems = useSelector(selectItems)

    return (
        <AppLayout>
            <Container pl={false}>
                <div className="grid grid-cols-1 gap-4 md:gap-4 md:grid-cols-2">
                    <div>
                        <AddAddressAccordion />
                        <AddressCard />
                    </div>
                    {
                        cartItems.length ? (
                            <div>
                                <CartDetail />
                            </div>
                        ) : (
                            <Link to={"/"}>
                                <div className='bg-white rounded-lg font-bold text-slate-600 p-4'>
                                    <h1 className='text-lg'>
                                        No Items in Cart, Add some delicious food.
                                    </h1>
                                </div>
                            </Link>
                        )
                    }
                </div>
            </Container>
        </AppLayout>
    )
}

export default Cart