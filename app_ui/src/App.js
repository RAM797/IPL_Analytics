import React, { useState} from 'react';
import Boxplot from './boxplot';
import BarChart from './barchart';
import LineGraph from './linegraph';
import ScatterPlotMatrix from './scatterplot';
import GroupedBarChart from './groupedBarchart';
import PopulationPyramid from './populationPyramid';
import TreeMap from './treemap';
import BubbleChart from './bubbleChart';
import './App.css';
import Piechart from './piechart';
import Donutchart from './donutchart';
import HeatMap from './heatmap';
import logo from './IPL_logo.jpeg';

function App() {
  const [activeTab, setActiveTab] = useState('Player Stats');

  return (
    <div className="App">
      <header>
        <div>
          <img src = {logo} alt="IPL logo"/>
          <h1>IPL Analytics</h1>
        </div>
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


export function PlayerStatsGrid(){
  return(
    <div>
      <div className='grid-container'>
      <div className='grid-item'>
        <Boxplot/>
      </div> 
      <div className='grid-item'>
        <BarChart/>
      </div>
    </div>
    <div className = 'grid-container'>
      <div className='grid-item'>
        <LineGraph/>
      </div>
      <div className='grid-item'>
        <ScatterPlotMatrix/>
      </div>
    </div>
  </div>
  );
}

export function TeamStatsGrid(){
  return(
    <div>
      <div className = 'grid-container'>
        <div className = 'grid-item'>
          <GroupedBarChart/>
        </div>
        <div className='grid-item'>
          <PopulationPyramid/>
        </div>
      </div>
      <div className = 'grid-container'>
        <div className = 'grid-item'>
          <TreeMap/>
        </div>
        <div className = 'grid-item'>
          <BubbleChart/>
        </div>
      </div>
    </div>

  );
}
  
function MatchStatsGrid() {
  return(
    <div className='grid-container3'>
      <div className = 'grid-item'>
        <Piechart/>
      </div>
      <div className='grid-item'>
        <Donutchart/>
      </div>
      <div className='grid-item'>
        <HeatMap/>
      </div>
    </div>
  );
}

export default App;
