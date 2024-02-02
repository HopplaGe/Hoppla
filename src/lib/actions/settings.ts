import prisma from '@/lib/prisma';

export const getSettings = async () => {
    try {
        const settings = await prisma.siteSettings.findFirst();
        if (settings) {
            return settings;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
};

export const getSettingsByKey = async (key: string[]) => {
    try {
        const siteSettings = await prisma.siteSettings.findMany();

        const siteData = {};

        siteSettings.forEach(setting => {
            // @ts-ignore
            siteData[setting.key] = setting.value;
        });

        if (siteData) {
            return siteData;
        } else {
            return {...defaultSettings};
        }
    } catch (error) {
        return null;
    }
}

const createSettings = async (...data: any) => {
    try {
        return prisma.siteSettings.create({
            data: {
                ...data,
            },
        });
    } catch (error) {
        return null;
    }
}

const defaultSettings = {
    siteName: 'My Site',
    siteDescription: 'My site description',
    siteUrl: 'https://my-site.com',
    siteLogo: 'https://my-site.com/logo.png',
    siteCover: 'https://my-site.com/cover.png',
    siteKeywords: 'my, site, keywords',
    siteLang: 'en',
    siteTheme: 'default',
    siteNav: [
        {
            label: 'Home',
            path: '/',
        },
        {
            label: 'About',
            path: '/about',
        },
    ],
    siteSocial: [
        {
            name: 'Twitter',
            icon: 'twitter',
            url: 'https://twitter.com',
        },
        {
            name: 'GitHub',
            icon: 'github',
            url: 'https://github.com',
        },
    ],
    siteMetadata: {
        title: 'My Site',
        description: 'My site description',
        siteUrl: 'https://my-site.com',
        siteName: 'My Site',
        siteImage: 'https://my-site.com/logo.png',
        siteKeywords: 'my, site, keywords',
        siteLang: 'en',
        twitterUsername: '@twitter',
        authorName: 'My Name',
        authorBio: 'My bio',
        authorImage: 'https://my-site.com/author.png',
    },
};

export const updateSettings = async (id: string, data: any) => {
    return prisma.siteSettings.update({
        where: {id: id},
        data,
    });
};

export const createOrUpdateSettings = async (data: any) => {
    const settings = await getSettings();
    if (settings) {
        return updateSettings(settings.id, data);
    } else {
        return createSettings(data);
    }
};
