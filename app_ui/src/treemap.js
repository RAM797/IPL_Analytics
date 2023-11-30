import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot  from 'react-plotly.js';
import YearSlider from './yearSlider';


function TreeMap(){

  const [year, setYear] = useState(2008);
  const [data, setData] = useState([]);
 


  useEffect(() => {
    const fetchData = async () => {
      try {
        let response
        // console.log(showWicketTakers);
        response = await axios.get(`http://127.0.0.1:5000/boundaries?year=${year}`);  
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


    const plotData = [{
        type: "treemap",
        labels: data.map(d => d.team),
        parents: data.map(() => ""),
        values: data.map(d => d.boundaries),
        marker: { colors: data.map(d => teamColors[d.team]) },
        textinfo: "label+value"
      }];
  
      return (
        <div>
            <div>
              <h2>Treemap of Boundaries in IPL {year}</h2>
              <YearSlider onChange={handleSliderChange} year={year} />  
            </div>
            
            <Plot
            data={plotData}
            layout={{ }}
            />
            <h6>Note: Boundaries include 4 and 6 runs</h6>
        </div>
      );
    }

export default TreeMap;