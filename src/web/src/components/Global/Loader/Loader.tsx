import React from 'react';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';
import { Wrapper } from './styled';

const TextLoader: React.FC = () => (
	<div>
		<Segment>
			<Dimmer>
				<Loader>Preparing Files</Loader>
			</Dimmer>
		</Segment>
	</div>
);

export default TextLoader;
