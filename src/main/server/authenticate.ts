import jwt from 'jsonwebtoken'

export const decodedToken = (req, requireAuth = true) => {
  const header =  req.headers.authorization

  if (header) {
    const token = header.replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log('decoded ', decoded)
    return decoded
  }

  if (requireAuth) {
    throw new Error('Login in to access resource')
  }

  return null
}

export const getAuthedUser = (req) => {
  try{
    const header =  req.headers.authorization || null
    const token = header.replace('Bearer ', '') || null
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET) || null
        const user = decoded ? { id: decoded.id, username: decoded.username, email: decoded.email } : null
  return user
  } catch {
    return null
  }
}



