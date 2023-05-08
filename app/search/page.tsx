import React from 'react'
import Cards from '../components/Search/Cards'
import Header from '../components/Search/Header'
import SideNav from '../components/Search/SideNav'
import { PRICE, PrismaClient, Review } from '@prisma/client'


interface SearchParams { location?: string, cuisine?: string, price?: PRICE }

const prisma = new PrismaClient()
const fetchRestaurantByCity = (searchParams: SearchParams) => {
  const where: any = {};
  if (searchParams.cuisine) {
    const cuisine = {
      name: {
        equals: searchParams.cuisine
      }
    }
    where.cuisine = cuisine
  }
  if (searchParams.location) {
    const location = {
      name: {
        equals: searchParams.location.toLowerCase()
      }
    }
    where.location = location
  }
  if (searchParams.price) {
    const price = {
        equals: searchParams.price
    }
    where.price = price
  }
  const select = {
    id: true,
    name: true,
    main_image: true,
    slug: true,
    price: true,
    location: true,
    cuisine: true,
    reviews: true
  }
  return prisma.restaurant.findMany({
    where,
    select
  })
}

const findLocations = async () => {
  return await prisma.location.findMany();
}
const findcuisines = async () => {
  return await prisma.cuisine.findMany();
}

const page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const restaurant = await fetchRestaurantByCity(searchParams)
  const location = await findLocations();
  const cuisines = await findcuisines();
  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SideNav
          location={location}
          cuisines={cuisines}
          searchParams={searchParams}
        />
        <div className="w-5/6">
          {
            restaurant.length > 0 ? (<>
              {restaurant.map(restaurants => (
                <Cards restaurants={restaurants} key={restaurants.id} />
              ))}
            </>) : (
              <p>
                Sorry, No restaurants are not available!
              </p>
            )
          }
        </div>
      </div>
    </>
  )
}

export default page