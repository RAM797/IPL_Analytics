
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
      <h1>Boxplot of Bowler Economy in {year}</h1>
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
