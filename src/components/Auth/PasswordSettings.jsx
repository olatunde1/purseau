import React, { useState } from 'react';
import { Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';

export default function PasswordSettings() {
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const togglePassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.currentPassword) newErrors.currentPassword = 'Current password is required';
    if (!form.newPassword) newErrors.newPassword = 'New password is required';
    if (!form.confirmPassword) newErrors.confirmPassword = 'Confirm password is required';
    else if (form.newPassword !== form.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log('Password updated:', form);
  };

  const validatePassword = (password) => {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
    };
  };

  const renderRequirements = (password) => {
    const validation = validatePassword(password);
    return (
      <ul className="flex gap-2 text-[12px] mt-2">
        <li className="flex items-center gap-1">
          {validation.length ? <CheckCircle className="text-green-500" size={16} /> : <XCircle className="text-red-500" size={16} />} At least 8 characters
        </li>
        <li className="flex items-center gap-1">
          {validation.uppercase ? <CheckCircle className="text-green-500" size={16} /> : <XCircle className="text-red-500" size={16} />} At least one uppercase
        </li>
        <li className="flex items-center gap-1">
          {validation.number ? <CheckCircle className="text-green-500" size={16} /> : <XCircle className="text-red-500" size={16} />} At least one number
        </li>
      </ul>
    );
  };

  const renderInput = (label, name, placeholder, show, toggle) => (
    <div>
      <label className="block text-base font-medium mb-4">{label}</label>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          name={name}
          placeholder={placeholder}
          value={form[name]}
          onChange={handleChange}
          className={`mt-1 w-full bg-[#F2F2F7] border-none rounded-xl border ${errors[name] ? 'border-red-500' : 'border-gray-300'} rounded px-6 py-[20.5px] pr-10`}
          required
        />
        <button
          type="button"
          onClick={toggle}
          className="absolute right-3 top-7 text-gray-500"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {name === 'newPassword' && renderRequirements(form.newPassword)}
      {errors[name] && <p className="text-sm text-red-600 mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="w-[512px] mx-auto p-6 ml-10 bg-white rounded">
      <h2 className="text-xl font-semibold mb-4">Password Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-6 ml-10">
        {renderInput('Current Password*', 'currentPassword', 'Confirm password', showPassword.current, () => togglePassword('current'))}
        {renderInput('New Password*', 'newPassword', 'Create password', showPassword.new, () => togglePassword('new'))}
        {renderInput('Confirm Password*', 'confirmPassword', 'Confirm password', showPassword.confirm, () => togglePassword('confirm'))}

        <button
          type="submit"
          className="w-full bg-[#E94E30] text-white py-[18px] rounded-xl hover:bg-[#E94E30]"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}
