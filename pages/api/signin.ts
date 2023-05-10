import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import validator from 'validator';
import bcrypt from 'bcrypt';
import * as jose from "jose";



const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    const errors: string[] = [];
    const validationSchema = [
      {
        valid: email !== undefined && validator.isEmail(email),
        errorMessage: 'Last Name is invalid',

      },
      {
        valid: password !== undefined && validator.isLength(password, {
          min: 1
        }),
        errorMessage: 'Password is invalid',
      },
    ]
    validationSchema.forEach((check) => {
      if (!check.valid) {
        if (check.errorMessage) {
          errors.push(check.errorMessage);
        } else {
          errors.push('Validation error');
        }
      }
    });
    if (errors.length) {
      return res.status(400).json({
        errorMessage: errors[0]
      })
    }
    const user = await prisma.user.findUnique({
      where: {
        email,
      }
    })

    if (!user) {
      return res.status(401).json({
        errorMessage: 'Email or password is incorrect'
      })
    }
    const matchedPassword = await bcrypt.compare(password, user.password)

    if (!matchedPassword) {
      return res.status(401).json({
        errorMessage: 'Email or password is incorrect'
      })
    }
    const alg = 'HS256';
    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
    const token = await new jose.SignJWT({ email: user.email })
      .setProtectedHeader({ alg })
      .setExpirationTime('24h')
      .sign(secret)
    console.log('token: ' + token);
    res.status(200).json({
      token
    })
  }
  res.status(400).json({
    message: 'Invalid endpoint'
  })
}