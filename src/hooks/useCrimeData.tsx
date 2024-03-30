import axios from "axios";
import { PostCodesWithLatLong } from "./usePostcodeData";
import { useQueries } from "@tanstack/react-query";

interface CrimeData {
  category: string;
  location: {
    street: {
      id: number;
      name: string;
    };
  };
  outcome_status: {
    category: string;
  };
  id: number;
  month: string;
}

interface CrimeDataResponse {
  data: CrimeData[];
  isLoading: boolean;
}

const fetchCrimeData = (postCode: PostCodesWithLatLong) => {
  return axios
    .get(
      `https://data.police.uk/api/crimes-street/all-crime?lat=${postCode.latitude}&lng=${postCode.longitude}`
    )
    .then((res) => {
      return res.data;
    });
};

export const useCrimeData = (postcodes: PostCodesWithLatLong[]) => {
  const crimeData: CrimeDataResponse = useQueries({
    queries: postcodes.map((postcode) => ({
      queryKey: ["crime", postcode.postcode],
      queryFn: () => fetchCrimeData(postcode),
      refetchOnMount: false,
      // avoids refetching data for 5 minutes
      refetchInterval: 300000,
      enabled: !!postcode.postcode,
    })),
    combine: (results) => {
      return {
        data: results.flatMap((result) => result.data),
        isLoading: results.some((result) => result.isLoading),
      };
    },
  });

  return {
    crimeData: crimeData.data.filter((data) => data),
    crimeDataLoading: crimeData.isLoading,
  };
};
