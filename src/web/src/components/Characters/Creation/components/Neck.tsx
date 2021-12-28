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

const CharacterNeck: React.FC<IArgs> = ({
	goBack,
	goNext,
	updateCharacter,
	character,
}) => {
	const [thikness, setThikness] = useState(character.skin.neckThikness);

	const [t] = useTranslation('common');

	useEffect(() => {
		character.skin.neckThikness = thikness;
		updateCharacter(character);
	}, [thikness]);

	return (
		<CreationPane
			title={t('characters.creation.neck.title')}
			onPrevious={goBack}
			onNext={goNext}
		>
			<Branding.Fonts.Texts.Medium
				customStyle={'margin-top: 40px; margin-bottom: 0;'}
			>
				{t('characters.creation.neck.thikness')}
			</Branding.Fonts.Texts.Medium>

			<SliderWrapper>
				<Branding.Fonts.Texts.Small customStyle={'margin: 0; width: 88px;'}>
					{t('common.thin')}
				</Branding.Fonts.Texts.Small>
				<NormalSlider
					onChange={setThikness}
					value={thikness}
					defaultValue={thikness}
					min={0}
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

export default CharacterNeck;
