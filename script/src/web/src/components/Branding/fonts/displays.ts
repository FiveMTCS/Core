import styled from 'styled-components';
import * as Colors from '../colors';

export const Large = styled.h1`
	/* Desktop /  Large */
	font-family: Poppins;
	font-style: normal;
	font-weight: normal;
	font-size: 64px;
	line-height: 66px;
	/* or 103% */

	letter-spacing: 1px;

	/* Grayscale / Title-Active */

	color: ${Colors.Gray.body};

	${({ customStyle = '' }: { customStyle?: string }) => customStyle}
`;

export const LargeBold = styled.h1`
	/* Desktop /  Large Bold */
	font-family: Poppins;
	font-style: normal;
	font-weight: bold;
	font-size: 64px;
	line-height: 66px;
	/* or 103% */

	letter-spacing: 1px;

	/* Grayscale / Title-Active */

	color: ${Colors.Gray.title};

	${({ customStyle = '' }: { customStyle?: string }) => customStyle}
`;

export const Medium = styled.h2`
	/* Desktop /  Medium */

	font-family: Poppins;
	font-style: normal;
	font-weight: normal;
	font-size: 48px;
	line-height: 50px;
	/* or 104% */

	letter-spacing: 1px;

	/* Grayscale / Title-Active */

	color: ${Colors.Gray.title};

	${({ customStyle = '' }: { customStyle?: string }) => customStyle}
`;

export const MediumBold = styled.h2`
	/* Desktop /  Medium Bold */

	font-family: Poppins;
	font-style: normal;
	font-weight: bold;
	font-size: 48px;
	line-height: 50px;
	/* or 104% */

	letter-spacing: 1px;

	/* Grayscale / Title-Active */

	color: ${Colors.Gray.title};

	${({ customStyle = '' }: { customStyle?: string }) => customStyle}
`;

export const Small = styled.h3`
	/* Desktop /  Small */

	font-family: Poppins;
	font-style: normal;
	font-weight: normal;
	font-size: 32px;
	line-height: 34px;
	/* or 106% */

	letter-spacing: 1px;

	/* Grayscale / Title-Active */

	color: ${Colors.Gray.title};

	${({ customStyle = '' }: { customStyle?: string }) => customStyle}
`;

export const SmallBold = styled.h3`
	/* Desktop /  Small Bold */

	font-family: Poppins;
	font-style: normal;
	font-weight: bold;
	font-size: 32px;
	line-height: 34px;
	/* or 106% */

	letter-spacing: 1px;

	/* Grayscale / Title-Active */

	color: ${Colors.Gray.title};

	${({ customStyle = '' }: { customStyle?: string }) => customStyle}
`;
