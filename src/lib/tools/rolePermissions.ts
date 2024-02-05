export const rolePermissions = (role: string) => {
    const roles = {
        ADMIN: {
            can: {
                create: ['rides', 'cars', 'users'],
                read: ['rides', 'cars', 'users'],
                update: ['rides', 'cars', 'users'],
                delete: ['rides', 'cars', 'users']
            },
        },
        USER: {
            can: {
                create: ['rides', 'cars'],
                read: ['rides', 'cars', 'users'],
                update: ['rides', 'cars'],
                delete: ['rides', 'cars']
            }
        },
        MANAGER: {
            can: {
                create: ['rides', 'cars', 'users'],
                read: ['rides', 'cars', 'users'],
                update: ['rides', 'cars', 'users'],
                delete: ['rides', 'cars']
            }
        }
    };
    return roles[role as 'ADMIN' | 'USER'];
}