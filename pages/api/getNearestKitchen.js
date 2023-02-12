// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getDocuments } from "../../config/firebase"
import calcDistance from "../../utils/calcDistance";

export default async function handler(req, res) {
    let nearestKitchen;
    const cords = await JSON.parse(req.body)
    const kitchens = await getDocuments('kitchens')
    for (let index = 0; index < kitchens.length; index++) {
        const kitchen = kitchens[index];
        for (let i = 0; i < kitchen.locations.length; i++) {
            const location = kitchen.locations[i];
            const distance = calcDistance(cords.lat, cords.lng, location.lat, location.lng, 'K')
            console.log(distance)
            if ((!nearestKitchen && distance <= 10) || (nearestKitchen && nearestKitchen.distance > distance)) {
                let price = 0;
                const deliveryPrice = kitchen.deliveryPrice ? kitchen.deliveryPrice : kitchen.deliveryPricing
                const prices = Object.keys(deliveryPrice)
                let fixedMaxDistantance;
                for (let j = 0; j < prices.length; j++) {
                    if (prices[j] !== 'others') {
                        if (!fixedMaxDistantance || (fixedMaxDistantance && parseInt(prices[j]) > fixedMaxDistantance)) {
                            fixedMaxDistantance = parseInt(prices[j])
                            price = parseInt(deliveryPrice[prices[j]])
                        }
                    }
                }
                if (distance > fixedMaxDistantance) {
                    price = price + (Math.ceil(distance - fixedMaxDistantance) * parseInt(deliveryPrice.others))
                }
                price = Math.ceil(price)
                nearestKitchen = {
                    city: kitchen.name,
                    kitchen: location.name,
                    distance: distance,
                    price: price
                }
            }
        }

    }
    console.log(nearestKitchen)
    if (!nearestKitchen) nearestKitchen = {
        errorMessage: 'No Kitchen Available'
    }
    res.status(200).json(nearestKitchen)
}