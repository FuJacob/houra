import Link from "next/link";

export default function ResetPasswordConfirmationPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-[400px] space-y-8">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Check your email
            </h1>
            <p className="text-sm text-muted-foreground">
              We have sent you a password reset link. Please check your email
              and follow the instructions to reset your password.
            </p>
          </div>

          <div className="text-center">
            <Link
              href="/sign-in"
              className="text-sm text-primary hover:underline"
            >
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
