import React, { useState } from 'react'
import { FaArrowLeft } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'

function LogStats() {
    const navigate = useNavigate();
    // State variables for each input field
    const [age, setAge] = useState('');
    const [heightFt, setHeightFt] = useState('');
    const [heightIn, setHeightIn] = useState('');
    const [weight, setWeight] = useState('');
    const [neckCircumference, setNeckCircumference] = useState('');
    const [waistCircumference, setWaistCircumference] = useState('');
    const [date, setDate] = useState('');

    // Handler for submitting the form
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submit behavior
        const userData = {
            age,
            height: `${heightFt}' ${heightIn}"`, // for display or further use
            weight,
            neckCircumference,
            waistCircumference,
            date
        };
        
        // Example calculations (You need to replace these with your actual formulas)
        const bodyFat = calculateBodyFat(heightFt, heightIn, neckCircumference, waistCircumference); // Example function
        const idealWeight = calculateIdealWeight(heightFt, heightIn);
        const goalFat = 15;
        const leanMass = weight * ((100 - bodyFat) / 100);
        const fatMass = weight * (bodyFat / 100);

        // Save calculated data to local storage
        localStorage.setItem('userStats', JSON.stringify({
            ...userData,
            bodyFat,
            idealWeight,
            goalFat,
            leanMass,
            fatMass
        }));

        navigate('/');
    };

    // Functions to calculate metrics
    function totalHeightInInches(heightFt, heightIn) {
        return parseInt(heightFt) * 12 + parseInt(heightIn);
    }
    function calculateBodyFat(heightFt, heightIn, neckCircumference, waistCircumference) {
        const height = totalHeightInInches(heightFt, heightIn);

        // Ensure all inputs are parsed as floats
        const waistNum = parseFloat(waistCircumference);
        const neckNum = parseFloat(neckCircumference);
        const heightNum = parseFloat(height);

        // Perform the BFP calculation
        const bfp = 86.010 * Math.log10(waistNum - neckNum) - 70.041 * Math.log10(heightNum) + 36.76;
        return bfp;
    }
    function calculateIdealWeight(heightFt, heightIn) {
        const height = totalHeightInInches(heightFt, heightIn);
        console.log(`Computed total height in inches: ${height}`); // Debug log
    
        const baseWeightKg = 56.2; // Base weight in kilograms for 5 feet tall
        const incrementPerInchKg = 1.41; // Increment per inch in kilograms
        const poundsPerKg = 2.20462; // Conversion factor from kg to pounds
    
        const baseWeightLbs = baseWeightKg * poundsPerKg;
        const incrementPerInchLbs = incrementPerInchKg * poundsPerKg;
    
        const inchesOverFiveFeet = Math.max(height - 60, 0);
        console.log(`Inches over five feet: ${inchesOverFiveFeet}`); // Debug log
    
        const idealWeightLbs = baseWeightLbs + incrementPerInchLbs * inchesOverFiveFeet;
        console.log(`Ideal weight in pounds: ${idealWeightLbs}`); // Debug log
    
        return idealWeightLbs;
    }
    

    return (
        <div className="page">
            <div className="header">
                <button type="button" className='header-back-btn'> <FaArrowLeft className='icon'/> </button>
                <h2>Update Stats</h2>
            </div>

            <form onSubmit={handleSubmit} className='column'>
                <input
                    className="text-input"
                    type="number"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
                <div className="row">
                    <input
                        className="text-input"
                        type="number"
                        placeholder="Height ft"
                        value={heightFt}
                        onChange={(e) => setHeightFt(e.target.value)}
                    />
                    <input
                        className="text-input"
                        type="number"
                        placeholder="Height in"
                        value={heightIn}
                        onChange={(e) => setHeightIn(e.target.value)}
                    />
                </div>
                <input
                    className="text-input"
                    type="number"
                    placeholder="Weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                />
                <input
                    className="text-input"
                    type="number"
                    placeholder="Neck Circumference"
                    value={neckCircumference}
                    onChange={(e) => setNeckCircumference(e.target.value)}
                />
                <input
                    className="text-input"
                    type="number"
                    placeholder="Waist Circumference"
                    value={waistCircumference}
                    onChange={(e) => setWaistCircumference(e.target.value)}
                />
                <input
                    className="text-input"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <button type="submit" className='submit-btn'>Update Stats</button>
            </form>
        </div>
    );
}

export default LogStats;