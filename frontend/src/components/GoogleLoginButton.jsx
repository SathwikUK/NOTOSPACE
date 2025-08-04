import { GoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = ({ onSuccess, onError }) => {
  const handleSuccess = (credentialResponse) => {
    if (credentialResponse.credential) {
      onSuccess(credentialResponse.credential);
    } else {
      onError('No credential received');
    }
  };

  const handleError = () => {
    onError('Google login failed');
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="transform hover:scale-105 transition-transform duration-200">
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          theme="outline"
          size="large"
          width="300"
          text="signin_with"
          shape="rectangular"
          logo_alignment="left"
        />
      </div>
      <p className="text-sm text-purple-300 text-center">
        Sign in securely with your Google account
      </p>
    </div>
  );
};

export default GoogleLoginButton;