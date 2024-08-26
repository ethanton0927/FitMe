import React, { useState, useEffect } from 'react'
import { FaPlusCircle } from "react-icons/fa"
import Papa from 'papaparse'
import './styles/exercises.css'
import { useExerciseDiary } from '../contexts/ExerciseDiaryContext'

const Exercises = () => {
    // State to store the list of exercises
    const [exercises, setExercises] = useState([])
    const { addExercise } = useExerciseDiary()
    // useEffect hook to fetch and parse the CSV file with the list of exercises
    useEffect(() => {
        Papa.parse(`${process.env.PUBLIC_URL}/exercises.csv`, {
            download: true,
            header: true,
            complete: function(results) {
                console.log(results.data);
                setExercises(results.data);
            }
        });
    }, []);

    return (
        <div className='page'>
            <div className="header">
                <h2>Exercises</h2>
            </div>

            <div id="exercises-list">
                    {exercises.map((exercise, index) => (
                        <div key={index} className="exercise-item container">
                            <img src={exercise.imageUrl} alt={exercise.name} className="exercise-icon" />
                            <div className="exercise-details">
                                <h4>{exercise.name}</h4>
                                <div className="exercise-types">
                                    <span>{exercise.type}</span>
                                    <span>|</span>
                                    <span>{exercise.equipment}</span>
                                </div>
                            </div>
                            <button className="add-exercise-btn" onClick={() => addExercise(exercise)}>
                                <FaPlusCircle className='icon'/>
                            </button>
                        </div>
                    ))}
                </div>
        </div>
    )
}

export default Exercises