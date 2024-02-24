"use server"
import prisma from "@/lib/prisma";
import {getUserByEmail} from "@/lib/actions/users";


//get car by owner id


// export const createCar = async (formData: FormData) => {
//     const owner = await getUserByEmail("traitwiki@gmail.com");
//     const brand = formData.get("brand") as string;
//     const model = formData.get("model") as string;
//     const year = Number(formData.get("year"));
//     const color = formData.get("color") as string;
//     const plateNumber = formData.get("plateNumber") as string;
//     const ownerId = owner?.id;
//     if (!ownerId) {
//         return {error: "Owner not found"};
//     }
//
//     console.log("ownerId", ownerId);
//     console.log("brand", brand);
//     console.log("model", model);
//     console.log("year", year);
//
//     // try {
//     //     // await prisma.car.create({
//     //     //     data: {
//     //     //         brand,
//     //     //         model,
//     //     //         year,
//     //     //         color,
//     //     //         plateNumber,
//     //     //         ownerId,
//     //     //     },
//     //     //     include: {
//     //     //         owner: true,
//     //     //     }
//     //     // });
//     //     //
//     //     // revalidatePath("/dashboard")
//     //
//     // } catch (error) {
//     //     return {error};
//     // }
//
// }