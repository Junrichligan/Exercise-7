import React, { useState } from 'react';

export default function AuthSystem() {
  const [currentPage, setCurrentPage] = useState('login');
  const [users, setUsers] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginErrors, setLoginErrors] = useState({});
  
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [registerErrors, setRegisterErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/\d/)) strength++;
    if (password.match(/[^a-zA-Z\d]/)) strength++;
    return strength;
  };

  const handlePasswordChange = (password) => {
    setRegisterPassword(password);
    setPasswordStrength(password.length > 0 ? checkPasswordStrength(password) : 0);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return '#f44336';
    if (passwordStrength <= 3) return '#ff9800';
    return '#4caf50';
  };

  const getPasswordStrengthWidth = () => {
    if (passwordStrength <= 1) return '33%';
    if (passwordStrength <= 3) return '66%';
    return '100%';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 1) return 'Weak password';
    if (passwordStrength <= 3) return 'Medium password';
    return 'Strong password';
  };

  const handleLogin = () => {
    const errors = {};
    
    if (!isValidEmail(loginEmail)) {
      errors.email = 'Please enter a valid email';
    } else if (!users[loginEmail]) {
      errors.email = 'Email not found';
    } else if (users[loginEmail].password !== loginPassword) {
      errors.password = 'Incorrect password';
    }
    
    setLoginErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      setCurrentUser(users[loginEmail]);
      setSuccessMessage('Login successful!');
      setCurrentPage('dashboard');
      setLoginEmail('');
      setLoginPassword('');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleRegister = () => {
    const errors = {};
    
    if (registerName.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    
    if (!isValidEmail(registerEmail)) {
      errors.email = 'Please enter a valid email';
    } else if (users[registerEmail]) {
      errors.email = 'Email already registered';
    }
    
    if (registerPassword.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (registerPassword !== registerConfirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setRegisterErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      const newUser = {
        name: registerName,
        email: registerEmail,
        password: registerPassword,
        joinDate: new Date().toLocaleDateString()
      };
      
      setUsers({ ...users, [registerEmail]: newUser });
      setCurrentUser(newUser);
      setSuccessMessage('Account created successfully!');
      setCurrentPage('dashboard');
      setRegisterName('');
      setRegisterEmail('');
      setRegisterPassword('');
      setRegisterConfirmPassword('');
      setPasswordStrength(0);
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        </div>
      </div>

      <div className="relative z-10 bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        {currentPage === 'login' && (
          <div className="p-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
            <p className="text-gray-600 mb-8 text-sm">Login to your account</p>
            
            <div className="mb-5">
              <label className="block text-gray-700 font-medium mb-2 text-sm">Email</label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="Enter your email"
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition ${
                  loginErrors.email ? 'border-red-500' : 'border-gray-200'
                }`}
              />
              {loginErrors.email && (
                <p className="text-red-500 text-xs mt-1">{loginErrors.email}</p>
              )}
            </div>
            
            <div className="mb-5">
              <label className="block text-gray-700 font-medium mb-2 text-sm">Password</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Enter your password"
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition ${
                  loginErrors.password ? 'border-red-500' : 'border-gray-200'
                }`}
              />
              {loginErrors.password && (
                <p className="text-red-500 text-xs mt-1">{loginErrors.password}</p>
              )}
            </div>
            
            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:-translate-y-0.5 transition transform duration-200"
            >
              Login
            </button>
            
            <p className="text-center mt-6 text-gray-600 text-sm">
              Don't have an account?{' '}
              <button
                onClick={() => setCurrentPage('register')}
                className="text-purple-600 font-semibold hover:underline"
              >
                Sign up
              </button>
            </p>
          </div>
        )}

        {currentPage === 'register' && (
          <div className="p-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
            <p className="text-gray-600 mb-8 text-sm">Sign up to get started</p>
            
            <div className="mb-5">
              <label className="block text-gray-700 font-medium mb-2 text-sm">Full Name</label>
              <input
                type="text"
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
                placeholder="Enter your full name"
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition ${
                  registerErrors.name ? 'border-red-500' : 'border-gray-200'
                }`}
              />
              {registerErrors.name && (
                <p className="text-red-500 text-xs mt-1">{registerErrors.name}</p>
              )}
            </div>
            
            <div className="mb-5">
              <label className="block text-gray-700 font-medium mb-2 text-sm">Email</label>
              <input
                type="email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                placeholder="Enter your email"
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition ${
                  registerErrors.email ? 'border-red-500' : 'border-gray-200'
                }`}
              />
              {registerErrors.email && (
                <p className="text-red-500 text-xs mt-1">{registerErrors.email}</p>
              )}
            </div>
            
            <div className="mb-5">
              <label className="block text-gray-700 font-medium mb-2 text-sm">Password</label>
              <input
                type="password"
                value={registerPassword}
                onChange={(e) => handlePasswordChange(e.target.value)}
                placeholder="Create a password"
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition ${
                  registerErrors.password ? 'border-red-500' : 'border-gray-200'
                }`}
              />
              {registerPassword.length > 0 && (
                <>
                  <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all duration-300"
                      style={{
                        width: getPasswordStrengthWidth(),
                        backgroundColor: getPasswordStrengthColor()
                      }}
                    ></div>
                  </div>
                  <p className="text-xs mt-1" style={{ color: getPasswordStrengthColor() }}>
                    {getPasswordStrengthText()}
                  </p>
                </>
              )}
              {registerErrors.password && (
                <p className="text-red-500 text-xs mt-1">{registerErrors.password}</p>
              )}
            </div>
            
            <div className="mb-5">
              <label className="block text-gray-700 font-medium mb-2 text-sm">Confirm Password</label>
              <input
                type="password"
                value={registerConfirmPassword}
                onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition ${
                  registerErrors.confirmPassword ? 'border-red-500' : 'border-gray-200'
                }`}
              />
              {registerErrors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{registerErrors.confirmPassword}</p>
              )}
            </div>
            
            <button
              onClick={handleRegister}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:-translate-y-0.5 transition transform duration-200"
            >
              Create Account
            </button>
            
            <p className="text-center mt-6 text-gray-600 text-sm">
              Already have an account?{' '}
              <button
                onClick={() => setCurrentPage('login')}
                className="text-purple-600 font-semibold hover:underline"
              >
                Login
              </button>
            </p>
          </div>
        )}

        {currentPage === 'dashboard' && currentUser && (
          <div>
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8">
              <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
              <p className="text-purple-100">Welcome to your account</p>
            </div>
            
            <div className="p-10">
              {successMessage && (
                <div className="bg-green-500 text-white px-4 py-3 rounded-xl mb-6 text-center text-sm">
                  {successMessage}
                </div>
              )}
              
              <div className="bg-gray-100 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Information</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-300">
                    <span className="text-gray-600 font-medium">Name:</span>
                    <span className="text-gray-800 font-semibold">{currentUser.name}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-300">
                    <span className="text-gray-600 font-medium">Email:</span>
                    <span className="text-gray-800 font-semibold">{currentUser.email}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600 font-medium">Member Since:</span>
                    <span className="text-gray-800 font-semibold">{currentUser.joinDate}</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 hover:shadow-lg hover:-translate-y-0.5 transition transform duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}