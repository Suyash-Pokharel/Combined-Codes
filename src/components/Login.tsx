import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Reveal } from "./Reveal";
import type { Page } from "../App";

interface LoginProps {
  onNavigate: (page: Page) => void;
}

export default function Login({ onNavigate }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [touched, setTouched] = useState({ email: false, password: false });

  const isEmailError = touched.email && formData.email.trim() === "";
  const isPasswordError = touched.password && formData.password.trim() === "";
  const isFormValid = formData.email.trim() !== "" && formData.password.trim() !== "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setServerError(null);
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched({ ...touched, [field]: true });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!formData.email.trim() || !formData.password.trim()) {
      setTouched({ email: true, password: true });
      return;
    }

    setIsLoading(true);

    // Mock Backend Call
    setTimeout(() => {
      setIsLoading(false);
      alert("Logged in successfully! (Frontend Only)");
    }, 1500);
  };

  return (
    <Reveal width="100%" delay={0.05}>
      <div className="w-full flex justify-center p-4">
        <div className="w-full max-w-sm bg-surface border border-border rounded-2xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <Reveal width="100%" delay={0.1}>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-primary mb-2">DragInDrop</h1>
              <h2 className="text-text-secondary text-sm font-medium">Login to your account</h2>
            </div>
          </Reveal>

          <Reveal width="100%" delay={0.15}>
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-text-main">
                  Email {isEmailError && <span className="inline-error">REQUIRED</span>}
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

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-text-main">
                  Password {isPasswordError && <span className="inline-error">REQUIRED</span>}
                </label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={() => handleBlur("password")}
                    className={`input-base ${isPasswordError ? "input-error" : "input-default"}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-primary p-1 cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {serverError && (
                <div className="text-sm text-red-500 text-center bg-red-500/10 border border-red-500/20 rounded-lg py-2.5 px-3">
                  {serverError}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || !isFormValid}
                className="w-full py-3 px-4 rounded-lg bg-primary text-white font-semibold hover:bg-secondary transition-all shadow-md disabled:opacity-50 flex items-center justify-center cursor-pointer"
              >
                {isLoading ? "Loading..." : "Login"}
              </button>

              <div className="text-center text-sm text-text-secondary mt-4">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => onNavigate("register")}
                  className="text-primary font-semibold hover:underline cursor-pointer"
                >
                  Register
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </Reveal>
  );
}
