import React from 'react';
import { useTranslation } from 'react-i18next';
import {
	PaneWrapper,
	TopWrapper,
	BottomWrapper,
	MidWrapper,
	BottomButton,
} from '../styled';

import * as Branding from 'components/Branding';
import { ChevronForwardOutline, ChevronBackOutline } from 'react-ionicons';

interface IArgs {
	disablePrevious?: boolean;
	disableNext?: boolean;
	onPrevious?: () => void;
	onNext: () => void;
	title: string;
	children: any;
	error?: boolean;
}

const CreationPane: React.FC<IArgs> = ({
	disablePrevious = false,
	disableNext = false,
	onPrevious = () => {},
	onNext,
	title,
	children,
	error = false,
}: IArgs) => {
	const [t] = useTranslation('common');

	return (
		<PaneWrapper>
			<TopWrapper>
				<Branding.Fonts.Displays.Large customStyle={'text-align:center;'}>
					{title}
				</Branding.Fonts.Displays.Large>
			</TopWrapper>

			<MidWrapper>{children}</MidWrapper>

			<BottomWrapper>
				<BottomButton disabled={disablePrevious} onClick={onPrevious}>
					<ChevronBackOutline color="#FFF" style={{ marginTop: '7px' }} />
				</BottomButton>
				<BottomButton disabled={error || disableNext} onClick={onNext}>
					<ChevronForwardOutline color="#FFF" style={{ marginTop: '7px' }} />
				</BottomButton>
			</BottomWrapper>
		</PaneWrapper>
	);
};

export default CreationPane;
