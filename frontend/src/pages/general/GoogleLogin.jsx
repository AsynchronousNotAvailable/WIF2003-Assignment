import {GoogleLogin} from 'react-google-login';

const clientId = "293042637519-berhpp046ij2pndgr3e42jf8obnt3rko.apps.googleusercontent.com";

function Login(onSuccess, onFailure) {
    return (
        <GoogleLogin
            clientId={clientId}
            buttonText="Login"
            onSuccess={onSuccess(res.profileObj)}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
        />
    );
}

export default Login;