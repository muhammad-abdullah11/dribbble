"use client"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
export default function LoginPage() {
    const router = useRouter()
    const { data: session } = useSession();
    if (session) {
        router.push("/")
    }
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleGoogleSignIn = async () => {
        try { setLoading(true); setError(""); await signIn("google") }
        catch { setError("Sign in failed") }
        finally { setLoading(false) }
    }

    const handleEmailSignIn = async () => {
        try { setLoading(true); setError(""); await signIn("credentials", { identifier: email, password }) }
        catch { setError("Invalid email or password") }
        finally { setLoading(false) }
    }

    const inputCls = "w-full px-5 py-4 bg-gray-900 border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none transition-colors"

    return (
        <main className="min-h-screen bg-black text-white flex">
            <div className="w-full flex flex-col p-10 md:p-14">
                <span className="text-2xl font-bold text-pink-500">Dribbble</span>
                <div className="flex-1 flex items-center justify-center">
                    <div className="w-full max-w-[400px] space-y-8">
                        <div className="text-center space-y-4">
                            <svg viewBox="0 0 24 24" className="w-12 h-12 text-pink-500 fill-current mx-auto" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6.36 4.5c1.35 1.64 2.16 3.72 2.16 6-.5-.1-5.5-1.1-10.5.5-.15-.35-.3-.7-.47-1.05 5.1-2.1 8.4-5.2 8.81-5.45zM12 4c2.3 0 4.4.83 6.03 2.2-.35.2-3.45 3.08-8.35 4.93C7.77 7.67 5.83 5.5 5.5 5.1A8 8 0 0112 4zM4 12c0-.13 0-.27.01-.4.3.05 4.2.5 8.21 3.15-.07.2-.15.38-.22.57-4.1 1.3-7.17 4.8-7.44 5.17A7.96 7.96 0 014 12zm8 8c-1.93 0-3.7-.68-5.1-1.8.2-.33 2.5-3.6 7-5.17.02-.01.03-.01.05-.02C15 15.4 16 18.2 16.3 19.6A7.93 7.93 0 0112 20zm6.5-2.2c-.2-.94-1.1-3.6-2.25-6.3 4.7-.73 8.85.5 9.35.68-.63 2.48-2.2 4.57-4.35 5.73-.05-.03-.5-.07-.75-.11z" />
                            </svg>
                            <h1 className="text-3xl font-bold">Welcome back</h1>
                        </div>

                        <button onClick={handleGoogleSignIn} className="w-full flex items-center justify-center gap-3 px-6 py-3.5 border border-gray-700 rounded-full font-medium hover:border-gray-500 transition-colors cursor-pointer">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            {loading ? "Signing with Google..." : "Continue with Google"}
                        </button>

                        <div className="relative flex items-center justify-center">
                            <div className="w-full border-t border-gray-800" />
                            <span className="absolute px-4 bg-black text-sm text-gray-500">or</span>
                        </div>

                        <div className="space-y-5">
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold ml-1">Username or Email</label>
                                <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Enter your email" className={inputCls} />
                            </div>
                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between px-1">
                                    <label className="text-sm font-semibold">Password</label>
                                    <a href="#" className="text-sm text-gray-400 hover:text-pink-400 underline underline-offset-4 transition-colors">Forgot?</a>
                                </div>
                                <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Enter your password" className={inputCls} />
                            </div>
                            {error && <p className="text-red-400 text-sm">{error}</p>}
                            <button onClick={handleEmailSignIn} className="w-full py-4 bg-pink-500 hover:bg-pink-600 text-white rounded-full font-semibold active:scale-[0.98] transition-all cursor-pointer">
                                {loading ? "Loading..." : "Continue"}
                            </button>
                        </div>

                        <div className="text-center space-y-3 pt-2">
                            <p className="text-sm text-gray-500">
                                By continuing, you agree to our <a href="#" className="underline underline-offset-4 hover:text-white transition-colors">Terms</a> and <a href="#" className="underline underline-offset-4 hover:text-white transition-colors">Privacy Policy</a>.
                            </p>
                            <p className="text-sm text-gray-400">
                                Don&apos;t have an account? <a href="#" className="font-semibold text-pink-400 underline underline-offset-4">Sign up</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}