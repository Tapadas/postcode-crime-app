import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import { validatePostcodes } from "../components/SearchBar";

export interface PostCodesWithLatLong {
  postcode: string;
  latitude: string;
  longitude: string;
}

const fetchPostcodeData = (postcode: string) => {
  return axios
    .get(`http://api.getthedata.com/postcode/${postcode}`)
    .then((res) => {
      return res.data;
    });
};

export const usePostcodeData = (postcodes: string) => {
  const validPostcodes = validatePostcodes(postcodes);

  const result = useQueries({
    queries: validPostcodes.map((postcode) => ({
      queryKey: ["postcode", postcode],
      queryFn: () => fetchPostcodeData(postcode),
      refetchOnMount: false,
      // avoids refetching data for 5 minutes
      refetchInterval: 300000,
      enabled: !!postcode,
    })),
    combine: (results) => {
      const validPostCodes = results.filter(
        (result) => result.data?.status === "match"
      );

      const postCodesWithLatLong: PostCodesWithLatLong[] = validPostCodes.map(
        (result) => {
          return {
            postcode: result.data?.data?.postcode?.replace(/\s/g, ""),
            longitude: result.data?.data?.longitude,
            latitude: result.data?.data?.latitude,
          };
        }
      );
      return {
        data: postCodesWithLatLong,
        isLoading: results.some((result) => result.isLoading),
      };
    },
  });

  return { postCodeData: result.data, postcodeLoading: result.isLoading };
};
