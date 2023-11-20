// src/App.js

import React from 'react';
import Chart from 'chart.js';

function PlayerStatsGrid() {
  // Generate random data for the bar charts
  const generateRandomData = () => {
    return Array.from({ length: 5 }, () => Math.floor(Math.random() * 100));
  };

  // Create a function to render a bar chart
  const renderBarChart = (canvas, data) => {
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'],
        datasets: [
          {
            label: 'Data',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  return (
    <div className="player-stats-grid">
      {[0, 1, 2, 3, 4, 5].map((gridIndex) => (
        <div key={gridIndex} className="grid-item">
          <canvas
            id={`chart-${gridIndex}`}
            width="400"
            height="200"
            ref={(canvas) => {
              // Render the chart on the canvas element
              if (canvas) {
                const data = generateRandomData();
                renderBarChart(canvas, data);
              }
            }}
          ></canvas>
        </div>
      ))}
    </div>
  );
}

export default PlayerStatsGrid;
