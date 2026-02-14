import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import moment from "moment";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const DailyAccountBalanceChart = ({ data }) => {
    // Labels (Day numbers)
    const labels = data.map(item => item.date.split('-')[2]);

    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        transitions: {
            active: { animation: { duration: 0 } }
        },
        interaction: {
            mode: 'index',
            intersect: false,
        },
        scales: {
            x: {
                grid: { display: false, drawBorder: false },
                ticks: { font: { size: 11 } }
            },
            y: {
                grid: { borderDash: [4, 4], color: '#f1f5f9', drawBorder: false },
                ticks: {
                    callback: function (value) {
                        if (value >= 1000) return value / 1000 + 'k';
                        return value;
                    },
                    font: { size: 10 }
                }
            }
        },
        plugins: {
            legend: {
                position: 'top',
                labels: { usePointStyle: true, boxWidth: 8, font: { size: 11 } }
            },
            tooltip: {
                backgroundColor: 'rgba(30, 41, 59, 0.9)',
                padding: 12,
                cornerRadius: 8,
                titleFont: { size: 12 },
                callbacks: {
                    title: (context) => {
                        const dateIndex = context[0].dataIndex;
                        const fullDate = data[dateIndex].date;
                        return moment(fullDate).format('MMM D, YYYY');
                    },
                    label: function (context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'BDT' }).format(context.parsed.y);
                        }
                        return label;
                    }
                }
            }
        },
    };

    // Chart 1: Balance Trend (Area Line Chart)
    const balanceData = {
        labels,
        datasets: [
            {
                label: 'Running Balance',
                data: data.map(item => item.balance),
                borderColor: '#6366f1', // Indigo
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 2,
                pointHoverRadius: 5,
            },
        ],
    };

    // Chart 2: Cash Flow (Details) - Bar Chart for Credit/Debit
    const cashFlowData = {
        labels,
        datasets: [
            {
                label: 'Credit (Inflow)',
                data: data.map(item => item.total_credit),
                backgroundColor: '#2fb344', // Green
                borderColor: '#2fb344',
                borderWidth: 1,
                borderRadius: 4,
            },
            {
                label: 'Debit (Outflow)',
                data: data.map(item => item.total_debit),
                backgroundColor: '#d63939', // Red
                borderColor: '#d63939',
                borderWidth: 1,
                borderRadius: 4,
            },
        ],
    };

    return (
        <div className="row g-3">
            {/* Balance Trend - Main Chart */}
            <div className="col-lg-6">
                <div className="card shadow-none border">
                    <div className="card-header border-bottom-0 pt-3 pb-0">
                        <h4 className="card-title text-muted small text-uppercase fw-bold">Daily Running Balance</h4>
                    </div>
                    <div className="card-body" style={{ height: '300px' }}>
                        <Line options={commonOptions} data={balanceData} />
                    </div>
                </div>
            </div>

            {/* Cash Flow - Secondary Chart */}
            <div className="col-lg-6">
                <div className="card shadow-none border">
                    <div className="card-header border-bottom-0 pt-3 pb-0">
                        <h4 className="card-title text-muted small text-uppercase fw-bold">Daily Cash Flow (Credit vs Debit)</h4>
                    </div>
                    <div className="card-body" style={{ height: '300px' }}>
                        <Bar options={commonOptions} data={cashFlowData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DailyAccountBalanceChart;
