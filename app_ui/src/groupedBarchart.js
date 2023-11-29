import React, {useState,useEffect } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

function GroupedBarChart() {

  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response
        // console.log(showWicketTakers);
        response = await axios.get(`http://127.0.0.1:5000/championships`);  
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    
    fetchData();
  },[]);
  
  const teams = Object.keys(data);
  const championships = teams.map(team => data[team].championships);
  const playoffAppearances = teams.map(team => data[team].playoff_appearances);

  return (
    <div>
        <Plot
        data={[
            {
            x: teams,
            y: championships,
            type: 'bar',
            name: 'Championships',
            marker: { color: 'indianred' },
            },
            {
            x: teams,
            y: playoffAppearances,
            type: 'bar',
            name: 'Playoffs',
            marker: { color: 'lightblue' },
            }
        ]}
        layout={{
            title: 'IPL Teams: Championships and Playoff Appearances',
            barmode: 'group',
            xaxis: {
              title: 'Teams',
              tickangle: -45, // Adjust angle
              automargin: true, // Automatically adjust margin
              tickfont: { size: 10 } // Adjust font size if necessary
            },
            yaxis: { title: 'Count' },
            margin: { l: 50, r: 50, t: 50, b: 100 }, // Adjust bottom margin
          }}
        style={{ width: "100%", height: "100%" }}
        />
    </div>
  );
};

export default GroupedBarChart;
