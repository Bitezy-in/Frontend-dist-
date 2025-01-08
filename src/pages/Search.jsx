import Loader from '@/components/layout/Loader'
import RestaurantCard from '@/components/shared/RestaurantCard'
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout'
import Container from '../components/layout/Container'
import CuisineCarousel from '../components/layout/CuisineCarousel'
import SearchBar from '../components/layout/SearchBar'

const Search = () => {
    const [restaurants, setRestaurants] = useState([])
    const [loading, setLoading] = useState(false)
    const [resultReturned, setResultReturned] = useState(true)
    const [searchParams] = useSearchParams();
    const name = searchParams.get('name');
    const [cuisineName, setCuisineName] = useState("");
    const [resultName, setResultName] = useState("")
    useEffect(() => {
        setCuisineName(name);
    }, [name])
    const handleResultName = (resName) => {
        setResultName(resName);
    }
    return (
        <>
            {
                loading ? <Loader /> : (
                    <AppLayout>
                        <Container >
                            <SearchBar setResultReturned={setResultReturned} onSetRestaurants={(rest) => setRestaurants(rest)} cuisineName={cuisineName} onResultName={handleResultName} />
                            <CuisineCarousel />
                            {resultName && (
                                <>
                                    <div className='font-semibold text-lg underline'>Results for {resultName} in Restaurants</div>
                                    <div className='mt-5 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 sm:gap-8 gap-4'>
                                        {restaurants?.length > 0 ? (
                                            restaurants?.map(restaurant => (
                                                <Link key={restaurant?._id} to={`/restaurant/${restaurant._id}`}>
                                                    <RestaurantCard restaurant={restaurant} />
                                                </Link>
                                            ))
                                        ) : (
                                            resultReturned && (
                                                <div className='font-bold text-xl'>
                                                    No Restaurant found!!
                                                </div>
                                            )
                                        )}
                                    </div>
                                </>
                            )}
                        </Container>
                    </AppLayout>
                )
            }
        </>
        // <CuisineCarousel />
    )
}

// export default AppLayout()(Search)
export default Search