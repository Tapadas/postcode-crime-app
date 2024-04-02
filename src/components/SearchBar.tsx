import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const validatePostcodes = (postcodes: string) => {
  return postcodes
    .replace(/(\s|%20)/g, "")
    .split(",")
    .filter(isValidPostCode)
    .map((postcode) => postcode.toUpperCase());
};

const isValidPostCode = (postCode: string) => {
  const regex = /^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/i;
  return regex.test(postCode);
};

export const SearchBar = () => {
  const [postcodes, setPostcodes] = useState("");
  const navigate = useNavigate();

  const handleCrimeClick = () => {
    const validPostcodes = validatePostcodes(postcodes);
    if (validPostcodes.length)
      navigate(`/crime-data/${validPostcodes.join(",")}`);
  };

  const handleMapClick = () => {
    const validPostcodes = validatePostcodes(postcodes);
    if (validPostcodes.length) {
      navigate(`/map/${validPostcodes}`);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={postcodes}
        onChange={(e) => setPostcodes(e.target.value)}
      />
      <button onClick={handleCrimeClick}>Crime Data</button>
      <button onClick={handleMapClick}>Map Data</button>
    </div>
  );
};
