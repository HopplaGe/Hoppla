import {User} from 'next-auth';
import prisma from "@/lib/prisma";

import {compare} from "bcrypt";

type LoginType = (email: string, password: string) => Promise<User | null>;

const login: LoginType = async (email, password) => {
    const user = await prisma.user.findFirst({
        where: {
            email
        }
    });

    if (!user) return null;

    const isValid = await compare(password, user?.password!);

    if (!isValid) return null;

    if (user && isValid) {
        // @ts-ignore
        delete user.password;
        return user;
    } else throw new Error("Something went wrong");
};

export default login;