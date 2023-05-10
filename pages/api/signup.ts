import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import validator from 'validator'



const prisma = new PrismaClient()


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { firstName, lastName, email, phone, password, city } = req.body ?? {};
    const errors: string[] = [];
    const validationSchema = [
      {
        valid: firstName !== undefined && validator.isLength(firstName, {
          min: 1
        })
      },
      {
        valid: lastName !== undefined && validator.isLength(lastName, {
          min: 1,
          max: 20
        }),
        errorMessage: 'Last Name is invalid',
      },
      {
        valid: email !== undefined && validator.isEmail(email),
        errorMessage: 'Last Name is invalid',
      },
      {
        valid: phone !== undefined && validator.isMobilePhone(phone),
        errorMessage: 'Phone Number is invalid',
      },
      {
        valid: password !== undefined && validator.isStrongPassword(password),
        errorMessage: 'Password is invalid',
      },
      {
        valid: city !== undefined && validator.isLength(city, {
          min: 1
        }),
        errorMessage: 'City is not a valid'
      }
    ]
    validationSchema.forEach((check) => {
      if (!check.valid) {
        if (check.errorMessage) { // check if it exists before using it
          errors.push(check.errorMessage);
        } else {
          errors.push('Validation error'); // fallback error message
        }
      }
    });
    if (errors.length) {
      return res.status(400).json({
        errorMessage: errors[0]
      })
    }

    const userWithEmail = await prisma.user.findUnique({
      where: {
        email
      }
    })
    if (userWithEmail) {
      return res.status(400).json({
        errorMessage: 'The email is already in use'
      })
    }
    res.status(200).json({
      hello: 'body',
    })
  }
}