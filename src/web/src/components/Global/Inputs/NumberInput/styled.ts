import styled from 'styled-components';
import * as Branding from 'components/Branding';

export const Wrapper = styled.div`
	width: 100%;
`;

export const InputWrapper = styled.div`
	max-width: 100%;
	height: 54px;

	padding: 0 15px;

	background-color: ${Branding.Colors.Gray.offWhite};
	border: 2px
		${({ error }: { error: boolean }) =>
			error ? Branding.Colors.Error.dark : Branding.Colors.Gray.label}
		solid;
	border-radius: 16px;

	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

export const Input = styled.input.attrs({
	placeholderTextColor: Branding.Colors.Gray.placeholder,
	type: 'number',
})`
	flex: 1;

	height: 100%;

	border: none;
	background: none;

	color: ${({ error }: { error: boolean }) =>
		error ? Branding.Colors.Error.normal : Branding.Colors.Gray.label};

	:focus {
		outline: none;
	}
`;
