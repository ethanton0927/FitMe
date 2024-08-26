import React from 'react'
import './styles/diary.css'
import { useFoodDiary } from '../contexts/FoodDiaryContext'
import { useExerciseDiary } from '../contexts/ExerciseDiaryContext'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"
import { TiDelete } from "react-icons/ti"
import { useNavigate } from 'react-router-dom'

const Diary = () => {
    // Use context to get foods eaten and exercises done with functions
    const { foodsEaten, removeFood } = useFoodDiary()
    const { exercisesDone, removeExercise } = useExerciseDiary()
    const navigate = useNavigate()
    // Calculate total calories from foods eaten
    const totalCalories = foodsEaten.reduce((acc, food) => acc + Number(food.calories), 0)
    const totalCarbs = foodsEaten.reduce((acc, food) => acc + Number(food.carbs), 0).toFixed(1)
    const totalFats = foodsEaten.reduce((acc, food) => acc + Number(food.fat), 0).toFixed(1)
    const totalProteins = foodsEaten.reduce((acc, food) => acc + Number(food.protein), 0).toFixed(1)
    // Calculate total calories from exercises done
    const totalCaloriesBurned = exercisesDone.reduce((acc, exercise) => acc + Number(exercise.calories), 0)
    
    const handleAddFoodClick = () => {
        navigate('/foods');  // Navigate to the Foods page
    }
    const handleAddExerciseClick = () => {
        navigate('/exercises'); // Navigate to the Exercises page
    }

    return (
        <div className='page'>
            <div className="header">
                <h2>Diary</h2>
            </div>
            {/* Change dates */}
            <div className="row" id='date-changer'>
                <FaAngleLeft className='icon'/>
                <h3>Today</h3>
                <FaAngleRight className='icon'/>
            </div>

            {/* Foods */}
            <div className="container">
                <div className="row">
                    <h4>Foods</h4>
                    Total Calories: {totalCalories}
                </div>
                <div className="row">
                    <div>Carbs: {totalCarbs} g</div>
                    <div>Fat: {totalFats} g</div>
                    <div>Protein: {totalProteins} g</div>
                </div>

                <div className="column" id='diary-food-list'>
                    {foodsEaten.map((food, index) => (
                        <div key={index} className='row diary-food-item'>
                            <div>
                                {food.name}
                            </div>
                            <div className='food-item-details'>
                                {food.calories} Cal <TiDelete className='icon delete-icon' onClick={() => removeFood(index)}/>
                            </div>
                        </div>
                    ))}
                </div>

                <button type="button" className='update-btn' onClick={handleAddFoodClick}>Add Food</button>
            </div>
            
            {/* Exercises */}
            <div className="container">
                <div className="row">
                    <h4>Exercises</h4>
                    Total Calories Burned: {totalCaloriesBurned}
                </div>

                <div className="column" id='diary-food-list'>
                    {exercisesDone.map((exercise, index) => (
                        <div key={index} className='row diary-food-item'>
                            <div>
                                {exercise.name}
                            </div>
                            <div className='food-item-details'>
                                {exercise.calories} Cal <TiDelete className='icon delete-icon' onClick={() => removeExercise(index)}/>
                            </div>
                        </div>
                    ))}
                </div>

                <button type="button" className='update-btn' onClick={handleAddExerciseClick}>Add Exercise</button>
            </div>
        </div>
    )
}

export default Diary