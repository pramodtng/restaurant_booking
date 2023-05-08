import React from 'react'

interface Prop {
  inputs: {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string,
    city: string,
  }
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  isSignIn: boolean
}

const AuthInput = ({ inputs, handleInputChange, isSignIn }: Prop) => {
  return (
    <div>
      {
        isSignIn ? null : <div className='my-3 flex justify-between text-sm'>
          <input
            value={inputs.firstName}
            type='text'
            placeholder='First Name'
            className='border rounded p-2 py-3 w-[49%]'
            onChange={handleInputChange}
            name='firstName'
          />
          <input
            value={inputs.lastName}
            type='text'
            placeholder='Last Name'
            className='border rounded p-2 py-3 w-[49%]'
            onChange={handleInputChange}
            name='lastName'
          />
        </div>
      }
      <div className='my-3 flex justify-between text-sm'>
        <input
          value={inputs.email}
          type='email'
          placeholder='Email'
          className='border rounded p-2 py-3 w-full'
          onChange={handleInputChange}
          name='email'
        />
      </div>
      <div className='my-3 flex justify-between text-sm'>
        <input
          value={inputs.password}
          type='password'
          placeholder='Password'
          className='border rounded p-2 py-3 w-full'
          onChange={handleInputChange}
          name='password'
        />
      </div>
      {
        isSignIn ? null : <div className='my-3 flex justify-between text-sm'>
          <input
            value={inputs.phone}
            type='phone'
            placeholder='Phone'
            className='border rounded p-2 py-3 w-[49%]'
            onChange={handleInputChange}
            name='phone'
          />
          <input
            value={inputs.city}
            type='text'
            placeholder='City'
            className='border rounded p-2 py-3 w-[49%]'
            onChange={handleInputChange}
            name='city'
          />
        </div>
      }
    </div>
  )
}

export default AuthInput