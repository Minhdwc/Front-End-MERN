import { useNavigate } from "react-router-dom";
const Logo = ({image} : {image: string}) => {
  const navigate = useNavigate()
  return (
      <img className="rounded-full border-b cursor-pointer" src={image} width={50} onClick={()=>navigate("/")}/>
  );
};

export default Logo;
