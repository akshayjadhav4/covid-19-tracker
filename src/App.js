import React,{useState ,useEffect} from 'react';

import './App.css';
import { FormControl,Select ,MenuItem  } from '@material-ui/core';
function App() {
  
  const [countries, setCountries] = useState([
    'INDIA','USA','UK'
  ])
  const [country, setCountry] = useState('worldwide')
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries)
        });
    };

    getCountriesData()
  }, [])

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  };
  return (
    <div className="app">
      <div className="app_header">
        <h1>COVID-19 Tracker</h1>
        <FormControl className="app_dropdown">
          <Select variant="outlined" value={country} onChange={onCountryChange}>
          <MenuItem value="worldwide">WorldWide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default App;
