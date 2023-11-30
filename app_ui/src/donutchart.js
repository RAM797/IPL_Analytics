import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot  from 'react-plotly.js';
import YearSlider from './yearSlider';

function Donutchart() {
    const [year, setYear] = useState(2008);
    const [data, setData] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:5000/dismissal_metrics?year=${year}`);
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
        <h2>Donut Chart of Dismissals in IPL {year}</h2>
        <YearSlider onChange={handleSliderChange} year={year} />
        {data && (
            <Plot
              data={[
                {
                    labels: Object.keys(data),
                    values: Object.values(data),
                    type: 'pie',
                    hole:0.4,
                },
              ]}
              layout={{ width: 500, height: 400}}
            />
          )}
      </div>
    );
  }

  export default Donutchart;