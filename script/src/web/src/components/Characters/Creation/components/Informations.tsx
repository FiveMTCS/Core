import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SexWrapper, SexBox } from '../styled';

import * as Branding from 'components/Branding';
import TextInput from 'components/Global/Inputs/TextInput/TextInput';
import { Person, MaleOutline, FemaleOutline } from 'react-ionicons';
import NumberInput from 'components/Global/Inputs/NumberInput/NumberInput';
import CreationPane from './CreationPane';

import ICharacter from 'components/Characters/Selection/Character.interface';

interface IArgs {
	goBack: () => void;
	goNext: () => void;
	updateCharacter: (newCharacter: ICharacter) => void;
	character: ICharacter;
}
const CharacterInformations: React.FC<IArgs> = ({
	goNext,
	goBack,
	updateCharacter,
	character,
}) => {
	const [firstname, setFirstname] = useState(character.informations.firstname);
	const [lastname, setLastname] = useState(character.informations.lastname);
	const [age, setAge] = useState(character.informations.age);
	const [sex, setSex] = useState(character.informations.sex);
	const [hasError, setHasError] = useState(false);
	const [hasValidatedOnce, setHasValidatedOnce] = useState(false);

	const isAgeInvalid = (val: number) => val < 15 || val > 90;
	const isNameInvalid = (val: string) => val !== null && val.length < 3;

	useEffect(() => {
		const newValuesHasError =
			isAgeInvalid(age) || isNameInvalid(firstname) || isNameInvalid(lastname);

		if (newValuesHasError !== hasError) setHasError(newValuesHasError);
	}, [age, firstname, lastname]);

	useEffect(() => {
		character.informations.firstname = firstname;
		character.informations.lastname = lastname;
		character.informations.age = age;
		character.informations.sex = sex;
		updateCharacter(character);
	}, [firstname, lastname, age, sex]);

	const [t] = useTranslation('common');

	return (
		<CreationPane
			disableNext={hasError}
			title={t('characters.creation.informations.title')}
			onNext={() => {
				setHasValidatedOnce(true);

				if (!hasError) goNext();
			}}
			onPrevious={goBack}
		>
			<Branding.Fonts.Texts.Medium>
				{t('characters.warning')}
			</Branding.Fonts.Texts.Medium>

			<TextInput
				error={true && hasValidatedOnce && isNameInvalid(lastname)}
				errorText={t('characters.creation.informations.lastnameError')}
				title={t('characters.creation.informations.lastname')}
				placeholder={t('characters.creation.informations.lastnamePlaceholder')}
				Icon={Person}
				defaultValue={''}
				onChange={(value) => setLastname(value)}
			/>

			<TextInput
				error={hasError && hasValidatedOnce && isNameInvalid(firstname)}
				errorText={t('characters.creation.informations.firstnameError')}
				title={t('characters.creation.informations.firstname')}
				placeholder={t('characters.creation.informations.firstnamePlaceholder')}
				Icon={Person}
				defaultValue={''}
				onChange={(value) => setFirstname(value)}
			/>

			<NumberInput
				error={hasError && isAgeInvalid(age)}
				errorText={t('characters.creation.informations.ageError')}
				title={t('characters.creation.informations.age')}
				placeholder={t('characters.creation.informations.agePlaceholder')}
				onChange={(value: number) => setAge(value)}
			/>

			<SexWrapper>
				<SexBox
					color={'#0096B7'}
					selected={sex === 1}
					onClick={() => setSex(1)}
				>
					<MaleOutline
						color={sex === 1 ? '#FFF' : '#0096B7'}
						style={{ marginTop: '7px', marginRight: '5px' }}
					/>
					Homme
				</SexBox>
				<SexBox
					color={'#2A00A2'}
					selected={sex === 0}
					onClick={() => setSex(0)}
				>
					<FemaleOutline
						color={sex === 0 ? '#FFF' : '#2A00A2'}
						style={{ marginTop: '7px', marginRight: '5px' }}
					/>
					Femme
				</SexBox>
			</SexWrapper>
		</CreationPane>
	);
};

export default CharacterInformations;
