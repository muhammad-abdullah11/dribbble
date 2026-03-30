"use client"

import { useState, useEffect } from "react"
import { IoChevronForward, IoChevronDown, IoOptions } from "react-icons/io5"
import { BsBookmark, BsHeart } from "react-icons/bs"
import { TbEyeBitcoin } from "react-icons/tb"
import { FaEye } from "react-icons/fa6"
import axios from "axios"

export default function AllProjects() {
    const [active, setActive] = useState("Discover")
    const [projects, setProjects] = useState<any[]>([])
    const [categories, setCategories] = useState(["Discover", "All"])

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get("/api/project")
                setProjects(res.data.projects || [])
                setCategories(prev => [...new Set([...prev, ...res.data.projects.map((p: any) => p.category)])])
            } catch (error) {
                console.error(error)
            }
        }
        fetchProjects()
    }, [])

    const filtered = active === "Discover" || active === "All" ? projects : projects.filter(p => p.category === active)

    return (
        <main className="w-full text-white px-16 py-10">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3 flex-wrap">
                    <button className="flex items-center gap-1 border border-gray-700 rounded-full px-4 py-2 text-sm font-medium hover:bg-gray-800 transition-colors">
                        Popular <IoChevronDown size={14} />
                    </button>
                    {categories.map(f => (
                        <button
                            key={f}
                            onClick={() => setActive(f)}
                            className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${active === f ? "border-pink-500 text-pink-500" : "border-gray-700 hover:border-gray-500 hover:text-gray-300"}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.length === 0 ? (
                    <p className="text-center py-20 col-span-full text-gray-400">No projects found.</p>
                ) : filtered.map((p, i) => (
                    <div key={i} className="flex flex-col gap-3">
                        <div className="group relative rounded-2xl overflow-hidden cursor-pointer h-56 w-full flex items-center justify-center bg-gray-900 border border-gray-800">
                            {p.image ? <img src={p.image} alt={p.title} className="w-full h-full object-cover" /> : (
                                <span className="text-sm text-gray-500">No Image</span>
                            )}

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-between p-4">
                                <span className="text-white text-sm font-semibold truncate mr-2">{p.title}</span>
                                <div className="flex gap-2 shrink-0">
                                    <button className="text-white bg-black/40 p-2 rounded-full hover:bg-pink-500 hover:text-white transition-colors backdrop-blur-sm"><BsBookmark size={14} /></button>
                                    <button className="text-white bg-black/40 p-2 rounded-full hover:bg-pink-500 hover:text-white transition-colors backdrop-blur-sm"><BsHeart size={14} /></button>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between px-1">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white bg-gradient-to-br from-indigo-500 to-purple-500">
                                    {p.author?.fullName?.[0] || p.author?.username?.[0] || 'U'}
                                </div>
                                <span className="text-sm font-medium text-white truncate max-w-[120px]">{p.author?.fullName || p.author?.username || 'Unknown User'}</span>
                                {p.author?.level && <span className="text-xs bg-gray-800 text-gray-300 px-1.5 py-0.5 rounded uppercase font-semibold tracking-wider">{p.author?.level}</span>}
                            </div>
                            <div className="flex items-center gap-3 text-xs text-gray-400">
                                <div className="flex items-center gap-1.5 hover:text-gray-200 transition-colors">
                                    <FaEye size={14} />
                                    <span className="font-medium">{p.views || 0}</span>
                                </div>
                                <div className="flex items-center gap-1.5 hover:text-gray-200 transition-colors">
                                    <BsHeart size={12} />
                                    <span className="font-medium">{p.likes || 0}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </main>
    )
}
