import { FaXTwitter, FaFacebookF, FaInstagram, FaPinterestP } from "react-icons/fa6"
import FloatingCards from "./floatingCards"

const info = ["For designers", "Hire talent", "Inspiration", "Advertising", "Blog", "About", "Careers", "Support"]
const bottom_left = ["Terms", "Privacy", "Cookies"]
const bottom_right = ["Jobs", "Designers", "Freelancers", "Tags", "Places", "Resources"]
const socials = [FaXTwitter, FaFacebookF, FaInstagram, FaPinterestP]

export default function Footer() {
    return (
        <>
            <FloatingCards />

            <footer className="text-white border-t border-gray-600 px-10 py-10 text-sm">

                <div className="flex flex-wrap items-center justify-between gap-6 pb-8 border-b border-gray-600">
                    <span className="text-2xl font-bold font-serif italic">Dribbble</span>

                    <nav className="flex flex-wrap gap-6 font-medium">
                        {info.map(item => (
                            <a key={item} href="#" className="hover:text-pink-500 transition-colors">{item}</a>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4">
                        {socials.map((Icon, i) => (
                            <a key={i} href="#" className="hover:text-pink-500 transition-colors"><Icon size={18} /></a>
                        ))}
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-6">
                    <div className="flex items-center gap-4">
                        <span>© 2026 Dribbble</span>
                        {bottom_left.map(item => (
                            <a key={item} href="#" className="hover:text-pink-500 transition-colors">{item}</a>
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-4">
                        {bottom_right.map(item => (
                            <a key={item} href="#" className="hover:text-pink-500 transition-colors">{item}</a>
                        ))}
                    </div>
                </div>

            </footer>
        </>
    )
}