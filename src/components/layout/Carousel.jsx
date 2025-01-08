import React from "react";
import Slider from "react-slick";

function Carousel() {
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        pauseOnHover: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 765,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 450,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    const images = Array.from({ length: 9 }, (_, i) => `./banners/banner_${i + 1}.png`);

    return (
        <div className="slider-container">
            <Slider {...settings}>
                {images.map((src, index) => (
                    <div key={index} className="relative rounded-lg overflow-hidden p-4 pt-0">
                        <img
                            src={src}
                            alt={`Banner ${index + 1}`}
                            loading="lazy" // Enable lazy loading
                            className="w-full h-50 object-cover rounded-lg"
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default Carousel;
