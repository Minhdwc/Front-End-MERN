import authorizedAxiosInstance from "@/ultils/authorAxios";

export interface NominatimPlace {
  lat: number | string;
  lon: number | string;
  display_name: string;
  [key: string]: unknown;
}

export const searchAddress = async (
  address: string,
  options: { limit?: number } = {}
): Promise<NominatimPlace[]> => {
  const res = await authorizedAxiosInstance.get<{ data: NominatimPlace[] }>(
    `https://nominatim.openstreetmap.org/search`,
    {
      params: {
        q: address,
        format: "json",
        addressdetails: 1,
        ...options,
      },
    }
  );
  // Some public APIs may not wrap in { data }, normalize defensively
  const payload = (res as any).data;
  return Array.isArray(payload) ? payload : payload?.data ?? [];
};