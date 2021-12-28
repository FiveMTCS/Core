import styled from 'styled-components';
import * as Branding from 'components/Branding';

export const Wrapper = styled.div`
	position: relative;
	top: 0;
	left: 0;

	height: 100%;
	width: 100%;

	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const PaneWrapper = styled.div`
	height: 100%;
	width: 600px;

	padding: 0 40px;

	background-color: ${Branding.Colors.Gray.background};

	display: flex;
	flex-flow: column;
	overflow-y: auto;
`;

export const TopWrapper = styled.div`
	height: 136px;
	width: 100%;
`;

export const MidWrapper = styled.div`
	flex: 1;
	width: 100%;

	display: flex;
	flex-flow: column;
	align-items: center;
	justify-content: center;
`;

export const BottomWrapper = styled.div`
	height: 90px;
	width: 100%;

	display: flex;
	flex-direction: row;

	justify-content: space-between;
	align-items: center;

	margin: 20px 0;
`;

export const BottomButton = styled.div`
	transform: rotate(
		${({ deg }: { deg?: number; disabled?: boolean }) => deg}deg
	);
	cursor: ${({ disabled = false }: { deg?: number; disabled?: boolean }) =>
		disabled ? 'default' : 'pointer'};

	height: 54px;
	width: 54px;

	border-radius: 100%;

	background-color: ${({
		disabled = false,
	}: {
		deg?: number;
		disabled?: boolean;
	}) =>
		disabled ? Branding.Colors.Gray.line : Branding.Colors.Primary.normal};

	display: flex;
	justify-content: center;
	align-items: center;
`;

export const SexWrapper = styled.div`
	width: 100%;
	height: auto;

	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	margin-top: 30px;
`;

export const SexBox = styled.div`
	width: 156px;
	height: 86px;

	background-color: ${({
		selected,
		color,
	}: {
		selected: boolean;
		color: string;
	}) => (selected ? color : 'none')};

	color: ${({ selected, color }: { selected: boolean; color: string }) =>
		selected ? '#FFF' : color};

	border: 2px ${({ color }: { color: string }) => color} solid;
	border-radius: 15px;

	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;

	cursor: pointer;
`;

export const RightWrapper = styled.div`
	height: 100%;

	flex: 1;
	display: flex;
	justify-content: center;
	align-items: flex-end;
`;

export const RightBottomWrapper = styled.div`
	height: 90px;
	width: 500px;

	display: flex;
	flex-direction: row;

	justify-content: space-between;
	align-items: center;

	margin: 20px 0;
`;
