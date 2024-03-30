import { useParams } from "react-router-dom";
import { usePostcodeData } from "../hooks/usePostcodeData";
import { useCrimeData } from "../hooks/useCrimeData";
import { useEffect, useMemo } from "react";
import { groupBy } from "lodash";
import { usePostCodeContext } from "../context/PostcodeHistoryContext";

export const MapPage = () => {
  const { postcodes } = useParams();
  const { addPostcodesToHistory } = usePostCodeContext();
  const { postCodeData, postcodeLoading } = usePostcodeData(postcodes || "");
  const { crimeData, crimeDataLoading } = useCrimeData(postCodeData);

  useEffect(() => {
    if (!postcodeLoading) {
      addPostcodesToHistory(postCodeData.map((result) => result.postcode));
    }
  }, [postCodeData, postcodeLoading, addPostcodesToHistory]);

  const groupedData = useMemo(
    () => groupBy(crimeData, "category"),
    [crimeData]
  );

  if (crimeDataLoading || postcodeLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        {postCodeData &&
          postCodeData.map((result) => (
            <div key={result.postcode}>
              <h2>Postcode: {result.postcode}</h2>
              <p>Lat: {result.latitude}</p>
              <p>Long: {result.longitude}</p>
            </div>
          ))}
        {groupedData &&
          Object.keys(groupedData).map((category) => (
            <div key={category}>
              <h2>{category}</h2>
              <ul>
                {groupedData[category].map((crime) => (
                  <li key={crime?.id}>
                    {crime?.month} {crime?.location.street.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
};
