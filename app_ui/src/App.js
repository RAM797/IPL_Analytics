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
      <Boxplot/>
      <BarChart/>
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
      <h1>Boxplot of Bowler Economy in IPL {year}</h1>
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
            layout={{ width: 600, height: 500, title: 'Bowler Economy Boxplot' }}
          />
        )}
        <h6>Note: minimum overs bowled is 10 overs</h6>
    </div>
  );
}

function BarChart() {

  const [year, setYear] = useState(2008);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/top_run_scorers?year=${year}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    
    fetchData();
  }, [year]);

  // const players = Object.keys(data);
  // const runs = Object.values(data);
  const players = data.map(item => item.player);
  const runs = data.map(item => item.runs);
  // const colors = players.map(() => `#${Math.floor(Math.random()*16777215).toString(16)}`);
  const interpolateColor = (value, min, max) => {
    const ratio = (value - min) / (max - min);
    // Interpolate between red (255,0,0) and yellow (255,255,0)
    const g = 255 - Math.round(255 * ratio);
    return `rgb(255,${g},0)`;
  };

  // Calculate min and max for runs to scale the colors appropriately
  const minRuns = Math.min(...runs);
  const maxRuns = Math.max(...runs);

  // Assign a color to each bar
  const colors = runs.map(run => interpolateColor(run, minRuns, maxRuns));
  const handleSliderChange = (event, newValue) => {
    setYear(newValue);
  };
  return (
    <div>
      <h1>Barchart of Top Run Scorers in IPL {year}</h1>
      <YearSlider onChange={handleSliderChange} year={year} />
      {data && (
          <Plot
            data={[
              {
                x: players,
                y: runs,
                type: 'bar',
                name: 'top run scorers',
                marker: {
                  color: colors, // Apply the colors here
                },
              },
            ]}
            layout={{ 
              width: 600, 
              height: 500, 
              xaxis: {
              title: 'Cricket Players',
              automargin: true,
            },
            yaxis: {
              title: 'Runs',
            } }}
          />
        )}
    </div>
  );

  
}

function TeamStatsGrid() {
  // Implement the Team Stats grid here
}

function MatchStatsGrid() {
  // Implement the Match Stats grid here
}

export default App;
