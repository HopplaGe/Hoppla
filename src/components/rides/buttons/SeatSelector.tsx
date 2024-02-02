import {ISeatSelector} from "@/interfaces/ISeatSelector";

const SeatSelector = ({setSeats, seats, disabled}: ISeatSelector) => {

    const increment = () => {
        setSeats(seats + 1)
    }

    const decrement = () => {
        setSeats(seats - 1)
    }

    return (
        <div className="relative w-full h-12 lg:h16 rounded-md flex items-center">

            <div className="relative flex items-center max-w-[11rem]">
                <button type="button" id="decrement-button" data-input-counter-decrement="bedrooms-input"
                        className="bg-secondary hover:bg-secondary-hover text-white rounded-md py-3 px-4 h-11 focus:outline-none disabled:opacity-50"
                        onClick={decrement} disabled={
                    seats === 1
                }>
                    <svg className="w-3 h-3 currentColor" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M1 1h16"/>
                    </svg>
                </button>
                <input type="text" id="bedrooms-input" data-input-counter-min="1" data-input-counter-max="5"
                       aria-describedby="helper-text-explanation"
                       className="bg-transparent h-11 font-medium text-center text-secondary text-sm focus:ring-blue-500 focus:border-blue-500 block w-full pb-6 rounded-none fira-go"
                       placeholder="" value={seats} required disabled/>
                <div
                    className="absolute bottom-1 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 flex items-center text-xs text-secondary space-x-1 rtl:space-x-reverse">
                    <span className="fira-go">მგზავრი</span>
                </div>
                <button type="button" id="increment-button" data-input-counter-increment="bedrooms-input"
                        className="bg-secondary hover:bg-secondary-hover text-white rounded-md py-3 px-4 h-11 focus:ring-gray-100 focus:outline-none disabled:opacity-50"
                        onClick={increment}
                        disabled={
                            seats === 4 || disabled
                        }
                >
                    <svg className="w-3 h-3 currentColor" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M9 1v16M1 9h16"/>
                    </svg>
                </button>
            </div>

        </div>
    );
};

export default SeatSelector;
