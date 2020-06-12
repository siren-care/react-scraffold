import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import React from 'react';

const App = () => {
	return (
		<h1>
			Hello
			<AmplifySignOut />
		</h1>
	);
};

export default withAuthenticator(App);
