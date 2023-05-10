import React from 'react'
import Menu from './Menu'
import { Item } from '@prisma/client'

const MenuCard = ({ menu }: { menu: Item[] }) => {
  return (
    <main className="bg-white mt-5">
      <div>
        <div className="mt-4 pb-1 mb-1">
          <h1 className="font-bold text-4xl">Menu</h1>
        </div>
        {
          menu.length ? (
            <div className='flex flex-wrap justify-between'>
              {
                menu.map(item => (
                  <Menu item={item} key={item.id} />
                ))
              }
            </div>
          ) : (
            <div className='flex flex-wrap justify-between'>
              <p>This restaurant does not have any menu</p>
            </div>
          )
        }
      </div>
    </main >
  )
}

export default MenuCard