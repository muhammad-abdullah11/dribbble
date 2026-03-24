"use client"

import { useState } from "react"
import { IoChevronForward, IoChevronDown, IoOptions } from "react-icons/io5"
import { BsBookmark, BsHeart } from "react-icons/bs"
import { TbEyeBitcoin } from "react-icons/tb"
import { FaEye } from "react-icons/fa6"

const FILTERS = ["Discover", "Animation", "Branding", "Illustration", "Mobile", "Product Design", "Web Design"]

const projects = [
    { user: { name: "Abdullah", level: "Pro" }, title: "Quantal Branding", image: "https://cdn.dribbble.com/userupload/47142907/file/a1995c015567d95bcc6d73d18f07acff.jpg?resize=2048x1536&vertical=center", views: "1.2k", likes: "340", category: "Branding" },
    { user: { name: "Lea K.", level: "Pro" }, title: "Icon Set", image: "https://cdn.dribbble.com/userupload/47136570/file/09a389520a99fb9522609f46a672b3fa.jpg?resize=1504x1128&vertical=center", views: "980", likes: "210", category: "Illustration" },
    { user: { name: "Sara M.", level: "" }, title: "Mobile App UI", image: "https://cdn.dribbble.com/userupload/47142359/file/803b36708860dafae39842d0c8f2571d.png?resize=1504x1128&vertical=center", views: "2.1k", likes: "540", category: "Mobile" },
    { user: { name: "James R.", level: "Pro" }, title: "Dashboard Design", image: "https://cdn.dribbble.com/userupload/47141438/file/e97fe630f2d2958f5687e38673b257f5.png?resize=2048x1152&vertical=center", views: "3.4k", likes: "780", category: "Product Design" },
    { user: { name: "Nina T.", level: "" }, title: "Logo Motion", image: "https://cdn.dribbble.com/userupload/47141899/file/c6414fe58e045ce7393e3529b1f96ce0.gif", views: "600", likes: "120", category: "Animation" },
    { user: { name: "Mark D.", level: "Pro" }, title: "Landing Page", image: "https://cdn.dribbble.com/userupload/47138922/file/e36489f6dee9064e209c3566a2a116fd.png?resize=2048x1536&vertical=center", views: "1.8k", likes: "430", category: "Web Design" },
]


export default function AllProjects() {
    const [active, setActive] = useState("Discover")

    const filtered = active === "Discover" ? projects : projects.filter(p => p.category === active)

    return (
        <main className="w-full text-white px-16 py-10">

            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3 flex-wrap">
                    <button className="flex items-center gap-1 border rounded-full px-4 py-2 text-sm font-medium">
                        Popular <IoChevronDown size={14} />
                    </button>
                    {FILTERS.map(f => (
                        <button
                            key={f}
                            onClick={() => setActive(f)}
                            className={`px-4 py-2 rounded-full border  text-sm font-medium transition-colors ${active === f ? "border-pink-500 text-pink-500" : ""}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.length === 0 ? (
                    <p className="text-center py-20">No projects found.</p>
                ) : filtered.map((p, i) => (
                    <div key={i} className="group border relative rounded-2xl overflow-hidden cursor-pointer">
                        <div className={`h-56 w-full  flex items-center justify-center`}>
                            {p.image ? <img src={p.image} alt={p.title} className="w-full h-full object-cover" /> : (
                                <span className="text-sm">No Image</span>
                            )}
                        </div>

                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                            <span className="text-white text-sm font-semibold">{p.title}</span>
                            <div className="flex gap-2">
                                <button className="text-white p-2 rounded-full hover:bg-pink-500 hover:text-white transition-colors"><BsBookmark size={14} /></button>
                                <button className="text-white p-2 rounded-full hover:bg-pink-500 hover:text-white transition-colors"><BsHeart size={14} /></button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 px-1">
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white">
                                    {p.user.name[0]}
                                </div>
                                <span className="text-sm font-medium text-white">{p.user.name}</span>
                                {p.user.level && <span className="text-xs bg-pink-500 text-white px-2 py-0.5 rounded-md">{p.user.level}</span>}
                            </div>
                            <div className="flex items-center gap-1.5 text-xs">
                                <span><FaEye /></span>
                                <span>{p.views}</span>
                                <span><BsHeart /></span>
                                <span>{p.likes}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </section>

        </main>
    )
}