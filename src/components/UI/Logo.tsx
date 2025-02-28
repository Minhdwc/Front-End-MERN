import { useNavigate } from "react-router-dom";
const Logo = ({image, ref} : {image: string, ref: string}) => {
  const navigate = useNavigate()
  return (
      <img className="rounded-full border-b cursor-pointer" src={image} width={50} onClick={()=>navigate("/")}/>
  );
};

export default Logo;
