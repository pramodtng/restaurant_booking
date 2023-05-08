import React from 'react'
import RestaurantNavBar from '../../components/Restaurant/NavBar'
import Title from '../../components/Restaurant/Title'
import Reviews from '../../components/Restaurant/Reviews'
import Description from '../../components/Restaurant/Description'
import Images from '../../components/Restaurant/Images'
import ReservationCard from '../../components/Restaurant/ReservationCard'
import { PrismaClient } from '@prisma/client'
import ReviewCard from '../../components/Restaurant/ReviewCard'
import Stars from '../../components/Restaurant/Stars'
import { notFound } from 'next/navigation'


const prisma = new PrismaClient()
const fetchRestaurantDetailsBySlug = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      slug: true,
      reviews: true
    }
  })
  // if (!restaurant) {
  //   throw new Error('Restaurant not found!')
  // }
  if (!restaurant) {
    notFound()
  }

  return restaurant
}

const page = async ({ params }: { params: { slug: string } }) => {
  const restaurant = await fetchRestaurantDetailsBySlug(params.slug)
  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurantNavBar slug={restaurant.slug} />
        <Title title={restaurant.name} />
        <Reviews reviews={restaurant.reviews} />
        <Description description={restaurant.description} />
        <Images images={restaurant.images} />
        <Stars reviews={restaurant.reviews} />
        <ReviewCard reviews={restaurant.reviews} />
      </div>
      <div className="w-[27%] relative text-reg">
        <ReservationCard />
      </div>
    </>
  )
}

export default page