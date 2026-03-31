import { BsGrid } from "react-icons/bs"
import { PiUsersThree } from "react-icons/pi"
import { MdOutlineDesignServices } from "react-icons/md"
import { IoSearchOutline } from "react-icons/io5"
import AllProjects from "./AllProjects"

const ExpoBtn = [
    { name: "Shots", icon: <BsGrid /> },
    { name: "Designers", icon: <PiUsersThree /> },
    { name: "Services", icon: <MdOutlineDesignServices /> },
]

const popular = ["dashboard", "landing page", "e-commerce", "logo"]

export default function HeroSection() {
    return (
        <>
            <main className="w-full text-white flex flex-col md:flex-row items-center gap-10 px-6 md:px-16 py-8 md:py-20 lg:py-32">
                <section className="flex-1 flex flex-col gap-5 md:gap-8 text-center md:text-left items-center md:items-start">
                    <h1 className="text-white text-4xl md:text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
                        Discover the <br className="hidden md:block" /> World's Top <br className="hidden md:block" /> Designers
                    </h1>

                    <p className="text-base md:text-lg text-gray-300 max-w-md">
                        Explore work from the most talented and accomplished designers ready to take on your next project.
                    </p>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                        {ExpoBtn.map((btn, i) => (
                            <button
                                key={i}
                                className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${i === 0 ? "bg-white text-black shadow-lg shadow-white/10" : "bg-gray-900 border border-gray-800 hover:border-gray-600"}`}
                            >
                                {btn.icon} {btn.name}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center bg-gray-900 rounded-full px-5 py-3 w-full max-w-md border border-gray-800 focus-within:border-pink-500/50 transition-all shadow-xl shadow-black/40">
                        <input type="text" placeholder="What design are you looking for?" className="bg-transparent text-sm outline-none w-full text-gray-300 placeholder-gray-600" />
                        <button className="bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-full transition-all active:scale-90">
                            <IoSearchOutline size={18} />
                        </button>
                    </div>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs sm:text-sm text-gray-500">
                        <span className="font-bold text-gray-400">Popular:</span>
                        {popular.map(tag => (
                            <span key={tag} className="border border-gray-800 rounded-full px-3 py-1 hover:border-pink-500 hover:text-pink-500 cursor-pointer transition-all bg-gray-950/50">{tag}</span>
                        ))}
                    </div>
                </section>

                <section className="w-full md:w-1/2 aspect-video md:aspect-square lg:aspect-video rounded-3xl overflow-hidden shadow-2xl border border-gray-800 bg-gray-900">
                    <video
                        src="https://cdn.dribbble.com/uploads/67238/original/82228fe85ee27b02514d94f31a7361e6.mp4?1765339805"
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                    />
                </section>

            </main>
            <AllProjects />
        </>
    )
}