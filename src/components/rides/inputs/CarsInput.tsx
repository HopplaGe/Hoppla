import React from 'react';
import AddCarModal from "@/components/dashboard/AddCarModal";
import Image from "next/image";

const CarsInput = ({
                       cars,
                       setCarId
                   }: {
    cars: any,
    setCarId: any
}) => {
    return (
        <>
            {cars.length > 0 ? (
                <div className="flex flex-col gap-2 mb-6">
                    <label htmlFor="car" className="text-sm text-secondary fira-go">აირჩიეთ მანქანა</label>
                    <ul className="grid w-full gap-6 md:grid-cols-4">
                        {cars.map((car: any, index: number) => (
                            <li key={index} onClick={() => setCarId(car.id)}>
                                <input type="radio" id={`car-${car.id}`} value="" name="ride-car"
                                       className="hidden peer"
                                       required/>
                                <label htmlFor={`car-${car.id}`}
                                       className="inline-flex items-start justify-between w-full min-h-28 p-3 text-gray-500 bg-white rounded-lg cursor-pointer peer-checked:border peer-checked:border-lime-600/20 peer-checked:bg-lime-50 hover:text-gray-600 peer-checked:text-gray-600 peer-checked:shadow-md hover:shadow-md">
                                    <div className="block">
                                        <div className="w-full flex flex-col gap-2 items-start text-primary">
                                            <Image src={`/cars/${car.brand.toLowerCase()}.svg`} alt={"car"} width={32}
                                                   height={32}/>
                                            <div
                                                className="w-full text-sm font-semibold fira-go text-secondary">{car.brand}</div>
                                        </div>
                                        <div className="w-full text-xs mt-2">{car.model}
                                        </div>
                                    </div>
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="flex flex-col gap-2 mb-6">
                    <label htmlFor="car" className="font-bold text-sm text-secondary fira-go">დაამატე მანქანა</label>
                    <AddCarModal/>
                </div>
            )}
        </>
    );
};

export default CarsInput;
