import styled from 'styled-components';
import * as Branding from 'components/Branding';

export const Wrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;

	height: 100%;
	width: 100%;

	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Popup = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 96px 128px;

	width: auto;
	height: auto;

	/* Grayscale / Background */

	background: ${Branding.Colors.Gray.background};
	border-radius: 24px;
`;

export const CreateButton = styled.span`
	cursor: pointer;
	width: 362px;

	padding: 15px 0px;

	background: ${Branding.Colors.Primary.normal};
	color: #fff;
	text-align: center;

	border-radius: 28px;
`;
