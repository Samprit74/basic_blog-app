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

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function PostCommentChart({ posts, comments }) {
  const postCount = posts.length;
  const commentCount = comments.length;
  const ratio = postCount === 0 ? 0 : (commentCount / postCount).toFixed(2);

  const data = {
    labels: ['Posts', 'Comments'],
    datasets: [
      {
        label: 'Count',
        data: [postCount, commentCount],
        backgroundColor: ['#0d6efd', '#ffc107'],
        borderRadius: 12,
        barThickness: 32
      }
    ]
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: '#6c757d'
        },
        grid: {
          color: '#dee2e6'
        }
      },
      y: {
        ticks: {
          color: '#343a40'
        }
      }
    }
  };

  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-header bg-white border-bottom">
        <h6 className="mb-0 fw-semibold text-white ">Post vs Comment Overview</h6>
      </div>
      <div className="card-body">
        <div style={{ height: '260px' }}>
          <Bar data={data} options={options} />
        </div>
        <hr />
        <p className="mb-0 text-muted" style={{ fontSize: '0.9rem' }}>
          <strong>Average Comments per Post:</strong> {ratio}
        </p>
      </div>
    </div>
  );
}

export default PostCommentChart;
