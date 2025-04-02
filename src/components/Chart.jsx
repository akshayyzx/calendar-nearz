import React from 'react';
import { Bar, Line, Pie, Doughnut, Scatter, Radar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement, RadialLinearScale } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale
);

const SalonDashboardCharts = ({ data }) => {
  const revenueData = {
    labels: data.months,
    datasets: [{
      label: 'Revenue',
      data: data.revenue,
      borderColor: 'blue',
      backgroundColor: 'rgba(0, 0, 255, 0.5)',
    }],
  };

  const servicePopularity = {
    labels: data.services,
    datasets: [{
      label: 'Service Count',
      data: data.serviceCounts,
      backgroundColor: 'orange',
    }],
  };

  const appointmentStatus = {
    labels: data.statuses,
    datasets: [{
      label: 'Appointments',
      data: data.statusCounts,
      backgroundColor: ['red', 'green', 'yellow'],
    }],
  };

  const revenueBySource = {
    labels: data.sources,
    datasets: [{
      label: 'Revenue',
      data: data.sourceRevenue,
      backgroundColor: ['blue', 'purple', 'pink'],
    }],
  };

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-bold">Revenue Over Time</h2>
        <Line data={revenueData} />
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-bold">Service Popularity</h2>
        <Bar data={servicePopularity} />
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-bold">Appointment Status</h2>
        <Pie data={appointmentStatus} />
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-bold">Revenue by Source</h2>
        <Doughnut data={revenueBySource} />
      </div>
    </div>
  );
};

export default SalonDashboardCharts;
