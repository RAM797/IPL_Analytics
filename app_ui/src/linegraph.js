import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot  from 'react-plotly.js';
import YearSlider from './yearSlider';

function LineGraph()
{

  const [year, setYear] = useState(2008);
  const [data, setData] = useState([]);
 


  useEffect(() => {
    const fetchData = async () => {
      try {
        let response
        // console.log(showWicketTakers);
        response = await axios.get(`http://127.0.0.1:5000/top_strike_rates?year=${year}`);  
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    
    fetchData();
  }, [year]);
  const plotData = Object.keys(data).map(player => {
    return {
      type: 'scatter',
      mode: 'lines+markers',
      name: player,
      x: data[player].map((_, index) => `Match ${index + 1}`),
      y: data[player]
    };
  });
  const colors = ["red","orange","green","yellow","blue"]
  const handleSliderChange = (event, newValue) => {
    setYear(newValue);
  };
  return (
    <div>
    <div>
      <h2>Multiline graph of Top Strike rate players in IPL {year}</h2>
      <YearSlider onChange={handleSliderChange} year={year} />
    </div>
      <Plot
        data={plotData}
        layout={{
          width: 720,
          height: 440,
          title: 'Strike Rate of Players Across Matches',
          color: colors,
          xaxis: {
            title: 'Match'
          },
          yaxis: {
            title: 'Strike Rate'
          }
          
        }}
      />
    </div>
  );
}

export default LineGraph;