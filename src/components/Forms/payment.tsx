import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import * as S from '../../styles/styles-forms'
import { Input } from '../Inputs/text'
import { InputDate } from '../Inputs/date'
import { Select } from '../Select'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import IPayment, {PaymentMethods, PaymentTypes} from '../../interfaces/IPayment'
import { useLocation } from 'react-router-dom';

interface FormPaymentProps {
  handleSubmit: (event: any) => void;
  paymentData: IPayment;
  buttonText: string
}

export const FormPayment = ({
  handleSubmit,
  paymentData,
  buttonText
}: FormPaymentProps) => {
  const [payment, setPayment] = useState(paymentData || {})
  const location = useLocation();
  const { state } = location

  useEffect(() => {
    if(!state)
      return

    const { data = {}, model = '', date = '' } = state;

    setPayment({...payment,
      person: data._id,
      date: date,
      type: model === "Student" ? "Receipt" : "Payment",
      description: model === "Student"
        ? `Recebimento de ${data.name}`
        : `Pagamento para ${data.name}`,
    })
  },[state, payment])

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
        disabled={state}
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
        disabled={state}
      />
      <Input
        text="Descrição"
        type="text"
        name="description"
        placeholder="Digite a descrição"
        handleOnChange={handleChange}
        value={payment.description || ""}
        required={true}
        disabled={state}
      />
      <S.SubmitButton>
        {buttonText}&nbsp;
        <AttachMoneyIcon/>
      </S.SubmitButton>
    </S.FormContainer>
  )
}