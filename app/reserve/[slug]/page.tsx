import React from 'react'
import Header from '../../components/Reserve/Header'
import InputForm from '../../components/Reserve/InputForm'




const page = () => {
  return (
    <>
      <div className="border-t h-screen">
        <div className="py-9 w-3/5 m-auto">
          <Header />
          <InputForm />
        </div>
      </div>
    </>
  )
}

export default page