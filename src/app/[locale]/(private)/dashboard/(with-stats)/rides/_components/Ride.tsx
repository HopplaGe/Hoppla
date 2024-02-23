import { meterToKm } from "@/lib/tools/meterToKm";
import { secondsToHours } from "@/lib/tools/secondsToHours";

import { Prisma } from "@prisma/client";
import moment, { duration } from "moment";
import "moment/locale/ka";
import { useLocale } from "next-intl";

type RideProps = {
    ride: Prisma.RideGetPayload<{
        select: {
            id: true;
            from: true;
            to: true;
            startDate: true;
            startTime: true;
            duration: true;
            distance: true;
            price: true;
            seats: true;
            status: true;
            passangers: {
                select: {
                    id: true;
                    name: true;
                    email: true;
                    phone: true;
                    image: true;
                };
            };
        };
    }>;
};

export default function Ride({ ride }: RideProps) {
    console.log(moment(ride.startDate).locale("ka"));
    const locale = useLocale();
    console.log(locale);
    return (
        <div className="bg-white p-5 rounded-xl px-4 py-4 w-full ">
            <div className="flex justify-between">
                <h2>
                    {ride.from} - {ride.to}
                </h2>
                <div>
                    {ride.status === "PENDING" ? (
                        <div>მიმდინარე</div>
                    ) : ride.status === "COMPLETED" ? (
                        "დასრულებული"
                    ) : (
                        "გაუქმებული"
                    )}
                </div>
            </div>

            <p>
                {moment(ride.startDate)
                    .locale(locale)
                    .format("dddd, MMMM Do YYYY")}{" "}
                - {ride.startTime}
            </p>
            <div className="mb-10">
                {/* <AvatarGroup isBordered>
                <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                {
                    ride.passangers.map(p => (
                        <Avatar src={p.image!} />
                    ))
                }
            </AvatarGroup> */}
            </div>
            <div className="grid grid-cols-4">
                <div>
                    <h3 className="text-primary">{ride.price} ლ</h3>
                    <p className="text-gray-700 text-sm">ჯამური თანხა</p>
                </div>
                <div>
                    <h3 className="text-primary">
                        {secondsToHours(ride.duration)} სთ
                    </h3>
                    <p className="text-gray-700 text-sm">დრო</p>
                </div>
                <div>
                    <h3 className="text-primary">
                        {meterToKm(ride.distance)} კმ
                    </h3>
                    <p className="text-gray-700 text-sm">მანძილი</p>
                </div>
                <div>
                    <h3 className="text-primary">{ride.seats}</h3>
                    <p className="text-gray-700 text-sm">ადგილი</p>
                </div>
            </div>

            {
                // ride.passangers
            }
        </div>
    );
}
