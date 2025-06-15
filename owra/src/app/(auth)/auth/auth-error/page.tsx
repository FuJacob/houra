import { useRouter } from "next/navigation";

export default function AuthError() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold">Authentication Error</h2>
      <button onClick={() => router.push("/")}>Go to home</button>
    </div>
  );
}
