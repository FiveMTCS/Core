import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Divider } from 'semantic-ui-react';
import { fetchNui } from 'utils/fetchNui';
import { Wrapper, Popup, CreateButton } from './styled';

import * as Branding from 'components/Branding';

import CharactersDropList from './components/CharactersDropList';
import ICharacter from './Character.interface';
import { MainMenus } from 'components/PagesHandler/constants';

enum States {
	FETCHING,
	IDLE,
}

interface IArgs {
	setPage: (state: MainMenus) => void;
}

const CharactersSelection: React.FC<IArgs> = ({ setPage }) => {
	const [characters, setCharacters] = useState([] as ICharacter[]);
	const [state, setState] = useState(States.FETCHING);

	const [t] = useTranslation('common');

	useEffect(() => {
		loadCharacters();
	}, []);

	const loadCharacters = async () => {
		const receivedCharacters = JSON.parse(await fetchNui('characters:getList'));
		setCharacters(receivedCharacters);
		setState(States.IDLE);
	};

	return (
		<Wrapper>
			<Popup>
				<Branding.Fonts.Displays.MediumBold customStyle={'text-align: center;'}>
					{t('characters.selection.title')}
				</Branding.Fonts.Displays.MediumBold>

				<Branding.Fonts.Texts.Medium>
					{t('characters.selection.description')}
				</Branding.Fonts.Texts.Medium>

				<CharactersDropList
					characters={characters}
					onSelectCharacter={(character: ICharacter) => {
						fetchNui('characters:selectedCharacter', character);
					}}
				/>

				<Divider horizontal>
					<Branding.Fonts.Texts.Small>
						{t('common.or')}
					</Branding.Fonts.Texts.Small>
				</Divider>

				<CreateButton onClick={() => setPage(MainMenus.CREATE_CHARACTER)}>
					{t('characters.selection.create')}
				</CreateButton>
			</Popup>
		</Wrapper>
	);
};

export default CharactersSelection;
