import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot  from 'react-plotly.js';
import YearSlider from './yearSlider';

function BarChartWrapper() {

    const [year, setYear] = useState(2008);
    const [data, setData] = useState([]);
    const [showWicketTakers, setShowWicketTakers] = useState(false);
   
    const toggleData = () => {
      setShowWicketTakers(!showWicketTakers);
    };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          let response
          // console.log(showWicketTakers);
          if (showWicketTakers) {
            // Fetch data for wicket takers
            response = await axios.get(`http://127.0.0.1:5000/top_wicket_takers?year=${year}`);
          } else {
            // Fetch data for run scorers
            response = await axios.get(`http://127.0.0.1:5000/top_run_scorers?year=${year}`);
          }
          setData(response.data);
        } catch (error) {
          console.error('Error fetching data', error);
        }
      };
      
      fetchData();
    }, [showWicketTakers,year]);
  
    const players = data.map(item => item.player);
    let metric, values
    if (showWicketTakers)
    {
      values  = data.map(item => item.wickets);
      metric = "wickets";
    }
    else
    {
      values = data.map(item => item.runs);
      metric = "runs";
    }
    // const colors = players.map(() => `#${Math.floor(Math.random()*16777215).toString(16)}`);
    const interpolateColor = (value, min, max) => {
      const ratio = (value - min) / (max - min);
      // Interpolate between red (255,0,0) and yellow (255,255,0)
      const g = 220 - Math.round(255 * ratio);
      const b = 30;
      return `rgb(225,${g},${b})`;
    };
  
    // Calculate min and max for runs to scale the colors appropriately
    const minValues = Math.min(...values);
    const maxValues = Math.max(...values);
  
    // Assign a color to each bar
    const colors = values.map(value => interpolateColor(value, minValues, maxValues));
    const handleSliderChange = (event, newValue) => {
      setYear(newValue);
    };
    return (
      <div>
        
        {showWicketTakers ? (
            <h2>Barchart of Top Wicket Takers in IPL {year}</h2>
          ): 
          (
            <h2>Barchart of Top Run Scorers in IPL {year}</h2>
          )}
      
        <div>
          <YearSlider onChange={handleSliderChange} year={year} />
          <button onClick={toggleData} >
            {showWicketTakers ? 'Show Run Scorers' : 'Show Wicket Takers'}
          </button>
        </div>
        <BarChart
            players = {players}
            metric =  {metric}
            values = {values}
            colors = {colors}/>
      </div>
    );
  
    
  }
  
  function BarChart({players, metric, values,  colors})
  {
    return(
      <Plot
        data={[
          {
            x: players,
            y: values,
            type: 'bar',
            name: 'top players',
            marker: {
              color: colors, // Apply the colors here
            },
          },
        ]}
        layout={{ 
          width: 600, 
          height: 450, 
          xaxis: {
          title: 'Cricket Player',
          automargin: true,
        },
        yaxis: {
          title: {metric},
        } }}
      />
    );
  }

  export default BarChartWrapper;