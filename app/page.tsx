import React from 'react'
import RestaurantCard from './components/Home/RestaurantCard';
import Search from './components/Home/Search';
import { PrismaClient, Cuisine, Location, PRICE, Review } from '@prisma/client';


const prisma = new PrismaClient();

export interface RestaurantCardType {
  id: number,
  name: string,
  main_image: string,
  cuisine: Cuisine,
  location: Location,
  price: PRICE,
  slug: string,
  reviews: Review[]
}

const fetchRestaurants = async (): Promise<RestaurantCardType[]> => {
  const restaurants = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      cuisine: true,
      price: true,
      location: true,
      slug: true,
      reviews: true
    }
  })
  return restaurants;
}

export default async function Home() {
  const restaurants = await fetchRestaurants();
  return (
    <>
      <Search />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {
          restaurants.map((restaurant) => (
            <RestaurantCard restaurant = {restaurant} key = {restaurant.id} />
          ))
        }
      </div>
    </>
  )
}
