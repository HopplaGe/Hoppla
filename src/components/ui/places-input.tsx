// "use client"
// import * as React from "react"
// import {motion} from "framer-motion"
// import {cn} from "@/lib/utils"
//
// export interface InputProps
//     extends React.InputHTMLAttributes<HTMLInputElement> {
//     data?: any;
//     defaultplace?: string;
//     label?: string;
// }
//
// const variants = {
//     open: {opacity: 1, x: 0},
//     closed: {opacity: 0, x: "-100%"},
// }
//
// const PlacesInput = React.forwardRef<HTMLInputElement, InputProps>(
//     ({className, type, ...props}, ref) => {
//
//         const [isOpen, setIsOpen] = React.useState(false)
//         const [selectedPlace, setSelectedPlace] = React.useState(props.defaultplace || "");
//         const autoCompleteRef = React.useRef(null);
//
//         React.useEffect(() => {
//             const handleClickOutside = (event: any) => {
//                 if (
//                     autoCompleteRef.current &&
//                     // @ts-ignore
//                     !autoCompleteRef.current.contains(event.target)
//                 ) {
//                     setIsOpen(false);
//                 }
//             };
//             // @ts-ignore
//             props.onChange(selectedPlace);
//
//             document.addEventListener("mousedown", handleClickOutside);
//             return () => document.removeEventListener("mousedown", handleClickOutside);
//         }, []);
//
//         const handleInput = (place: any) => {
//             // @ts-ignore
//             props.onChange(place);
//             setSelectedPlace(place);
//             setIsOpen(false);
//         }
//
//         return (
//             <div className="group flex flex-col w-full fira-go" data-slot="base" data-filled="true"
//                  data-filled-within="true"
//                  data-has-elements="true" data-has-label="true" ref={autoCompleteRef}>
//
//                 <div
//                     className="relative w-full inline-flex tap-highlight-transparent shadow-sm px-3 bg-default-100 hover:bg-default-200 group-data-[focus=true]:bg-default-100 min-h-unit-10 rounded-medium flex-col items-start justify-center gap-0 transition-background motion-reduce:transition-none !duration-150 outline-none group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2 group-data-[focus-visible=true]:ring-offset-background h-14 py-2">
//                     <label
//                         className="absolute z-10 pointer-events-none origin-top-left subpixel-antialiased block text-foreground-500 cursor-text will-change-auto !duration-200 !ease-out motion-reduce:transition-none transition-[transform,color,left,opacity] group-data-[filled-within=true]:text-default-600 group-data-[filled-within=true]:pointer-events-auto group-data-[filled-within=true]:scale-85 text-small group-data-[filled-within=true]:-translate-y-[calc(50%_+_theme(fontSize.small)/2_-_6px)] pe-2 max-w-full text-ellipsis overflow-hidden">{props.label}</label>
//                     <div
//                         className="inline-flex w-full items-center h-full box-border group-data-[has-label=true]:items-end pb-0.5">
//                         <input
//                             type={type}
//                             className={cn(
//                                 "w-full font-normal bg-transparent !outline-none placeholder:text-foreground-500 focus-visible:outline-none data-[has-start-content=true]:ps-1.5 data-[has-end-content=true]:pe-1.5 text-small group-data-[has-value=true]:text-default-foreground",
//                                 className
//                             )}
//                             ref={ref}
//                             {...props}
//                             // @ts-ignore
//                             value={selectedPlace}
//                             onClick={() => setIsOpen(true)}
//                             onChange={(e: any) => {
//                                 if (e.target.value.length >= 0) {
//                                     setSelectedPlace(e.target.value as string || "");
//                                     e.target.value.length > 2 ? setIsOpen(true) : setIsOpen(false);
//                                 }
//                             }}
//                         />
//                     </div>
//                 </div>
//                 <motion.div
//                     animate={isOpen ? "open" : "closed"}
//                     variants={variants}
//                 >
//                     <ul
//                         className={cn("hidden opacity-0 w-72 min-h-auto shadow-md rounded-xl bg-white absolute -right-80 -top-12 overflow-y-auto scrollbar-hide transition-opacity ease-in-out delay-150 duration-1000 fira-go divide-y-1", isOpen && "flex flex-col justify-between opacity-100")}>
//                         {props.data
//                             .filter((place: any) => place.name.toLowerCase().indexOf(selectedPlace.toLowerCase()) > -1)
//                             .map((place: any, index: number) => (
//                                 <li
//                                     key={index}
//                                     className={cn("w-full h-20 flex flex-col gap-1 p-4 hover:bg-gray-100 cursor-pointer")}
//                                     onClick={() => handleInput(place.name)}
//                                 >
//                                     <h4 className="text-sm font-bold">{place.name}</h4>
//                                     <p className="text-xs">{place.country}</p>
//                                 </li>
//                             ))}
//                     </ul>
//                 </motion.div>
//             </div>
//         )
//     }
// )
// PlacesInput.displayName = "PlacesInput"
//
// export {PlacesInput}

"use client"
import * as React from "react"
import {motion} from "framer-motion"
import {cn} from "@/lib/utils"
import {Input} from "@nextui-org/react";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import {X} from "lucide-react";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    data?: any;
    defaultplace?: string;
    label?: string;
    state?: any;
}

const variants = {
    open: {opacity: 1, x: 0},
    closed: {opacity: 0, x: "-100%"},
}

const PlacesInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({className, type, ...props}, ref) => {

        const {
            placesService,
            placePredictions,
            getPlacePredictions,
            isPlacePredictionsLoading,
        } = usePlacesService({
            apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        });

        const [isOpen, setIsOpen] = React.useState(false)
        const [selectedPlace, setSelectedPlace] = React.useState(props.defaultplace || "");
        const autoCompleteRef = React.useRef(null);

        React.useEffect(() => {
            const handleClickOutside = (event: any) => {
                if (
                    autoCompleteRef.current &&
                    // @ts-ignore
                    !autoCompleteRef.current.contains(event.target)
                ) {
                    setIsOpen(false);
                }
            };
            // @ts-ignore
            props.onChange(selectedPlace);

            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }, [selectedPlace, props]);

        const handleInput = (place: any) => {
            // @ts-ignore
            props.onChange(place);
            setSelectedPlace(place);
            props.state(place)
            setIsOpen(false);
        }

        return (
            <div className="group flex flex-col w-full fira-go" data-slot="base"
                 data-filled="true"
                 data-filled-within="true"
                 data-has-elements="true" data-has-label="true">
                <Input
                    type="text"
                    placeholder={props.placeholder}
                    label={props.label}
                    ref={ref}
                    {...props}
                    // defaultValue={props.defaultplace}
                    onClick={() => setIsOpen(true)}
                    value={selectedPlace}
                    onChange={(evt) => {
                        getPlacePredictions({input: evt.target.value});
                        setSelectedPlace(evt.target.value);
                        if (evt.target.value.length >= 0) {
                            setSelectedPlace(evt.target.value as string || "");
                            evt.target.value.length > 2 ? setIsOpen(true) : setIsOpen(false);
                        }
                    }}
                    //@ts-ignore
                    loading={isPlacePredictionsLoading}
                    endContent={
                        <X
                            size={24}
                            className={cn("cursor-pointer", isOpen ? "block" : "hidden")}
                            onClick={() => {
                                setSelectedPlace("");
                                setIsOpen(false);
                            }}
                        />
                    }

                />
                <motion.div
                    animate={isOpen ? "open" : "closed"}
                    variants={variants}
                >
                    <ul
                        className={cn("hidden opacity-0 w-72 h-auto shadow-md rounded-xl bg-white absolute -right-80 -top-12 overflow-y-auto scrollbar-hide transition-opacity ease-in-out delay-150 duration-1000 fira-go divide-y-1", isOpen && "flex flex-col justify-between opacity-100")}>
                        {placePredictions.map((item: any, index: number) => (
                            <li
                                key={index}
                                className={cn("w-full min-h-24 h-auto flex flex-col gap-1 justify-center p-4 hover:bg-gray-100 cursor-pointer")}
                                onClick={() => handleInput(item.description)}
                            >
                                <h4 className="text-sm font-bold">{item.description}</h4>
                                <p className="text-xs">{item.description.slice(
                                    item.description.indexOf(",") + 1,
                                    item.description.length,
                                )}
                                </p>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        )
    }
)
PlacesInput.displayName = "PlacesInput"

export {PlacesInput}