import React, { useState, useEffect } from 'react';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { NuiWrapper } from './styled';

import { CharactersSelection, CharacterCreation } from '../Characters';

import { MainMenus } from './constants';
import { debugData } from '../../utils/debugData';
import { fetchNui } from 'utils/fetchNui';
import { ConvertMugshot } from 'others/mugshot';

debugData([
	{
		action: 'SHOW_CHARACTERS_SELECTION',
		data: {},
	},
]);

const App: React.FC = () => {
	const [page, setPage] = useState(MainMenus.IDLE);
	useNuiEvent('SHOW_CHARACTERS_SELECTION', () =>
		setPage(MainMenus.CHARACTERS_SELECTION)
	);
	useNuiEvent('SHOW_CHARACTERS_CREATION', () =>
		setPage(MainMenus.CREATE_CHARACTER)
	);
	useNuiEvent('HIDE_INTERFACE', () => setPage(MainMenus.IDLE));
	useNuiEvent(
		'MUGSHOT_B64',
		({ mugshot, id }: { mugshot: string; id: number }) => {
			ConvertMugshot(mugshot, id);
		}
	);

	useEffect(() => {
		fetchNui('core:onPageChange', { page });
	}, [page]);

	return (
		<NuiWrapper>
			{page === MainMenus.CHARACTERS_SELECTION && (
				<CharactersSelection setPage={setPage} />
			)}
			{page === MainMenus.CREATE_CHARACTER && (
				<CharacterCreation setPage={setPage} />
			)}
		</NuiWrapper>
	);
};

export default App;
