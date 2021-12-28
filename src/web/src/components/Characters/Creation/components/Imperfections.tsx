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

const CharacterImperfections: React.FC<IArgs> = ({
	goBack,
	goNext,
	updateCharacter,
	character,
}) => {
	const [blemishes, setBlemishes] = useState(character.skin.blemishes);
	const [ageing, setAgeing] = useState(character.skin.ageing);
	const [complexion, setComplexion] = useState(character.skin.complexion);
	const [sunDamage, setSunDamage] = useState(character.skin.sunDamage);
	const [freckles, setFreckles] = useState(character.skin.freckles);

	const [t] = useTranslation('common');

	useEffect(() => {
		character.skin.blemishes = blemishes;
		character.skin.ageing = ageing;
		character.skin.complexion = complexion;
		character.skin.sunDamage = sunDamage;
		character.skin.freckles = freckles;
		updateCharacter(character);
	}, [blemishes, ageing, complexion, sunDamage, freckles]);

	return (
		<CreationPane
			title={t('characters.creation.imperfections.title')}
			onPrevious={goBack}
			onNext={goNext}
		>
			<Branding.Fonts.Texts.Medium
				customStyle={'margin-top: 40px; margin-bottom: 0;'}
			>
				{t('characters.warning')}
			</Branding.Fonts.Texts.Medium>

			<Branding.Fonts.Texts.Medium
				customStyle={'margin-top: 40px; margin-bottom: 0;'}
			>
				{t('characters.creation.imperfections.blemishes')}
			</Branding.Fonts.Texts.Medium>

			<SliderWrapper>
				<NormalSlider
					onChange={setBlemishes}
					value={blemishes}
					defaultValue={blemishes}
					min={-1}
					max={23}
					dotColor={Branding.Colors.Gray.placeholder}
					width="100%"
				/>
			</SliderWrapper>

			<Branding.Fonts.Texts.Medium
				customStyle={'margin-top: 40px; margin-bottom: 0;'}
			>
				{t('characters.creation.imperfections.ageing')}
			</Branding.Fonts.Texts.Medium>

			<SliderWrapper>
				<NormalSlider
					onChange={setAgeing}
					value={ageing}
					defaultValue={ageing}
					min={-1}
					max={14}
					dotColor={Branding.Colors.Gray.placeholder}
					width="100%"
				/>
			</SliderWrapper>

			<Branding.Fonts.Texts.Medium
				customStyle={'margin-top: 40px; margin-bottom: 0;'}
			>
				{t('characters.creation.imperfections.complexion')}
			</Branding.Fonts.Texts.Medium>

			<SliderWrapper>
				<NormalSlider
					onChange={setComplexion}
					value={complexion}
					defaultValue={complexion}
					min={-1}
					max={11}
					dotColor={Branding.Colors.Gray.placeholder}
					width="100%"
				/>
			</SliderWrapper>

			<Branding.Fonts.Texts.Medium
				customStyle={'margin-top: 40px; margin-bottom: 0;'}
			>
				{t('characters.creation.imperfections.sunDamage')}
			</Branding.Fonts.Texts.Medium>

			<SliderWrapper>
				<NormalSlider
					onChange={setSunDamage}
					value={sunDamage}
					defaultValue={sunDamage}
					min={-1}
					max={10}
					dotColor={Branding.Colors.Gray.placeholder}
					width="100%"
				/>
			</SliderWrapper>

			<Branding.Fonts.Texts.Medium
				customStyle={'margin-top: 40px; margin-bottom: 0;'}
			>
				{t('characters.creation.imperfections.freckles')}
			</Branding.Fonts.Texts.Medium>

			<SliderWrapper>
				<NormalSlider
					onChange={setFreckles}
					value={freckles}
					defaultValue={freckles}
					min={-1}
					max={17}
					dotColor={Branding.Colors.Gray.placeholder}
					width="100%"
				/>
			</SliderWrapper>
		</CreationPane>
	);
};

export default CharacterImperfections;
