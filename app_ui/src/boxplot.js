import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot  from 'react-plotly.js';
import YearSlider from './yearSlider';

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

  export default Boxplot;