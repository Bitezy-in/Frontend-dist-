import { googleapikey } from '@/components/constants/config';
import Loader from '@/components/layout/Loader';
import { DistanceMatrixService, useLoadScript } from '@react-google-maps/api';

const DistanceMatrixCalculator = ({ lat1 = 13.5631658, long1 = 80.0199452, lat2 = 13.5631658, long2 = 80.0199452, onCalcDistance }) => {

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: googleapikey, // Replace with your API key
    });

    if (!isLoaded) return <Loader />;

    const handleCallback = (response) => {
        if (response && response.rows[0].elements[0].status === 'OK') {
            onCalcDistance(response.rows[0].elements[0].distance.value/1000);
        } else {
            console.error('DistanceMatrix request failed');
        }
    };
    const destinations = [{ lat: lat1, lng: long1 }]
    const origins = [{ lat: lat2, lng: long2 }]
    return (
        <DistanceMatrixService
            options={{
                origins: origins,
                destinations: destinations,
                travelMode: 'DRIVING',
            }}
            callback={handleCallback}
        />
    );
};

export default DistanceMatrixCalculator;