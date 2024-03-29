"use client";
import {
    Autocomplete,
    AutocompleteItem,
} from "@nextui-org/react";
import React from "react";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";


export const animals = [
    {
        label: "Cat",
        value: "cat",
        description: "The second most popular pet in the world",
    },
    {
        label: "Dog",
        value: "dog",
        description: "The most popular pet in the world",
    },
    {
        label: "Elephant",
        value: "elephant",
        description: "The largest land animal",
    },
    { label: "Lion", value: "lion", description: "The king of the jungle" },
    { label: "Tiger", value: "tiger", description: "The largest cat species" },
    {
        label: "Giraffe",
        value: "giraffe",
        description: "The tallest land animal",
    },
    {
        label: "Dolphin",
        value: "dolphin",
        description: "A widely distributed and diverse group of aquatic mammals",
    },
    {
        label: "Penguin",
        value: "penguin",
        description: "A group of aquatic flightless birds",
    },
    {
        label: "Zebra",
        value: "zebra",
        description: "A several species of African equids",
    },
    {
        label: "Shark",
        value: "shark",
        description:
            "A group of elasmobranch fish characterized by a cartilaginous skeleton",
    },
    {
        label: "Whale",
        value: "whale",
        description: "Diverse group of fully aquatic placental marine mammals",
    },
    {
        label: "Otter",
        value: "otter",
        description: "A carnivorous mammal in the subfamily Lutrinae",
    },
    {
        label: "Crocodile",
        value: "crocodile",
        description: "A large semiaquatic reptile",
    },
];

type AutoCompleteInputProps = {
    icon?: React.ReactNode;
};

export default function AutoCompleteInput({ icon }: AutoCompleteInputProps) {

    const {
        placePredictions,
        getPlacePredictions,
        isPlacePredictionsLoading,
    } = usePlacesService({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    });

    const [selectedPlace, setSelectedPlace] = React.useState("");

    console.log("placePredictions", placePredictions);
    console.log("selectedPlace", selectedPlace);

    return (
        <div className="bg-white">
            <Autocomplete
                defaultItems={placePredictions}
                // label="Favorite Animal"
                placeholder="Search an animal"
                variant="underlined"
                startContent={icon}
                // className="bg-white"
                color="default"
                onChange={(e) => {
                    getPlacePredictions({ input: e.target.value });
                    setSelectedPlace(e.target.value);
                }}
                onInputChange={(e) => {
                    getPlacePredictions({ input: e });
                    setSelectedPlace(e);
                }}
                //@ts-ignore
                loading={isPlacePredictionsLoading}
            >
                {(item) => (
                    <AutocompleteItem className="bg-red" key={item.place_id}>
                        {item.description}
                    </AutocompleteItem>
                )}
            </Autocomplete>
        </div>
    );
}