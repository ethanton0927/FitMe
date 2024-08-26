import React, { useEffect, useState } from 'react'
import './styles/home.css'
import { useNavigate } from 'react-router-dom'
import { Line } from 'react-chartjs-2'
import 'chart.js/auto'
import 'chartjs-adapter-date-fns'
import weightHistory from '../data/weightData'

const Dashboard = () => {
    const navigate = useNavigate();
    // State to store user's stats
    const [stats, setStats] = useState({
        age: 0,
        height: '0\' 0"',
        weight: 0,
        neck: 0,
        waist: 0,
        bodyFat: 0,
        idealWeight: 0,
        goalFat: 0,
        leanMass: 0,
        fatMass: 0
    });
    // useEffect hook to load user stats from local storage
    useEffect(() => {
        const loadedStats = localStorage.getItem('userStats');
        if (loadedStats) {
            const data = JSON.parse(loadedStats);
            setStats({
                age: data.age || 0,
                height: data.height || '0\' 0"',
                weight: data.weight || 0,
                neck: data.neckCircumference || 0,
                waist: data.waistCircumference || 0,
                bodyFat: data.bodyFat || 0,
                idealWeight: data.idealWeight || 0,
                goalFat: data.goalFat || 0,
                leanMass: data.leanMass || 0,
                fatMass: data.fatMass || 0
            });
        }
    }, []);
    // Navigates to Log Stats page
    const handleUpdateClick = () => {
        navigate('/log-stats');
    };

    // Prepare chart data using imported weightHistory
    const chartData = {
        labels: weightHistory.map(data => data.date),
        datasets: [
            {
                label: 'Weight Over Time',
                data: weightHistory.map(data => data.weight),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1    // Smoothness of the chart line
            }
        ]
    };
    // Chart options to customize char appearance
    const chartOptions = {
        scales: {
            x: {
                ticks: {
                    color: '#FFFFFF' // Font color for x-axis tick labels
                },
                title: {
                    display: true,
                    text: 'Date',
                    color: '#FFFFFF' // Font color for x-axis title
                }
            },
            y: {
                ticks: {
                    color: '#FFFFFF' // Font color for y-axis tick labels
                },
                title: {
                    display: true,
                    text: 'Weight (lbs)',
                    color: '#FFFFFF' // Font color for y-axis title
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: '#FFFFFF' // Font color for legend labels
                }
            },
            tooltip: {
                titleColor: '#FFFFFF', // Font color for tooltip titles
                bodyColor: '#FFFFFF'  // Font color for tooltip body
            }
        }
    };

    return (
        <div className='page'>
            <div className="header">
                <h2>Home</h2>
            </div>

            {/* Macros Container */}
            <div className="container">
            <div className="row">
                    <span className='section-title'>Macros</span>
                    <button type="button" className='update-btn' id='stat-update-btn' onClick={handleUpdateClick}>
                        Update
                    </button>
                </div>
                <div className="row">
                    <label>Calories Remaining</label>
                    <div id='cal-progress-bar' className="progress-bar"><span>3000</span></div>
                </div>
                <div className="row">
                    <label>Carbohydrates</label>
                    <div id='carb-progress-bar' className="progress-bar"><span>200</span></div>
                </div>
                <div className="row">
                    <label>Fat</label>
                    <div id='fat-progress-bar' className="progress-bar"><span>100</span></div>
                </div>
                <div className="row">
                    <label>Protein</label>
                    <div id='protien-progress-bar' className="progress-bar"><span>50</span></div>
                </div>
            </div>

            {/* Stats Container */}
            <div className="container">
                <div className="row">
                    <span className='section-title'>Stats</span>
                    <button type="button" className='update-btn' id='stat-update-btn' onClick={handleUpdateClick}>
                        Update
                    </button>
                </div>
                <div className="row stats-row">
                    <div className="column stats-col">
                        <div className="row">
                            <span>Age</span> <span className="var">{stats.age + ' years'}</span>
                        </div>
                        <div className="row">
                            <span>Height</span> <span className="var">{stats.height}</span>
                        </div>
                        <div className="row">
                            <span>Weight</span> <span className="var">{stats.weight + " lb"}</span>
                        </div>
                        <div className="row">
                            <span>Neck</span> <span className="var">{stats.neck + " in"}</span>
                        </div>
                        <div className="row">
                            <span>Waist</span> <span className="var">{stats.waist + " in"}</span>
                        </div>
                    </div>
                    <div className="column stats-col">
                        <div className="row">
                            <span>Body Fat</span> <span className="var">{stats.bodyFat.toFixed(1) + " %"}</span> 
                        </div>
                        <div className="row">
                            <span>Ideal Weight</span> <span className="var">{stats.idealWeight.toFixed(1) + " lb"}</span> 
                        </div>
                        <div className="row">
                            <span>Ideal Fat</span> <span className="var">{stats.goalFat.toFixed(1) + " %"}</span> 
                        </div>
                        <div className="row">
                            <span>Lean Mass</span> <span className="var">{stats.leanMass.toFixed(1) + " lb"}</span>
                        </div>
                        <div className="row">
                            <span>Fat Mass</span> <span className="var">{stats.fatMass.toFixed(1) + " lb"}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Weight Chart Container */}
            <div className="container">
                <div className="row">
                    <span className='section-title'>Weight</span>
                    <button type="button" className='update-btn' id='stat-update-btn' onClick={handleUpdateClick}>
                        Update
                    </button>
                </div>

                {/* Weight graph/chart */}
                <div className="row">
                    <Line data={chartData} options={chartOptions} />
                </div>
            </div>
            {/* Weight Chart Container */}
            <div className="container">
                <div className="row">
                    <span className='section-title'>Heart Health</span>
                    <button type="button" className='update-btn' id='stat-update-btn' onClick={handleUpdateClick}>
                        Update
                    </button>
                </div>

                <div className="row">
                    <label>Fat</label>
                    <div id='fat-progress-bar' className="progress-bar"><span>100 g</span></div>
                </div>
                <div className="row">
                    <label>Sodium</label>
                    <div id='sodium-progress-bar' className="progress-bar"><span>2300 mg</span></div>
                </div>
                <div className="row">
                    <label>Cholesterol</label>
                    <div id='cholesterol-progress-bar' className="progress-bar"><span>300 mg</span></div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard