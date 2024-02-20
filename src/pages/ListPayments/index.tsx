import React, { useState, useEffect, ChangeEvent } from 'react'
import useFlashMessage from '../../hooks/useFlashMessage'
import api from '../../utils/api'
import * as S from '../styles-lists'
import IPayment from '../../interfaces/IPayment'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DescriptionIcon from '@mui/icons-material/Description';
import { InputFilter } from '../../components/InputFilter'

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

  const handleFilter = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    api.get('/payments', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      if (value.trim() === '') {
        setPayments(res.data.payments)
      } else {
        const filteredStudents = res.data.payments?.filter((payment: IPayment) => payment.description.toLowerCase().includes(value.toLowerCase()));
        setPayments(filteredStudents);
      }
    })
  }

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <section>
      <S.ListHeader>
        <S.ListHeaderTitle>
          Contas&nbsp;({payments?.length})&nbsp;
          <AttachMoneyIcon fontSize='small'/>
        </S.ListHeaderTitle>

        <InputFilter
          name='search'
          placeholder='Buscar por descrição'
          handleOnChange={handleFilter}
        />

        <S.ListHeaderLink to='/payment/add'>
          <span>Lançar Conta</span>
          <AddIcon fontSize='small'/>
        </S.ListHeaderLink>
      </S.ListHeader>

      <S.ListContainer>
        {payments && payments.length > 0 && payments.map((payment) => (
          <S.ListRow key={payment._id}>
            <S.Data>
            <S.DataInfo>
                <div>
                  <DescriptionIcon fontSize={'small'}/>
                  <span>{payment.description}</span>
                </div>
              </S.DataInfo>
              <S.DataDate>
                <CalendarTodayIcon fontSize={'small'}/>
                <span>{new Date(payment.date.substring(0, 10)).toLocaleDateString('pt-BR')}</span>
              </S.DataDate>
              <S.DataDate style={{ color: payment.type === "Payment" ? 'red' : 'green' }}>
                <span>{formatter.format(payment.value)}</span>
              </S.DataDate>
            </S.Data>

            <S.Actions>
              <S.ActionsLink to={`/payment/edit/${payment._id}`}>
                <span>Editar</span>
                <EditIcon fontSize={'small'}/>
              </S.ActionsLink>
              <S.ActionsButton color={"red"} onClick={() => removePayment(payment._id || "")}>
                <span>Excluir</span>
                <DeleteIcon fontSize={'small'}/>
              </S.ActionsButton>
            </S.Actions>
          </S.ListRow>
        ))}
        {payments?.length === 0 && (<p>Não há contas lançadas!</p>)}
      </S.ListContainer>
    </section>
  )
}