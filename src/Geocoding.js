import React, { useState, useEffect, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

export function Geocoding({ onResultClick }) {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = useCallback(async () => {
    const encodedSearchValue = encodeURIComponent(searchValue);
    const baseURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedSearchValue}.json?country=gb&routing=true&bbox=-0.9682%2C51.1432%2C0.7144%2C51.8416&proximity=ip&language=en&autocomplete=true&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`;

    try {
      const response = await axios.get(baseURL);
      const data = response.data;
      setSearchResults(data.features);
    } catch (error) {
      console.error('Error:', error);
    }
  }, [searchValue]);

  useEffect(() => {
    handleSearch(); // Perform an initial search on component mount
  }, [handleSearch]);

  const handleResultClick = useCallback(
    (result) => {
      onResultClick(result);
    },
    [onResultClick]
  );

  if (!searchResults) return null;

  return (
    <div>
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {searchResults.map((result) => (
          <li
            key={result.id}
            onClick={() => handleResultClick(result)}
            style={{ cursor: 'pointer' }}
          >
            {result.place_name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Geocoding;
