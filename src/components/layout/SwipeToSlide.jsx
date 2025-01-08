import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

const SwipeToSlide = ({ cuisines, size = 16 }) => {
    var settings = {
        className: "center",
        infinite: true,
        centerPadding: "0px",
        slidesToShow: 8,
        swipeToSlide: true,
        arrows: false,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 6,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 5,
                },
            },
            {
                breakpoint: 450,
                settings: {
                    rows: 2,
                    slidesToShow: 4,
                },
            },
        ],
    };

    return (
        <div className="slider-container w-full">
            <Slider {...settings}>
                {cuisines.map((cuisine, index) => (
                    <Link to={`/search?name=${cuisine.name}`} key={index}>
                        <div
                            className="!flex flex-col justify-center items-center mb-10"
                        >
                            <img
                                src={cuisine.image}
                                alt={cuisine.name}
                                loading="lazy" // Enable lazy loading
                                className={`w-${size} h-${size} rounded-full object-cover cursor-pointer`}
                            />
                            <p className="mt-2 text-gray-700 text-sm text-center font-semibold">
                                {cuisine.name}
                            </p>
                        </div>
                    </Link>
                ))}
            </Slider>
        </div>
    );
};

export default SwipeToSlide;
