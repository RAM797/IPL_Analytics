import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot  from 'react-plotly.js';
import YearSlider from './yearSlider';

function PopulationPyramid()
{

  const [year, setYear] = useState(2008);
  const [data, setData] = useState([]);
 


  useEffect(() => {
    const fetchData = async () => {
      try {
        let response
        // console.log(showWicketTakers);
        response = await axios.get(`http://127.0.0.1:5000/win_loss?year=${year}`);  
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    
    fetchData();
  }, [year]);

  const handleSliderChange = (event, newValue) => {
    setYear(newValue);
  };

  const sortedTeams = Object.keys(data).sort((a, b) => data[b].wins - data[a].wins);
  const wins = sortedTeams.map(team => data[team].wins);
  const losses = sortedTeams.map(team => -data[team].losses);

  return (
    <div>
        <YearSlider onChange={handleSliderChange} year={year} />
        <Plot
        data={[
            {
            type: 'bar',
            x: wins,
            y: sortedTeams,
            orientation: 'h',
            name: 'Wins',
            marker: {
                color: 'green'
            }
            },
            {
            type: 'bar',
            x: losses,
            y: sortedTeams,
            orientation: 'h',
            name: 'Losses',
            marker: {
                color: 'red'
            }
            }
        ]}
        layout={{
            title: 'Team Wins and Losses',
            barmode: 'relative',
            bargap: 0.1,
            xaxis: {
            title: 'Count',
            tickvals: losses.map(val => val).concat(wins),
            ticktext: losses.map(val => Math.abs(val)).concat(wins),
            automargin: true
            },
            yaxis: {
            title: 'Teams',
            automargin: true
            },
            autosize: true,
            margin: {
            l: 150, // Adjust this value to ensure team names are visible
            r: 50,
            t: 50,
            b: 50
            },
            barwidth: 0.4 // Decrease bar size
        }}
        />
    </div>
  );
}

export default PopulationPyramid;