import React from 'react'
import { Circle , Popup } from "react-leaflet";
import numeral from "numeral";

const casesTypesColors = {
  cases: {
    hex: "#CC1034",
    multiplier: 800,
  },
  recovered: {
    hex: "#7dd71d",
    multiplier: 1200,
  },
  deaths: {
    hex: "#fb4443",
    multiplier: 2000,
  },
};

export const sortData = (data) => {
  const sortedData = [...data];
  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });

  return sortedData
};


export const buildChartData = (data, casesType = "cases") => {
  const chartData = [];
  let lastDataPoint;

  for(let date in data[casesType]) {
    if (lastDataPoint) {
      const newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint, // difference between two dates e.g  cases: 3/25/20: 476376 3/26/20: 539336 3/27/20: 603736
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  };
  return chartData;
};


export const showDataOnMap = (data, casesType = "cases") =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={casesTypesColors[casesType].hex}
      fillColor={casesTypesColors[casesType].hex}
      radius={
        Math.sqrt(country[casesType]) * casesTypesColors[casesType].multiplier
      }
    >
      <Popup>
        <div>
          <div className="info_flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          />
          <div className="info_name">{country.country}</div>
          <div className="info_confirmed">Cases : {numeral(country.cases).format("0,0")}</div>
          <div className="info_recovered">Recovered : {numeral(country.recovered).format("0,0")}</div>
          <div className="info_deaths">Deaths : {numeral(country.deaths).format("0,0")}</div>
        </div>
      </Popup>
    </Circle>
  ));


