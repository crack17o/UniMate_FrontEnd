import React, { useEffect, useRef, useMemo } from 'react';
import Chart from 'chart.js/auto';

const BudgetChart = ({ budget }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const colors = useMemo(() => ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], []);
  const categories = useMemo(() => ['Transport', 'Nourriture', 'Supports cours', 'Divers'], []);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    
    chartInstance.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: categories,
        datasets: [{
          data: [
            budget.transport,
            budget.nourriture,
            budget.supportsCours,
            budget.divers
          ],
          backgroundColor: colors,
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [budget, categories, colors]);

  return (
    <section className="budget card">
      <div className="section-header">
        <i className="fas fa-wallet section-icon"></i>
        <h2>Budget mensuel</h2>
      </div>
      <div className="budget-container">
        <div className="chart-container">
          <canvas ref={chartRef}></canvas>
        </div>
        <div className="budget-legend">
          {categories.map((category, index) => (
            <div key={category} className="legend-item">
              <span 
                className="legend-color" 
                style={{ background: colors[index] }}
              ></span>
              <span className="legend-label">
                {category}: {budget[category.toLowerCase().replace(' ', '')]}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BudgetChart;
