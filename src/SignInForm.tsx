"use client";
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { toast } from "sonner";

export function SignInForm() {
  const { signIn } = useAuthActions();
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [submitting, setSubmitting] = useState(false);

  const toggleFlow = () =>
    setFlow((prev) => (prev === "signIn" ? "signUp" : "signIn"));

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-xl rounded-2xl px-8 py-10 sm:px-10">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        {flow === "signIn" ? "Welcome Back 👋" : "Create an Account 🚀"}
      </h2>

      <form
        className="flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitting(true);
          const formData = new FormData(e.target as HTMLFormElement);
          formData.set("flow", flow);
          void signIn("password", formData).catch(() => {
            toast.error(
              flow === "signIn"
                ? "Could not sign in. Did you mean to sign up?"
                : "Could not sign up. Did you mean to sign in?"
            );
            setSubmitting(false);
          });
        }}
      >
        <input
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <input
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
          type="submit"
          disabled={submitting}
        >
          {submitting
            ? flow === "signIn"
              ? "Signing in..."
              : "Signing up..."
            : flow === "signIn"
            ? "Sign in"
            : "Sign up"}
        </button>
      </form>

      <div className="text-center text-sm text-gray-600 mt-4">
        {flow === "signIn" ? "Don't have an account? " : "Already have an account? "}
        <button
          type="button"
          onClick={toggleFlow}
          className="text-blue-500 hover:underline ml-1"
        >
          {flow === "signIn" ? "Sign up instead" : "Sign in instead"}
        </button>
      </div>

      <div className="flex items-center justify-center my-6">
        <hr className="flex-grow border-gray-300" />
        <span className="mx-4 text-gray-400">or</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      <button
        className="w-full border border-gray-300 hover:bg-gray-100 py-3 rounded-lg text-gray-700 transition disabled:opacity-50"
        onClick={() => void signIn("anonymous")}
        disabled={submitting}
      >
        Continue as Guest
      </button>
    </div>
  );
}
