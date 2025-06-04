import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PartyPopper } from 'lucide-react';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';

const AuthPage: React.FC = () => {
  const { action } = useParams<{ action: string }>();
  const isLogin = action === 'login';
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-purple-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-2xl">
        <div>
          <div className="mx-auto h-12 w-12 text-purple-500 animate-bounce">
            <PartyPopper className="w-full h-full transform hover:rotate-12 transition-transform duration-200" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            {isLogin ? 'Welcome Back!' : 'Join the Party'}
          </h2>
          <p className="mt-2 text-center text-sm text-zinc-300">
            {isLogin ? (
              <>
                Don't have an account?{' '}
                <Link to="/auth/register" className="font-medium text-purple-400 hover:text-purple-300 transition-colors">
                  Register here
                </Link>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <Link to="/auth/login" className="font-medium text-purple-400 hover:text-purple-300 transition-colors">
                  Sign in
                </Link>
              </>
            )}
          </p>
        </div>

        {isLogin ? <LoginForm /> : <SignupForm />}
      </div>
    </div>
  );
};

export default AuthPage;