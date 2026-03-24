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
            <main className="min-h-screen w-full text-white flex items-center gap-10 px-16 py-10">

                <section className="flex-1 flex flex-col gap-6">
                    <h1 className="text-white text-6xl font-bold leading-tight text-black">
                        Discover the <br /> World's Top <br /> Designers
                    </h1>

                    <p className="text-lg max-w-md">
                        Explore work from the most talented and accomplished designers ready to take on your next project.
                    </p>

                    <div className="text-white flex items-center gap-2">
                        {ExpoBtn.map((btn, i) => (
                            <button
                                key={i}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${i === 0 ? "bg-white text-black" : ""}`}
                            >
                                {btn.icon} {btn.name}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center justify-between rounded-full px-5 py-3 max-w-md border border-zinc-200">
                        <input type="text" placeholder="What type of design are you interested in?" className=" text-sm outline-none w-full" />
                        <button className="bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-full transition-colors">
                            <IoSearchOutline size={18} />
                        </button>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                        <span className="font-semibold">Popular:</span>
                        {popular.map(tag => (
                            <span key={tag} className="border border-black/20 rounded-full px-3 py-1 hover:border-pink-500 hover:text-pink-500 cursor-pointer transition-colors">{tag}</span>
                        ))}
                    </div>
                </section>

                <section className="w-1/2 rounded-2xl overflow-hidden shadow-2xl">
                    <video
                        src="https://cdn.dribbble.com/uploads/67238/original/82228fe85ee27b02514d94f31a7361e6.mp4?1765339805"
                        className="w-full h-full object-cover rounded-2xl"
                        autoPlay
                        muted
                        loop
                    />
                </section>

            </main>
            <AllProjects />
        </>
    )
}