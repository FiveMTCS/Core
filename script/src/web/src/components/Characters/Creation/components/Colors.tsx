import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Branding from 'components/Branding';
import CreationPane from './CreationPane';

import { CheckmarkOutline } from 'react-ionicons';
import Accordion from 'components/Global/Accordions';
import { NormalSlider } from 'components/Global/Slider/Normal';
import { SliderWrapper } from './styles/generic';
import { ColorsWrapper, ColorTear } from './styles/generic';

import ICharacter from 'components/Characters/Selection/Character.interface';

interface IArgs {
	goBack: () => void;
	goNext: () => void;
	updateCharacter: (newCharacter: ICharacter) => void;
	character: ICharacter;
}

const CharacterColors: React.FC<IArgs> = ({
	goBack,
	goNext,
	updateCharacter,
	character,
}) => {
	const [selectedSkin, setSelectedSkin] = useState(character.skin.skin);

	const [t] = useTranslation('common');

	const skinColors = [
		{ value: 0, color: '#F6E5D9' },
		{ value: 6, color: '#ECC8AE' },
		{ value: 4, color: '#CE9874' },
		{ value: 8, color: '#925A41' },
		{ value: 2, color: '#4E3A26' },
	];

	useEffect(() => {
		character.skin.skin = selectedSkin;
		updateCharacter(character);
	}, [selectedSkin]);

	return (
		<CreationPane
			title={t('characters.creation.skin.title')}
			onPrevious={goBack}
			onNext={goNext}
		>
			<Branding.Fonts.Texts.Medium>
				{t('characters.warning')}
			</Branding.Fonts.Texts.Medium>

			<Accordion
				title={`${t('characters.creation.skin.accordion')}`}
				customStyle="width: 100%;max-width: 100%;"
			>
				<Branding.Fonts.Texts.Medium>
					{t('characters.creation.skin.description')}
				</Branding.Fonts.Texts.Medium>

				<ColorsWrapper>
					{skinColors.map((color) => (
						<ColorTear
							key={color.color}
							color={color.color}
							onClick={() => setSelectedSkin(color.value)}
						>
							{selectedSkin === color.value && (
								<CheckmarkOutline
									color={Branding.Colors.Gray.placeholder}
									style={{ marginTop: '7px' }}
								/>
							)}
						</ColorTear>
					))}
				</ColorsWrapper>
			</Accordion>
		</CreationPane>
	);
};

export default CharacterColors;
