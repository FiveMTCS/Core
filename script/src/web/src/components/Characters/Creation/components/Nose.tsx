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

const CharacterNose: React.FC<IArgs> = ({
	goBack,
	goNext,
	updateCharacter,
	character,
}) => {
	const [width, setWidth] = useState(character.skin.noseWidth);
	const [peakHight, setPeakHight] = useState(character.skin.nosePeakHight);
	const [peakLength, setPeakLength] = useState(character.skin.nosePeakLength);
	const [peakLowering, setPeakLowering] = useState(
		character.skin.nosePeakLowering
	);
	const [boneHigh, setBoneHigh] = useState(character.skin.noseBoneHigh);
	const [boneTwist, setBoneTwist] = useState(character.skin.noseBoneTwist);

	const [t] = useTranslation('common');

	useEffect(() => {
		character.skin.noseWidth = width;
		character.skin.nosePeakHight = peakHight;
		character.skin.nosePeakLength = peakLength;
		character.skin.nosePeakLowering = peakLowering;
		character.skin.noseBoneHigh = boneHigh;
		character.skin.noseBoneTwist = boneTwist;
		updateCharacter(character);
	}, [width, peakHight, peakLength, peakLowering, boneHigh, boneTwist]);

	return (
		<CreationPane
			title={t('characters.creation.nose.title')}
			onPrevious={goBack}
			onNext={goNext}
		>
			<Branding.Fonts.Texts.Medium
				customStyle={'margin-top: 40px; margin-bottom: 0;'}
			>
				{t('characters.creation.nose.width')}
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
				{t('characters.creation.nose.peakHight')}
			</Branding.Fonts.Texts.Medium>

			<SliderWrapper>
				<Branding.Fonts.Texts.Small customStyle={'margin: 0; width: 88px;'}>
					{t('common.short')}
				</Branding.Fonts.Texts.Small>
				<NormalSlider
					onChange={setPeakHight}
					value={peakHight}
					defaultValue={peakHight}
					min={-100}
					max={0}
					dotColor={Branding.Colors.Gray.placeholder}
					width="60%"
				/>
				<Branding.Fonts.Texts.Small
					customStyle={'margin: 0;  width: 88px; text-align: right;'}
				>
					{t('common.long')}
				</Branding.Fonts.Texts.Small>
			</SliderWrapper>

			<Branding.Fonts.Texts.Medium
				customStyle={'margin-top: 40px; margin-bottom: 0;'}
			>
				{t('characters.creation.nose.peakLenght')}
			</Branding.Fonts.Texts.Medium>

			<SliderWrapper>
				<Branding.Fonts.Texts.Small customStyle={'margin: 0; width: 88px;'}>
					{t('common.little')}
				</Branding.Fonts.Texts.Small>
				<NormalSlider
					onChange={setPeakLength}
					value={peakLength}
					defaultValue={peakLength}
					min={-100}
					max={0}
					dotColor={Branding.Colors.Gray.placeholder}
					width="60%"
				/>
				<Branding.Fonts.Texts.Small
					customStyle={'margin: 0;  width: 88px; text-align: right;'}
				>
					{t('common.alot')}
				</Branding.Fonts.Texts.Small>
			</SliderWrapper>

			<Branding.Fonts.Texts.Medium
				customStyle={'margin-top: 40px; margin-bottom: 0;'}
			>
				{t('characters.creation.nose.peakLowering')}
			</Branding.Fonts.Texts.Medium>

			<SliderWrapper>
				<Branding.Fonts.Texts.Small customStyle={'margin: 0; width: 88px;'}>
					{t('common.low')}
				</Branding.Fonts.Texts.Small>
				<NormalSlider
					onChange={setPeakLowering}
					value={peakLowering}
					defaultValue={peakLowering}
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
				{t('characters.creation.nose.boneHigh')}
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
				{t('characters.creation.nose.boneTwist')}
			</Branding.Fonts.Texts.Medium>

			<SliderWrapper>
				<Branding.Fonts.Texts.Small customStyle={'margin: 0; width: 88px;'}>
					{t('characters.creation.nose.right')}
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
					{t('characters.creation.nose.left')}
				</Branding.Fonts.Texts.Small>
			</SliderWrapper>
		</CreationPane>
	);
};

export default CharacterNose;
