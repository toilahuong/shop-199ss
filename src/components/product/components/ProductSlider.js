import { useState } from "react";
import ReactImageMagnify from "react-image-magnify";
import Slider from "react-slick";

export default function ProductSlider() {
    const [slider1, setSlider1] = useState();
    const [slider2, setSlider2] = useState();
    const settingsThumbnail = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: slider2
    }
    const settingsImages = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        focusOnSelect: true,
        asNavFor: slider1
    }
    const ListImages = [
        {
            url: "/assets/images/thumbnail-1.jpg",
            title: "Ao phong"
        },
        {
            url: "/assets/images/thumbnail-2.jpg",
            title: "Ao phong"
        },
        {
            url: "/assets/images/thumbnail-3.jpg",
            title: "Ao phong"
        },
        {
            url: "/assets/images/thumbnail-4.jpg",
            title: "Ao phong"
        },
        {
            url: "/assets/images/thumbnail-5.jpg",
            title: "Ao phong"
        },
        {
            url: "/assets/images/thumbnail-6.jpg",
            title: "Ao phong"
        }
    ]
    return (
        <div className="product-slider">
            <Slider {...settingsThumbnail} ref={slider => setSlider1(slider)} className="slider-thumbails">
                {ListImages.map((item,index) => 
                    <div className="item" key={index}>
                        <ReactImageMagnify {...{
                            smallImage: {
                                alt: item.title,
                                isFluidWidth: true,
                                src: item.url,
                            },
                            largeImage: {
                                src: item.url,
                                width: 1200,
                                height: 1800
                            },
                            enlargedImagePortalId: 'portal',
                            enlargedImageContainerDimensions: {
                                width: '100%',
                                height: '100%'
                            }
                        }} />
                    </div>
                )}
            </Slider>
            <Slider {...settingsImages} ref={slider => setSlider2(slider)} className="slider-images">
                {ListImages.map((item,index) => 
                    <div className="item" key={index}>
                        <img loading="lazy" src={item.url} className="img-fluid" alt={item.title}/>
                    </div>
                )}
            </Slider>
            <div
                id="portal"
                className="portal"
            />
        </div>
    )
}