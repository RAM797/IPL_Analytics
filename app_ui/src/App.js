import React, { useState} from 'react';
import Boxplot from './boxplot';
import BarChartWrapper from './barchart';
import LineGraph from './linegraph';
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

  

function TeamStatsGrid() {
  // Implement the Team Stats grid here
}

function MatchStatsGrid() {
  // Implement the Match Stats grid here
}

export default App;
