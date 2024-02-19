"use client"
import { allRidesCount, ridesCountByDirection } from '@/lib/actions/stats'
import { cn } from '@/lib/utils'
import { Tooltip } from '@nextui-org/react'
import { PopulatedAreaStatus, Region } from '@prisma/client'
import React, { FC, useCallback, useEffect, useState } from 'react'

const occupiedRegionStyle = "fill-primary hover:fill-primary-dark text-white"
const regionStyle = "fill-default-200 hover:fill-default-300 stroke-white stroke-1 text-gray-800 hover:z-50 hoppla-animation"
const capitalPinStyle = "stroke-secondary stroke-2 fill-primary hoppla-animation"
const cityPinStyle = "stroke-secondary stroke-2 fill-white group-hover:fill-primary hoppla-animation svg-map-circle"

type SvgMapProps = {
      regions: any[]
}

const SvgMap: FC<SvgMapProps> = ({ regions }) => {

      const [allRidesStat, setAllRidesStat] = useState(0)
      const [rideStat, setRideStat] = useState(allRidesStat)
      const [selectedCity, setSelectedCity] = useState('')

      useEffect(() => {
            ridesCountByDirection(selectedCity as string).then(data => setRideStat(data as number))
      }, [selectedCity, setRideStat])

      useEffect(() => {
            allRidesCount().then(data => setAllRidesStat(data as number))
      }, [setAllRidesStat])

      const mouseMove = useCallback((city: string) => {
            setSelectedCity(city)
      }, [])

      const mouseLeave = useCallback(() => {
            setSelectedCity("")
      }, [])

      return (
            <div className='page-wrapper relative mx-auto h-96 flex justify-center mt-14'>
                  <div className='absolute bottom-28 left-28'>
                        <h2>მგზავრობის სტატესტიკა</h2>
                        <span className='text-xs'><strong className='text-primary text-2xl'>{rideStat}</strong> მგზავრობა</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className='w-full max-w-4xl' height="100%">
                        <defs>
                              <style type="text/css">
                                    {`
                                          .svg-map-circle {
                                                cursor:pointer;
                                                stroke-dasharray: 95;
                                                stroke-dashoffset: 0;
                                                transition: stroke-dashoffset 600ms ease;
                                                transform-origin: 0px 0px 0px;
                                          }
                                          .svg-map-circle:hover {
                                                stroke-dashoffset: 95px;
                                                transform="translate(5,14)"
                                          }
                                    `}
                              </style>
                        </defs>
                        <g>
                              {regions?.map((region, index) => (
                                    <g className='group' key={index}>
                                          <path id={region.id} className={cn(regionStyle, region.isOccupied ? occupiedRegionStyle : '')}
                                                onClick={() => console.log('AB')}
                                                d={region.svgCoords} />
                                          {
                                                // @ts-ignore
                                                region.populatedAreas.map((city, index) =>
                                                      city.svgChoords !== "0" && (
                                                            <Tooltip
                                                                  content={city.name}
                                                                  key={index}
                                                                  className='fira-go'
                                                                  size='lg'
                                                                  radius='sm'
                                                                  placement='top'
                                                            >
                                                                  <circle
                                                                        id={city.name}
                                                                        cx={city.svgCoords.split(',')[0]}
                                                                        cy={city.svgCoords.split(',')[1]}
                                                                        r={
                                                                              city.isCapital ? "10" 
                                                                              : city.status === PopulatedAreaStatus.CITY ? "5"
                                                                              : city.status === PopulatedAreaStatus.TOWNSHIP ? "3"
                                                                              : "2"
                                                                        }
                                                                        className={cn(
                                                                              city.isCapital ? capitalPinStyle : cityPinStyle,
                                                                              city.status === PopulatedAreaStatus.TOWNSHIP && "fill-default-500 stroke-none group-hover:fill-default-600",
                                                                              city.status === PopulatedAreaStatus.VILLAGE && "fill-default-400 stroke-none group-hover:fill-default-600",
                                                                              region.isOccupied && "group-hover:fill-amber-300",
                                                                        )}
                                                                        onMouseMove={() => mouseMove(city.name)}
                                                                        onMouseLeave={() => mouseLeave()} />
                                                            </Tooltip>
                                                      )
                                                )}
                                    </g>
                              ))}
                        </g>
                  </svg>
            </div>
      )
}

export default SvgMap