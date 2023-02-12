import React from "react";


export default function CustomizedPlan({plan, onClick}) {
    const [duration, setDuration] = React.useState(0)
    const [protein, setProtein] = React.useState(0)
    const [addonProtein, setAddonProtein] = React.useState(0)
    const [addonCarb, setAddonCarb] = React.useState(0)
    const [mealsPerDay, setMealsPerDay] = React.useState(1)

    const addons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    console.log(plan);
    return (
        <>
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">
                        Create your own plan!
                    </span>
                </label>
            </div>
            <div className="my-3">
                <div className='my-2'>
                    <select className="select w-full select-primary" onChange={(event) => setDuration(plan.durations.filter((duration) => event.target.value == duration.days)[0])}>
                        <option disabled selected>Pick your duration</option>
                        {plan.durations.map((duration, index) => <option value={duration.days} key={index}>{duration.title}</option>)}
                    </select>
                </div>
                <div className='my-2'>
                    <select className="select w-full select-primary" onChange={(event) => setMealsPerDay(parseInt(event.target.value))}>
                        <option disabled selected>Select your meal timing</option>
                        {plan.mealsPerDay.map((meal, index) => <option value={meal.mealCount} key={index}>{meal.title}</option>)}
                    </select>
                </div>
                <div className='my-2'>
                    <select className="select w-full select-primary" onChange={(event) => setProtein(plan.proteins.filter((protein) => event.target.value == protein.type)[0])}>
                        <option disabled selected>Pick your protein</option>
                        {plan.proteins.map((protein, index) => <option value={protein.type} key={index}>{protein.type} (₹{protein.mealPrice}/Meal)</option>)}
                    </select>
                </div>
                {protein ? <>
                    <div className='my-2'>
                        <select className="select w-full select-primary" onChange={(event) => setAddonProtein(event.target.value)}>
                            <option value={0} selected>Add on Protein Portion ({protein.type})</option>
                            {addons.map((count, index) => <option value={count} key={index}>{protein.type} - {count * protein.addonPortion}g (₹{protein.addonPrice * count}/Meal)</option>)}
                        </select>
                    </div>
                </> : <></>}
                {plan.carbs ? <>
                    <div className='my-2'>
                        <select className="select w-full select-primary" onChange={(event) => setAddonCarb(event.target.value)}>
                            <option value={0} selected>Add on Carbs Portion</option>
                            {addons.map((count, index) => <option value={count} key={index}>{count * plan.carbs.addonPortion}g (₹{plan.carbs.addonPrice * count}/Meal)</option>)}
                        </select>
                    </div>
                </> : <></>}
                {protein ? <>
                    <div className='my-2'>

                            {`Your Total is ₹${duration.days} * ${mealsPerDay} * (${protein.mealPrice} + (${protein.addonPrice} * ${addonProtein}) + (${plan.carbs.addonPrice} * ${addonCarb})) }`}
                            {`Your Total is ₹${duration.days * mealsPerDay * (protein.mealPrice + (protein.addonPrice * addonProtein) + (plan.carbs.addonPrice * addonCarb)) }`}
                    </div>
                    <div className="my-2">
                        <button className="btn btn-primary w-full" onClick={() => {
                            onClick({
                                name: plan.name,
                                duration: duration,
                                mealsPerDay: mealsPerDay,
                                protein: protein,
                                addonCarb: addonProtein,
                                addonProtein: addonProtein,
                                price: duration.days * mealsPerDay * (protein.mealPrice + (protein.addonPrice * addonProtein) + (plan.carbs.addonPrice * addonCarb))
                            })
                        }}>Customize and Buy Plan</button>
                    </div>
                </> : <></>}
            </div>
        </>
    )
}