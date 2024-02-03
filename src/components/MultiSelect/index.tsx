import React from 'react'
import * as S from './styles'

interface MultiSelectProps {
  text: string;
  name: string;
  options: string[];
  handleOnChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string[] | undefined;
  required?: boolean | undefined;
}

export const MultiSelect = ({
	text,
	name,
	options,
	handleOnChange,
	value,
  required
}:MultiSelectProps) => {
	return (
		<S.FormControl>
			<S.Label htmlFor={name}>
				{text}
        {required && <S.Required>*</S.Required>}
				:
			</S.Label>
			<S.Select
				name={name}
				value={value || []}
				onChange={handleOnChange}
				id={name}
				multiple={true}
			>
				{options.map((opt) => (
					<option value={opt} key={opt} selected={value?.includes(opt)}>{opt}</option>
				))}
			</S.Select>
		</S.FormControl>
	)
}