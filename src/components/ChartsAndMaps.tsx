import React, { useEffect, useState } from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { BubbleDataPoint, Chart, ChartData, ChartType, ChartTypeRegistry, ScatterDataPoint, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import 'leaflet/dist/leaflet.css';
import '../Css/ChartsAndMaps.css';

const fetchChartData = async () => {
  const response = await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
  return response.data;
};

const ChartsAndMaps = () => {
  const [chartData, setChartData] = useState<ChartData<keyof ChartTypeRegistry, (number | ScatterDataPoint | BubbleDataPoint | null)[], unknown>>({
    datasets: [],
  });

  const [countryData, setCountryData] = useState([]);

  useEffect(() => {
    fetchChartData().then((data) => {
      const labels = Object.keys(data.cases);
      const chartDataSet: ChartData<'line', (number | ScatterDataPoint | BubbleDataPoint | null)[], unknown> = {
        labels: labels,
        datasets: [
          {
            label: 'COVID-19 Cases',
            data: Object.values(data.cases),
            backgroundColor: 'red',
          },
        ],
      };
      setChartData(chartDataSet);
    });

    axios
      .get('https://disease.sh/v3/covid-19/countries')
      .then((response) => {
        const data = response.data;
        const countryData = data.map((country : any) => ({
          name: country.country,
          lat: country.countryInfo.lat,
          long: country.countryInfo.long,
          active: country.active,
          recovered: country.recovered,
          deaths: country.deaths,
        }));
        setCountryData(countryData);
      })
      .catch((error) => {
        console.error('Error fetching country data:', error);
      });
  }, []);

  useEffect(() => {
    Chart.register(...registerables);

    const chartConfig = {
      type: 'line' as ChartType,
      data: chartData,
    };

    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    const myChart = new Chart(ctx, chartConfig);

    return () => {
      myChart.destroy();
    };
  }, [chartData]);


  return (
    <div>
      <Heading color="white" p="10px 20px" bg="#28686e">
        Charts and Maps
      </Heading>
      <div id="charts_page_div">
        {window.innerWidth > 900 ? (
          <Box padding="10px" w="19%" boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px">
            <Box>
              <Link style={{ textDecoration: 'none', fontSize: '20px', fontWeight: 'bold' }} to="/">
                Contacts
              </Link>
            </Box>
            <br />
            <br />
            <Box>
              <Link style={{ textDecoration: 'none', fontSize: '20px', fontWeight: 'bold' }} to="/chartsandmaps">
                Charts & Maps
              </Link>
            </Box>
          </Box>
        ) : (
          <Flex justifyContent="space-evenly" w="100%" margin="auto" marginBottom="20px" p="10px 0px" boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px">
            <Box>
              <Link style={{ textDecoration: 'none', fontSize: '20px', fontWeight: 'bold' }} to="/">
                Contacts
              </Link>
            </Box>
            <Box>
              <Link style={{ textDecoration: 'none', fontSize: '20px', fontWeight: 'bold' }} to="/chartsandmaps">
                Charts & Maps
              </Link>
            </Box>
          </Flex>
        )}
        <Box padding="10px" w="79%" boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px" border="1px solid gray">
          <Heading>COVID-19 Dashboard</Heading>
          <Box>
            {window.innerWidth > 900 ? (
              <canvas id="myChart" width="800" height="300"></canvas>
            ) : (
              <canvas id="myChart" width="400" height="300"></canvas>
            )}
          </Box>
          <br />
          <br />
          <Box>
            <MapContainer>
              <TileLayer url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=NLe8DG6CVIhkI4PpAXR1" />
              {countryData.map((country: any) => (
                <Marker key={country.name} position={[country.lat, country.long]}>
                  <Popup>
                    <h4>Name: {country.name}</h4>
                    <p>Active Cases: {country.active}</p>
                    <p>Recovered Cases: {country.recovered}</p>
                    <p>Deaths: {country.deaths}</p>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default ChartsAndMaps;
