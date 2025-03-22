import { Carousel } from "antd";
import slider1 from "@/assets/images/slider/slider1.jpg";
import slider2 from "@/assets/images/slider/slider2.jpg";
import slider3 from "@/assets/images/slider/slider3.jpg";
import slider4 from "@/assets/images/slider/slider4.jpg";

const Slider = () => {
  const sliderImage = [slider1, slider2, slider3, slider4];
  return (
    <Carousel autoplay style={{ paddingTop: 3 }}>
      {sliderImage.map((src, index) => (
        <div key={index} style={{ display: "flex", justifyContent: "center" }}>
          <img
            src={src}
            alt={`slider-${index + 1}`}
            style={{ width: "100%", height: "400px", objectFit: "fill" }}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default Slider;
