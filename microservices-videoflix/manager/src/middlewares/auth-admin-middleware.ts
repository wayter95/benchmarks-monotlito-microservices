import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { prisma } from '../infra/prisma/client'

interface TokenPayload {
  id: string
  iat: number
  exp: number
}

export async function AuthAdminMiddleware(
  request: Request, response: Response, next: NextFunction
) {
  const { authorization } = request.headers

  if (!authorization) {
    return response.status(401).json({
      error: 'Unauthorized token access'
    })
  }

  const accessToken = authorization.replace('Bearer', '').trim()

  try {
    const data = jwt.verify(accessToken, process.env.JWT_SECRET as string)

    const { id } = data as TokenPayload

    const account = await prisma.accounts.findUnique({
      where: {
        authAccountId: id
      }
    })

    if (!account) {
      return response.status(401).json({
        error: 'Unauthorized token access'
      })
    }

    if (!account.isAdmin) {
      return response.status(401).json({
        error: 'Unauthorized token access'
      })
    }

    return next()
  } catch {
    return response.status(401).json({
      error: 'Unauthorized token access'
    })
  }
}