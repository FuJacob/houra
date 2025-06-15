import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { resetPassword } from "./actions";

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-[400px] space-y-8">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Reset your password
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email address and we'll send you a link to reset your
              password
            </p>
          </div>

          <form className="space-y-4">
            <div className="space-y-2">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email address"
                required
                className="w-full rounded-md border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            {/* <FaArrowRight formAction={resetPassword} className="w-full"> */}
          </form>

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
