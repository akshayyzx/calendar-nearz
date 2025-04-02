import React from 'react';
import { Bar, Line, Pie, Doughnut, PolarArea, Radar } from 'react-chartjs-2';
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

const SalonDashboardCharts = () => {
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Revenue',
      data: [12000, 15000, 14000, 17000, 16000, 18000],
      borderColor: 'blue',
      backgroundColor: 'rgba(0, 0, 255, 0.5)',
    }],
  };

  const servicePopularity = {
    labels: ['Haircut', 'Facial', 'Massage', 'Manicure', 'Pedicure'],
    datasets: [{
      label: 'Service Count',
      data: [50, 30, 40, 25, 35],
      backgroundColor: 'orange',
    }],
  };

  const appointmentStatus = {
    labels: ['Completed', 'Pending', 'Cancelled'],
    datasets: [{
      label: 'Appointments',
      data: [120, 40, 20],
      backgroundColor: ['green', 'yellow', 'red'],
    }],
  };

  const revenueBySource = {
    labels: ['Online', 'Walk-in', 'Referral'],
    datasets: [{
      label: 'Revenue',
      data: [10000, 8000, 5000],
      backgroundColor: ['blue', 'purple', 'pink'],
    }],
  };

  const customerSatisfaction = {
    labels: ['Excellent', 'Good', 'Average', 'Poor'],
    datasets: [{
      label: 'Ratings',
      data: [60, 25, 10, 5],
      backgroundColor: ['blue', 'green', 'yellow', 'red'],
    }],
  };

  const salesGrowth = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Sales',
      data: [5000, 7000, 6500, 8000, 7500, 9000],
      borderColor: 'orange',
      backgroundColor: 'rgba(255, 165, 0, 0.5)',
    }],
  };

  const topProducts = {
    labels: ['Shampoo', 'Conditioner', 'Hair Oil', 'Face Cream'],
    datasets: [{
      label: 'Units Sold',
      data: [80, 60, 90, 70],
      backgroundColor: ['#FF5733', '#33FFBD', '#FF33F6', '#337BFF'],
    }],
  };

  const employeePerformance = {
    labels: ['John', 'Emily', 'Michael', 'Sarah'],
    datasets: [{
      label: 'Performance Score',
      data: [85, 75, 90, 80],
      backgroundColor: 'cyan',
    }],
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-700 uppercase">Your Salon Insights</h1>
      <div className="grid grid-cols-4 gap-4">
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
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-bold">Customer Satisfaction</h2>
          <PolarArea data={customerSatisfaction} />
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-bold">Sales Growth</h2>
          <Line data={salesGrowth} />
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-bold">Top Products</h2>
          <Bar data={topProducts} />
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-bold">Employee Performance</h2>
          <Radar data={employeePerformance} />
        </div>
      </div>
    </div>
  );
};

export default SalonDashboardCharts;