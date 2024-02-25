// import {getServerSession} from "next-auth/next"
// import * as z from "zod"

import {getRides, getRideById, getRidesByDriver} from "@/lib/actions/rides/get"

export async function GET() {
    try {
        const rides = await getRides()
        return new Response(JSON.stringify(rides))
    } catch (error) {
        return error
    }
}