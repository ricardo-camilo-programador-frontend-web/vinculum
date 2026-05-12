'use strict'

/** @type {import('@adonisjs/framework/src/Validator')} */
const { rules, schema } = use('Validator')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')

class UserValidator {
  /**
   * Validation rules for user registration
   */
  static get registerRules () {
    return {
      username: 'required|min:3|max:80|unique:users,username',
      email: 'required|email|unique:users,email',
      password: 'required|min:6'
    }
  }

  /**
   * Validation rules for login
   */
  static get loginRules () {
    return {
      email: 'required|email',
      password: 'required'
    }
  }

  /**
   * Validation rules for password change
   */
  static get changePasswordRules () {
    return {
      currentPassword: 'required',
      newPassword: 'required|min:6|confirmed'
    }
  }

  /**
   * Validation rules for refresh token
   */
  static get refreshRules () {
    return {
      refreshToken: 'required'
    }
  }

  /**
   * Validation messages (Portuguese)
   */
  static get messages () {
    return {
      'username.required': 'O nome de usuário é obrigatório',
      'username.min': 'O nome de usuário deve ter no mínimo 3 caracteres',
      'username.max': 'O nome de usuário deve ter no máximo 80 caracteres',
      'username.unique': 'Este nome de usuário já está em uso',
      'email.required': 'O email é obrigatório',
      'email.email': 'Digite um email válido',
      'email.unique': 'Este email já está cadastrado',
      'password.required': 'A senha é obrigatória',
      'password.min': 'A senha deve ter no mínimo 6 caracteres',
      'password.confirmed': 'A confirmação de senha não confere',
      'currentPassword.required': 'A senha atual é obrigatória',
      'newPassword.required': 'A nova senha é obrigatória',
      'newPassword.min': 'A nova senha deve ter no mínimo 6 caracteres',
      'refreshToken.required': 'O refresh token é obrigatório'
    }
  }

  /**
   * Validate user registration data
   */
  static async validateRegister (data) {
    const Validator = use('Validator')
    
    const validation = await Validator.validate(
      data,
      this.registerRules,
      this.messages
    )
    
    if (validation.fails()) {
      return {
        success: false,
        errors: validation.messages()
      }
    }
    
    return { success: true }
  }

  /**
   * Validate login data
   */
  static async validateLogin (data) {
    const Validator = use('Validator')
    
    const validation = await Validator.validate(
      data,
      this.loginRules,
      this.messages
    )
    
    if (validation.fails()) {
      return {
        success: false,
        errors: validation.messages()
      }
    }
    
    return { success: true }
  }

  /**
   * Validate password change data
   */
  static async validateChangePassword (data) {
    const Validator = use('Validator')
    
    const validation = await Validator.validate(
      data,
      this.changePasswordRules,
      this.messages
    )
    
    if (validation.fails()) {
      return {
        success: false,
        errors: validation.messages()
      }
    }
    
    return { success: true }
  }

  /**
   * Validate refresh token data
   */
  static async validateRefresh (data) {
    const Validator = use('Validator')
    
    const validation = await Validator.validate(
      data,
      this.refreshRules,
      this.messages
    )
    
    if (validation.fails()) {
      return {
        success: false,
        errors: validation.messages()
      }
    }
    
    return { success: true }
  }
}

module.exports = UserValidator
