import React, { useState, useRef, useEffect } from 'react';
import {
	ChevronForwardOutline,
	PersonOutline,
	ChevronDownOutline,
} from 'react-ionicons';
import { useTranslation } from 'react-i18next';

import ICharacter from '../Character.interface';

import {
	TitleWrapper,
	Wrapper,
	ListWrapper,
	CharacterWrapper,
	CharacterPictureWrapper,
	CharacterPicture,
} from './styled';
import * as Branding from 'components/Branding';

import useOnClickOutside, { AnyEvent } from 'hooks/useOnClickOustide';

const CharactersDropList: React.FC<{
	characters: ICharacter[];
	onSelectCharacter: (character: ICharacter) => void;
}> = ({ characters, onSelectCharacter }) => {
	const [showList, setShowList] = useState(false);
	const [t] = useTranslation('common');

	const selectionWrapperRef = useRef(null);

	useOnClickOutside(selectionWrapperRef, (event: AnyEvent) =>
		setShowList(false)
	);

	const renderCharacter = (character: ICharacter) => (
		<CharacterWrapper
			onClick={() => {
				onSelectCharacter(character);
			}}
			key={character.characterId}
		>
			<CharacterPictureWrapper>
				<CharacterPicture src={character.mugshot} />
			</CharacterPictureWrapper>
			<Branding.Fonts.Texts.Small>{`${character.informations.firstname} ${
				character.informations.lastname
			} (${character.informations.age} ${t(
				'characters.selection.yearsOld'
			)})`}</Branding.Fonts.Texts.Small>
		</CharacterWrapper>
	);

	return (
		<Wrapper ref={selectionWrapperRef}>
			<TitleWrapper
				onClick={() => {
					setShowList(!showList);
				}}
			>
				<Branding.Fonts.Texts.SmallBold>
					{t('characters.selection.select')}
				</Branding.Fonts.Texts.SmallBold>
				{!showList && <ChevronForwardOutline style={{ marginTop: '7px' }} />}
				{showList && <ChevronDownOutline style={{ marginTop: '7px' }} />}
			</TitleWrapper>
			{showList && (
				<ListWrapper data-scrollbar>
					{characters.length === 0 && (
						<Branding.Fonts.Texts.Small>
							{t('characters.selection.none')}
						</Branding.Fonts.Texts.Small>
					)}

					{characters.length > 0 && (
						<>{characters.map((character) => renderCharacter(character))}</>
					)}
				</ListWrapper>
			)}
		</Wrapper>
	);
};

export default CharactersDropList;
