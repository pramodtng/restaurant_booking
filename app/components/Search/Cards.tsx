import React from 'react'
import Link from 'next/link'
import { Cuisine, PRICE, Location, Review } from '@prisma/client'
import Price from '../Home/Price'
import { calculateReviewRatingAverage } from '../../../utils/calculateRatings'
import Stars from '../Restaurant/Stars'

export interface Card {
  id: number,
  name: string,
  main_image: string,
  slug: string,
  price: PRICE,
  location: Location,
  cuisine: Cuisine,
  reviews: Review[]
}
const Cards = ({ restaurants }: { restaurants: Card }) => {
  const renderRatingText = () => {
    const rating = calculateReviewRatingAverage(restaurants.reviews)
    if (rating > 4) return "Awesome"
    else if (rating <= 4 && rating > 3) return "Good"
    else if (rating <= 3 && rating > 0) return "Average"
    else ""
  }
  return (
    <div className="border-b flex pb-5 ml-5">
      <img
        src={restaurants.main_image}
        alt=""
        className="w-44 rounded"
      />
      <div className="pl-5">
        <h2 className="text-3xl"> {restaurants.name} </h2>
        <div className="flex items-start">
          <div className="flex mb-2">
            <Stars reviews={restaurants.reviews} />
          </div>
          <p className="ml-2 text-sm"> {renderRatingText(restaurants.reviews)} </p>
        </div>
        <div className="mb-9">
          <div className="font-light flex text-reg">
            <Price price={restaurants.price} />
            <p className="mr-4"> {restaurants.cuisine.name} </p>
            <p className="mr-4 capitalize"> {restaurants.location.name} </p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href={`restaurant/${restaurants.slug}`}>View more information</Link>
        </div>
      </div>
    </div>
  )
}

export default Cards