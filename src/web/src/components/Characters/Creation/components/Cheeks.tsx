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

const CharacterCheeks: React.FC<IArgs> = ({
	goBack,
	goNext,
	updateCharacter,
	character,
}) => {
	const [width, setWidth] = useState(character.skin.cheeksWidth);
	const [boneHigh, setBoneHigh] = useState(character.skin.cheeksBoneHigh);
	const [boneTwist, setBoneTwist] = useState(character.skin.cheeksBoneTwist);

	const [t] = useTranslation('common');

	useEffect(() => {
		character.skin.cheeksWidth = width;
		character.skin.cheeksBoneHigh = boneHigh;
		character.skin.cheeksBoneTwist = boneTwist;
		updateCharacter(character);
	}, [width, boneHigh, boneTwist]);

	return (
		<CreationPane
			title={t('characters.creation.cheeks.title')}
			onPrevious={goBack}
			onNext={goNext}
		>
			<Branding.Fonts.Texts.Medium
				customStyle={'margin-top: 40px; margin-bottom: 0;'}
			>
				{t('characters.creation.cheeks.width')}
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

			<Branding.Fonts.Texts.Medium
				customStyle={'margin-top: 40px; margin-bottom: 0;'}
			>
				{t('characters.creation.cheeks.boneHigh')}
			</Branding.Fonts.Texts.Medium>

			<SliderWrapper>
				<Branding.Fonts.Texts.Small customStyle={'margin: 0; width: 88px;'}>
					{t('common.low')}
				</Branding.Fonts.Texts.Small>
				<NormalSlider
					onChange={setBoneHigh}
					value={boneHigh}
					defaultValue={boneHigh}
					min={-100}
					max={100}
					dotColor={Branding.Colors.Gray.placeholder}
					width="60%"
				/>
				<Branding.Fonts.Texts.Small
					customStyle={'margin: 0;  width: 88px; text-align: right;'}
				>
					{t('common.high')}
				</Branding.Fonts.Texts.Small>
			</SliderWrapper>

			<Branding.Fonts.Texts.Medium
				customStyle={'margin-top: 40px; margin-bottom: 0;'}
			>
				{t('characters.creation.cheeks.boneWidth')}
			</Branding.Fonts.Texts.Medium>

			<SliderWrapper>
				<Branding.Fonts.Texts.Small customStyle={'margin: 0; width: 88px;'}>
					{t('common.thin')}
				</Branding.Fonts.Texts.Small>
				<NormalSlider
					onChange={setBoneTwist}
					value={boneTwist}
					defaultValue={boneTwist}
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

export default CharacterCheeks;
