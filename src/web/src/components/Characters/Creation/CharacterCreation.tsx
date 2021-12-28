import React, { useEffect, useState } from 'react';
import {
	BottomButton,
	RightBottomWrapper,
	RightWrapper,
	Wrapper,
} from './styled';

import CharacterInformations from './components/Informations';
import CharacterFaces from './components/Faces';
import CharacterColors from './components/Colors';
import CharacterEyes from './components/Eyes';
import CharacterHairs from './components/Hairs';
import CharacterEyebrows from './components/Eyebrows';
import CharacterBeards from './components/Beard';
import CharacterNose from './components/Nose';
import CharacterCheeks from './components/Cheeks';
import CharacterLips from './components/Lips';
import CharacterNeck from './components/Neck';
import CharacterClothes from './components/Clothes';
import ICharacter from '../Selection/Character.interface';
import { fetchNui } from 'utils/fetchNui';
import { MainMenus } from 'components/PagesHandler/constants';
import CharacterImperfections from './components/Imperfections';
import { ChevronBackOutline, ChevronForwardOutline } from 'react-ionicons';

enum Menus {
	INFORMATIONS,
	FACE,
	SKIN,
	IMPERFECTION,
	HAIRS,
	EYES,
	EYEBROWS,
	BEARD,
	NOSE,
	CHEEKS,
	LIPS,
	NECK,
	CLOTHES,
}

interface IArgs {
	setPage: (state: MainMenus) => void;
}
const CharacterCreation: React.FC<IArgs> = ({ setPage }) => {
	const [character, setCharacter] = useState({
		characterId: '-1',
		mugshot: '',
		informations: { firstname: '', lastname: '', sex: 1, age: 15 },
		skin: {
			primaryFace: 0,
			secondaryFace: 0,
			shapeMixFace: 5,

			skin: 0,

			hairs: 0,
			hairsPrimaryColor: 0,
			hairsSecondaryColor: 0,

			eyebrows: 255,
			eyebrowsColor: 1,
			eyebrowsOpacity: 50,
			eyebrowsForward: 0,
			eyebrowsHigh: 0,

			eyesColor: 0,
			eyesOpening: 0,

			beard: 29,
			beardColor: 1,
			beardOpacity: 50,

			cheeksWidth: 0,
			cheeksBoneHigh: 0,
			cheeksBoneTwist: 0,

			lipsWidth: 0,
			neckThikness: 50,

			noseWidth: 0,
			nosePeakHight: 0,
			nosePeakLength: 0,
			nosePeakLowering: 0,
			noseBoneHigh: 0,
			noseBoneTwist: 0,

			ageing: -1,
			blemishes: -1,
			complexion: -1,
			freckles: -1,
			sunDamage: -1,
		},
	} as ICharacter);
	const [state, setState] = useState(Menus.INFORMATIONS);

	useEffect(() => {
		fetchNui('characters:set', character);
	}, [character]);

	useEffect(() => {
		const camera =
			state === Menus.INFORMATIONS || state === Menus.CLOTHES ? 'body' : 'face';
		fetchNui('characters:changeCamera', camera);
	}, [state]);

	const updateCharacter = (newCharacter: ICharacter) =>
		setCharacter(Object.assign({}, newCharacter));

	return (
		<Wrapper>
			{state === Menus.INFORMATIONS && (
				<CharacterInformations
					goBack={() => {
						setPage(MainMenus.CHARACTERS_SELECTION);
					}}
					goNext={() => setState(Menus.FACE)}
					updateCharacter={updateCharacter}
					character={character}
				></CharacterInformations>
			)}
			{state === Menus.FACE && (
				<CharacterFaces
					goBack={() => setState(Menus.INFORMATIONS)}
					goNext={() => setState(Menus.SKIN)}
					updateCharacter={updateCharacter}
					character={character}
				></CharacterFaces>
			)}
			{state === Menus.SKIN && (
				<CharacterColors
					goBack={() => setState(Menus.FACE)}
					goNext={() => setState(Menus.IMPERFECTION)}
					updateCharacter={updateCharacter}
					character={character}
				></CharacterColors>
			)}
			{state === Menus.IMPERFECTION && (
				<CharacterImperfections
					goBack={() => setState(Menus.SKIN)}
					goNext={() => setState(Menus.HAIRS)}
					updateCharacter={updateCharacter}
					character={character}
				></CharacterImperfections>
			)}
			{state === Menus.HAIRS && (
				<CharacterHairs
					goBack={() => setState(Menus.IMPERFECTION)}
					goNext={() => setState(Menus.EYES)}
					updateCharacter={updateCharacter}
					character={character}
				></CharacterHairs>
			)}
			{state === Menus.EYES && (
				<CharacterEyes
					goBack={() => setState(Menus.HAIRS)}
					goNext={() => setState(Menus.EYEBROWS)}
					updateCharacter={updateCharacter}
					character={character}
				></CharacterEyes>
			)}
			{state === Menus.EYEBROWS && (
				<CharacterEyebrows
					goBack={() => setState(Menus.EYES)}
					goNext={() =>
						character.informations.sex
							? setState(Menus.BEARD)
							: setState(Menus.NOSE)
					}
					updateCharacter={updateCharacter}
					character={character}
				></CharacterEyebrows>
			)}
			{state === Menus.BEARD && (
				<CharacterBeards
					goBack={() => setState(Menus.EYEBROWS)}
					goNext={() => setState(Menus.NOSE)}
					updateCharacter={updateCharacter}
					character={character}
				></CharacterBeards>
			)}
			{state === Menus.NOSE && (
				<CharacterNose
					goBack={() =>
						character.informations.sex
							? setState(Menus.BEARD)
							: setState(Menus.EYEBROWS)
					}
					goNext={() => setState(Menus.CHEEKS)}
					updateCharacter={updateCharacter}
					character={character}
				></CharacterNose>
			)}
			{state === Menus.CHEEKS && (
				<CharacterCheeks
					goBack={() => setState(Menus.NOSE)}
					goNext={() => setState(Menus.LIPS)}
					updateCharacter={updateCharacter}
					character={character}
				></CharacterCheeks>
			)}
			{state === Menus.LIPS && (
				<CharacterLips
					goBack={() => setState(Menus.CHEEKS)}
					goNext={() => setState(Menus.NECK)}
					updateCharacter={updateCharacter}
					character={character}
				></CharacterLips>
			)}
			{state === Menus.NECK && (
				<CharacterNeck
					goBack={() => setState(Menus.LIPS)}
					goNext={() => setState(Menus.CLOTHES)}
					updateCharacter={updateCharacter}
					character={character}
				></CharacterNeck>
			)}
			{state === Menus.CLOTHES && (
				<CharacterClothes
					goBack={() => setState(Menus.NECK)}
					goNext={() => fetchNui('characters:finishCreation', character)}
					updateCharacter={updateCharacter}
					character={character}
				></CharacterClothes>
			)}

			<RightWrapper>
				<RightBottomWrapper>
					<BottomButton
						deg={45}
						onClick={() => {
							fetchNui('characters:rotateCamera', 2);
						}}
					>
						<ChevronBackOutline color="#FFF" style={{ marginTop: '7px' }} />
					</BottomButton>
					<BottomButton
						deg={-45}
						onClick={() => {
							fetchNui('characters:rotateCamera', 1);
						}}
					>
						<ChevronForwardOutline color="#FFF" style={{ marginTop: '7px' }} />
					</BottomButton>
				</RightBottomWrapper>
			</RightWrapper>
		</Wrapper>
	);
};

export default CharacterCreation;
