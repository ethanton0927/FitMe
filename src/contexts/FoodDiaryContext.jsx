import React, { createContext, useContext, useState } from 'react'

const FoodDiaryContext = createContext();
// Custom hook to use Food Diary Context
export const useFoodDiary = () => useContext(FoodDiaryContext)
// Provider component
export const FoodDiaryProvider = ({ children }) => {
    const [foodsEaten, setFoodsEaten] = useState([])

    const addFood = (food) => {
        setFoodsEaten(prevFoods => [...prevFoods, food])
    };

    const removeFood = (index) => {
        setFoodsEaten(prevFoods => prevFoods.filter((_, idx) => idx !== index));
    };

    return (
        <FoodDiaryContext.Provider value={{ foodsEaten, addFood, removeFood }}>
            {children}
        </FoodDiaryContext.Provider>
    )
}