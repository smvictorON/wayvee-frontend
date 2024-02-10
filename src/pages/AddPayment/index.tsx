import React, { useState } from "react"
import * as S from "./styles"
import api from "../../utils/api"
import { useNavigate } from "react-router-dom"
import useFlashMessage from "../../hooks/useFlashMessage"
import { FormPayment } from "../../components/FormPayment"

export const AddPayment = () => {
  const [token] = useState(localStorage.getItem('token') || '')
  const { setFlashMessage } = useFlashMessage()
  const navigate = useNavigate()

  const handlePayment = async () => {
  }

  return (
    <S.Section>
      <div>
        <S.Header>Pagamento</S.Header>
        <p>Preencha as opções de pagamento!</p>
      </div>
      <FormPayment handleSubmit={handlePayment}/>
    </S.Section>
  )
}