import {GoogleLogin} from 'react-google-login';

const clientId = "293042637519-berhpp046ij2pndgr3e42jf8obnt3rko.apps.googleusercontent.com";

const GLogin = ({func}) => {
    const onSuccess = (res) => {
        func(res.profileObj);
    }

    const onFailure = (res) => {
        console.log(res);
    }

    return (
        <GoogleLogin
            clientId={clientId}
            buttonText="Login"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={false}
        />
    );
}

export default GLogin;