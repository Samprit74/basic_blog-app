import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import './BlogStyles.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function PostCommentChart({ posts, comments }) {
  const postCount = posts.length;
  const commentCount = comments.length;
  const ratio = postCount === 0 ? 0 : (commentCount / postCount).toFixed(2);

  const data = {
    labels: ['Posts', 'Comments'],
    datasets: [
      { label: 'Count', data: [postCount, commentCount], backgroundColor: ['#0d6efd', '#ffc107'], borderRadius: 12, barThickness: 32 }
    ]
  };

  const options = { indexAxis: 'y', responsive: true, plugins: { legend: { display: false } } };

  return (
    <div className="chart-card">
      <h6 className="chart-title">Post vs Comment Overview</h6>
      <Bar data={data} options={options} />
      <p className="chart-ratio">Average Comments per Post: {ratio}</p>
    </div>
  );
}

export default PostCommentChart;
