import {MapPin} from "lucide-react";
import {IRideAddInput} from "@/interfaces/IRideAddInput";
import {Input} from "@/components/ui/input";

const RideAddInput = ({
                          inputRef,
                          from,
                          to,
                          placeholder,
                          name,
                          setDisable,
                          setSeats,
                          distance,
                          duration,
                      }: IRideAddInput) => {

    const handleChange = (event: any) => {
        if (event.target.value === "") {
            setDisable(true)
            // setPrice(0)
            setSeats(1)
            distance = 0
            duration = 0
        } else {
            // if (!from?.current?.value || !to?.current?.value) return

            // to?.current?.value && calculateDistance()

            setDisable(false)
        }
    };

    return (
        <div className="relative w-full h-12 lg:h-16 rounded-md">
            <div
                className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <MapPin/>
            </div>
            {/*<Autocomplete*/}
            {/*    onLoad={() => {*/}
            {/*        // console.log(autoComplete)*/}
            {/*    }}*/}
            {/*    onPlaceChanged={() => {*/}
            {/*        if (!origin.current.value || !destination.current.value) return*/}
            {/*        destination.current.value && calculateDistance()*/}
            {/*    }}*/}
            {/*>*/}
            <Input
                type="text"
                name={name}
                id={name}
                className="h-12 lg:h-16 py-1.5 pl-10"
                placeholder={placeholder}
                ref={inputRef}
                onChange={handleChange}
            />
            {/*</Autocomplete>*/}
        </div>
    );
};

export default RideAddInput;
