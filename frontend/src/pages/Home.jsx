
import React from "react";
import {
  Mail,
  User,
  Lock,
  Eye,
  ArrowRight,
  Check,
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence,motion } from "motion/react";

const STEPS = [
  { n: 1, text: "Create your account", active: true },
  { n: 2, text: "Set up your first workspace", active: false },
  { n: 3, text: "Invite your team and assign tasks", active: false },
];

import SignupForm from "../components/SIgnupForm";
import LoginForm from "../components/LoginForm";

export default function Home() {
  const [mode, setMode] = useState('signup')

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-zinc-950 p-4 text-zinc-100 sm:p-6">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');

        * {
          font-family: 'Inter', sans-serif;
        }

        html,
        body {
          height: 100%;
          overflow: hidden;
        }
      `}</style>

      {/* Page background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #52525b 1px, transparent 1px), linear-gradient(to bottom, #52525b 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* Framed card */}
      <div className="relative flex h-full max-h-[760px] w-full max-w-6xl overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/40 p-2 shadow-2xl shadow-black/60">

        {/* Left gradient panel */}
        <div className="relative hidden flex-1 flex-col justify-between overflow-hidden rounded-2xl bg-zinc-900 p-8 lg:flex">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-cyan-500/50 blur-3xl" />

            <div className="absolute -bottom-24 -right-16 h-96 w-96 rounded-full bg-orange-500/60 blur-3xl" />

            <div className="absolute left-1/3 top-1/3 h-72 w-72 rounded-full bg-sky-400/30 blur-3xl" />
          </div>

          <div
            className="relative text-xl font-bold tracking-tight"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            <span className="text-white">Stack</span>
            <span className="text-orange-300">Ops</span>
          </div>

          <div className="relative">
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm text-white backdrop-blur">
              Join us to ship faster
            </span>

            <h2
              className="mt-4 text-5xl font-bold leading-tight tracking-tight text-white"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              Start your
              <br />
              journey
            </h2>

            <p className="mt-3 text-sm text-white/80">
              Follow these simple steps to set up your StackOps account.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {STEPS.map((s) => (
                <div
                  key={s.n}
                  className={
                    s.active
                      ? "flex h-32 flex-col justify-between rounded-2xl bg-white p-4 shadow-xl"
                      : "flex h-32 flex-col justify-between rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur"
                  }
                >
                  <span
                    className={
                      s.active
                        ? "flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-xs font-semibold text-white"
                        : "flex h-6 w-6 items-center justify-center rounded-full border border-white/40 text-xs text-white/80"
                    }
                  >
                    {s.n}
                  </span>

                  <p
                    className={
                      s.active
                        ? "text-sm font-medium leading-snug text-zinc-900"
                        : "text-sm leading-snug text-white/80"
                    }
                  >
                    {s.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right form panel */}
           
           <AnimatePresence mode="wait">
        {mode === "signup" ? (
          <motion.div
            key="signup"
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -25 }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
          >
            <SignupForm
              onLogin={() => setMode("login")}
            />
          </motion.div>
        ) : (
          <motion.div
            key="login"
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -25 }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
          >
            <LoginForm
              onSignup={() => setMode("signup")}
            />
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}
