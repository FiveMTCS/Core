import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Branding from 'components/Branding';
import CreationPane from './CreationPane';

import { SliderWrapper } from './styles/generic';
import { NormalSlider } from 'components/Global/Slider/Normal';

import ICharacter from 'components/Characters/Selection/Character.interface';

interface IArgs {
	goBack: () => void;
	goNext: () => void;
	updateCharacter: (newCharacter: ICharacter) => void;
	character: ICharacter;
}

const CharacterLips: React.FC<IArgs> = ({
	goBack,
	goNext,
	updateCharacter,
	character,
}) => {
	const [width, setWidth] = useState(character.skin.lipsWidth);

	const [t] = useTranslation('common');

	useEffect(() => {
		character.skin.lipsWidth = width;
		updateCharacter(character);
	}, [width]);

	return (
		<CreationPane
			title={t('characters.creation.lips.title')}
			onPrevious={goBack}
			onNext={goNext}
		>
			<Branding.Fonts.Texts.Medium
				customStyle={'margin-top: 40px; margin-bottom: 0;'}
			>
				{t('characters.creation.lips.width')}
			</Branding.Fonts.Texts.Medium>

			<SliderWrapper>
				<Branding.Fonts.Texts.Small customStyle={'margin: 0; width: 88px;'}>
					{t('common.thin')}
				</Branding.Fonts.Texts.Small>
				<NormalSlider
					onChange={setWidth}
					value={width}
					defaultValue={width}
					min={-100}
					max={100}
					dotColor={Branding.Colors.Gray.placeholder}
					width="60%"
				/>
				<Branding.Fonts.Texts.Small
					customStyle={'margin: 0;  width: 88px; text-align: right;'}
				>
					{t('common.big')}
				</Branding.Fonts.Texts.Small>
			</SliderWrapper>
		</CreationPane>
	);
};

export default CharacterLips;
