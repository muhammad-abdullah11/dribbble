"use client"
import Image from 'next/image'
import { IoHeartOutline, IoBookmarkOutline, IoMailOutline, IoLogoTwitter, IoLinkOutline, IoLogoGithub, IoGridOutline } from "react-icons/io5"
import { HiDownload } from "react-icons/hi"
import { BsThreeDots } from "react-icons/bs"
import axios from 'axios'
import { useEffect, useState, use } from 'react'

interface PageProps {
    params: Promise<{ id: string }>
}

export default function ProjectPage({ params }: PageProps) {
    const { id } = use(params)
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

    if (loading || !project) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-400">
                Loading...
            </div>
        )
    }

    return (
        <main className="">

            <section className="border-b border-gray-200 px-8 py-3 flex  items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200 shrink-0 bg-gray-100 flex items-center justify-center">
                        {project.author?.avatar ? (
                            <Image src={project.author.avatar} alt={project.author?.fullName || ''} fill className="object-cover" />
                        ) : (
                            <span className="text-gray-500 font-bold">{project.author?.fullName?.[0] || 'U'}</span>
                        )}
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm ">{project.author?.fullName || project.author?.username || 'Unknown'}</span>
                            <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">Available for work</span>
                            <span className="text-xs text-pink-500 font-medium cursor-pointer hover:underline">Follow</span>
                        </div>
                        <div className="flex items-center gap-3 mt-0.5">
                            {project.author?.email && <span className="text-xs text-gray-500 flex items-center gap-1">✉ {project.author.email}</span>}
                            {project.author?.website && <span className="text-xs text-gray-500 flex items-center gap-1">🖥 {project.author.website}</span>}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-300 hover:border-gray-400 text-sm font-medium  transition-colors">
                        <IoHeartOutline size={16} />
                        <span>{project.likes || 0}</span>
                    </button>
                    <button className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-300 hover:border-gray-400 text-sm font-medium  transition-colors">
                        <IoBookmarkOutline size={16} />
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2 rounded-full bg-pink-500 hover:bg-pink-600 text-white text-sm font-semibold transition-colors">
                        <IoMailOutline size={16} /> Get in touch
                    </button>
                </div>
            </section>

            <section className="max-w-4xl mx-auto px-4 py-10">

                <h1 className="text-2xl font-bold  mb-4">{project.title}</h1>

                <div className="flex flex-wrap items-center gap-3 mb-6">
                    <span className="flex items-center gap-1.5 text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
                        <IoGridOutline size={14} />
                        {project.category}
                    </span>
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            className="flex items-center gap-1.5 text-sm text-pink-500 border border-pink-200 bg-pink-50 hover:bg-pink-100 px-3 py-1.5 rounded-full transition-colors"
                        >
                            <IoLinkOutline size={14} />
                            Live Site
                        </a>
                    )}
                    {project.githubUrl && (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            className="flex items-center gap-1.5 text-sm text-pink-500  border border-gray-200 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-full transition-colors"
                        >
                            <IoLogoGithub size={14} />
                            GitHub
                        </a>
                    )}
                </div>

                <div className="relative w-full rounded-2xl overflow-hidden bg-gray-100 group">
                    <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow  hover:bg-gray-100 transition-colors">
                            <HiDownload size={18} />
                        </button>
                        <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow  hover:bg-gray-100 transition-colors">
                            <BsThreeDots size={18} />
                        </button>
                    </div>
                    {project.image ? (
                        <Image
                            src={project.image}
                            alt={project.title}
                            width={1600}
                            height={1200}
                            className="w-full h-auto object-cover"
                            priority
                        />
                    ) : (
                        <div className="w-full h-96 flex items-center justify-center text-gray-400">No Image provided</div>
                    )}
                </div>

                <div className="mt-10 space-y-4  text-base leading-relaxed">
                    <p>{project.description}</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-8">
                    {(project.tags || []).map((tag: string) => (
                        <span key={tag} className="px-4 py-1.5 rounded-full border border-gray-300 text-sm hover:border-pink-400 hover:text-pink-500 transition-colors cursor-pointer">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="flex items-center justify-between mt-10 pt-8 border-t border-gray-200">
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-300 hover:border-pink-400 text-sm font-medium  transition-colors">
                            <IoHeartOutline size={18} /> {project.likes || 0}
                        </button>
                        <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-300 hover:border-gray-400 text-sm font-medium  transition-colors">
                            <IoBookmarkOutline size={18} /> Save
                        </button>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Share:</span>
                        <button className="w-9 h-9 flex items-center justify-center rounded-full bg-sky-500 text-white hover:bg-sky-600 transition-colors">
                            <IoLogoTwitter size={16} />
                        </button>
                    </div>
                </div>

                <div className="mt-10 flex flex-col items-center text-center py-10 border-t border-b border-gray-200">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border border-gray-200 mb-4 bg-gray-100 flex items-center justify-center">
                        {project.author?.avatar ? (
                            <Image src={project.author.avatar} alt={project.author?.fullName || ''} fill className="object-cover" />
                        ) : (
                            <span className="text-gray-500 font-bold text-xl">{project.author?.fullName?.[0] || 'U'}</span>
                        )}
                    </div>
                    <h3 className="text-lg font-bold ">{project.author?.fullName || project.author?.username || 'Unknown User'}</h3>
                    <p className="text-sm text-gray-500 mt-1">We make complex applications simple for users ❤</p>
                    <button className="mt-4 px-6 py-2 rounded-full bg-pink-500 hover:bg-pink-600 text-white text-sm font-semibold transition-colors">
                        Get in touch
                    </button>
                    <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                        {project.author?.email && <span>✉ {project.author.email}</span>}
                        {project.author?.website && <span>🖥 {project.author.website}</span>}
                    </div>
                </div>

                {(project.moreprojects && project.moreprojects.length > 0) && (
                    <div className="mt-10">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="font-semibold ">More by {project.author?.fullName || project.author?.username || 'Unknown'}</h4>
                            <span className="text-sm text-pink-500 cursor-pointer hover:underline">View profile</span>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {project.moreprojects.map((src: string, i: number) => (
                                <div key={i} className="aspect-[4/3] relative rounded-xl overflow-hidden bg-gray-100 cursor-pointer hover:opacity-90 transition-opacity">
                                    <Image src={src} alt={`project ${i + 1}`} fill className="object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </section>
        </main>
    )
}