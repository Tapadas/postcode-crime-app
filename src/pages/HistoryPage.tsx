import { useNavigate } from "react-router-dom";
import { usePostCodeContext } from "../context/PostcodeHistoryContext";

export const HistoryPage = () => {
  const navigate = useNavigate();
  const { postCodesHistory, removePostcodeFromHistory } = usePostCodeContext();

  return (
    <div>
      <h1>History Page</h1>
      {postCodesHistory.map((postcode) => (
        <div key={postcode}>
          <button onClick={() => removePostcodeFromHistory(postcode)}>
            Remove
          </button>
          <span>{postcode}</span>
          <button onClick={() => navigate(`/crime-data/${postcode}`)}>
            Crime Data
          </button>
          <button onClick={() => navigate(`/map/${postcode}`)}>Map Data</button>
        </div>
      ))}
    </div>
  );
};
