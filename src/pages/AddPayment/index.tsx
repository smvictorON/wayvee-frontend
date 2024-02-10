import React, { useState } from "react"
import * as S from "./styles"
import api from "../../utils/api"
import { useNavigate } from "react-router-dom"
import useFlashMessage from "../../hooks/useFlashMessage"
import { FormPayment } from "../../components/FormPayment"
import IPayment from "../../interfaces/IPayment"

export const AddPayment = () => {
  const [token] = useState(localStorage.getItem('token') || '')
  const { setFlashMessage } = useFlashMessage()
  const navigate = useNavigate()
  const voidPayment: IPayment = {
    _id: '',
    value: 0,
    type: "",
    method: "",
    payer: "",
    receiver: "",
    date: "",
  }

  const handlePayment = async (payment: any) => {
    let msgType = "success"

    const formData = new FormData()

    await Object.keys(payment).forEach((key) => {
      formData.append(key, payment[key])
    })

    const data = await api.post('/payments/create', formData, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'multipart/form-data'
      }
    }).then((res) => {
      return res.data
    }).catch((err) => {
      msgType = 'error'
      return err.response.data
    })

    setFlashMessage(data.message, msgType)

    if (msgType !== 'error')
      navigate('/payments')
  }

  return (
    <S.Section>
      <div>
        <S.Header>Pagamento</S.Header>
        <p>Preencha as opções de pagamento!</p>
      </div>
      <FormPayment handleSubmit={handlePayment} paymentData={voidPayment}/>
    </S.Section>
  )
}