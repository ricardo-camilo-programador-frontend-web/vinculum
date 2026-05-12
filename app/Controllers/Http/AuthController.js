'use strict'

/** @type {typeof import('@adonisjs/framework/src/Request')} */
const Request = use('Request')

/** @type {typeof import('@adonisjs/framework/src/Response')} */
const Response = use('Response')

/** @type {typeof import('@adonisjs/framework/src/View')} */
const View = use('View')

/** @type {typeof import('@adonisjs/auth/src/Schemes/Session')} */
const Auth = use('Auth')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication endpoints
 */
class AuthController {
  /**
   * @swagger
   * /auth/register:
   *   post:
   *     tags:
   *       - Authentication
   *     summary: Register a new user
   *     description: Creates a new user account
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - username
   *               - email
   *               - password
   *             properties:
   *               username:
   *                 type: string
   *                 minLength: 3
   *                 maxLength: 80
   *                 example: johndoe
   *               email:
   *                 type: string
   *                 format: email
   *                 example: john@example.com
   *               password:
   *                 type: string
   *                 format: password
   *                 minLength: 6
   *                 example: securePassword123
   *     responses:
   *       201:
   *         description: User created successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: User registered successfully
   *                 user:
   *                   $ref: '#/components/schemas/User'
   *       400:
   *         description: Validation error
   *       409:
   *         description: Email or username already exists
   */
  async register ({ request, response }) {
    const data = request.only(['username', 'email', 'password'])
    
    // Check if email already exists
    const emailExists = await User.findBy('email', data.email)
    if (emailExists) {
      return response.status(409).json({
        error: 'Email already registered',
        field: 'email'
      })
    }
    
    // Check if username already exists
    const usernameExists = await User.findBy('username', data.username)
    if (usernameExists) {
      return response.status(409).json({
        error: 'Username already taken',
        field: 'username'
      })
    }
    
    const user = await User.create(data)
    
    return response.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at
      }
    })
  }

  /**
   * @swagger
   * /auth/login:
   *   post:
   *     tags:
   *       - Authentication
   *     summary: Login user
   *     description: Authenticates user and returns JWT token
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - password
   *             properties:
   *               email:
   *                 type: string
   *                 format: email
   *                 example: john@example.com
   *               password:
   *                 type: string
   *                 format: password
   *                 example: securePassword123
   *     responses:
   *       200:
   *         description: Login successful
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Login successful
   *                 token:
   *                   type: string
   *                   description: JWT token
   *                 refreshToken:
   *                   type: string
   *                   description: Refresh token for renewing access
   *                 user:
   *                   $ref: '#/components/schemas/User'
   *       401:
   *         description: Invalid credentials
   */
  async login ({ request, response, auth }) {
    const { email, password } = request.only(['email', 'password'])
    
    try {
      // Attempt to authenticate with JWT
      const token = await auth
        .authenticator('jwt')
        .withRefreshToken()
        .attempt(email, password)
      
      // Get user data
      const user = await User.findBy('email', email)
      
      return response.json({
        message: 'Login successful',
        token: token.token,
        refreshToken: token.refreshToken,
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      })
    } catch (error) {
      return response.status(401).json({
        error: 'Invalid credentials',
        message: 'Check your email and password'
      })
    }
  }

  /**
   * @swagger
   * /auth/logout:
   *   post:
   *     tags:
   *       - Authentication
   *     summary: Logout user
   *     description: Invalidates the current JWT token
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Logout successful
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Logged out successfully
   *       401:
   *         description: Unauthorized
   */
  async logout ({ response, auth }) {
    try {
      // Revoke all tokens for the user
      await auth.authenticator('jwt').revokeTokens()
      
      return response.json({
        message: 'Logged out successfully'
      })
    } catch (error) {
      return response.status(500).json({
        error: 'Logout failed',
        message: error.message
      })
    }
  }

  /**
   * @swagger
   * /auth/refresh:
   *   post:
   *     tags:
   *       - Authentication
   *     summary: Refresh token
   *     description: Get a new access token using refresh token
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - refreshToken
   *             properties:
   *               refreshToken:
   *                 type: string
   *                 description: Refresh token obtained during login
   *     responses:
   *       200:
   *         description: Token refreshed successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Token refreshed successfully
   *                 token:
   *                   type: string
   *                   description: New JWT access token
   *       401:
   *         description: Invalid refresh token
   */
  async refresh ({ request, response, auth }) {
    const refreshToken = request.input('refreshToken')
    
    try {
      const token = await auth
        .authenticator('jwt')
        .newRefreshToken()
        .generateForRefreshToken(refreshToken)
      
      return response.json({
        message: 'Token refreshed successfully',
        token: token.token,
        refreshToken: token.refreshToken
      })
    } catch (error) {
      return response.status(401).json({
        error: 'Invalid refresh token',
        message: 'Please login again'
      })
    }
  }

  /**
   * @swagger
   * /auth/me:
   *   get:
   *     tags:
   *       - Authentication
   *     summary: Get current user
   *     description: Returns the authenticated user's profile
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: User profile
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 user:
   *                   $ref: '#/components/schemas/User'
   *       401:
   *         description: Unauthorized
   */
  async me ({ response, auth }) {
    try {
      const user = await auth.getUser()
      
      return response.json({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          created_at: user.created_at,
          updated_at: user.updated_at
        }
      })
    } catch (error) {
      return response.status(401).json({
        error: 'Unauthorized',
        message: 'Invalid or expired token'
      })
    }
  }

  /**
   * @swagger
   * /auth/password:
   *   put:
   *     tags:
   *       - Authentication
   *     summary: Change password
   *     description: Updates the authenticated user's password
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - currentPassword
   *               - newPassword
   *             properties:
   *               currentPassword:
   *                 type: string
   *                 format: password
   *                 example: currentPassword123
   *               newPassword:
   *                 type: string
   *                 format: password
   *                 minLength: 6
   *                 example: newPassword456
   *     responses:
   *       200:
   *         description: Password changed successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Password changed successfully
   *       401:
   *         description: Invalid current password
   */
  async changePassword ({ request, response, auth }) {
    const { currentPassword, newPassword } = request.only(['currentPassword', 'newPassword'])
    
    try {
      const user = await auth.getUser()
      
      // Verify current password
      const Hash = use('Hash')
      const isMatch = await Hash.verify(currentPassword, user.password)
      
      if (!isMatch) {
        return response.status(401).json({
          error: 'Invalid current password'
        })
      }
      
      // Update password
      user.password = newPassword
      await user.save()
      
      // Revoke all tokens except current (optional security measure)
      // await auth.authenticator('jwt').revokeTokensForUser(user)
      
      return response.json({
        message: 'Password changed successfully'
      })
    } catch (error) {
      return response.status(500).json({
        error: 'Failed to change password',
        message: error.message
      })
    }
  }
}

module.exports = AuthController
