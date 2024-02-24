"use client";
import React from 'react';

type TagsProps = {
    tags: { id: string, name: string, createdAt: Date | null }[]
}

const Tags = ({tags}: TagsProps) => {
    return (
        <div className="flex gap-3 overflow-x-scroll scrollbar-hide">
            {tags.map(({name, id}, index) => (
                <span
                    key={index}
                    className="text-xs p-2 bg-default-100 rounded-xl"
                >
                    #{name}
                </span>
            ))}
        </div>
    );
};

export default Tags;
