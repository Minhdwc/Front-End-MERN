import authorizedAxiosInstance from "@/ultils/authorAxios";

export const searchAddress = async (address: string, options: {limit?: number} = {}) => {
  const res = await authorizedAxiosInstance.get(`https://nominatim.openstreetmap.org/search`, {
    params: {
      q: address,
      format: "json",
      addressdetails: 1,
      ...options
    },
  });
  return res.data;
};