//import './login.scss';

export const Login = () => {

	return (
		<>
			<div id="g_id_onload"
				data-client_id="536894210778-998102hp7nml43ape8dtkpviiuvaj4ds.apps.googleusercontent.com"
				data-login_uri="http://localhost:3000/login"
				data-auto_prompt="false">
			</div>
			<div className="g_id_signin"
				data-type="standard"
				data-size="large"
				data-theme="outline"
				data-text="sign_in_with"
				data-shape="rectangular"
				data-logo_alignment="left">
			</div>
		</>
	)
}

export default Login;