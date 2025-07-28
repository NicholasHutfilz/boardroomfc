import { LoginForm } from "@/components/login-form"
import { ProtectedRoute } from "@/components/protected-route"

export default function LoginPage() {
  return (
    <ProtectedRoute requireAuth={false}>
      <div 
        className="relative flex min-h-svh flex-col items-center justify-center p-6 md:p-10"
        style={{
          backgroundImage: "url('/topdownpitch.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Black tint overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
        
        {/* Content */}
        <div className="relative z-10 w-full max-w-sm md:max-w-3xl">
          <LoginForm />
        </div>
      </div>
    </ProtectedRoute>
  )
}
