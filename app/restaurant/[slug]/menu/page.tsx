import React from 'react'
import MenuCard from '../../../components/Menu/MenuCard'
import RestaurantNavBar from '../../../components/Restaurant/NavBar'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const fetchItems = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug
    },
    select: {
      items: true
    }
  })
  if (!restaurant) {
    throw new Error()
  }
  return restaurant.items
}

const page = async ({ params }: { params: { slug: string } }) => {
  const menu = await fetchItems(params.slug)
  return (
    <main>
      <div className="bg-white w-[100%] rounded p-3 shadow ">
        <RestaurantNavBar slug={params.slug} />
        <MenuCard menu = {menu} />
      </div>
    </main>
  )
}

export default page