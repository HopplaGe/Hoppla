import React, {FC} from 'react';
import moment from "moment";
import "moment/locale/ka";
import RideDetailMap from "@/components/rides/RideDetailMap";
import {getRideById} from "@/lib/actions/rides";
import {getUserById} from "@/lib/actions/user";
import {AirVent, Cigarette, Cookie, Dog, Footprints, Luggage, Music, Star} from "lucide-react";
import {cn} from "@/lib/utils";
import {User, Link} from "@nextui-org/react";
import {convertSecondsToTime} from "@/lib/tools/convertTimeToSeconds";
import {getCarById} from "@/lib/actions/cars";
import RideRules from "@/components/rides/RideRules";
import RideReservationBtn from "@/components/rides/buttons/RideReservationBtn";

interface pageProps {
    params: {
        id: string
    }
}

const rules = [
    {
        title: "მოწევა",
        slug: "smoking",
        value: true,
        icon: <Cigarette/>
    },
    {
        title: "ცხოველები",
        slug: "pets",
        value: true,
        icon: <Dog/>
    },
    {
        title: "ბარგი",
        slug: "luggage",
        value: true,
        icon: <Luggage/>
    },
    {
        title: "მუსიკა",
        slug: "music",
        value: true,
        icon: <Music/>
    },
    {
        title: "კონდიციანერი",
        slug: "airConditioner",
        value: true,
        icon: <AirVent/>
    },
    {
        title: "საკვები",
        slug: "food",
        value: true,
        icon: <Cookie/>
    },
    {
        title: "დასვენება",
        slug: "extraStops",
        value: true,
        icon: <Footprints/>
    }
]

const page: FC<pageProps> = async ({params}) => {

    const ride = await getRideById(params.id)


    const arrivalTimeWithMoment = moment(ride?.startTime, "HH:mm").add(ride?.duration, 'seconds').format("HH:mm")
    const duration = convertSecondsToTime(ride?.duration as number)

    const user = await getUserById(ride?.userId as string)

    const car = await getCarById(ride?.carId as string)

    // @ts-ignore
    const ratings = user?.ratings.map(rating => rating.rating) as number[]

    const reviews = {
        average: ratings.reduce((a, b) => a + b, 0) / ratings.length || 0,
        count: ratings.length
    }

    return (
        <div className="page-wrapper py-8 flex flex-col items-center">
            <h3 className="text-xl lg:text-3xl fira-go text-primary">{moment(ride?.startDate).format("LL")}</h3>
            <h1 className="text-3xl lg:text-6xl fira-go">{ride?.name}</h1>

            <RideDetailMap from={ride?.from} to={ride?.to}/>

            <div className="flex flex-row justify-between w-full bg-gray-100 px-4 py-2 rounded-xl">
                <div className="flex flex-col items-center lg:items-start">
                    <span className="text-xs fira-go">გამგზავრება</span>
                    <span className="text-xl fira-go">{ride?.startTime} სთ</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-xs fira-go">მგზავრობა</span>
                    <span className="text-xl fira-go">{duration} სთ</span>
                </div>
                <div className="flex flex-col items-center lg:items-end">
                    <span className="text-xs fira-go">ჩასვლა</span>
                    <span className="text-xl fira-go">{arrivalTimeWithMoment} სთ</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 justify-between w-full py-2 rounded-xl mt-4">
                <div className="flex flex-col items-start space-y-6">
                    <div className="flex items-start">
                        <User
                            className="fira-go"
                            name={user?.name}
                            description={(
                                <Link href="#" size="sm">
                                    <div className="flex flex-col items-start">
                                        <div className="">
                                            <h2 className="sr-only">Reviews</h2>
                                            <div className="flex items-center">
                                                <p className="text-sm text-gray-700">
                                                    {reviews.average}
                                                    <span className="sr-only"> out of 5 stars</span>
                                                </p>
                                                <div className="ml-1 flex items-center">
                                                    {[0, 1, 2, 3, 4].map((rating) => (
                                                        <Star
                                                            key={rating}
                                                            className={cn(
                                                                reviews.average > rating ? 'text-yellow-400' : 'text-gray-200',
                                                                'h-5 w-5 flex-shrink-0'
                                                            )}
                                                            aria-hidden="true"
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )}
                            avatarProps={{
                                src: user?.image as string,
                                size: 'lg',
                                isBordered: true,
                                alt: user?.name as string,
                                className: 'mr-2 rounded-xl',
                            }}
                        />

                    </div>
                    <div className="fira-go">
                        <span className="text-lg">ავტომობილი:</span>
                        <div className="text-gray-400">
                            {car?.color} {car?.brand} {car?.model} {car?.year}
                        </div>
                    </div>
                    <div className="text-xs fira-go">
                        <span className="text-lg">წესები:</span>
                        <RideRules rules={rules}/>
                    </div>
                </div>
                <div className="flex flex-col items-start space-y-2">

                    <div className="lg:self-end flex flex-col gap-2">
                        <span className="lg:self-end fira-go">ფასი</span>
                        <span className="text-5xl fira-go">{
                            // @ts-ignore
                            (ride?.price as number / ride?.seats as number).toFixed(2)
                        }₾</span>
                    </div>
                    <RideReservationBtn/>
                </div>
            </div>

        </div>
    );
};

export default page;
