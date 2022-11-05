import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export function AuthMiddleware(
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

    return next()
  } catch {
    return response.status(401).json({
      error: 'Unauthorized token access'
    })
  }
}