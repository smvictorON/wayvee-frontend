import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import * as S from './styles'
import { Input } from '../Input'
import { InputDate } from '../InputDate'
import { Select } from '../Select'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import api from '../../utils/api'
import IPayment, {PaymentMethods, PaymentTypes} from '../../interfaces/IPayment'


interface FormPaymentProps {
  handleSubmit: (event: any) => void;
  paymentData: IPayment;
}

export const FormPayment = ({
  handleSubmit,
  paymentData
}: FormPaymentProps) => {
  const [payment, setPayment] = useState<IPayment>(paymentData || {})

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayment({ ...payment, [name]: value });
  }

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name;
    const value = e.target.options[e.target.selectedIndex].value as string;
    setPayment({ ...payment, [name]: value });
  }

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit(payment)
  }

  return (
    <S.FormContainer onSubmit={submit}>
      <InputDate
        text="Data do Pagamento/Recebimento"
        name="date"
        handleOnChange={handleChange}
        value={payment.date ? new Date(payment.date).toISOString().split('T')[0] : ""}
        required={true}
      />
      <Input
        text="Valor"
        type="number"
        name="value"
        placeholder="Digite o valor"
        handleOnChange={handleChange}
        value={payment.value || ""}
        required={true}
      />
      <Select
        text="Método"
        name="method"
        options={PaymentMethods}
        handleOnChange={handleSelect}
        value={payment.method}
        required={true}
      />
      <Select
        text="Tipo"
        name="type"
        options={PaymentTypes}
        handleOnChange={handleSelect}
        value={payment.type}
        required={true}
      />
      <S.SubmitButton>
        Concluir&nbsp;
        <AttachMoneyIcon/>
      </S.SubmitButton>
    </S.FormContainer>
  )
}