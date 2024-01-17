import React, { useState, useEffect } from 'react'
import * as S from './styles'
import bus from '../../utils/bus.js'

export const Message = () => {
  const [visibility, setVisibility] = useState(false)
  const [message, setMessage] = useState("")
  const [type, setType] = useState("")

  useEffect(() => {
    bus.addListener('flash', ({ message, type }) => {
      setVisibility(true)
      setMessage(message)
      setType(type)
      setTimeout(() => {
        setVisibility(false)
      }, 3000);
    })
  }, [])

  return (
    visibility && (<S.FormControl type={type}>{message}</S.FormControl>)
  )
}