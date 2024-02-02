import {Cigarette, Luggage, PawPrint} from "lucide-react";
import * as React from "react";

const actionsList = [
    {
        id: 1,
        title: 'ცხოველები',
        description: 'თუ მგზავრს შეუძლია თან იყოლიოს ცხოველი მგზავრობისას, მონიშნეთ ეს პარამეტრი.',
        icon: <PawPrint/>
    },
    {
        id: 2,
        title: 'სიგარეტი',
        description: 'თუ თქვენს ავტომობილში დაშვებულია სიგარეტის მოწევა, მონიშნეთ ეს პარამეტრი.',
        icon: <Cigarette/>
    },
    {
        id: 3,
        title: 'ბარგი',
        description: 'თუ მგზავრს შეუძლია თან იქონიოს ბარგი, მონიშნეთ ეს პარამეტრი. ',
        icon: <Luggage/>
    },
]

const TripAllowedAction = () => {

    return (
        <div className="mb-6">
            <label htmlFor="price"
                   className="mb-3 block text-sm font-medium text-gray-900 fira-go">
                მგზავრობის დაშვებული ქმედებები
            </label>

            <ul className="grid w-full gap-6 md:grid-cols-3">
                {actionsList.map((action, index) => (
                    <li key={index}>
                        <input type="checkbox" id={`action-${action.id}`} value="" className="hidden peer" required/>
                        <label htmlFor={`action-${action.id}`}
                               className="inline-flex items-start justify-between w-full min-h-28 p-3 text-gray-500 bg-white rounded-lg cursor-pointer peer-checked:border peer-checked:border-lime-600/20 peer-checked:bg-lime-50 hover:text-gray-600 peer-checked:text-gray-600 peer-checked:shadow-md hover:shadow-md">
                            <div className="block">
                                <div className="w-full flex gap-2 items-center text-primary">
                                    {action.icon}
                                    <div
                                        className="w-full text-sm font-semibold fira-go text-secondary">{action.title}</div>
                                </div>
                                <div className="w-full text-xs mt-2">{action.description}
                                </div>
                            </div>
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TripAllowedAction;
