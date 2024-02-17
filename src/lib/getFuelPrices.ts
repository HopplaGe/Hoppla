// // "use server"
// import { JSDOM } from "jsdom"
// export default async function getFuelPrices() {
//     const result = await fetch("https://gulf.ge/ge/fuel_prices")
//     const data = await result.text()
//     const dom = new JSDOM(data)
//     const document = dom.window.document
//     const tbody = document.querySelector(".price_entries_inner tbody")
//     const row = tbody?.querySelector("tr")
//     const cells = row?.querySelectorAll("td")
//     const prices = Array.from(cells || []).map(cell => cell.textContent).map(price => Number(price))
//     prices.shift()
//     return prices
// }
