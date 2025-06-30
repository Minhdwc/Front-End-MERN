import authorizedAxiosInstance from "@/ultils/authorAxios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PetDetail from "./petDetail";

const Detail = () => {
  const param = useParams<{ id: string }>();
  const [detailData, setDetailData] = useState<any>(null);

  const fetchDetail = async () => {
    try {
      let res;
      if (param.id?.startsWith("pet_")) {
        res = await authorizedAxiosInstance.get(
          `/pet/get/d=${param.id.replace("pet_", "")}`
        );
      } else {
        res = await authorizedAxiosInstance.get(
          `/product/get/d=${param.id?.replace("product_", "")}`
        );
      }
      setDetailData(res.data.data);
    } catch (error) {
      console.error("Failed to fetch detail:", error);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [param.id]);

  return (
    <div>
      {param.id?.startsWith("pet_") && detailData && (
        <PetDetail pet={detailData} />
      )}
    </div>
  );
};

export default Detail;
