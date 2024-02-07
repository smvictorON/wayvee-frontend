import React from 'react'
import * as S from './styles'

interface MultiSelectProps {
  text: string;
  name: string;
  options: any[];
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
				required={required}
			>
				{options.map((opt) => (
					<option value={opt._id} key={opt._id}>{opt.name}</option>
				))}
			</S.Select>
		</S.FormControl>
	)
}