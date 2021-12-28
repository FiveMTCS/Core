import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Branding from 'components/Branding';
import CreationPane from './CreationPane';
import Accordion from 'components/Global/Accordions';

import { BeardImg, SelectionWrapper } from './styles/pilosity';

import { CheckmarkCircle, CheckmarkOutline } from 'react-ionicons';
import { EyebrowsBox, EyebrowsWrapper } from './styles/pilosity';
import { ColorsWrapper, ColorTear, SliderWrapper } from './styles/generic';
import { LabeledSlider } from 'components/Global/Slider/Labeled';

import ICharacter from 'components/Characters/Selection/Character.interface';

interface IArgs {
	goBack: () => void;
	goNext: () => void;
	updateCharacter: (newCharacter: ICharacter) => void;
	character: ICharacter;
}

const CharacterBeards: React.FC<IArgs> = ({
	goBack,
	goNext,
	updateCharacter,
	character,
}) => {
	const [selectedBeard, setSelectedBeard] = useState(character.skin.beard);
	const [selectedBeardColor, setBeardColor] = useState(
		character.skin.beardColor
	);
	const [beardOpacity, setBeardOpacity] = useState(character.skin.beardOpacity);

	const [t] = useTranslation('common');
	const isMale = character.informations.sex;

	const beardsColors = [
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
		character.skin.beard = selectedBeard;
		character.skin.beardColor = selectedBeardColor;
		character.skin.beardOpacity = beardOpacity;
		updateCharacter(character);
	}, [selectedBeard, selectedBeardColor, beardOpacity]);

	const renderBeards = (
		currentValue: number,
		setter: (val: number) => void
	) => {
		const list: number[] = [29]; // Push the none first

		for (let i = 0; i < 28; i++) list.push(i);

		return (
			<>
				{list.map((index) => (
					<EyebrowsBox key={`Beard-${index}`} onClick={() => setter(index)}>
						<BeardImg
							src={require(`resources/img/facehairs/${index}.jpg`).default}
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
			title={t('characters.creation.beards.title')}
			onPrevious={goBack}
			onNext={goNext}
		>
			{isMale && (
				<>
					<Accordion
						title={t('characters.creation.beards.beard')}
						customStyle="width: 100%;max-width: 100%; margin-top: 60px;"
					>
						<Branding.Fonts.Texts.Medium customStyle={'margin-bottom: 20px;'}>
							{t('characters.creation.beards.clickToSelectBeard')}
						</Branding.Fonts.Texts.Medium>

						<EyebrowsWrapper>
							{renderBeards(selectedBeard, setSelectedBeard)}
						</EyebrowsWrapper>
					</Accordion>

					<Accordion
						title={t('characters.creation.beards.beardColor')}
						customStyle="width: 100%;max-width: 100%; margin-top: 20px;"
					>
						<Branding.Fonts.Texts.Medium customStyle={'margin-bottom: 20px;'}>
							{t('characters.creation.beards.beardColorSelect')}
						</Branding.Fonts.Texts.Medium>

						<ColorsWrapper>
							{beardsColors.map((color) => (
								<ColorTear
									key={color.color}
									color={color.color}
									onClick={() => setBeardColor(color.value)}
								>
									{selectedBeardColor === color.value && (
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
						{t('characters.creation.beards.beardQuantity')}
					</Branding.Fonts.Texts.Medium>

					<SliderWrapper>
						<Branding.Fonts.Texts.Small customStyle={'margin: 0; width: 88px;'}>
							{t('common.none')}
						</Branding.Fonts.Texts.Small>
						<LabeledSlider
							onChange={setBeardOpacity}
							value={beardOpacity}
							defaultValue={beardOpacity}
							min={0}
							max={100}
							dotColor={Branding.Colors.Gray.placeholder}
							width="60%"
							percentage={true}
						/>
						<Branding.Fonts.Texts.Small
							customStyle={'margin: 0;  width: 88px; text-align: right;'}
						>
							{t('common.alot')}
						</Branding.Fonts.Texts.Small>
					</SliderWrapper>
				</>
			)}
		</CreationPane>
	);
};

export default CharacterBeards;
