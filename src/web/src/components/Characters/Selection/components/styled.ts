import styled from 'styled-components';
import * as Branding from 'components/Branding';

export const Wrapper = styled.div`
	margin-top: 10px;
	position: relative;
	top: 0;

	width: 362px;
	height: 55px;
`;

export const TitleWrapper = styled.div`
	width: 100%;
	height: 100%;

	background: ${Branding.Colors.Gray.background};

	border: 2px solid ${Branding.Colors.Gray.title};
	box-sizing: border-box;
	border-radius: 16px;

	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	cursor: pointer;

	padding: 15px;
`;

export const ListWrapper = styled.div`
	position: absolute;
	bottom: 0px;

	transform: translateY(100%);

	width: 342px;
	max-height: 150px;

	overflow-y: auto;

	border-bottom-left: 5px;
	border-bottom-right: 5px;

	background: #eff0f7;

	padding: 0px 10px;
`;

export const CharacterWrapper = styled.div`
	width: 100%;
	height: 50px;

	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;

	cursor: pointer;
`;

export const CharacterPictureWrapper = styled.div`
	height: 32px;
	width: 32px;

	background-color! ${Branding.Colors.Gray.placeholder};

	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items:center;

	border-radius: 100%;

	margin-right: 15px;
`;

export const CharacterPicture = styled.img`
	height: 55px;
`;
