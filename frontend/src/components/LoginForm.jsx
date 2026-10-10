import React, { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  User,
  Check
} from "lucide-react";

function GoogleLogo({ className = "h-5 w-5" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      aria-hidden="true"
    >
      <path
        fill="#FFC107"
        d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z"
      />

      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
      />

      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"
      />

      <path
        fill="#1976D2"
        d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z"
      />
    </svg>
  );
}

export default function LoginForm({ onSignup }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
  <div className="flex flex-1 items-center justify-center px-6 py-4 sm:px-10">
          <div className="w-full max-w-sm">
            <h1
              className="text-center text-3xl font-bold tracking-tight text-zinc-50"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              Welcome Back
            </h1>

            <div className="mt-6 flex flex-col gap-4">


              {/* Email */}
              <div>
                <label className="text-xs font-medium text-zinc-300">
                  Email
                </label>

                <div className="relative mt-1.5">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />

                  <input
                    readOnly
                    value=""
                    placeholder="name@company.com"
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-3 pl-10 pr-10 text-sm text-zinc-200 placeholder-zinc-600 outline-none focus:border-orange-500/50"
                  />

                  <Check className="absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-400" />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-xs font-medium text-zinc-300">
                  Password
                </label>

                <div className="relative mt-1.5">
                  <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />

                  <input
                    readOnly
                    value=""
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-3 pl-10 pr-10 text-sm text-zinc-200 placeholder-zinc-600 outline-none focus:border-orange-500/50"
                  />

                  <Eye className="absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 cursor-pointer" />
                </div>

              </div>
              <div className="-mt-1 flex justify-end"> 
                <button type="button" className="text-xs font-medium text-orange-400 hover:text-orange-300 cursor-pointer" > 
                    Forgot password? 
                    </button> 
                    </div>


              {/* Continue */}
              <button className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 py-3 text-sm font-semibold text-zinc-950 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 cursor-pointer">
                Continue

                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Login */}
            <p className="mt-3 text-center text-xs text-zinc-500">
             Don't have an account?{" "}
              <span onClick={onSignup} className="font-semibold text-orange-400 cursor-pointer">
                SignUp
              </span>
            </p>

            {/* Divider */}
            <div className="my-4 flex items-center gap-3">
              <span className="h-px flex-1 bg-zinc-800" />

              <span className="text-xs text-zinc-500">
                Or
              </span>

              <span className="h-px flex-1 bg-zinc-800" />
            </div>

            {/* Google */}
            <button className="flex w-full items-center justify-center gap-3 rounded-xl border border-zinc-700 bg-zinc-100 py-3 text-sm font-semibold text-zinc-900 hover:bg-white cursor-pointer">
              <GoogleLogo />

             Continue with Google
            </button>

            {/* Terms */}
           <p className="mt-4 text-center text-[11px] leading-relaxed text-zinc-600"> 
            By continuing you agree to the StackOps{" "} 
            <span className="text-orange-400 cursor-pointer"> 
              Privacy Policy and Terms of Service 
              </span> . </p>
          </div>
        </div>
        </>
  );
}
