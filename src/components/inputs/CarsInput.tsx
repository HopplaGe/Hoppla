import React from 'react';
import Image from "next/image";
import AddCarModel from '@/components/shared/AddCarModel';

const CarsInput = ({
  cars,
  onSelect
}: {
  cars: any,
  onSelect: any
}) => {
  
  return (
    <>
      {cars.length > 0 ? (
        <div className="flex flex-col gap-2 mb-6">
          <label htmlFor="car" className="text-sm text-secondary fira-go">აირჩიეთ მანქანა</label>
          <ul className="grid w-full gap-6 md:grid-cols-4">
            {cars.map((car: any, index: number) => (
              <li key={index} onClick={() => onSelect(car.id)}>
                <input type="radio" id={`car-${car.id}`} value="" name="ride-car"
                  className="hidden peer"
                  required />
                <label htmlFor={`car-${car.id}`}
                  className="inline-flex items-start justify-between w-full min-h-28 p-3 text-default-400 bg-default-50 rounded-xl cursor-pointer peer-checked:bg-default-100 peer-checked:hover:bg-default-200 peer-checked:text-default-700 peer-checked:border-2 peer-checked:border-default hover:text-gray-600 hover:bg-default-100 transform transition-all duration-300 ease-in-out">
                  <div className="w-full flex flex-col justify-center items-center">
                    <div className="w-full flex flex-col gap-2 items-center">
                      <Image src={`https://hopplaassets.s3.amazonaws.com/images/cars/${car.brand.toLowerCase()}.svg`} alt={"car"} width={32}
                        height={32} />
                      <div
                        className="w-full text-sm font-semibold fira-go text-center">{car.brand}</div>
                    </div>
                    <div className="w-full text-xs mt-2 text-center">{car.model}
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
          <AddCarModel />
        </div>
      )}
    </>
  );
};

export default CarsInput;