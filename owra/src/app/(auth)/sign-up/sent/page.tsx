import React from "react";
import PageLayout from "@/components/Utilities/PageLayout";
import { cn } from "@/lib/utils";
import { Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";

function EmailSent() {
  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center pb-20">
        <div
          className={cn(
            "w-full max-w-md space-y-8 rounded-lg border bg-card p-8 shadow-sm",
            "text-center"
          )}
        >
          {/* Icon */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Mail className="h-8 w-8 text-primary" />
          </div>

          {/* Content */}
          <div className="space-y-4">
            <h1 className="text-2xl font-semibold tracking-tight">
              Check your email
            </h1>
            <p className="text-muted-foreground">
              We've sent you a verification link to your email address. Please
              check your inbox and click the link to activate your account.
            </p>

            {/* Additional Info */}
            <div className="rounded-md bg-muted/50 p-4 text-sm">
              <p className="text-muted-foreground">
                Didn't receive the email? Check your spam folder or{" "}
                <Link href="/sign-up" className="text-primary hover:underline">
                  try signing up again
                </Link>
                .
              </p>
            </div>

            {/* Back Button */}
            <Link
              href="/sign-in"
              className={cn(
                "mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground",
                "transition-colors"
              )}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default EmailSent;
