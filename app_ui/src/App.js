import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot  from 'react-plotly.js';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('Player Stats');

  return (
    <div className="App">
      <header>
      {/* <img src = {require('./IPL_logo.jpeg')} alt="IPL Logo" width="30" height="20"/> */}
        <h1>IPL Analytics</h1>
      </header>
      <div className="tabs">
        <button
          className={activeTab === 'Player Stats' ? 'active' : ''}
          onClick={() => setActiveTab('Player Stats')}
        >
          Player Stats
        </button>
        <button
          className={activeTab === 'Team Stats' ? 'active' : ''}
          onClick={() => setActiveTab('Team Stats')}
        >
          Team Stats
        </button>
        <button
          className={activeTab === 'Match Stats' ? 'active' : ''}
          onClick={() => setActiveTab('Match Stats')}
        >
          Match Stats
        </button>
      </div>
      <div className="visualization-grids">
        {/* Render the appropriate component based on the active tab */}
        {activeTab === 'Player Stats' && <PlayerStatsGrid />}
        {activeTab === 'Team Stats' && <TeamStatsGrid />}
        {activeTab === 'Match Stats' && <MatchStatsGrid />}
      </div>
      <link rel="stylesheet" type="text/css" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" />
      <h6>Made with <i class="icon ion-heart"></i> using chatGPT</h6>
    </div>
  );
}
const marks = [
  {
    value: 2008,
    label: '2008',
  },
  {
    value: 2022,
    label: '2022',
  },
];

function valuetext(value) {
  return `${value}`;
}

function valueLabelFormat(value) {
  return value;
}

export function PlayerStatsGrid(){
  return(
    <div>
      <div className='grid-container'>
        <Boxplot/>
        <BarChartWrapper/>
      </div>
    <LineGraph/>
    </div>
  );
}

function YearSlider({ onChange, year }) {
  return (
    <Box sx={{ width: 300, margin: 'auto' }}> {/* Center the slider */}
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        Year {/* Adding label above the slider */}
      </div>
      <Slider
        aria-label="Year selection"
        valueLabelFormat={valueLabelFormat}
        getAriaValueText={valuetext}
        step={1}
        valueLabelDisplay="auto"
        marks={marks}
        min={2008}
        max={2022}
        value={year}
        onChange={onChange} // Use the passed onChange function
      />
    </Box>
  );
}

function Boxplot() {
  const [year, setYear] = useState(2008);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/bowler_economy?year=${year}`);
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

  return (
    <div>
      <h2>Boxplot of Bowler Economy in IPL {year}</h2>
      <YearSlider onChange={handleSliderChange} year={year} />
      {data && (
          <Plot
            data={[
              {
                y: data,
                type: 'box',
                name: 'Bowler Economy',
              },
            ]}
            layout={{ width: 500, height: 400, title: 'Bowler Economy Boxplot' }}
          />
        )}
        <h6>Note: minimum overs bowled is 10 overs</h6>
    </div>
  );
}

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

  // const players = Object.keys(data);
  // const runs = Object.values(data);
  //Refactor this later
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

  // const players = Object.keys(data);
  // const runs = Object.values(data);
  //Refactor this laterr
  

function TeamStatsGrid() {
  // Implement the Team Stats grid here
}

function MatchStatsGrid() {
  // Implement the Match Stats grid here
}

export default App;
