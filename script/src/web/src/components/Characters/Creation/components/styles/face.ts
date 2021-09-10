import styled from 'styled-components';
import * as Branding from 'components/Branding';

export const FaceWrapper = styled.div`
	position: relative;
	top: 0;
	left: 0;
	display: grid;
	grid-template-columns: repeat(4, 123px);
	grid-template-rows: repeat(4, 150px);
	gap: 20px 20px;
`;

export const SelectionWrapper = styled.div`
	position: absolute;
	top: 0;

	height: 150px;
	width: 125px;

	z-index: 99;

	background: linear-gradient(
		to bottom,
		rgba(0, 0, 0, 0) 0%,
		rgba(0, 0, 0, 0.5) 100%
	);

	display: flex;
	align-items: flex-end;
	justify-content: flex-end;
`;

export const FaceBox = styled.div`
	position: relative;
	top: 0;
	left: 0;
	height: 150px;
	width: 125px;

	cursor: pointer;

	border-radius: 5px;
	${({ selected = false }: { selected?: boolean }) =>
		selected ? 'border-style: solid; border-width: 2px;' : ''}

	${({ selected = false }: { selected?: boolean }) =>
		selected
			? `border-image: linear-gradient(45deg, ${Branding.Colors.Primary.normal}, ${Branding.Colors.Primary.light}) 1;`
			: ''}
			
		
		overflow: hidden;
`;

export const FaceImg = styled.img`
	height: 150px;

	position: relative;
	left: -15px;
`;
