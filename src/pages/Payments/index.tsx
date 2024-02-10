import React, { useState, useEffect, ChangeEvent } from 'react'
import useFlashMessage from '../../hooks/useFlashMessage'
import api from '../../utils/api'
import * as S from './styles'
import IPayment from '../../interfaces/IPayment'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import GroupsIcon from '@mui/icons-material/Groups';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export const Payments = () => {
  const [payments, setPayments] = useState<IPayment[] | undefined>()
  const [token] = useState(localStorage.getItem('token') || '')
  const { setFlashMessage } = useFlashMessage()

  useEffect(() => {
    api.get('/payments', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      setPayments(res.data.payments)
    })
  }, [token])

  const removePayment = async (id: string) => {
    let msgType = "success"

    const data = await api.delete(`/payments/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      const updatedPayments = payments?.filter((payment: IPayment) => payment._id !== id)
      setPayments(updatedPayments)

      return res.data
    }).catch((err) => {
      msgType = "error"
      return err.response.data
    })

    setFlashMessage(data.message, msgType)
  }

  return (
    <section>
      <S.ListHeader>
        <S.ListHeaderTitle>
          Contas&nbsp;({payments?.length})&nbsp;
          <GroupsIcon fontSize='small'/>
        </S.ListHeaderTitle>

        <S.ListHeaderLink to='/payment/add'>
          <span>Lançar Conta</span>
          <AddIcon fontSize='small'/>
        </S.ListHeaderLink>
      </S.ListHeader>

      <S.ListContainer>
        {payments && payments.length > 0 && payments.map((payment) => (
          <S.ListRow key={payment._id}>
            <S.ListRowSpan>{payment.date}{payment.value}</S.ListRowSpan>
            <S.Actions>
              <S.ActionsLink to={`/payment/edit/${payment._id}`}>
                <span>Editar</span>
                <EditIcon fontSize={'small'}/>
              </S.ActionsLink>
              <S.ActionsButton onClick={() => removePayment(payment._id || "")}>
                <span>Excluir</span>
                <DeleteIcon fontSize={'small'}/>
              </S.ActionsButton>
              <S.ActionsLink to={`/payment/${payment._id}`} color={"green"}>
                <span>Pagamento</span>
                <AttachMoneyIcon fontSize={'small'}/>
              </S.ActionsLink>
            </S.Actions>
          </S.ListRow>
        ))}
        {payments?.length === 0 && (<p>Não há contas lançadas!</p>)}
      </S.ListContainer>
    </section>
  )
}