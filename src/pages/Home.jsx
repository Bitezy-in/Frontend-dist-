import { lazy, useEffect, useState, useMemo } from 'react';
import AppLayout from '../components/layout/AppLayout';
import Container from '../components/layout/Container';
import SwipeToSlide from '../components/layout/SwipeToSlide';
import { Link } from 'react-router-dom';
import axiosInstance from '@/api/axiosInstance';
import socket from '@/socket';
import Loader from '@/components/layout/Loader';
import ChatWidget from '@/components/ChatWidget/ChatWidget';

const Carousel = lazy(() => import('../components/layout/Carousel'));
const RestaurantCard = lazy(() => import('../components/shared/RestaurantCard'));
import { cuisines } from '@/components/constants/cuisines';

const Home = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchRestaurants = async () => {
        setLoading(true);
        try {
            const { data } = await axiosInstance.get("/restaurants");
            setRestaurants(data.restaurants);
        } catch (err) {
            console.error("Error fetching restaurants:", err);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        socket.emit("joinCustomerRoom");
        fetchRestaurants();
        const handleRestaurantStatusUpdated = ({ restaurantId, isOpen }) => {
            setRestaurants((prevRestaurants) =>
                prevRestaurants.map((restaurant) =>
                    restaurant._id === restaurantId
                        ? { ...restaurant, isOpen }
                        : restaurant
                )
            );
        };



        socket.on("restaurantStatusUpdate", handleRestaurantStatusUpdated);

        return () => {
            socket.off("restaurantStatusUpdate", handleRestaurantStatusUpdated);
        };
    }, []);


    const restaurantCards = useMemo(() => {
        return restaurants?.map(restaurant => (
            <Link key={restaurant?._id} to={`/restaurant/${restaurant._id}`}>
                <RestaurantCard restaurant={restaurant} />
            </Link>
        ));
    }, [restaurants]);

    return (
        <AppLayout>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <Container pl={false}>
                        {/* <>we need to remove the mt-6 from main div</> */}
                        <div className="flex flex-col gap-4 h-[80vh]">
                            <Carousel />
                            <div className="border-b-2 border-slate-200">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                                        What&apos;s on your mind?
                                    </h3>
                                </div>
                                <SwipeToSlide cuisines={cuisines} size={16} />
                            </div>
                            <div className='mt-8 pb-16 md:pb-10 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-8 gap-4'>
                                {restaurants?.length > 0 ? (
                                    restaurantCards
                                ) : (
                                    !loading && (
                                        <div className='font-bold text-center'>
                                            No Restaurant found in this location!!
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                            <ChatWidget />
                        {/* <Footer /> */}
                    </Container>
                </>
            )}
        </AppLayout>
    );
};

export default Home;
