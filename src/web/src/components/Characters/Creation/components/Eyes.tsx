import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Branding from 'components/Branding';
import CreationPane from './CreationPane';

import { CheckmarkOutline } from 'react-ionicons';
import Accordion from 'components/Global/Accordions';
import { NormalSlider } from 'components/Global/Slider/Normal';
import { SliderWrapper } from './styles/generic';
import { ColorsWrapper, ColorTear } from './styles/generic';
import { LabeledSlider } from 'components/Global/Slider/Labeled';

import ICharacter from 'components/Characters/Selection/Character.interface';

interface IArgs {
	goBack: () => void;
	goNext: () => void;
	updateCharacter: (newCharacter: ICharacter) => void;
	character: ICharacter;
}
const CharacterEyes: React.FC<IArgs> = ({
	goBack,
	goNext,
	updateCharacter,
	character,
}) => {
	const [eyesColor, setEyesColor] = useState(character.skin.eyesColor);
	const [eyesOpening, setEyesOpening] = useState(character.skin.eyesOpening);

	const [t] = useTranslation('common');

	const eyesColors = [
		{ value: 0, color: '#525e37' },
		{ value: 1, color: '#263419' },
		{ value: 2, color: '#83b7d5' },
		{ value: 3, color: '#3e66a3' },
		{ value: 4, color: '#8d6833' },
		{ value: 5, color: '#523711' },
		{ value: 6, color: '#d08418' },
		{ value: 8, color: '#bebebe' },
		{ value: 12, color: '#0d0d0c' },
	];

	useEffect(() => {
		character.skin.eyesColor = eyesColor;
		character.skin.eyesOpening = eyesOpening;
		updateCharacter(character);
	}, [eyesColor, eyesOpening]);

	return (
		<CreationPane
			title={t('characters.creation.eyes.title')}
			onPrevious={goBack}
			onNext={goNext}
		>
			<Branding.Fonts.Texts.Medium>
				{t('characters.warning')}
			</Branding.Fonts.Texts.Medium>

			<SliderWrapper>
				<Branding.Fonts.Texts.Small customStyle={'margin: 0; '}>
					{t('characters.creation.eyes.closed')}
				</Branding.Fonts.Texts.Small>
				<LabeledSlider
					onChange={setEyesOpening}
					value={eyesOpening}
					defaultValue={eyesOpening}
					min={-100}
					max={100}
					dotColor={Branding.Colors.Gray.placeholder}
					width="70%"
					percentage={true}
				/>
				<Branding.Fonts.Texts.Small customStyle={'margin: 0; '}>
					{t('characters.creation.eyes.opened')}
				</Branding.Fonts.Texts.Small>
			</SliderWrapper>

			<Branding.Fonts.Texts.Medium>
				{t('characters.creation.eyes.color')}
			</Branding.Fonts.Texts.Medium>

			<ColorsWrapper>
				{eyesColors.map((color) => (
					<ColorTear
						key={color.color}
						color={color.color}
						onClick={() => setEyesColor(color.value)}
					>
						{eyesColor === color.value && (
							<CheckmarkOutline
								color={Branding.Colors.Gray.offWhite}
								style={{ marginTop: '7px' }}
							/>
						)}
					</ColorTear>
				))}
			</ColorsWrapper>
		</CreationPane>
	);
};

export default CharacterEyes;
