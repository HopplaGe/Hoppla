// import getFuelPrices from "./getFuelPrices"

// export default async function estimateRidePrice(
//     distanceKM: number,
// ) {
//     const fuelConsumption = 0.1 // that means 1L per 10km
//     const fuelPrices = await getFuelPrices()
//     const fuelPrice = fuelPrices.reduce((a, b) => a + b, 0) / fuelPrices.length // average price
//     const fuelCost = distanceKM * fuelConsumption * fuelPrice
//     return fuelCost
// }