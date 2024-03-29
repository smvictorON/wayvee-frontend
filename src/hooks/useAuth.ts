import api from '../utils/api'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useFlashMessage from './useFlashMessage'
import IUser from '../interfaces/IUser'

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false)
  const [isSuper, setIsSuper] = useState(false)
  const { setFlashMessage } = useFlashMessage()
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const isSuper = localStorage.getItem('isSuper')

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
      setAuthenticated(true)
    }

    if(isSuper)
      setIsSuper(true)
  }, [])

  const register = async (user: IUser) => {
    let msgText = "Cadastro realizado com sucesso!"
    let msgType = "success"

    try {
      const data = await api.post('/users/register', user).then((res) => {
        return res.data
      })

      await authUser(data)
    } catch (err: any) {
      msgText = err.response.data.message
      msgType = "error"
    }

    setFlashMessage(msgText, msgType)
  }

  const authUser = async (data: any) => {
    setAuthenticated(true)
    setIsSuper(data.isSuper)
    localStorage.setItem('token', JSON.stringify(data.token))
    localStorage.setItem('isSuper', JSON.stringify(data.isSuper))
    localStorage.setItem('company', JSON.stringify(data.company))
    localStorage.setItem('user', JSON.stringify(data.userId))
    navigate('/')
  }

  const logout = () => {
    let msgText = "Logout realizado com sucesso!"
    let msgType = "success"
    setAuthenticated(false)
    localStorage.removeItem('token')
    localStorage.removeItem('isSuper')
    delete api.defaults.headers.Authorization
    navigate('/login')
    setFlashMessage(msgText, msgType)
  }

  const login = async (user: IUser) => {
    let msgText = "Login realizado com sucesso!"
    let msgType = "success"

    try {
      const data = await api.post('/users/login', user).then((res) => {
        return res.data
      })

      await authUser(data)
    } catch (err: any) {
      msgText = err.response.data.message
      msgType = "error"
    }

    setFlashMessage(msgText, msgType)
  }

  return { authenticated, register, logout, login, isSuper }
}