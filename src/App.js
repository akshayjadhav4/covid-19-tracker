import React,{useState ,useEffect} from 'react';

import './App.css';
import { FormControl,Select ,MenuItem ,Card ,CardContent} from '@material-ui/core';
import InfoBox from './components/InfoBox';
import Map from './components/Map';
import Table from './components/Table';
import { sortData ,styleStat } from './util';
import LineGraph from './components/LineGraph';
import "leaflet/dist/leaflet.css"
function App() {
  
  const [countries, setCountries] = useState([
    'INDIA','USA','UK'
  ])
  const [country, setCountry] = useState('worldwide')
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])
  const [mapCenter, setMapCenter] = useState({lat : 34.80746 , lng : -40.4796})
  const [mapZoom, setMapZoom] = useState(3)
  const [mapCountries, setmapCountries] = useState([])
  const [casesType, setCasesType] = useState('cases')
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
          const sortedData = sortData(data)
          setTableData(sortedData)
          setmapCountries(data)
        });
    };

    getCountriesData()
  }, [])

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
        // console.log(data);
      });
  }, []);
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
        if (countryCode === "worldwide") {
          setMapCenter({ lat: 34.80746, lng: -40.4796 });
          setMapZoom(3);
        } else {
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setMapZoom(4);
        }
      });
  };
  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <h1>COVID-19 Tracker</h1>
          <FormControl className="app_dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">WorldWide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app_stats">
          <InfoBox
          isRed
            active={casesType === "cases"}
            onClick={(e) => setCasesType("cases")}
            title="COVID-19 Cases"
            cases={styleStat(countryInfo.todayCases)}
            total={styleStat(countryInfo.cases)}
          />
          <InfoBox
            active={casesType === "recovered"}
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            cases={styleStat(countryInfo.todayRecovered)}
            total={styleStat(countryInfo.recovered)}
          />
          <InfoBox
          isRed
            onClick={(e) => setCasesType("deaths")}
            active={casesType === "deaths"}
            title="Deaths"
            cases={styleStat(countryInfo.todayDeaths)}
            total={styleStat(countryInfo.deaths)}
          />
        </div>

        <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>

      <Card className="app_right">
        <CardContent>
          <h1>Live Cases By Country</h1>
          <Table countries={tableData} />
          <h1 className="app_graphTitle">Worldwide new {casesType}</h1>
          <LineGraph className="app_graph" casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
