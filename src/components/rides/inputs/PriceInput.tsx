import React from 'react';
import Image from "next/image";
import lariSymbol from "@/assets/images/lari.svg";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

interface PriceInputProps {
    price: string,
    setNewPrice: (price: number) => void
}

const PriceInput = ({
                        price,
                        setNewPrice
                    }: PriceInputProps) => {
    return (
        <div className="mb-6 fira-go">
            <Label htmlFor="price">
                ფასი
            </Label>
            <div className="relative w-full h-12 lg:h-16 rounded-md">
                <div
                    className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <Image src={lariSymbol} alt={"Lari Symbol"} width={14} height={14}/>
                </div>
                <Input
                    type="number"
                    name="price"
                    id="price"
                    className="h-12 lg:h-16 py-1.5 px-14"
                    placeholder={"ფასი"}
                    defaultValue={price ? parseFloat(price).toFixed(2) : 0}
                    onChange={(e) => setNewPrice(parseFloat(e.target.value))}
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                  <span className="text-gray-500 sm:text-sm fira-go" id="price-currency">
                                    ლარი
                                  </span>
                </div>
            </div>
            <p className="mt-1 ml-2 text-[9px] text-gray-400 fira-go" id="price-description">
                თუ შემოთავაზებული მგზავრობის ღირებულება არ შეესაბამება თქვენს მოთხოვნებს, შეცვალეთ
                სასურველი რაოდენობით.
            </p>
        </div>
    );
};

export default PriceInput;
