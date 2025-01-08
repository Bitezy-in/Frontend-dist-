import React from "react";
import Navbar from "./Navbar";
import BottomNav from "./BottomNav";

// const AppLayout = () => WrappedComponent => {
//     return (props) => {

//         return (
//             <div className='font-sans'>
//                 <Navbar />
//                 <WrappedComponent {...props} />
//             </div>
//         )
//     }
// }

const AppLayout = ({ children }) => {
    return (
        <div className="mb-16 md:mb-4">
            <Navbar />
            {children}
            <BottomNav />
        </div>
    );
};

export default AppLayout;
