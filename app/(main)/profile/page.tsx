"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { IoHeartOutline, IoGridOutline, IoBookmarkOutline, IoPersonOutline, IoSettingsOutline, IoCameraOutline } from 'react-icons/io5'
import { FaEye } from 'react-icons/fa6'
import { BsHeart, BsBookmark } from 'react-icons/bs'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
    const { data: session } = useSession()
    const [activePage, setActivePage] = useState("Work")
    
    const tabs = [
        { name: "Work", icon: <IoGridOutline size={16} /> },
        { name: "Liked Shots", icon: <IoHeartOutline size={16} /> },
        { name: "Collections", icon: <IoBookmarkOutline size={16} /> },
        { name: "About", icon: <IoPersonOutline size={16} /> }
    ]

    return (
        <main className="min-h-screen bg-black text-white pb-20">
            <section className="max-w-6xl mx-auto px-4 pt-12 pb-8 flex flex-col items-center justify-center text-center">
                <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden bg-gray-900 mb-4 ring-4 ring-gray-800 flex items-center justify-center">
                    {session?.user?.image || session?.user?.avatarUrl ? (
                         <Image src={session?.user?.avatarUrl || session?.user?.image || ''} alt="Avatar" fill className="object-cover" />
                    ) : (
                         <span className="text-3xl font-bold text-gray-500">{session?.user?.fullName?.[0] || 'U'}</span>
                    )}
                </div>
                <h1 className="text-3xl font-bold mb-2">{session?.user?.fullName || 'User'}</h1>
                <p className="text-gray-400 mb-6">{session?.user?.email}</p>
                <div className="flex items-center gap-3">
                    <button className="px-6 py-2.5 bg-white text-black rounded-full font-medium text-sm hover:bg-gray-200 transition-colors">
                        Edit Profile
                    </button>
                    <button className="p-2.5 border border-gray-700 text-gray-400 rounded-full hover:border-gray-500 hover:text-white transition-colors">
                        <IoSettingsOutline size={20} />
                    </button>
                </div>
            </section>

            <section className="border-b border-gray-800">
                <div className="max-w-6xl mx-auto px-4 flex items-center gap-6 overflow-x-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.name}
                            onClick={() => setActivePage(tab.name)}
                            className={`flex items-center gap-2 py-4 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${activePage === tab.name ? "border-white text-white" : "border-transparent text-gray-500 hover:text-white"}`}
                        >
                            {tab.icon} {tab.name}
                        </button>
                    ))}
                </div>
            </section>
            <section className="max-w-6xl mx-auto px-4 py-8">
                {activePage === "Work" && <MyProjects session={session} />}
                {activePage === "Liked Shots" && <Placeholder title="No liked shots yet" desc="Shots you like will appear here." />}
                {activePage === "Collections" && <Placeholder title="No collections yet" desc="Save shots to collections to organize your inspiration." />}
                {activePage === "About" && <Placeholder title="No bio provided" desc="Add details about yourself to complete your profile." />}
            </section>
        </main>
    )
}

function Placeholder({ title, desc }: { title: string, desc: string }) {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
             <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center text-gray-600 mb-4">
                 <IoCameraOutline size={32} />
             </div>
             <h3 className="text-lg font-bold mb-2 text-white">{title}</h3>
             <p className="text-gray-500 text-sm max-w-sm">{desc}</p>
        </div>
    )
}

function MyProjects({ session }: { session: any }) {
    const router = useRouter()
    const [shots, setShots] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!session?.user?.id) {
            setLoading(false)
            return
        }
        const fetchShots = async () => {
            try {
                const res = await axios.get(`/api/project/me`)
                if (res.data.success) setShots(res.data.projects)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchShots()
    }, [session?.user?.id])

    if (loading) return <div className="text-center py-20 text-gray-500">Loading...</div>

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-white">
            <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-700 rounded-xl text-center min-h-[280px] bg-black h-full">
                <h3 className="text-xl font-bold mb-3 text-white">Upload your first shot</h3>
                <p className="text-sm text-gray-400 mb-6 leading-relaxed max-w-[220px]">
                    Show off your best work. Get feedback, likes and be a part of a growing community.
                </p>
                <button 
                    onClick={() => router.push('/new-project')} 
                    className="px-6 py-2.5 bg-white text-black font-semibold rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                    Upload your first shot
                </button>
            </div>
            
            {shots.map((shot) => (
                <div key={shot._id} className="flex flex-col gap-3 group cursor-pointer" onClick={() => router.push(`/project/${shot._id}`)}>
                    <div className="relative rounded-lg overflow-hidden h-60 w-full bg-gray-900 border border-gray-800">
                        {shot.image ? (
                             <Image src={shot.image} alt={shot.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                             <div className="w-full h-full flex items-center justify-center text-gray-600 text-sm">No Image</div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                             <span className="text-white text-sm font-medium truncate pr-4">{shot.title}</span>
                             <div className="flex items-center gap-2 shrink-0">
                                 <button className="w-8 h-8 rounded-full bg-black/40 hover:bg-pink-500 text-white flex items-center justify-center transition-colors backdrop-blur-sm"><BsBookmark size={12} /></button>
                                 <button className="w-8 h-8 rounded-full bg-black/40 hover:bg-pink-500 text-white flex items-center justify-center transition-colors backdrop-blur-sm"><BsHeart size={12} /></button>
                             </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between px-1">
                         <div className="flex items-center gap-2">
                             <div className="w-6 h-6 rounded-full bg-gray-800 overflow-hidden relative border border-gray-700">
                                 {shot.author?.avatarUrl ? (
                                      <Image src={shot.author.avatarUrl} alt="author" fill className="object-cover" />
                                 ) : (
                                      <div className="w-full h-full bg-indigo-500 flex items-center justify-center text-[10px] text-white font-bold">{shot.author?.fullName?.[0] || 'U'}</div>
                                 )}
                             </div>
                             <span className="text-xs font-medium text-gray-300">{shot.author?.fullName || 'User'}</span>
                         </div>
                         <div className="flex items-center gap-3 text-xs text-gray-500">
                             <div className="flex items-center gap-1 hover:text-white transition-colors"><BsHeart size={10} /> {shot.likes || 0}</div>
                             <div className="flex items-center gap-1 hover:text-white transition-colors"><FaEye size={10} /> {shot.views || 0}</div>
                         </div>
                    </div>
                </div>
            ))}
        </div>
    )
}