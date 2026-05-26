import React, { useState } from "react";
import { Reveal } from "./Reveal";
import { Eye, EyeOff, Check, Circle } from "lucide-react";
import type { Page } from "../App";

const ALLOWED_DOMAINS = [
  "@gmail.com",
  "@icloud.com",
  "@outlook.com",
  "@hotmail.com",
  "@yahoo.com",
  ".edu",
];

interface RequirementItemProps {
  met: boolean;
  text: string;
}

const RequirementItem = ({ met, text }: RequirementItemProps) => (
  <li
    className={`flex items-center gap-2 text-xs transition-colors duration-200 ${
      met ? "text-success font-medium" : "text-text-secondary"
    }`}
  >
    {met ? (
      <Check size={14} className="shrink-0" strokeWidth={3} />
    ) : (
      <Circle size={8} className="shrink-0 fill-current opacity-50" />
    )}
    <span>{text}</span>
  </li>
);

interface RegisterProps {
  onNavigate: (page: Page) => void;
}

export default function Register({ onNavigate }: RegisterProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  // Password Visibility & Focus
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  // Name Validation
  const isFirstNameError = touched.firstName && formData.firstName.trim() === "";
  const isLastNameError = touched.lastName && formData.lastName.trim() === "";

  // Email Validation
  const emailTrimmed = formData.email.trim().toLowerCase();
  const isEmailEmpty = emailTrimmed === "";
  const isEmailSupported = ALLOWED_DOMAINS.some((domain) =>
    emailTrimmed.endsWith(domain)
  );
  const isEmailRequiredError = touched.email && isEmailEmpty;
  const isEmailDomainError = touched.email && !isEmailEmpty && !isEmailSupported;
  const isEmailError = isEmailRequiredError || isEmailDomainError;

  // Password Logic
  const passwordLen = formData.password.length;
  const hasMinLength = passwordLen >= 8;
  const hasLower = /[a-z]/.test(formData.password);
  const hasUpper = /[A-Z]/.test(formData.password);
  const hasNumber = /[0-9]/.test(formData.password);
  const hasSymbol = /[^A-Za-z0-9]/.test(formData.password);
  const isPasswordValid = hasMinLength && hasLower && hasUpper && hasNumber && hasSymbol;

  // Confirm Password Logic
  const confirmLen = formData.confirmPassword.length;
  const passwordsMatch = formData.password === formData.confirmPassword;

  const isPasswordInvalid = touched.password && !isPasswordValid;
  const isConfirmEmpty = touched.confirmPassword && confirmLen === 0;
  const isMatchError = touched.confirmPassword && confirmLen > 0 && !passwordsMatch;
  const isConfirmInvalid = isConfirmEmpty || isMatchError;

  // Overall Form Validation
  const isFormValid =
    formData.firstName.trim() !== "" &&
    formData.lastName.trim() !== "" &&
    isEmailSupported &&
    isPasswordValid &&
    confirmLen > 0 &&
    passwordsMatch;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched({ ...touched, [field]: true });
    if (field === "password") setIsPasswordFocused(false);
  };

  const handleFocus = () => {
    setIsPasswordFocused(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      setTouched({ 
        firstName: true, 
        lastName: true, 
        email: true, 
        password: true, 
        confirmPassword: true 
      });
      return;
    }

    setIsLoading(true);

    // Mock API
    setTimeout(() => {
      setIsLoading(false);
      alert("Account Created successfully! (Frontend Only)");
      onNavigate('login');
    }, 1500);
  };

  return (
    <Reveal width="100%" delay={0.05}>
      <div className="w-full flex justify-center p-4">
        <div className="w-full max-w-md bg-surface border border-border rounded-2xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <Reveal width="100%" delay={0.1}>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-primary mb-2">DragInDrop</h1>
              <h2 className="text-text-secondary text-sm font-medium">Create Your New Account</h2>
            </div>
          </Reveal>

          <Reveal width="100%" delay={0.15}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-4">
                <div className="space-y-1.5 w-1/2">
                  <label className="block text-sm font-medium text-text-main">
                    First Name {isFirstNameError && <span className="inline-error">REQUIRED</span>}
                  </label>
                  <input
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    onBlur={() => handleBlur("firstName")}
                    className={`input-base ${isFirstNameError ? "input-error" : "input-default"}`}
                  />
                </div>

                <div className="space-y-1.5 w-1/2">
                  <label className="block text-sm font-medium text-text-main">
                    Last Name {isLastNameError && <span className="inline-error">REQUIRED</span>}
                  </label>
                  <input
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    onBlur={() => handleBlur("lastName")}
                    className={`input-base ${isLastNameError ? "input-error" : "input-default"}`}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-text-main">
                  Email
                  {isEmailRequiredError && <span className="inline-error">REQUIRED</span>}
                  {isEmailDomainError && <span className="inline-error">NOT SUPPORTED</span>}
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="example@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={() => handleBlur("email")}
                  className={`input-base ${isEmailError ? "input-error" : "input-default"}`}
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-text-main">
                  Password
                  {touched.password && !isPasswordFocused && (
                    <>
                      {passwordLen === 0 && <span className="inline-error">REQUIRED</span>}
                      {passwordLen > 0 && !hasMinLength && <span className="inline-error">MIN 8 CHARS</span>}
                      {hasMinLength && !isPasswordValid && <span className="inline-error">WEAK</span>}
                    </>
                  )}
                </label>
                <div className="relative">
                  <input
                    name="password"
                    autoComplete="new-password"
                    type={showPassword ? "text" : "password"}
                    disabled={isLoading}
                    placeholder="••••••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={() => handleBlur("password")}
                    onFocus={handleFocus}
                    className={`input-base ${
                      isPasswordInvalid && !isPasswordFocused
                        ? "input-error"
                        : "input-default"
                    }`}
                  />
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-primary transition-colors p-1 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {/* Sliding Requirements Checklist */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isPasswordFocused
                      ? "max-h-40 opacity-100 mt-3"
                      : "max-h-0 opacity-0 mt-0"
                  }`}
                >
                  <ul className="grid grid-cols-2 gap-y-1 gap-x-10 bg-background/50 p-3 rounded-lg border border-border/50">
                    <RequirementItem met={hasMinLength} text="8+ Characters" />
                    <RequirementItem met={hasUpper} text="Uppercase (A-Z)" />
                    <RequirementItem met={hasLower} text="Lowercase (a-z)" />
                    <RequirementItem met={hasNumber} text="Number (0-9)" />
                    <RequirementItem met={hasSymbol} text="Symbol (!@#$)" />
                  </ul>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-text-main">
                  Confirm Password
                  {isConfirmEmpty && <span className="inline-error">REQUIRED</span>}
                  {isMatchError && <span className="inline-error">DOESN'T MATCH</span>}
                </label>
                <div className="relative">
                  <input
                    name="confirmPassword"
                    autoComplete="new-password"
                    type={showConfirmPassword ? "text" : "password"}
                    disabled={isLoading}
                    placeholder="••••••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={() => handleBlur("confirmPassword")}
                    className={`input-base ${
                      isConfirmInvalid ? "input-error" : "input-default"
                    }`}
                  />
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-primary transition-colors p-1 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !isFormValid}
                className="w-full py-3 px-4 rounded-lg bg-primary text-white font-semibold hover:bg-secondary transition-all shadow-md disabled:opacity-50 flex items-center justify-center mt-6 cursor-pointer"
              >
                {isLoading ? "Loading..." : "Create Account"}
              </button>

              <div className="text-center text-sm text-text-secondary mt-4">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => onNavigate("login")}
                  className="text-primary font-semibold hover:underline cursor-pointer"
                >
                  Login
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </Reveal>
  );
}
