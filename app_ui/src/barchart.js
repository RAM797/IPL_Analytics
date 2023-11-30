import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import YearSlider from './yearSlider';

function BarChart() {
  const [year, setYear] = useState(2008);
  const [data, setData] = useState([]);
  const [showWicketTakers, setShowWicketTakers] = useState(false);

  const teamColors = {'Mumbai Indians': 'rgb((0, 75, 160))',
    'Chennai Super Kings': 'rgb((255, 255, 60))',
    'Kolkata Knight Riders': 'rgb((46, 8, 84))',
    'Sunrisers Hyderabad': 'rgb((255, 130, 42))',
    'Rajasthan Royals': 'rgb((255, 192, 203))',
    'Royal Challengers Bangalore': 'rgb((236, 28, 36))',
    'Delhi Capitals': 'rgb((0, 0, 139))',
    'Punjab Kings': 'rgb((220, 221, 223))',
    'Gujarat Titans': 'rgb((27, 33, 51))',
    'Lucknow Super Giants': 'rgb((129, 188, 100))',
    'Kings XI Punjab': 'rgb((220, 221, 223))',
    'Delhi Daredevils': 'rgb((0, 0, 139))',
    'Rising Pune Supergiant': 'rgb((158, 52, 149))',
    'Rising Pune Supergiants': 'rgb((158, 52, 149))',
    'Pune Warriors': 'rgb((0, 0, 0))',
    'Deccan Chargers': 'rgb((100, 136, 180))',
    'Kochi Tuskers Kerala': 'rgb((128, 0, 128))',
    'Gujarat Lions': 'rgb((255, 165, 0))'};
   

  const toggleData = () => {
    setShowWicketTakers(!showWicketTakers);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (showWicketTakers) {
          response = await axios.get(`http://127.0.0.1:5000/top_wicket_takers?year=${year}`);
        } else {
          response = await axios.get(`http://127.0.0.1:5000/top_run_scorers?year=${year}`);
        }
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, [showWicketTakers, year]);

  // Function to group data by team
  const groupDataByTeam = () => {
    const teamData = {};
    data.forEach(d => {
      const team = d.team;
      if (!teamData[team]) {
        teamData[team] = { players: [], stats: [], color: teamColors[team] };
      }
      teamData[team].players.push(d.player);
      teamData[team].stats.push(showWicketTakers ? d.wickets : d.runs);
    });
    return Object.keys(teamData).map(team => ({
      x: teamData[team].players,
      y: teamData[team].stats,
      type: 'bar',
      name: team,
      marker: { color: teamData[team].color },
    }));
  };

  let plotData = groupDataByTeam();
  let x_axis = showWicketTakers ? 'Bowler' : 'Batsman';
  let y_axis = showWicketTakers ? 'Wickets' : 'Runs';
  let title = showWicketTakers ? 'Top Wicket Takers' : 'Top Run Scorers';

  const layout = {
    barmode: 'group',
    showlegend: true,
    legend: {
      title: { text: 'Teams' },
      orientation: 'h',
      x: 0.5,
      xanchor: 'center',
      y: 1.1,
      yanchor: 'bottom'
    },
    xaxis: { title: x_axis },
    yaxis: { title: y_axis },
  };

  const handleSliderChange = (event, newValue) => {
    setYear(newValue);
  };

  return (
    <div>
      <h2>{title} in IPL {year}</h2>
      <div>
        <YearSlider onChange={handleSliderChange} year={year} />
        <button onClick={toggleData}>
          {showWicketTakers ? 'Show Run Scorers' : 'Show Wicket Takers'}
        </button>
      </div>
      <Plot data={plotData} layout={layout} />
    </div>
  );
}

export default BarChart;
