import React, { useState, useEffect } from 'react'
import { FaPlusCircle } from "react-icons/fa"
import Papa from 'papaparse'
import './styles/foods.css'
import { useFoodDiary } from '../contexts/FoodDiaryContext'

const Foods = () => {
    // State to store the list of foods
    const [foods, setFoods] = useState([])
    const { addFood } = useFoodDiary()
    // useEffect hook to fetch and parse the CSV file with the list of foods
    useEffect(() => {
        Papa.parse(`${process.env.PUBLIC_URL}/foods.csv`, {
            download: true,
            header: true,
            complete: function(results) {
                console.log(results.data);
                setFoods(results.data);
            }
        });
    }, []);

    return (
        <div className='page'>
            <div className="header">
                <h2>Foods</h2>
            </div>

            <div id="food-list">
                {foods.map((food, index) => (
                    <div key={index} className="food-item container">
                        <img src={food.imageUrl} alt={food.name} className="food-icon" />
                        <div className="food-details">
                            <h4>{food.name}</h4>
                            <div className="food-macros">
                                <p>Cal: {food.calories},</p>
                                <p>C: {food.carbs} g,</p>
                                <p>F: {food.fat} g,</p>
                                <p>P: {food.protein} g</p>
                            </div>
                        </div>
                        <button className="add-food-btn" onClick={() => addFood(food)}>
                            <FaPlusCircle className='icon'/>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Foods