"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { IoHeartOutline, IoGridOutline, IoBookmarkOutline, IoPersonOutline, IoSettingsOutline, IoCameraOutline, IoTrashOutline } from 'react-icons/io5'
import { FaEye } from 'react-icons/fa6'
import { BsHeart, BsHeartFill, BsBookmark, BsBookmarkFill } from 'react-icons/bs'
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
                {activePage === "Liked Shots" && <ProjectGrid fetchUrl="/api/project/liked" emptyTitle="No liked shots yet" emptyDesc="Shots you like will appear here." session={session} />}
                {activePage === "Collections" && <ProjectGrid fetchUrl="/api/project/saved" emptyTitle="No collections yet" emptyDesc="Save shots to collections to organize your inspiration." session={session} />}
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
    const [shotToDelete, setShotToDelete] = useState<string | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)

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

    const handleDeleteProject = async () => {
        if (!shotToDelete) return
        setIsDeleting(true)
        try {
            const res = await axios.delete(`/api/project/${shotToDelete}`)
            if (res.data.success) {
                setShots(prev => prev.filter(s => s._id !== shotToDelete))
            }
        } catch (error) {
            console.error(error)
            alert("Failed to delete project")
        } finally {
            setIsDeleting(false)
            setShotToDelete(null)
        }
    }

    if (loading) return <div className="text-center py-20 text-gray-500">Loading...</div>

    return (
        <>
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
                                     {(session?.user?.id === shot.author?._id || session?.user?.id === shot.author) && (
                                         <>
                                             <button 
                                                 onClick={(e) => { e.stopPropagation(); router.push(`/edit-project?id=${shot._id}`) }}
                                                 className="w-8 h-8 rounded-full bg-black/40 hover:bg-white hover:text-black text-white flex items-center justify-center transition-colors backdrop-blur-sm"
                                                 title="Edit Project"
                                             >
                                                 <IoSettingsOutline size={12} />
                                             </button>
                                             <button 
                                                 onClick={(e) => { e.stopPropagation(); setShotToDelete(shot._id) }}
                                                 className="w-8 h-8 rounded-full bg-black/40 hover:bg-red-500 text-white flex items-center justify-center transition-colors backdrop-blur-sm"
                                                 title="Delete Project"
                                             >
                                                 <IoTrashOutline size={12} />
                                             </button>
                                         </>
                                     )}
                                     <button onClick={(e) => e.stopPropagation()} className="w-8 h-8 rounded-full bg-black/40 hover:bg-pink-500 text-white flex items-center justify-center transition-colors backdrop-blur-sm"><BsBookmark size={12} /></button>
                                     <button onClick={(e) => e.stopPropagation()} className="w-8 h-8 rounded-full bg-black/40 hover:bg-pink-500 text-white flex items-center justify-center transition-colors backdrop-blur-sm"><BsHeart size={12} /></button>
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

            {shotToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => !isDeleting && setShotToDelete(null)}>
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center max-w-sm w-full mx-4 shadow-xl" onClick={e => e.stopPropagation()}>
                        <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <IoTrashOutline size={28} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Delete Project</h3>
                        <p className="text-gray-400 text-sm mb-6">Are you sure you want to delete this project? This action cannot be undone.</p>
                        <div className="flex gap-3">
                            <button disabled={isDeleting} onClick={() => setShotToDelete(null)} className="flex-1 py-3 text-sm font-semibold rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">Cancel</button>
                            <button disabled={isDeleting} onClick={handleDeleteProject} className="flex-1 py-3 text-sm font-semibold rounded-full bg-red-500 hover:bg-red-600 transition-colors">
                                {isDeleting ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

function ProjectGrid({ fetchUrl, emptyTitle, emptyDesc, session }: { fetchUrl: string, emptyTitle: string, emptyDesc: string, session: any }) {
    const router = useRouter()
    const [shots, setShots] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!session?.user?.id) { setLoading(false); return }
        const fetchCurrent = async () => {
            try {
                const res = await axios.get(fetchUrl)
                if (res.data.success) setShots(res.data.projects || [])
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchCurrent()
    }, [session?.user?.id, fetchUrl])

    const handleLike = async (e: React.MouseEvent, id: string, isLiked: boolean) => {
        e.stopPropagation()
        if (!session?.user?.id) return router.push("/api/auth/signin")
        
        setShots(prev => prev.map(p => p._id === id ? { ...p, likes: isLiked ? (p.likes || []).filter((uid: string) => uid !== session.user.id) : [...(p.likes || []), session.user.id] } : p))
        axios.post(`/api/project/${id}/like`).catch(() => {
            setShots(prev => prev.map(p => p._id === id ? { ...p, likes: !isLiked ? (p.likes || []).filter((uid: string) => uid !== session.user.id) : [...(p.likes || []), session.user.id] } : p))
        })
    }

    const handleSave = async (e: React.MouseEvent, id: string, isSaved: boolean) => {
        e.stopPropagation()
        if (!session?.user?.id) return router.push("/api/auth/signin")
        
        setShots(prev => prev.map(p => p._id === id ? { ...p, saves: isSaved ? (p.saves || []).filter((uid: string) => uid !== session.user.id) : [...(p.saves || []), session.user.id] } : p))
        axios.post(`/api/project/${id}/save`).catch(() => {
            setShots(prev => prev.map(p => p._id === id ? { ...p, saves: !isSaved ? (p.saves || []).filter((uid: string) => uid !== session.user.id) : [...(p.saves || []), session.user.id] } : p))
        })
    }

    if (loading) return <div className="text-center py-20 text-gray-400">Loading...</div>
    if (shots.length === 0) return <Placeholder title={emptyTitle} desc={emptyDesc} />

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-white">
            {shots.map((shot) => {
                const isLiked = session?.user?.id && Array.isArray(shot.likes) && shot.likes.includes(session.user.id);
                const isSaved = session?.user?.id && Array.isArray(shot.saves) && shot.saves.includes(session.user.id);
                
                return (
                    <div key={shot._id} className="flex flex-col gap-3 group cursor-pointer" onClick={() => router.push(`/project/${shot._id}`)}>
                        <div className="relative rounded-lg overflow-hidden h-60 w-full bg-gray-900 border border-gray-800">
                            {shot.image ? (
                                <Image src={shot.image} alt={shot.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-600 text-sm">No Image</div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                                <span className="text-white text-sm font-medium truncate pr-4">{shot.title}</span>
                                <div className="flex gap-2 shrink-0">
                                    <button onClick={(e) => handleSave(e, shot._id, isSaved)} className={`${isSaved ? 'text-pink-500' : 'text-white hover:bg-pink-500 hover:text-white'} bg-black/40 p-2 rounded-full transition-colors backdrop-blur-sm`}>
                                        {isSaved ? <BsBookmarkFill size={14} /> : <BsBookmark size={14} />}
                                    </button>
                                    <button onClick={(e) => handleLike(e, shot._id, isLiked)} className={`${isLiked ? 'text-pink-500' : 'text-white hover:bg-pink-500 hover:text-white'} bg-black/40 p-2 rounded-full transition-colors backdrop-blur-sm`}>
                                        {isLiked ? <BsHeartFill size={14} /> : <BsHeart size={14} />}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between px-1">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-gray-800 overflow-hidden relative border border-gray-700">
                                    {shot.author?.avatarUrl || shot.author?.avatar ? (
                                        <Image src={shot.author?.avatarUrl || shot.author?.avatar} alt="author" fill className="object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-indigo-500 flex items-center justify-center text-[10px] text-white font-bold">{shot.author?.fullName?.[0] || 'U'}</div>
                                    )}
                                </div>
                                <span className="text-xs font-medium text-gray-300">{shot.author?.fullName || shot.author?.username || 'User'}</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-gray-500">
                                <div className="flex items-center gap-1 hover:text-white transition-colors"><BsHeart size={10} /> {shot.likes?.length || 0}</div>
                                <div className="flex items-center gap-1 hover:text-white transition-colors"><FaEye size={10} /> {shot.views?.length || 0}</div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}