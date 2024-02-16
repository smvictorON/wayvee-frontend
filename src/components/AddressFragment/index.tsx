import React from 'react'
import * as S from './styles'
import { Input } from '../Input'
import { InputMask } from '../InputMask'
import { Select } from '../Select'
import { States, Cities } from '../../interfaces/IAddress'

interface AddressFragmentProps {
  handleChange: (event: any) => void;
  handleSelect: (event: any) => void;
  address?: {
    street?: string;
    number?: number;
    zipCode?: string;
    city?: string;
    state?: string;
  };
}

export const AddressFragment = ({
  handleChange,
  handleSelect,
  address,
}: AddressFragmentProps) => {
  return (
    <S.FormContainer>
      <span>Endereço:</span>
      <Input
        text="Rua"
        type="text"
        name="address.street"
        placeholder="Nome da rua"
        handleOnChange={handleChange}
        value={address?.street || ""}
      />
      <Input
        text="Número"
        type="number"
        name="address.number"
        placeholder="Numero do imóvel"
        handleOnChange={handleChange}
        value={address?.number || ""}
      />
      <InputMask
        text="CEP"
        type="text"
        name="address.zipCode"
        placeholder="Digite o CEP"
        handleOnChange={handleChange}
        value={address?.zipCode || ""}
        mask="99999-999"
      />
      <Select
        name="address.city"
        text="Cidade"
        options={Cities}
        handleOnChange={handleSelect}
        value={address?.city || ""}
      />
      <Select
        name="address.state"
        text="Estado (UF)"
        options={States}
        handleOnChange={handleSelect}
        value={address?.state || ""}
        disabled={true}
      />
    </S.FormContainer>
  )
}