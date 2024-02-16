import React from 'react'
import * as S from './styles'

interface SelectProps {
  text: string;
  name: string;
  options: any[];
  handleOnChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: any;
  required?: boolean;
	disabled?: boolean
}

export const Select = ({
	text,
	name,
	options,
	handleOnChange,
	value,
  required,
	disabled
}:SelectProps) => {
	return (
		<S.FormControl>
			<S.Label htmlFor={name}>
				{text}
        {required && <S.Required>*</S.Required>}
				:
			</S.Label>
			<S.Select
				name={name}
				value={value || ''}
				onChange={handleOnChange}
				id={name}
				required={required}
				disabled={disabled}
			>
				<option>Selecione uma opção</option>
				{options.map((opt) => (
					<option value={opt._id || opt} key={opt._id || opt}>{opt.name || opt}</option>
				))}
			</S.Select>
		</S.FormControl>
	)
}