import { useState } from 'react';
import GoogleLoginButton from '../components/GoogleLoginButton';
import toast from 'react-hot-toast';

const LoginPage = ({ setUser }) => {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async (credential) => {
    setLoading(true);
    try {
      
const response = await fetch(`https://notospacebackend.vercel.app/api/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credential }),
      });

      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        toast.success(`Welcome back, ${data.user.name}!`);
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = (error) => {
    console.error('Google login error:', error);
    toast.error('Google login failed. Please try again.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-violet-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-600/10 rounded-full blur-3xl animate-pulse-glow"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="glass-dark rounded-2xl p-8 shadow-2xl animate-slide-up">
          <div className="text-center mb-8">
           <div className="float-animation mb-6">
  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-md flex items-center justify-center animate-bounce mx-auto">
    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  </div>
</div>

            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-violet-500 bg-clip-text text-transparent animate-fade-in">
            NOTOSPACE
          </h1>
            <p className="text-purple-300">
              Unlock your thoughts, the smart way.
            </p>
          </div>

          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-white mb-4">
                Welcome Back!
              </h2>
              <p className="text-gray-300 mb-6">
                Sign in to access your secure vault of ideas and memories.
              </p>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-4">
                <div className="w-6 h-6 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                <span className="ml-3 text-purple-300">Signing you in...</span>
              </div>
            ) : (
              <GoogleLoginButton 
                onSuccess={handleGoogleLogin}
                onError={handleGoogleError}
              />
            )}

            <div className="text-center">
              <div className="flex items-center justify-center space-x-4 text-sm text-purple-300">
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span>Secure</span>
                </div>
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <span>Fast</span>
                </div>
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Reliable</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-6 text-sm text-purple-300">
          <p>Your data is encrypted and secure</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;