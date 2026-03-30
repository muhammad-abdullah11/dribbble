"use client"
import Image from 'next/image'
import { IoHeartOutline, IoHeart, IoBookmarkOutline, IoBookmark, IoMailOutline, IoLogoTwitter, IoLinkOutline, IoLogoGithub, IoGridOutline } from "react-icons/io5"
import { HiDownload } from "react-icons/hi"
import { BsThreeDots } from "react-icons/bs"
import axios from 'axios'
import { useEffect, useState, use } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface PageProps {
    params: Promise<{ id: string }>
}

export default function ProjectPage({ params }: PageProps) {
    const { id } = use(params)
    const { data: session } = useSession()
    const router = useRouter()
    const [project, setProject] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await axios.get(`/api/project/${id}`)
                setProject(res.data.project)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchProject()
    }, [id])

    const handleLike = () => {
        if (!session?.user?.id) return router.push("/api/auth/signin")
        const isLiked = project.likes?.includes(session.user.id)
        setProject((prev: any) => ({ ...prev, likes: isLiked ? prev.likes.filter((uid: string) => uid !== session.user.id) : [...(prev.likes || []), session.user.id] }))
        axios.post(`/api/project/${id}/like`).catch(() => {
            setProject((prev: any) => ({ ...prev, likes: !isLiked ? prev.likes.filter((uid: string) => uid !== session.user.id) : [...(prev.likes || []), session.user.id] }))
        })
    }

    const handleSave = () => {
        if (!session?.user?.id) return router.push("/api/auth/signin")
        const isSaved = project.saves?.includes(session.user.id)
        setProject((prev: any) => ({ ...prev, saves: isSaved ? (prev.saves || []).filter((uid: string) => uid !== session.user.id) : [...(prev.saves || []), session.user.id] }))
        axios.post(`/api/project/${id}/save`).catch(() => {
            setProject((prev: any) => ({ ...prev, saves: !isSaved ? (prev.saves || []).filter((uid: string) => uid !== session.user.id) : [...(prev.saves || []), session.user.id] }))
        })
    }

    if (loading || !project) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center text-gray-400">
                <div className="w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    const isLiked = session?.user?.id && project.likes?.includes(session.user.id)
    const isSaved = session?.user?.id && project.saves?.includes(session.user.id)

    return (
        <main className="bg-white text-gray-900">
            <section className="border-b border-gray-100 px-4 md:px-8 py-3 flex flex-wrap items-center justify-between gap-4 sticky top-16 sm:top-20 bg-white/80 backdrop-blur-md z-40">
                <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200 shrink-0 bg-gray-50 flex items-center justify-center shadow-sm">
                        {project.author?.avatar ? (
                            <Image src={project.author.avatar} alt={project.author?.fullName || ''} fill className="object-cover" />
                        ) : (
                            <span className="text-gray-500 font-bold">{project.author?.fullName?.[0] || 'U'}</span>
                        )}
                    </div>
                    <div className="min-w-0">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-sm truncate">{project.author?.fullName || project.author?.username || 'Unknown'}</span>
                            <span className="hidden sm:inline-block text-[10px] text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-full uppercase tracking-tighter">Available</span>
                        </div>
                        <div className="flex items-center gap-3 mt-0.5 opacity-60">
                            {project.author?.email && <span className="text-[10px] flex items-center gap-1">✉ {project.author.email}</span>}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 ml-auto">
                    <button onClick={handleLike} className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-full border text-xs sm:text-sm font-bold transition-all shadow-sm ${isLiked ? "border-pink-500 text-pink-500 bg-pink-50" : "border-gray-200 hover:border-pink-300 text-gray-600 hover:text-pink-500"}`}>
                        {isLiked ? <IoHeart size={16} /> : <IoHeartOutline size={16} />}
                        <span>{project.likes?.length || 0}</span>
                    </button>
                    <button onClick={handleSave} className={`flex items-center justify-center w-9 sm:w-10 h-9 sm:h-10 rounded-full border transition-all shadow-sm ${isSaved ? "border-pink-500 text-pink-500 bg-pink-50" : "border-gray-200 hover:border-pink-300 text-gray-600 hover:text-pink-500"}`}>
                        {isSaved ? <IoBookmark size={16} /> : <IoBookmarkOutline size={16} />}
                    </button>
                    <button className="flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-pink-500 hover:bg-pink-600 text-white text-xs sm:text-sm font-bold transition-all shadow-lg active:scale-95">
                        Hire Me
                    </button>
                </div>
            </section>

            <section className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12">
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-black mb-4 tracking-tight leading-tight">{project.title}</h1>
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full uppercase tracking-widest">
                            <IoGridOutline size={14} />
                            {project.category}
                        </span>
                        {project.liveUrl && (
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[11px] font-bold text-pink-500 border border-pink-100 bg-pink-50/50 hover:bg-pink-50 px-3 py-1.5 rounded-full transition-all uppercase tracking-widest">
                                <IoLinkOutline size={14} />
                                Live Site
                            </a>
                        )}
                        {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[11px] font-bold text-gray-700 bg-gray-50 border border-gray-200 hover:bg-gray-100 px-3 py-1.5 rounded-full transition-all uppercase tracking-widest">
                                <IoLogoGithub size={14} />
                                Code
                            </a>
                        )}
                    </div>
                </div>

                <div className="relative w-full rounded-2xl md:rounded-[32px] overflow-hidden bg-gray-50 border border-gray-100 group shadow-xl">
                    <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-lg text-gray-700 hover:bg-gray-50 active:scale-90 transition-all border border-gray-100">
                            <HiDownload size={20} />
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-lg text-gray-700 hover:bg-gray-50 active:scale-90 transition-all border border-gray-100">
                            <BsThreeDots size={20} />
                        </button>
                    </div>
                    {project.image ? (
                        <Image src={project.image} alt={project.title} width={1600} height={1200} className="w-full h-auto object-cover" priority />
                    ) : (
                        <div className="w-full h-[400px] flex items-center justify-center text-gray-300 font-bold italic">Shot Image Missing</div>
                    )}
                </div>

                <div className="mt-12 max-w-2xl mx-auto">
                    <div className="prose prose-gray max-w-none text-base md:text-lg leading-relaxed font-medium text-gray-600">
                        <p>{project.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-10">
                        {(project.tags || []).map((tag: string) => (
                            <span key={tag} className="px-4 py-2 rounded-full border border-gray-200 text-xs font-bold text-gray-400 hover:border-pink-400 hover:text-pink-500 transition-all cursor-pointer bg-white shadow-sm">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="mt-16 flex flex-col items-center text-center py-12 px-6 bg-gray-50 rounded-[32px] border border-gray-100">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-white shadow-xl mb-6">
                            {project.author?.avatar ? (
                                <Image src={project.author.avatar} alt={project.author?.fullName || ''} fill className="object-cover" />
                            ) : (
                                <div className="w-full h-full bg-pink-100 flex items-center justify-center text-pink-600 font-black text-2xl">{project.author?.fullName?.[0] || 'U'}</div>
                            )}
                        </div>
                        <h3 className="text-xl font-black mb-2">{project.author?.fullName || 'Designer'}</h3>
                        <p className="text-sm text-gray-500 mb-6 font-medium max-w-xs px-4">Creating high-impact digital experiences for modern brands.</p>
                        <button className="px-8 py-3 rounded-full bg-gray-900 hover:bg-black text-white text-sm font-bold transition-all shadow-lg active:scale-95">
                            Work With Me
                        </button>
                    </div>
                </div>

                {(project.moreprojects && project.moreprojects.length > 0) && (
                    <section className="mt-20 pt-16 border-t border-gray-100">
                        <div className="flex items-center justify-between mb-8">
                            <h4 className="font-black text-lg sm:text-xl tracking-tight">More by {project.author?.fullName || 'Designer'}</h4>
                            <span className="text-sm font-bold text-pink-500 cursor-pointer hover:underline">See Profile</span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                            {project.moreprojects.slice(0, 4).map((src: string, i: number) => (
                                <div key={i} className="aspect-[4/3] relative rounded-2xl overflow-hidden bg-gray-50 cursor-pointer hover:scale-[1.02] transition-all shadow-sm group">
                                    <Image src={src} alt={`Shot ${i + 1}`} fill className="object-cover" />
                                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-all"></div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </section>
        </main>
    )
}