"use client"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { MdOutlineEmail } from "react-icons/md"
import { ImSpinner8 } from "react-icons/im"
import { IoCheckmarkCircle } from "react-icons/io5"

const OTP_LENGTH = 6

const VerifyEmail = ({ email }: { email: string }) => {
    const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""))
    const [status, setStatus] = useState<"idle" | "loading" | "resending" | "success" | "error">("idle")
    const [error, setError] = useState("")
    const [cooldown, setCooldown] = useState(0)
    const refs = useRef<(HTMLInputElement | null)[]>([])
    const router = useRouter()

    useEffect(() => { refs.current[0]?.focus() }, [])

    useEffect(() => {
        if (!cooldown) return
        const t = setTimeout(() => setCooldown(c => c - 1), 1000)
        return () => clearTimeout(t)
    }, [cooldown])

    const handleChange = (i: number, val: string) => {
        if (!/^\d*$/.test(val)) return
        const next = [...otp]
        next[i] = val.slice(-1)
        setOtp(next)
        setError("")
        if (val && i < OTP_LENGTH - 1) refs.current[i + 1]?.focus()
    }

    const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[i] && i > 0) refs.current[i - 1]?.focus()
        if (e.key === "ArrowLeft" && i > 0) refs.current[i - 1]?.focus()
        if (e.key === "ArrowRight" && i < OTP_LENGTH - 1) refs.current[i + 1]?.focus()
    }

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault()
        const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH).split("")
        const next = [...otp]
        digits.forEach((d, i) => { next[i] = d })
        setOtp(next)
        refs.current[Math.min(digits.length, OTP_LENGTH - 1)]?.focus()
    }

    const handleVerify = async () => {
        const code = otp.join("")
        if (code.length < OTP_LENGTH) return setError("Please enter all 6 digits.")
        setStatus("loading")
        try {
            const res = await fetch("/api/user/verifyEmail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp: code }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.message || "Invalid OTP.")
            setStatus("success")
            setTimeout(() => router.push("/login"), 1500)
        } catch (err: any) {
            setError(err.message)
            setOtp(Array(OTP_LENGTH).fill(""))
            refs.current[0]?.focus()
            setStatus("error")
        }
    }

    const handleResend = async () => {
        if (cooldown) return
        setStatus("resending")
        try {
            const res = await fetch("/api/user/resendOtp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            })
            if (!res.ok) throw new Error("Failed to resend")
            setCooldown(60)
            setStatus("idle")
        } catch {
            setStatus("error")
        }
    }

    const filled = otp.filter(Boolean).length
    const isSuccess = status === "success"

    return (
        <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
            <div className="w-full max-w-md space-y-8">
                <div className="flex justify-center">
                    <div className="relative p-4 rounded-2xl bg-white/5 border border-white/10">
                        <MdOutlineEmail className="text-4xl text-pink-500" />
                        {isSuccess && <IoCheckmarkCircle className="absolute -top-2 -right-2 text-xl text-green-400" />}
                    </div>
                </div>

                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">Check your email</h1>
                    <p className="text-gray-400 text-sm">
                        We sent a 6-digit code to <span className="text-white font-medium">{email}</span>
                    </p>
                </div>

                <div className="flex justify-center gap-2" onPaste={handlePaste}>
                    {otp.map((digit, i) => (
                        <input
                            key={i}
                            ref={el => { refs.current[i] = el }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={e => handleChange(i, e.target.value)}
                            onKeyDown={e => handleKeyDown(i, e)}
                            className={`w-12 h-14 text-center text-xl font-bold rounded-xl border bg-white/5 outline-none transition-all focus:bg-white/10 focus:ring-1 focus:ring-pink-500/50
                                ${error ? "border-red-500 text-red-400" : digit ? "border-pink-500 text-white" : "border-white/10 text-white"} focus:border-pink-500`}
                        />
                    ))}
                </div>

                {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                <div className="relative h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="absolute inset-y-0 left-0 bg-pink-500 rounded-full transition-all duration-300" style={{ width: `${(filled / OTP_LENGTH) * 100}%` }} />
                </div>

                <button
                    onClick={handleVerify}
                    disabled={status === "loading" || isSuccess}
                    className="w-full py-4 bg-pink-500 hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full font-semibold active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                    {status === "loading" ? <><ImSpinner8 className="animate-spin" /> Verifying…</> : isSuccess ? <><IoCheckmarkCircle /> Verified!</> : "Verify Email"}
                </button>

                <p className="text-center text-sm text-gray-500 mt-4">
                    Didn't receive a code?{" "}
                    <button
                        onClick={handleResend}
                        disabled={!!cooldown || status === "resending"}
                        className="text-pink-500 hover:text-pink-400 disabled:text-gray-600 disabled:cursor-not-allowed font-medium transition-colors"
                    >
                        {status === "resending" ? "Sending…" : cooldown ? `Resend in ${cooldown}s` : "Resend code"}
                    </button>
                </p>
            </div>
        </main>
    )
}

export default VerifyEmail