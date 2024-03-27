"use client";
import { cn } from "@/lib/utils";
import { forwardRef, RefAttributes } from "react";
import { ChevronRight, PersonStanding } from "lucide-react";
import { cva } from "class-variance-authority";
import { meterToKm } from "@/lib/tools/meterToKm";
import { useTranslations } from "next-intl";

const directionsCardStyle = cva(["font-semibold", "bg-cover", "border-0"], {
  variants: {
    variant: {
      dark: ["bg-default-800", "text-default-50"],
      light: ["bg-white", "text-gray-600"],
    },
    color: {
      primary: ["text-primary", "border-primary", "bg-primary"],
      secondary: ["text-secondary", "border-secondary", "bg-secondary"],
      default: ["text-default", "border-default", "bg-default"],
      success: ["text-success", "border-success", "bg-success"],
      danger: ["text-danger", "border-danger", "bg-danger"],
      warning: ["text-warning", "border-warning", "bg-warning"],
      light: ["text-default-50", "border-default-50", "bg-default-50"],
      dark: ["text-default-800", "border-default-900", "bg-default-800"],
    },
    size: {
      xs: ["text-xs"],
      sm: ["text-sm"],
      md: ["text-medium"],
      lg: ["text-lg"],
      xl: ["text-xl"],
      "2xl": ["text-2xl"],
      "3xl": ["text-3xl"],
    },
    rounded: {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      "2xl": "rounded-2xl",
      "3xl": "rounded-3xl",
      full: "rounded-full",
    },
    shadow: {
      none: "shadow-none",
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
      xl: "shadow-xl",
      "2xl": "shadow-2xl",
    },
    bordered: {
      true: "border",
      false: "border-0",
    },
  },
});

export type DirectionsCardProps = {
  from: string;
  to: string;
  startLatLng: string;
  endLatLng: string;
  startTime: string;
  duration: number;
  arrivalTime: string;
  fromDistance: number;
  toDistance: number;
  requested_seats: number;
  price: number;
  variant: "dark" | "light";
  size: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  color:
    | "primary"
    | "secondary"
    | "default"
    | "success"
    | "danger"
    | "warning"
    | "light"
    | "dark";
  rounded: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
  shadow: "none" | "sm" | "md" | "lg" | "xl" | "2xl";
  animation: boolean;
  bordered: boolean;
  showPriceSection: boolean;
  className?: string;
  onClick?: (latLng: string) => void;
  classNames?: {
    card?: string;
    from?: string;
    time?: string;
    to?: string;
    price?: string;
  };
} & typeof directionsCardStyle;

export const DirectionsCard = forwardRef<
  HTMLDivElement,
  DirectionsCardProps & RefAttributes<HTMLImageElement>
>(
  (
    {
      from,
      to,
      startLatLng,
      endLatLng,
      startTime,
      duration,
      fromDistance,
      arrivalTime,
      toDistance,
      requested_seats,
      price,
      variant,
      size,
      color,
      rounded,
      shadow,
      bordered,
      showPriceSection,
      className,
      onClick,
      classNames,
    },
    ref,
  ) => {
    const t = useTranslations("Rides.RideDetails");

    const secondsToHours = (seconds: number): string => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);

      if (hours > 0) {
        return `${hours}:${minutes}`;
      } else {
        return `00:${minutes}`;
      }
    };

    return (
      <>
        <div
          id="card"
          className={cn(
            "relative overflow-hidden min-w-96",
            directionsCardStyle({ rounded, bordered, shadow, variant }),
            className,
            classNames?.card,
          )}
          ref={ref}
        >
          <div
            aria-label={"Pick-up location"}
            onClick={() => (onClick ? onClick(startLatLng) : null)}
            className={cn(
              "group min-h-10 hover:bg-gray-100 transform transition-all duration-300 ease-in-out pt-2 cursor-pointer",
              variant === "dark"
                ? "hover:bg-default-700"
                : "hover:bg-default-100",
              classNames?.from,
            )}
          >
            <div className="flex flex-col px-6">
              <div className="flex justify-between">
                <div
                  className={cn(
                    directionsCardStyle({ color, size }),
                    "flex flex-col pt-1 bg-transparent",
                    classNames?.time,
                  )}
                >
                  <time className={cn("fira-go w-12 font-semibold")}>
                    {startTime}
                  </time>
                  <small className="text-gray-500 text-xs font-semibold">
                    {secondsToHours(duration)}
                  </small>
                </div>

                <div
                  aria-hidden="true"
                  className="relative flex flex-col items-center min-h-10 flex-shrink-0 mx-2 w-2"
                >
                  <div className={cn("w-1 h-3", "bg-transparent")}></div>
                  <div className="absolute top-2.5 left-1/2 -translate-x-1/2">
                    <div
                      className={cn(
                        directionsCardStyle({ color, rounded, variant }),
                        "box-border w-3 h-3 border-2",
                        variant === "dark"
                          ? "bg-default-800 group-hover:bg-gray-700"
                          : "bg-white group-hover:bg-gray-50",
                      )}
                      aria-hidden="true"
                    ></div>
                  </div>
                  <div
                    className={cn("w-1 h-full", directionsCardStyle({ color }))}
                  ></div>
                </div>

                <div className="relative flex-1 py-2 pr-4 flex flex-col gap-2">
                  <div
                    className={cn(
                      directionsCardStyle({ variant }),
                      "flex flex-col gap-0 bg-transparent",
                    )}
                  >
                    <span className="text-sm fira-go">
                      {from.split(",").slice(0, -2)}
                    </span>
                    <span className="text-xs fira-go font-normal">
                      {from.split(",").slice(-2).join(",")}
                    </span>
                  </div>

                  <div className="flex gap-2 justify-start items-center">
                    <div
                      className={cn(
                        "rounded-md text-white",
                        fromDistance < 1000 && "bg-success",
                        fromDistance > 1000 &&
                          fromDistance < 5000 &&
                          "bg-warning",
                        fromDistance > 5000 && "bg-danger",
                      )}
                    >
                      <PersonStanding size={16} />
                    </div>
                    <span
                      className={cn(
                        fromDistance < 1000 && "text-success",
                        fromDistance > 1000 &&
                          fromDistance < 5000 &&
                          "text-warning",
                        fromDistance > 5000 && "text-danger",
                        "text-[10px] uppercase fira-go",
                      )}
                    >
                      {t("distanceFromDeparture", {
                        distance: meterToKm(fromDistance),
                      })}
                    </span>
                  </div>
                  <div
                    className={cn(
                      `group-hover:${directionsCardStyle({ color })}`,
                      "absolute top-1/2 right-0 -translate-y-1/2 bg-transparent group-hover:text-gray-500",
                    )}
                  >
                    <ChevronRight />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            aria-label={"Drop-off location"}
            onClick={() => (onClick ? onClick(endLatLng) : null)}
            className={cn(
              "group min-h-10  hover:rounded-none transform transition-all duration-300 ease-in-out cursor-pointer",
              variant === "dark"
                ? "hover:bg-default-700"
                : "hover:bg-default-100",
              classNames?.to,
            )}
          >
            <div className="flex flex-col px-6">
              <div className="flex justify-between">
                <div
                  className={cn(
                    directionsCardStyle({ color, size }),
                    "flex flex-col pt-1 bg-transparent",
                    classNames?.time,
                  )}
                >
                  <time className={cn("fira-go w-12 font-semibold")}>
                    {arrivalTime}
                  </time>
                  <span className="text-gray-500 text-xs font-semibold"></span>
                </div>

                <div
                  aria-hidden="true"
                  className="relative flex flex-col items-center min-h-10 flex-shrink-0 mx-2 w-2"
                >
                  <div
                    className={cn("w-1 h-3", directionsCardStyle({ color }))}
                  ></div>
                  <div className="absolute top-2.5 left-1/2 -translate-x-1/2">
                    <div
                      className={cn(
                        directionsCardStyle({ color, rounded, variant }),
                        "box-border w-3 h-3 border-2",
                        variant === "dark"
                          ? "bg-default-800 group-hover:bg-gray-700"
                          : "bg-white group-hover:bg-gray-50",
                      )}
                      aria-hidden="true"
                    ></div>
                  </div>
                  <div className={cn("w-1 h-full", "bg-transparent")}></div>
                </div>

                <div className="relative flex-1 py-2 pr-4 flex flex-col gap-2">
                  <div
                    className={cn(
                      directionsCardStyle({ variant }),
                      "flex flex-col gap-0 bg-transparent",
                    )}
                  >
                    <span className="text-sm fira-go">
                      {to.split(",").slice(0, -2)}
                    </span>
                    <span className="text-xs fira-go font-normal">
                      {to.split(",").slice(-2).join(",")}
                    </span>
                  </div>

                  <div className="flex gap-2 justify-start items-center">
                    <div
                      className={cn(
                        "rounded-md text-white",
                        toDistance < 1000 && "bg-success",
                        toDistance > 1000 && toDistance < 5000 && "bg-warning",
                        toDistance > 5000 && "bg-danger",
                      )}
                    >
                      <PersonStanding size={16} />
                    </div>
                    <span
                      className={cn(
                        toDistance < 1000 && "text-success",
                        toDistance > 1000 &&
                          toDistance < 5000 &&
                          "text-warning",
                        toDistance > 5000 && "text-danger",
                        "text-[10px] uppercase fira-go",
                      )}
                    >
                      {t("distanceToArrival", {
                        distance: meterToKm(toDistance),
                      })}
                    </span>
                  </div>
                  <div
                    className={cn(
                      `group-hover:${directionsCardStyle({ color })}`,
                      "absolute top-1/2 right-0 -translate-y-1/2 bg-transparent group-hover:text-gray-500",
                    )}
                  >
                    <ChevronRight />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={cn(
              "flex-row justify-between items-center border-t-2 py-4 px-6 fira-go border-default-50 w-full",
              variant === "dark" ? "border-default-900" : "border-default-100",
              showPriceSection ? "flex" : "hidden",
              classNames?.price,
            )}
          >
            <div className="flex flex-col gap-2 text-sm">
              {t("priceForOnePerson", {
                count: requested_seats ? requested_seats : 1,
              })}
            </div>
            <div className="flex flex-col gap-2 font-bold text-xl">
              {requested_seats
                ? (price * requested_seats).toFixed(2)
                : price.toFixed(2)}{" "}
              ₾
            </div>
          </div>
        </div>
      </>
    );
  },
);

DirectionsCard.displayName = "DirectionsCard";
