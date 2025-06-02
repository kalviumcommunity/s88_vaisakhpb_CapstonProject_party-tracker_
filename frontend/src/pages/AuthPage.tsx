import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PartyPopper, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AuthPage: React.FC = () => {
  const { action } = useParams<{ action: string }>();
  const navigate = useNavigate();
  const { login, register } = useAuth();
  
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  
  const isLogin = action === 'login';
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      login(formData.email, formData.password);
      navigate('/');
    } else {
      register(formData.name, formData.email, formData.password);
      navigate('/');
    }
  };
  
  return (
    <div className="pt-20 min-h-screen bg-zinc-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center mb-6">
              <PartyPopper className="h-8 w-8 text-purple-500 mr-2" />
              <span className="text-2xl font-bold">Party<span className="text-purple-500">Tracker</span></span>
            </Link>
            <h1 className="text-3xl font-bold mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-zinc-400">
              {isLogin ? 'Sign in to continue to PartyTracker' : 'Join the community and never miss an event'}
            </p>
          </div>
          
          <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-zinc-700/50">
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">
                    Full Name
                  </label>
                  <div className="input-wrapper">
                    <User className="input-icon h-5 w-5" />
                    <input 
                      type="text"
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      className="input"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              )}
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
                  Email Address
                </label>
                <div className="input-wrapper">
                  <Mail className="input-icon h-5 w-5" />
                  <input 
                    type="email"
                    id="email"
                    name="email"
                    placeholder="you@example.com"
                    className="input"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="password" className="block text-sm font-medium text-zinc-300">
                    Password
                  </label>
                  {isLogin && (
                    <Link to="/forgot-password" className="text-xs text-purple-400 hover:text-purple-300">
                      Forgot password?
                    </Link>
                  )}
                </div>
                <div className="input-wrapper">
                  <Lock className="input-icon h-5 w-5" />
                  <input 
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="********"
                    className="input"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button 
                    type="button"
                    className="input-right-icon"
                    onClick={() => setShowPassword(!showPassword)}
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              
              <button 
                type="submit"
                className="btn btn-primary w-full py-3"
              >
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>
              
              <div className="text-center">
                <p className="text-zinc-400 text-sm">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                  <Link 
                    to={isLogin ? "/auth/register" : "/auth/login"} 
                    className="text-purple-400 hover:text-purple-300 ml-1"
                  >
                    {isLogin ? 'Sign up' : 'Sign in'}
                  </Link>
                </p>
              </div>
            </form>
            
            <div className="relative flex items-center justify-center mt-6 mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-700"></div>
              </div>
              <div className="relative px-4 bg-zinc-800 text-sm text-zinc-500">
                Or continue with
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <button className="btn btn-outline flex justify-center items-center">
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                Google
              </button>
              
              <button className="btn btn-outline flex justify-center items-center">
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                </svg>
                Facebook
              </button>
            </div>
            
            <p className="text-center text-zinc-500 text-xs mt-8">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;