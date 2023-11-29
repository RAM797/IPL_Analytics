import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot  from 'react-plotly.js';
import YearSlider from './yearSlider';

function ScatterPlotMatrix() {

    const [year, setYear] = useState(2008);
    const [data, setData] = useState([]);
    const [showWicketTakers, setShowWicketTakers] = useState(false);
   
    const toggleData = () => {
      setShowWicketTakers(!showWicketTakers);
    };
  
    const handleSliderChange = (event, newValue) => {
        setYear(newValue);
      };

    useEffect(() => {
      const fetchData = async () => {
        try {
          let response
          // console.log(showWicketTakers);
          if (showWicketTakers) {
            // Fetch data for wicket takers
            response = await axios.get(`http://127.0.0.1:5000/bowler_metrics?year=${year}`);
          } else {
            // Fetch data for run scorers
            response = await axios.get(`http://127.0.0.1:5000/batsman_metrics?year=${year}`);
          }
          setData(response.data);
        } catch (error) {
          console.error('Error fetching data', error);
        }
      };
      
      fetchData();
    }, [showWicketTakers,year]);
  

  // Transform the data
  let plotData;
  if (showWicketTakers)
   {
        let ballsBowled = [];
        let economy = [];
        let runsConceeded = [];
        let wicketsTaken = [];
        let playerNames = [];

        for (let player in data) {
            playerNames.push(player);
            ballsBowled.push(data[player].balls_bowled);
            economy.push(data[player].economy);
            runsConceeded.push(data[player].runs_conceeded);
            wicketsTaken.push(data[player].wickets_taken);
        }

        // Scatter plot matrix data
        plotData = [
            {
            type: 'splom',
            dimensions: [
                { label: 'Balls Bowled', values: ballsBowled },
                { label: 'Economy', values: economy },
                { label: 'Runs Conceeded', values: runsConceeded },
                { label: 'Wickets Taken', values: wicketsTaken }
            ],
            text: playerNames,
            marker: {
                size: 6,
                opacity: 0.5,
                color: 'purple'
            }
            }
        ];
        
    }
    else
    {
        let ballsFaced = [];
        let battingAverage = [];
        let runsScored = [];
        let strikeRate = [];
        let playerNames = [];

        for (let player in data) {
            playerNames.push(player);
            ballsFaced.push(data[player].balls_faced);
            runsScored.push(data[player].runs);
            battingAverage.push(data[player].batting_average);
            strikeRate.push(data[player].strike_rate);
        }

        // Scatter plot matrix data
        plotData = [
            {
            type: 'splom',
            dimensions: [
                { label: 'Balls Faced', values: ballsFaced },
                { label: 'Runs Scored', values: runsScored},
                { label: 'Batting Average', values: battingAverage },
                { label: 'Strike Rate', values: strikeRate }
            ],
            text: playerNames,
            marker: {
                size: 6,
                opactiy: 0.1,
                color: 'orange'
            }
            }
        ];


    }
    // Layout configuration
    const layout = {
        title: 'Scatterplot Matrix',
        height: 600,
        width: 600
    };

  return (
    <div>
        {showWicketTakers ? (
            <h2>ScatterPlot Matrix of Bowler Metrics in IPL {year}</h2>
          ): 
          (
            <h2>ScatterPlot Matrix of Batsman Metrics in IPL {year}</h2>
          )}
        <div>
          <YearSlider onChange={handleSliderChange} year={year} />
          <button onClick={toggleData} >
            {showWicketTakers ? 'Show Bastman Metrics' : 'Show Bowler Metrics'}
          </button>
        </div>
        <Plot data={plotData} layout={layout} />
    </div>
  );

};

export default ScatterPlotMatrix;
