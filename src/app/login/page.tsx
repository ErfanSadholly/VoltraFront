import { LoginForm } from "@/features/auth/components/login-form";
import { AuthStatus } from "@/features/auth/components/AuthStatus";


export default function LoginPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <AuthStatus />
        <LoginForm />
      </div>
    </div>
  )
}