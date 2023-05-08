import { Cuisine, Location, PRICE } from '@prisma/client'
import Link from 'next/link'
import React from 'react'


const prices = [
  {
    price: PRICE.CHEAP,
    label: '$',
    className: 'border w-full text-reg font-light rounded-l p-2'
  },
  {
    price: PRICE.REGULAR,
    label: '$$',
    className: 'border-r border-t border-b w-full text-reg font-light p-2'
  },
  {
    price: PRICE.EXPENSIVE,
    label: '$$$',
    className: 'border-r border-t border-b w-full text-reg font-light p-2 rounded-r'
  }
];

const SideNav = ({ cuisines, location, searchParams }:
  {
    cuisines: Cuisine[], location: Location[], searchParams: { location?: string, cuisine?: string, price?: PRICE }
  }) => {
  return (
    <div className="w-1/5">
      <div className="border-b pb-4 flex flex-col">
        <h1 className="mb-2">Region</h1>
        {
          location.map((locations => (
            <Link
              href={{
                pathname: '/search',
                query: {
                  ...searchParams,
                  location: locations.name
                }
              }}
              className='capitalize font-light text-reg'
              key={locations.id}>
              {locations.name}
            </Link>
          )))
        }
      </div>
      <div className="border-b pb-4 mt-3 flex flex-col">
        <h1 className="mb-2">Cuisine</h1>
        {
          cuisines.map((cuisine => (
            <Link
              href={{
                pathname: '/search',
                query: {
                  ...searchParams,
                  cuisine: cuisine.name
                }
              }}
              className='capitalize font-light text-reg'
              key={cuisine.id}> {cuisine.name}
            </Link>
          )))
        }
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          {
            prices.map(({ price, label, className }) => (
              <Link
                href={{
                  pathname: '/search',
                  query: {
                    ...searchParams,
                    price
                  }
                }}
                className={className}
                key={price}
              >
                {label}
              </Link>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default SideNav