import React, { useState, useEffect } from 'react';
import { Wrapper, InputWrapper, Input } from './styled';
import * as Branding from 'components/Branding';
import ReactTooltip from 'react-tooltip';

interface IArgs {
	title: string;
	placeholder: string;
	onChange: (newValue: number) => void;
	error?: boolean;
	errorText?: string;
}

const NumberInput: React.FC<IArgs> = ({
	title,
	placeholder,
	error = false,
	errorText = '',
	onChange,
}: IArgs) => {
	const [id, _] = useState(+Date.now());
	const [value, setValue] = useState(15);

	useEffect(() => {
		onChange(value);
	}, [value]);

	return (
		<Wrapper>
			<Branding.Fonts.Texts.MediumBold
				customStyle={`
        margin-bottom: 0px;
        margin-left: 10px;
      `}
			>
				{title}
			</Branding.Fonts.Texts.MediumBold>

			<InputWrapper data-tip data-for={`input-wrapper-${id}`} error={error}>
				<Input
					error={error}
					placeholder={placeholder}
					value={value}
					onChange={(e) => setValue(+e.target.value)}
				/>
			</InputWrapper>

			{error && (
				<ReactTooltip id={`input-wrapper-${id}`} type="error" effect="solid">
					<span>{errorText}</span>
				</ReactTooltip>
			)}
		</Wrapper>
	);
};

export default NumberInput;
