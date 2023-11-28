import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

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
  export default YearSlider;