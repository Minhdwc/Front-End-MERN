import { Image } from "antd";
import "../sass/Logo.sass"

const Logo = ({image, ref} : {image: string, ref: string}) => {
  return (
    <a href={ref}>
      <Image className="img-logo" src={image} preview={false} style={{width:"50%"}}/>
    </a>
  );
};

export default Logo;
