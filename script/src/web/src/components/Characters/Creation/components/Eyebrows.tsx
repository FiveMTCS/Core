import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Branding from 'components/Branding';
import CreationPane from './CreationPane';
import Accordion from 'components/Global/Accordions';

import { SelectionWrapper } from './styles/pilosity';

import { CheckmarkCircle, CheckmarkOutline } from 'react-ionicons';
import { EyebrowsBox, EyebrowsImg, EyebrowsWrapper } from './styles/pilosity';
import { ColorsWrapper, ColorTear, SliderWrapper } from './styles/generic';
import { LabeledSlider } from 'components/Global/Slider/Labeled';
import { NormalSlider } from 'components/Global/Slider/Normal';

import ICharacter from 'components/Characters/Selection/Character.interface';

interface IArgs {
	goBack: () => void;
	goNext: () => void;
	updateCharacter: (newCharacter: ICharacter) => void;
	character: ICharacter;
}

const CharacterEyebrows: React.FC<IArgs> = ({
	goBack,
	goNext,
	updateCharacter,
	character,
}) => {
	const [selectedEyebrows, setSelectedEyebrows] = useState(
		character.skin.eyebrows
	);
	const [selectedEyebrowsColor, setEyebrowsColor] = useState(
		character.skin.eyebrowsColor
	);
	const [eyebrowsOpacity, setEyebrowsOpacity] = useState(
		character.skin.eyebrowsOpacity
	);
	const [eyebrownForward, setEyebrownForward] = useState(
		character.skin.eyebrowsForward
	);
	const [eyebrownHigh, setEyebrownHigh] = useState(character.skin.eyebrowsHigh);

	const eyebrowsColors = [
		{ value: 1, color: '#6a1711' },
		{ value: 2, color: '#781b14' },
		{ value: 3, color: '#5e2310' },
		{ value: 4, color: '#7c3119' },
		{ value: 5, color: '#8f371b' },
		{ value: 6, color: '#9c4023' },
		{ value: 7, color: '#9e4c32' },
		{ value: 8, color: '#b35c41' },
		{ value: 9, color: '#b37141' },
		{ value: 10, color: '#c38457' },
		{ value: 11, color: '#c3a557' },
		{ value: 12, color: '#d2b66b' },
		{ value: 13, color: '#d2d16b' },
		{ value: 14, color: '#dfde5d' },
		{ value: 15, color: '#e6e56a' },
	];

	useEffect(() => {
		character.skin.eyebrows = selectedEyebrows;
		character.skin.eyebrowsColor = selectedEyebrowsColor;
		character.skin.eyebrowsOpacity = eyebrowsOpacity;
		character.skin.eyebrowsForward = eyebrownForward;
		character.skin.eyebrowsHigh = eyebrownHigh;
		updateCharacter(character);
	}, [
		selectedEyebrows,
		selectedEyebrowsColor,
		eyebrowsOpacity,
		eyebrownForward,
		eyebrownHigh,
	]);

	const [t] = useTranslation('common');

	const renderEyebrows = (
		currentValue: number,
		setter: (val: number) => void
	) => {
		const list: number[] = [255];

		for (let i = 0; i < 33; i++) list.push(i);

		return (
			<>
				{list.map((index) => (
					<EyebrowsBox key={`Eyebrows-${index}`} onClick={() => setter(index)}>
						<EyebrowsImg
							src={require(`resources/img/eyebrows/${index}.jpg`).default}
						/>
						{currentValue === index && (
							<SelectionWrapper>
								<CheckmarkCircle color="#FFF" style={{ marginRight: '10px' }} />
							</SelectionWrapper>
						)}
					</EyebrowsBox>
				))}
			</>
		);
	};

	return (
		<CreationPane
			title={t('characters.creation.eyebrows.title')}
			onPrevious={goBack}
			onNext={goNext}
		>
			<Accordion
				title={t('characters.creation.eyebrows.eyebrows')}
				customStyle="width: 100%;max-width: 100%;"
			>
				<Branding.Fonts.Texts.Medium customStyle={'margin-bottom: 20px;'}>
					{t('characters.creation.eyebrows.clickToSelectEyebrows')}
				</Branding.Fonts.Texts.Medium>

				<EyebrowsWrapper>
					{renderEyebrows(selectedEyebrows, setSelectedEyebrows)}
				</EyebrowsWrapper>
			</Accordion>

			<Accordion
				title={t('characters.creation.eyebrows.eyebrowsColor')}
				customStyle="width: 100%;max-width: 100%; margin-top: 20px;"
			>
				<Branding.Fonts.Texts.Medium customStyle={'margin-bottom: 20px;'}>
					{t('characters.creation.eyebrows.eyebrowsColorSelect')}
				</Branding.Fonts.Texts.Medium>

				<ColorsWrapper>
					{eyebrowsColors.map((color) => (
						<ColorTear
							key={color.color}
							color={color.color}
							onClick={() => setEyebrowsColor(color.value)}
						>
							{selectedEyebrowsColor === color.value && (
								<CheckmarkOutline
									color={Branding.Colors.Gray.offWhite}
									style={{ marginTop: '7px' }}
								/>
							)}
						</ColorTear>
					))}
				</ColorsWrapper>
			</Accordion>

			<Branding.Fonts.Texts.Medium customStyle={'margin-bottom: 20px;'}>
				{t('characters.creation.eyebrows.eyebrowsQuantity')}
			</Branding.Fonts.Texts.Medium>

			<SliderWrapper>
				<Branding.Fonts.Texts.Small customStyle={'margin: 0; width: 88px;'}>
					{t('common.none')}
				</Branding.Fonts.Texts.Small>
				<LabeledSlider
					onChange={setEyebrowsOpacity}
					value={eyebrowsOpacity}
					defaultValue={eyebrowsOpacity}
					min={0}
					max={100}
					dotColor={Branding.Colors.Gray.placeholder}
					width="60%"
					percentage={true}
				/>
				<Branding.Fonts.Texts.Small
					customStyle={'margin: 0; width: 88px; text-align: right;'}
				>
					{t('common.alot')}
				</Branding.Fonts.Texts.Small>
			</SliderWrapper>

			<Branding.Fonts.Texts.Medium customStyle={'margin-bottom: 20px;'}>
				{t('characters.creation.eyebrows.eyebrownForward')}
			</Branding.Fonts.Texts.Medium>

			<SliderWrapper>
				<Branding.Fonts.Texts.Small customStyle={'margin: 0; width: 88px;'}>
					{t('common.little')}
				</Branding.Fonts.Texts.Small>
				<NormalSlider
					onChange={setEyebrownForward}
					value={eyebrownForward}
					defaultValue={eyebrownForward}
					min={-100}
					max={100}
					dotColor={Branding.Colors.Gray.placeholder}
					width="60%"
				/>
				<Branding.Fonts.Texts.Small
					customStyle={'margin: 0; width: 88px; text-align: right;'}
				>
					{t('common.alot')}
				</Branding.Fonts.Texts.Small>
			</SliderWrapper>

			<Branding.Fonts.Texts.Medium customStyle={'margin-bottom: 20px;'}>
				{t('characters.creation.eyebrows.eyebrownHigh')}
			</Branding.Fonts.Texts.Medium>

			<SliderWrapper>
				<Branding.Fonts.Texts.Small customStyle={'margin: 0; width: 88px;'}>
					{t('common.low')}
				</Branding.Fonts.Texts.Small>
				<NormalSlider
					onChange={setEyebrownHigh}
					value={eyebrownHigh}
					defaultValue={eyebrownHigh}
					min={-100}
					max={100}
					dotColor={Branding.Colors.Gray.placeholder}
					width="60%"
				/>
				<Branding.Fonts.Texts.Small
					customStyle={'margin: 0; width: 88px; text-align: right;'}
				>
					{t('common.high')}
				</Branding.Fonts.Texts.Small>
			</SliderWrapper>
		</CreationPane>
	);
};

export default CharacterEyebrows;
