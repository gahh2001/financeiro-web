//import './login.scss';
import back from '../../http';

import { useEffect } from "react";
import { LoginService } from '../../services/LoginService';

export const Login = () => {

	useEffect(() => {
		const buttonDiv = document.getElementById('buttonDiv');
		if (buttonDiv) {
		  google.accounts.id.initialize({
			client_id: "536894210778-998102hp7nml43ape8dtkpviiuvaj4ds.apps.googleusercontent.com",
			callback: handleCredentialResponse
		  });
		  google.accounts.id.renderButton(buttonDiv, { type: 'standard', theme: 'outline', size: 'large' });
		  google.accounts.id.prompt();
		}
	  }, []);
	
	  function handleCredentialResponse(response: any) {
		const service = new LoginService(back);
		console.log("Encoded JWT ID token: " + response.credential);
		service.autentica(response.credential);
	  }
	
	  return (
		<div>
		  <div id="buttonDiv"></div>
		</div>
	  );
}

export default Login;