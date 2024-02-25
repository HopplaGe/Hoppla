import {getCars} from "@/lib/actions/cars/get";


export async function GET() {
    try {
        const cars = await getCars()
        return new Response(JSON.stringify(cars))
    } catch (error) {
        return error
    }
}