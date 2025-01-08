// import React from 'react'
// import { useMediaQuery } from 'react-responsive'

// const ComingSoon = () => {
//     const isMobile = useMediaQuery({ query: '(max-width: 640px)' }); // Tailwind's sm breakpoint

//     return (
//         <div className='h-[100vh] w-full flex justify-center items-center'>
//             {isMobile ? (
//                 <img src="/coming-soon-mobile.png" alt="coming-soon-mobile" className='max-h-[100vh] w-full object-cover' />
//             ) : (
//                 <img src="/coming-soon.png" alt="coming-soon" className='max-h-[100vh] w-full object-cover' />
//             )}
//         </div>
//     )
// }

// export default ComingSoon

// import { googleapikey } from '@/components/constants/config';
// import React, { useEffect, useRef, useState } from 'react';
// import { Card, CardContent } from '@/components/ui/card';
// import { AlertCircle } from 'lucide-react';

// const CenteredMapMarker = () => {
//   const mapRef = useRef(null);
//   const [error, setError] = useState(null);
//   const [mapCenter, setMapCenter] = useState(null);
  
//   const defaultLocation = { lat: -34.397, lng: 150.644 };
  
//   const createCustomMarker = () => {
//     const svgMarker = {
//       path: `M 12,0 C 5.364,0 0,5.364 0,12 c 0,7.732 12,24 12,24 0,0 12,-16.268 12,-24 
//             C 24,5.364 18.636,0 12,0 Z 
//             M 12,16 c -2.209,0 -4,-1.791 -4,-4 0,-2.209 1.791,-4 4,-4 2.209,0 4,1.791 4,4 
//             0,2.209 -1.791,4 -4,4 z`,
//       fillColor: '#FF3B30',
//       fillOpacity: 1,
//       strokeWeight: 2,
//       strokeColor: '#FFFFFF',
//       scale: 1.5,
//       anchor: new window.google.maps.Point(12, 36),
//       labelOrigin: new window.google.maps.Point(12, -20)
//     };
    
//     return svgMarker;
//   };
  
//   useEffect(() => {
//     const customLabelStyle = `
//       .custom-marker-label {
//         background-color: white !important;
//         padding: 6px 10px !important;
//         border-radius: 10px !important;
//         box-shadow: 0 2px 4px rgba(0,0,0,0.2) !important;
//         border: 2px solid #FF3B30 !important;
//         font-family: Arial, sans-serif !important;
//         font-size: 13px !important;
//         font-weight: bold !important;
//         color: #FF3B30 !important;
//         white-space: pre-line !important;
//         text-align: center !important;
//         line-height: 1.4 !important;
//         max-width: 300px !important;
//       }
//     `;

//     const styleSheet = document.createElement("style");
//     styleSheet.textContent = customLabelStyle;
//     document.head.appendChild(styleSheet);

//     const loadGoogleMapsScript = () => {
//       if (window.google) {
//         initMap();
//         return;
//       }

//       const script = document.createElement('script');
//       script.src = `https://maps.googleapis.com/maps/api/js?key=${googleapikey}`;
//       script.async = true;
//       script.defer = true;
//       script.onload = initMap;
//       script.onerror = () => setError('Failed to load Google Maps');
//       document.head.appendChild(script);
//     };

//     const initMap = () => {
//       if (!mapRef.current) return;

//       const map = new window.google.maps.Map(mapRef.current, {
//         center: defaultLocation,
//         zoom: 16,
//         // Disable controls that might overflow
//         fullscreenControl: false,
//         mapTypeControl: false,
//         streetViewControl: false,
//         zoomControlOptions: {
//           position: window.google.maps.ControlPosition.RIGHT_CENTER
//         }
//       });

//       // Trigger resize event after map initialization
//       setTimeout(() => {
//         window.google.maps.event.trigger(map, 'resize');
//       }, 100);

//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             const userLocation = {
//               lat: position.coords.latitude,
//               lng: position.coords.longitude,
//             };

//             map.setCenter(userLocation);
//             setMapCenter(userLocation);

//             const marker = new window.google.maps.Marker({
//               position: userLocation,
//               map: map,
//               label: {
//                 text: "Your order will be delivered here.\nMove pin to your exact location.",
//                 className: "custom-marker-label"
//               },
//               icon: createCustomMarker(),
//               animation: window.google.maps.Animation.DROP
//             });

//             const pulseCircle = new window.google.maps.Circle({
//               strokeColor: '#FF3B30',
//               strokeOpacity: 0.8,
//               strokeWeight: 1,
//               fillColor: '#FF3B30',
//               fillOpacity: 0.3,
//               map: map,
//               center: userLocation,
//               radius: 30,
//               animation: window.google.maps.Animation.DROP
//             });

//             map.addListener('center_changed', () => {
//               const center = map.getCenter();
//               marker.setPosition(center);
//               pulseCircle.setCenter(center);
//             });

//             map.addListener('idle', () => {
//               const center = map.getCenter();
//               const newCenter = {
//                 lat: center.lat(),
//                 lng: center.lng()
//               };
//               setMapCenter(newCenter);
//             });
//           },
//           () => {
//             setError('Error: The Geolocation service failed.');
//           }
//         );
//       } else {
//         setError("Error: Your browser doesn't support geolocation.");
//       }
//     };

//     loadGoogleMapsScript();

//     return () => {
//       const script = document.querySelector(`script[src*="maps.googleapis.com/maps/api/js"]`);
//       if (script) {
//         script.remove();
//       }
//       if (styleSheet) {
//         styleSheet.remove();
//       }
//     };
//   }, [googleapikey]);

//   return (
//     <div className="w-full h-screen flex items-center justify-center bg-gray-100 p-4">
//       <div className="relative w-1/2 aspect-square max-h-[50vh] bg-white rounded-lg shadow-lg">
//         {error && (
//           <Card className="absolute top-2 left-2 z-10">
//             <CardContent className="p-2">
//               <div className="flex items-center gap-2 text-red-500">
//                 <AlertCircle size={16} />
//                 <p className="text-sm">{error}</p>
//               </div>
//             </CardContent>
//           </Card>
//         )}
        
//         {mapCenter && (
//           <Card className="absolute top-2 right-2 z-10 bg-white/90 backdrop-blur shadow-lg">
//             <CardContent className="p-2">
//               <div className="space-y-1">
//                 <p className="font-medium text-sm text-gray-900">Current Location</p>
//                 <div className="text-xs text-gray-600">
//                   <p>Latitude: {mapCenter.lat.toFixed(6)}</p>
//                   <p>Longitude: {mapCenter.lng.toFixed(6)}</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         )}
        
//         <div 
//           ref={mapRef} 
//           className="w-full h-full rounded-lg overflow-hidden"
//           data-testid="google-map"
//         />
//       </div>
//     </div>
//   );
// };

// export default CenteredMapMarker;

import React, { useState } from 'react';
import { DistanceMatrixService, useLoadScript } from '@react-google-maps/api';
import { googleapikey } from '@/components/constants/config';
import Loader from '@/components/layout/Loader';

const DistanceMatrixCalculator = ({lat1, long1, lat2, long2, onCalcDistance}) => {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleapikey, // Replace with your API key
  });

  if (!isLoaded) return <Loader />;

  const handleCallback = (response) => {
    if (response && response.rows[0].elements[0].status === 'OK') {
      onCalcDistance(+response.rows[0].elements[0].distance.text);
    } else {
      console.error('DistanceMatrix request failed');
    }
  };
  const destinations = [{ lat: lat1, lng: long1 }]
  const origins= [{ lat: lat2, lng: long2 }]
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


