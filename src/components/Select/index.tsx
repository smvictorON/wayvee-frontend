import React from 'react'
import * as S from '../../styles/styles-inputs'
import Tooltip from '@mui/material/Tooltip';

interface SelectProps {
  text: string;
  name: string;
  options: any[];
  handleOnChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: any;
  required?: boolean;
	disabled?: boolean
  tooltipText?: string
}

export const Select = ({
	text,
	name,
	options,
	handleOnChange,
	value,
  required,
	disabled,
  tooltipText
}:SelectProps) => {
	return (
		<S.FormControl>
			<S.Row>
				<S.Label htmlFor={name}>
					{text}
					{required && <S.Required>*</S.Required>}
					:
				</S.Label>
				{tooltipText &&
					<Tooltip title={tooltipText}>
						<S.IconInfo fontSize='small'/>
					</Tooltip>
				}
			</S.Row>
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