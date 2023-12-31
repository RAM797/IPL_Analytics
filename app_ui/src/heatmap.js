import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot  from 'react-plotly.js';
import YearSlider from './yearSlider';

// ... (previous imports and code)

function HeatMap() {
    const [year, setYear] = useState(2008);
    const [data, setData] = useState(null);
    const [allVenues, setAllVenues] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:5000/venue_metrics?year=${year}`);
          setData(response.data);
  
          // Extract all venues played by all teams
          const venues = Object.values(response.data)
            .flatMap(team => Object.keys(team))
            .filter((venue, index, self) => self.indexOf(venue) === index);
  
          setAllVenues(venues);
        } catch (error) {
          console.error('Error fetching data', error);
        }
      };
  
      fetchData();
    }, [year]);
  
    const handleSliderChange = (event, newValue) => {
      setYear(newValue);
    };
  
    return (
      <div>
        <h2>Heat Map: IPL Team Runs by Venue in IPL {year}</h2>
        <YearSlider onChange={handleSliderChange} year={year} />
        {data && (
          <Plot
            data={[
              {
                z: allVenues.map(venue =>
                  Object.values(data).map(team => team[venue] || 0)
                ),
                x: Object.keys(data),
                y: allVenues,
                type: 'heatmap',
                colorscale: 'Viridis',
              },
            ]}
            layout={{
              width: 550,
              height: 500,
              xaxis: {
                title: 'Teams',
                tickangle: 45, // Adjust angle
                automargin: true, // Automatically adjust margin
                tickfont: { size: 10 } // Adjust font size if necessary
              },
              yaxis: {
                title: 'venue',
                automargin: true, // Automatically adjust margin
                tickfont: { size: 10 } // Adjust font size if necessary
              },
              
            }}
          />
        )}
      </div>
    );
  }
  
  export default HeatMap;
  