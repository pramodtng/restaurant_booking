import React from 'react'
import Header from '../../components/Restaurant/Header'

const layout = ({
  children,
  params
}: {
  children: React.ReactNode
  params: { slug: string }
}) => {
  return (
    <>
      <Header name={params.slug} />
      <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
        {children}
      </div>
    </>
  )
}

export default layout