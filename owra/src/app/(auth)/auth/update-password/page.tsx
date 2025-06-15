"use client";

import Link from "next/link";
import { updatePassword } from "./actions";
import { useState, useEffect } from "react";
import { isValidPassword } from "@/utils/validate";

export default function UpdatePasswordPage() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Check if passwords match when either password field changes
    setPasswordsMatch(
      formData.password === formData.confirmPassword ||
        formData.confirmPassword === ""
    );

    // Check password validity
    setIsPasswordValid(
      formData.password === "" || isValidPassword(formData.password)
    );

    // Check if form is valid
    setIsFormValid(
      formData.password !== "" &&
        formData.confirmPassword !== "" &&
        formData.password === formData.confirmPassword &&
        isValidPassword(formData.password)
    );
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-[400px] space-y-8">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Update your password
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your new password below
            </p>
          </div>

          <form className="space-y-4">
            <div className="space-y-2">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="New password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="w-full rounded-md border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              {!isPasswordValid && formData.password !== "" && (
                <p className="text-sm text-red-500 mt-1">
                  Password must be at least 8 characters long and contain at
                  least one uppercase letter, one lowercase letter, and one
                  number
                </p>
              )}
            </div>
            <div className="space-y-2">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full rounded-md border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              {!passwordsMatch && formData.confirmPassword !== "" && (
                <p className="text-sm text-red-500 mt-1">
                  Passwords do not match
                </p>
              )}
            </div>
            <button
              formAction={isFormValid ? updatePassword : undefined}
              className={`w-full ${
                !isFormValid ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!isFormValid}
            >
              Update password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
