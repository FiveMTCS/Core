import styled from 'styled-components';
import * as Colors from '../colors';
export const Large = styled.p`
	/* Desktop / Text Large */

	font-family: Poppins;
	font-style: normal;
	font-weight: normal;
	font-size: 24px;
	line-height: 38px;
	/* or 158% */

	letter-spacing: 0.75px;

	/* Grayscale / Body */

	color: ${Colors.Gray.body};

	${({ customStyle = '' }: { customStyle?: string }) => customStyle}
`;

export const LargeBold = styled.p`
	/* Desktop / Link Large */

	font-family: Poppins;
	font-style: normal;
	font-weight: 600;
	font-size: 24px;
	line-height: 38px;
	/* or 158% */

	letter-spacing: 0.75px;

	/* Grayscale / Title-Active */

	color: ${Colors.Gray.title};

	${({ customStyle = '' }: { customStyle?: string }) => customStyle}
`;

export const Medium = styled.p`
	/* Desktop / Text Medium */

	font-family: Poppins;
	font-style: normal;
	font-weight: normal;
	font-size: 18px;
	line-height: 34px;
	/* or 189% */

	letter-spacing: 0.75px;

	/* Grayscale / Body */

	color: ${Colors.Gray.body};

	${({ customStyle = '' }: { customStyle?: string }) => customStyle}
`;

export const MediumBold = styled.p`
	/* Desktop / Link Medium */

	font-family: Poppins;
	font-style: normal;
	font-weight: 600;
	font-size: 18px;
	line-height: 34px;
	/* or 189% */

	letter-spacing: 0.75px;

	/* Grayscale / Title-Active */

	color: ${Colors.Gray.title};

	${({ customStyle = '' }: { customStyle?: string }) => customStyle}
`;

export const Small = styled.p`
	/* Desktop / Text Small */

	font-family: Poppins;
	font-style: normal;
	font-weight: normal;
	font-size: 16px;
	line-height: 28px;
	/* or 175% */

	letter-spacing: 0.75px;

	/* Grayscale / Body */

	color: ${Colors.Gray.body};

	${({ customStyle = '' }: { customStyle?: string }) => customStyle}
`;

export const SmallBold = styled.p`
	/* Desktop / Link Small */

	font-family: Poppins;
	font-style: normal;
	font-weight: 600;
	font-size: 16px;
	line-height: 28px;
	/* or 175% */

	letter-spacing: 0.75px;

	/* Grayscale / Title-Active */

	color: ${Colors.Gray.title};

	${({ customStyle = '' }: { customStyle?: string }) => customStyle}
`;

export const ExtraSmall = styled.p`
	/* Desktop / Text X-Small */

	font-family: Poppins;
	font-style: normal;
	font-weight: 500;
	font-size: 14px;
	line-height: 24px;
	/* or 171% */

	letter-spacing: 0.75px;

	/* Grayscale / Body */

	color: ${Colors.Gray.body};

	${({ customStyle = '' }: { customStyle?: string }) => customStyle}
`;

export const ExtraSmallBold = styled.p`
	/* Desktop / Link X-Small */

	font-family: Poppins;
	font-style: normal;
	font-weight: 600;
	font-size: 14px;
	line-height: 24px;
	/* or 171% */

	letter-spacing: 0.75px;

	/* Grayscale / Title-Active */

	color: ${Colors.Gray.title};

	${({ customStyle = '' }: { customStyle?: string }) => customStyle}
`;
