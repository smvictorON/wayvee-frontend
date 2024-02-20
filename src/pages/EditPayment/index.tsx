import React, { useState, useEffect } from 'react'
import * as S from "../styles-pages"
import api from '../../utils/api'
import { useParams } from 'react-router-dom'
import useFlashMessage from '../../hooks/useFlashMessage'
import { FormPayment } from '../../components/FormPayment'
import IPayment from '../../interfaces/IPayment'

export const EditPayment = () => {
  const [payment, setPayment] = useState<IPayment | undefined>()
  const [token] = useState(localStorage.getItem('token') || '')
  const { id } = useParams()
  const { setFlashMessage } = useFlashMessage()

  useEffect(() => {
    api.get(`/payments/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      setPayment(res.data.payment)
    })
  }, [token, id])

  const updatePayment = async (payment: any) => {
    let msgType = "success"

    if(!payment.address)
      payment.address = {}

    const formData = new FormData()

    Object.keys(payment).forEach((key) => {
      formData.append(key, payment[key])
    })

    const data = await api.patch(`/payments/${payment._id}`, formData, {
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
  }

  return (
    <S.Section>
      <div>
        <S.Header>Editando o pagamento</S.Header>
        <p>Depois da edição os dados ficarão atualizados no sistema.</p>
      </div>
      {payment?._id && <FormPayment buttonText="Atualizar" handleSubmit={updatePayment} paymentData={payment} />}
    </S.Section>
  )
}