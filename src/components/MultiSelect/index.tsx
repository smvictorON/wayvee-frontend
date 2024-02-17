import React from 'react'
import * as S from '../styles-inputs'
import Tooltip from '@mui/material/Tooltip';

interface MultiSelectProps {
  text: string;
  name: string;
  options: any[];
  handleOnChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: any;
  required?: boolean
  disabled?: boolean
  tooltipText?: string
}

export const MultiSelect = ({
	text,
	name,
	options,
	handleOnChange,
	value,
  required,
  disabled,
  tooltipText
}:MultiSelectProps) => {
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
				value={value || []}
				onChange={handleOnChange}
				id={name}
				multiple={true}
				required={required}
				disabled={disabled}
			>
				{options.map((opt) => (
					<option value={opt._id} key={opt._id}>{opt.name}</option>
				))}
			</S.Select>
		</S.FormControl>
	)
}