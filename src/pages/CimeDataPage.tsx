import { useParams } from "react-router-dom";
import { usePostcodeData } from "../hooks/usePostcodeData";
import { useCrimeData } from "../hooks/useCrimeData";
import { useEffect, useMemo } from "react";
import { groupBy } from "lodash";
import { usePostCodeContext } from "../context/PostcodeHistoryContext";

export const CrimeDataPage = () => {
  const { postcodes } = useParams();
  const { postCodeData, postcodeLoading } = usePostcodeData(postcodes || "");
  const { crimeData, crimeDataLoading } = useCrimeData(postCodeData);
  const { addPostcodesToHistory } = usePostCodeContext();

  useEffect(() => {
    if (!postcodeLoading) {
      addPostcodesToHistory(postCodeData.map((result) => result.postcode));
    }
  }, [postCodeData]);

  const groupedData = useMemo(
    () => groupBy(crimeData, "category"),
    [crimeData]
  );

  if (postcodeLoading || crimeDataLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
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
  );
};
