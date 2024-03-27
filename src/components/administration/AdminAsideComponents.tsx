"use client"
import React from 'react';
import MainStats from './stats/MainStats';

type AdminAsideComponentsProps = {
    props: any
}

const AdminAsideComponents = ({
                              }: AdminAsideComponentsProps) => {


    return (
        <MainStats />
    );
};

export default AdminAsideComponents;
