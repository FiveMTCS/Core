import React, { useState } from 'react';
import { Wrapper, TitleWrapper, ChildrenWrapper } from './styled';
import * as Branding from 'components/Branding';

import { AddOutline, RemoveOutline } from 'react-ionicons';

interface IArgs {
	title: string;
	customStyle: string;
	children: any;
}

const Accordion: React.FC<IArgs> = ({
	title,
	customStyle,
	children,
}: IArgs) => {
	const [show, setShow] = useState(false);

	return (
		<Wrapper customStyle={customStyle}>
			<TitleWrapper onClick={() => setShow(!show)}>
				<Branding.Fonts.Texts.MediumBold>
					{title}
				</Branding.Fonts.Texts.MediumBold>
				{!show && (
					<AddOutline width="25px" height="25px" style={{ marginTop: '7px' }} />
				)}
				{show && (
					<RemoveOutline
						width="25px"
						height="25px"
						style={{ marginTop: '7px' }}
					/>
				)}
			</TitleWrapper>

			{show && <ChildrenWrapper>{children}</ChildrenWrapper>}
		</Wrapper>
	);
};

export default Accordion;
