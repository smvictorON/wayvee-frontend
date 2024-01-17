import React from 'react'
import * as S from './styles'

interface SelectProps {
  text: string;
  name: string;
  options: string[];
  handleOnChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string | undefined;
}

export const Select = ({
	text,
	name,
	options,
	handleOnChange,
	value
}:SelectProps) => {
	return (
		<S.FormControl>
			<S.Label htmlFor={name}>{text}:</S.Label>
			<S.Select name={name} value={value || ''} onChange={handleOnChange} id={name}>
				<option>Selecione uma opção</option>
				{options.map((opt) => (
					<option value={opt} key={opt}>{opt}</option>
				))}
			</S.Select>
		</S.FormControl>
	)
}