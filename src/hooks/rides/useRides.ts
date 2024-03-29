import {useQuery} from "@tanstack/react-query";
import {
  getAllRides,
  getRideByFromAndToAndDateAndSeats,
  getRides,
  getRidesByDate,
} from "@/lib/actions/rides/get";
import {getDistanceToPlace} from "@/lib/actions/rides/distance-to-place";
import moment from "moment/moment";


export const useAllRides = () => {
  return useQuery({
    queryKey: ["rides"],
    queryFn: async () => getAllRides(),
  });
};

export const useRides = (searchParams: any) => {
  return useQuery({
    queryKey: ["rides", searchParams],
    queryFn: async () => getRideByFromAndToAndDateAndSeats(searchParams),
  });
};

export const useDailyRides = () => {
    return useQuery({
        queryKey: ['dailyRides'],
        queryFn: async () => getRidesByDate(new Date(moment().utc().startOf('day').format('YYYY-MM-DDTHH:mm:ss')))
    })
}


type DistanceToPlaceParams = {
    fromPointOne: string
    fromPointTwo: string
    toPointOne: string
    toPointTwo: string
}
export const useDistanceToPlace = ({
  fromPointOne,
  fromPointTwo,
  toPointOne,
  toPointTwo,
}: DistanceToPlaceParams) => {
  return useQuery({
    queryKey: [
      "distanceToPlace",
      {
        fromPointOne,
        fromPointTwo,
        toPointOne,
        toPointTwo,
      },
    ],
    queryFn: async () =>
      getDistanceToPlace(fromPointOne, fromPointTwo, toPointOne, toPointTwo),
  });
};

export const useLastRides = (take?: number) => {
  return useQuery({
    queryKey: ["lastRides", take],
    queryFn: async () => getRides(take),
  });
};