import prisma from "@/lib/prisma";


// find user by email

export const getUserByEmail = async (email: string) => {
    try {
        return await prisma.user.findUnique({
            where: {
                email,
            },
        });
    } catch (error) {
        return null;
    }
}