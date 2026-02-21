import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <SignUp
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "glass border-white/20",
          },
        }}
      />
    </div>
  );
}
