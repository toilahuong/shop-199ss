import Slider from "react-slick";
import { dataBanner } from "./dataBanner";
export default function Banner() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
    };
    return (
        <Slider {...settings}>
          {dataBanner.map((item,index) => <div key={index}><img loading="lazy" src={item.img} alt={item.title} className="img-fluid"/></div>)}
        </Slider>
    );
}
