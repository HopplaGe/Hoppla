"use server"
import prisma from "@/lib/prisma";

// find all companies

export const getCompanies = async () => {
    try {
        return await prisma.company.findMany({
            include: {
                companyUsers: true,
                ratings: true,
                vehicles: true,
                directions: {
                    include: {
                        direction: {
                            include: {
                                stops: true,
                            }
                        },
                    }

                },
            }
        });
    } catch (error) {
        return null;
    }
}

// find company by id
export const getCompanyById = async (id: string) => {
    try {
        return await prisma.company.findUnique({
            where: {
                id,
            },
        });
    } catch (error) {
        return null;
    }
}

// find company by name

export const getCompanyByName = async (name: string) => {
    try {
        return await prisma.company.findFirst({
            where: {
                name,
            },
        });
    } catch (error) {
        return null;
    }
}

// find company by email

export const getCompanyByEmail = async (email: string) => {
    try {
        return await prisma.company.findFirst({
            where: {
                email,
            },
        });
    } catch (error) {
        return null;
    }
}

// find company by phone

export const getCompanyByPhone = async (phone: string) => {
    try {
        return await prisma.company.findFirst({
            where: {
                phone,
            },
        });
    } catch (error) {
        return null;
    }
}

// find company by address

export const getCompanyByAddress = async (address: string) => {
    try {
        return await prisma.company.findFirst({
            where: {
                address,
            },
        });
    } catch (error) {
        return null;
    }
}

// create company

export const createCompany = async (formData: any) => {
    console.log(formData);
    try {
        return await prisma.company.create({
            data: {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                logo: formData.image,
            },
        });
    } catch (error) {
        return null;
    }
}

// update company

export const updateCompany = async (id: string, formData: FormData) => {
    try {
        return await prisma.company.update({
            where: {
                id,
            },
            data: {
                name: formData.get('name') as string,
                email: formData.get('email') as string,
                phone: formData.get('phone') as string,
                address: formData.get('address') as string,
                logo: formData.get('image') as string,
            },
        });
    } catch (error) {
        return null;
    }
}

// delete company

export const deleteCompany = async (id: string) => {
    try {
        return await prisma.company.delete({
            where: {
                id,
            },
        });
    } catch (error) {
        return null;
    }
}

// find company users by company id

export const getCompanyUsersByCompanyId = async (id: string) => {
    try {
        return await prisma.companyUser.findMany({
            where: {
                companyId: id,
            },
            include: {
                user: true,
            }
        });
    } catch (error) {
        return null;
    }
}

// find company user by id

export const getCompanyUserById = async (id: string) => {
    try {
        return await prisma.companyUser.findUnique({
            where: {
                id,
            },
            include: {
                user: true,
            }
        });
    } catch (error) {
        return null;
    }
}

// find company vehicles by company id

export const getCompanyVehiclesByCompanyId = async (id: string) => {
    try {
        return await prisma.companyVehicle.findMany({
            where: {
                companyId: id,
            },
            include: {
                company: true,
            }
        });
    } catch (error) {
        return null;
    }
}

// find company vehicle by plate

export const getCompanyVehicleByPlate = async (plate: string) => {
    try {
        return await prisma.companyVehicle.findFirst({
            where: {
                plate,
            },
            include: {
                company: true,
            }
        });
    } catch (error) {
        return null;
    }
}

// get company ratings by company id

export const getCompanyRatingsByCompanyId = async (id: string) => {
    try {
        return await prisma.companyRating.findMany({
            where: {
                companyId: id,
            }
        });
    } catch (error) {
        return null;
    }
}