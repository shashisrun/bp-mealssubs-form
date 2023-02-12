const calorieCalculator = (isMale, weight, height, age, physicalActivity) => {
    if (isMale) {
        return ((10 * weight) + (6.25 * height) - (5 * age) + 5) + (physicalActivity === 'High (5000 - 10000)' ? 250 : 0) + (physicalActivity === 'Very High (10000+)' ? 500 : 0)
    } else {
        return ((10 * weight) + (6.25 * height) - (5 * age) - 161) + (physicalActivity === 'High (5000 - 10000)' ? 250 : 0) + (physicalActivity === 'Very High (10000+)' ? 500 : 0)
    }
}

export default calorieCalculator;