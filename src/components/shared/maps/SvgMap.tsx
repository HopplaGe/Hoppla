"use client"
import { allRidesCount, ridesCountByDirection } from '@/lib/actions/stats'
import { cn } from '@/lib/utils'
import { Tooltip } from '@nextui-org/react'
import React, { FC, useCallback, useEffect, useState } from 'react'

const occupiedRegionStyle = "fill-primary hover:fill-primary-dark text-white"
const regionStyle = "fill-default-200 hover:fill-default-300 stroke-white stroke-1 text-gray-800 hover:z-50 hoppla-animation"
const capitalPinStyle = "stroke-secondary stroke-2 fill-primary hover:scale-105 hover:-translate-x-7 hover:-translate-y-4 hoppla-animation"
const cityPinStyle = "stroke-secondary stroke-2 fill-white group-hover:fill-primary hoppla-animation svg-map-circle"

type SvgMapProps = {
      regions: {
            id: string,
            d: string,
            isOccupied: boolean,
            cities: {
                  name: string,
                  x: number,
                  y: number,
                  isCapital: boolean,
                  rideStat: number
            }[]
      }[]
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
                                                d={region.d} />
                                          {region.cities.map((city, index) => (
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
                                                            cx={city.x}
                                                            cy={city.y}
                                                            r={city.isCapital ? "10" : "5"}
                                                            className={cn(city.isCapital ? capitalPinStyle : cityPinStyle, region.isOccupied && "group-hover:fill-amber-300")}
                                                            onMouseMove={() => mouseMove(city.name)}
                                                            onMouseLeave={() => mouseLeave()} />
                                                </Tooltip>
                                          ))}
                                    </g>
                              ))}
                        </g>
                  </svg>
            </div>
      )
}

export default SvgMap