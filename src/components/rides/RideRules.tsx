import React from 'react';

interface RideRulesProps {

    title: string,
    slug: string,
    value: boolean,
    icon: JSX.Element

}

const RideRules = ({rules}: any) => {
    return (
        <div className="flex flex-row justify-between items-center">
            <div className="grid grid-flow-col-dense gap-2">
                {rules.map((rule: RideRulesProps) => (
                    <div key={rule.slug} className="text-gray-400">
                        {rule.icon}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RideRules;
