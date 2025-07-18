import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function UserCommentColumnChart({ data }) {
  const { users = [], comments = [] } = data;

  const chartData = {
    labels: ['Users', 'Comments'],
    datasets: [
      {
        label: 'Count',
        data: [users.length, comments.length],
        backgroundColor: ['#198754', '#0dcaf0'], // green & blue
        borderRadius: 8,
        barThickness: 50
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: ctx => `${ctx.raw} ${ctx.label.toLowerCase()}`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: '#495057' },
        grid: { color: '#dee2e6' }
      },
      x: {
        ticks: { color: '#343a40' },
        grid: { display: false }
      }
    }
  };

  const styles = {
    card: {
      backgroundColor: '#f8f9fa',
      borderRadius: '0.75rem',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      marginBottom: '1rem'
    },
    header: {
      backgroundColor: '#f8f9fa',
      borderBottom: '1px solid #dee2e6',
      padding: '0.75rem 1rem',
      fontWeight: '600',
      fontSize: '1rem',
      color: '#343a40'
    },
    body: {
      padding: '1rem',
      height: '280px'
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>Users vs Comments</div>
      <div style={styles.body}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}

export default UserCommentColumnChart;
