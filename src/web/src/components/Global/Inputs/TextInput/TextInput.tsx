import React, { useState, useEffect, KeyboardEventHandler } from 'react';
import { Wrapper, InputWrapper, Input } from './styled';
import * as Branding from 'components/Branding';
import ReactTooltip from 'react-tooltip';
import { CloseOutline } from 'react-ionicons';

interface IArgs {
	title: string;
	placeholder: string;
	defaultValue: string;
	onChange: (newValue: string) => void;
	Icon?: any;
	error?: boolean;
	errorText?: string;
}

const TextInput: React.FC<IArgs> = ({
	title,
	placeholder,
	defaultValue,
	onChange,
	Icon,
	error = false,
	errorText = '',
}: IArgs) => {
	const [id, _] = useState(+Date.now());
	const [value, setValue] = useState(defaultValue);

	useEffect(() => {
		onChange(value);
	}, [value]);

	const onKeyPressed: KeyboardEventHandler<HTMLInputElement> = (event) => {
		return (
			(event.charCode >= 65 && event.charCode <= 90) ||
			(event.charCode >= 97 && event.charCode <= 122)
		);
	};

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
				{Icon && (
					<Icon
						style={{ marginTop: '7px' }}
						color={
							error ? Branding.Colors.Error.normal : Branding.Colors.Gray.label
						}
					/>
				)}
				<Input
					error={error}
					placeholder={placeholder}
					value={value}
					onKeyPress={onKeyPressed}
					onChange={(e) =>
						setValue(e.target.value.replace(/[^A-Za-zéèàçÀÉÈÇÙ]/gi, ''))
					}
					pattern="[A-Za-z]"
				/>

				<CloseOutline
					style={{ marginTop: '7px', cursor: 'pointer' }}
					color={
						error ? Branding.Colors.Error.normal : Branding.Colors.Gray.label
					}
					onClick={() => setValue('')}
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

export default TextInput;
