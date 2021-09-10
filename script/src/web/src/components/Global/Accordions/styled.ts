import styled from 'styled-components';
import * as Branding from 'components/Branding';

export const Wrapper = styled.div`
	background-color: ${Branding.Colors.Gray.inputBackground};
	border-radius: 16px;

	min-height: 70px;
	padding: 5px 20px 5px 20px;
	-moz-box-sizing: border-box;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	${({ customStyle }: { customStyle?: string }) => customStyle};
`;

export const TitleWrapper = styled.div`
	cursor: pointer;

	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	color: ${Branding.Colors.Gray.title};
`;

export const ChildrenWrapper = styled.div`
	margin-top: 10px;

	width: 100%;
`;
