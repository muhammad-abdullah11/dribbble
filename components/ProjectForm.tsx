"use client"

import { useState, useRef, useCallback } from "react"
import Image from "next/image"
import { IoCloudUploadOutline, IoClose, IoAddOutline, IoLogoGithub, IoLinkOutline, IoGridOutline, IoCheckmarkCircle } from "react-icons/io5"

const Categories = ["Mobile App", "Web Design", "Branding", "Illustration", "Animation", "Product Design", "UI Design", "Other"]

const tempProjectData = {
    title: "Personal Finance Investment Mobile App Design",
    liveSiteUrl: "abc",
    githubUrl: "abc",
    category: "Mobile App",
    image: "https://cdn.dribbble.com/userupload/47120482/file/6b9a9d0e27b278b503b4bb85c03ebfcc.png?resize=2048x1536&vertical=center",
    description: "Hello there! Here's a design concept for a modern mobile app focused on personal finance management – perfect for anyone wanting fast, clear control over budgets, spending, and money transfers.",
    tags: ["Personal Finance", "Investment", "Mobile App", "UI Design", "Fintech"],
}


export default function ProjectForm({ type }: { type: "create" | "edit" }) {
    const inputCls = "w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-100 placeholder-gray-600 outline-none focus:border-pink-500 transition-colors"
    const labelCls = "block text-sm font-semibold text-gray-200 mb-2"
    const isEditing = type === "edit"
    const [title, setTitle] = useState(isEditing ? tempProjectData.title : "")
    const [liveSiteUrl, setLiveSiteUrl] = useState(isEditing ? tempProjectData.liveSiteUrl : "")
    const [githubUrl, setGithubUrl] = useState(isEditing ? tempProjectData.githubUrl : "")
    const [category, setCategory] = useState(isEditing ? tempProjectData.category : "")
    const [imageUrl, setImageUrl] = useState(isEditing ? tempProjectData.image : "")
    const [description, setDescription] = useState(isEditing ? tempProjectData.description : "")
    const [tags, setTags] = useState<string[]>(isEditing ? tempProjectData.tags : [])
    const [tagInput, setTagInput] = useState("")
    const [isDragging, setIsDragging] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [imageError, setImageError] = useState(false)

    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        const file = e.dataTransfer.files?.[0]
        if (file && file.type.startsWith("image/")) {
            setImageUrl(URL.createObjectURL(file))
            setImageError(false)
        }
    }, [])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setImageUrl(URL.createObjectURL(file))
            setImageError(false)
        }
    }

    const addTag = () => {
        const trimmed = tagInput.trim()
        if (trimmed && !tags.includes(trimmed) && tags.length < 8) {
            setTags(prev => [...prev, trimmed])
            setTagInput("")
        }
    }

    const removeTag = (tag: string) => setTags(prev => prev.filter(t => t !== tag))

    const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") { e.preventDefault(); addTag() }
        if (e.key === "Backspace" && !tagInput && tags.length > 0) setTags(prev => prev.slice(0, -1))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 3000)
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="max-w-3xl mx-auto px-4 py-12">

                <div className="mb-10">
                    <h1 className="text-3xl font-bold">Upload New Project</h1>
                    <p className="text-gray-400 mt-2 text-sm">Share your design work with the Dribbble community.</p>
                </div>

                {submitted && (
                    <div className="mb-6 flex items-center gap-3 bg-green-500/10 border border-green-500/30 rounded-2xl px-5 py-4 text-green-400">
                        <IoCheckmarkCircle size={20} />
                        <span className="text-sm font-medium">Project published successfully!</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-7">

                    <div>
                        <label className={labelCls}>Project Image <span className="text-pink-500">*</span></label>
                        <div
                            onDragOver={e => { e.preventDefault(); setIsDragging(true) }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className={`relative cursor-pointer rounded-2xl border-2 border-dashed overflow-hidden transition-all duration-200 ${isDragging ? "border-pink-500 bg-pink-500/10" : "border-gray-700 hover:border-pink-500/60 hover:bg-gray-900"}`}
                            style={{ minHeight: "260px" }}
                        >
                            {imageUrl && !imageError ? (
                                <div className="relative w-full h-64 group">
                                    <Image
                                        src={imageUrl}
                                        alt="Project preview"
                                        fill
                                        className="object-cover"
                                        onError={() => setImageError(true)}
                                        unoptimized={imageUrl.startsWith("blob:")}
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                                        <IoCloudUploadOutline size={28} className="text-white" />
                                        <span className="text-sm font-medium">Replace image</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center gap-3 py-16 px-8 text-center">
                                    <div className="w-14 h-14 rounded-full bg-gray-800 flex items-center justify-center">
                                        <IoCloudUploadOutline size={26} className="text-pink-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-200">Drag &amp; drop or click to upload</p>
                                        <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 16MB</p>
                                    </div>
                                </div>
                            )}
                        </div>
                        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                        <div className="mt-3 flex items-center gap-2">
                            <span className="text-xs text-gray-500">Or paste image URL:</span>
                            <input
                                type="url"
                                value={imageUrl}
                                onChange={e => { setImageUrl(e.target.value); setImageError(false) }}
                                placeholder="https://..."
                                className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-gray-300 placeholder-gray-600 outline-none focus:border-pink-500 transition-colors"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="project-title" className={labelCls}>Title <span className="text-pink-500">*</span></label>
                        <input
                            id="project-title"
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required
                            placeholder="Give your project a catchy name"
                            className={inputCls}
                        />
                    </div>

                    <div>
                        <label htmlFor="project-description" className={labelCls}>Description <span className="text-pink-500">*</span></label>
                        <textarea
                            id="project-description"
                            rows={5}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            required
                            placeholder="Describe your project — process, tools, inspiration..."
                            className={`${inputCls} resize-none`}
                        />
                        <p className="text-xs text-gray-600 mt-1 text-right">{description.length} / 1000</p>
                    </div>

                    <div>
                        <label className={labelCls}>
                            <span className="flex items-center gap-1.5"><IoGridOutline size={15} /> Category</span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {Categories.map(cat => (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => setCategory(cat)}
                                    className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-150 ${category === cat ? "border-pink-500 bg-pink-500/10 text-pink-400" : "border-gray-700 text-gray-400 hover:border-pink-500/50 hover:text-pink-300"}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className={labelCls}>Tags <span className="text-gray-500 text-xs font-normal">({tags.length}/8)</span></label>
                        <div className="bg-gray-900 border border-gray-700 rounded-xl px-3 py-2.5 flex flex-wrap gap-2 focus-within:border-pink-500 transition-colors min-h-[52px]">
                            {tags.map(tag => (
                                <span key={tag} className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-xs text-gray-300">
                                    {tag}
                                    <button type="button" onClick={() => removeTag(tag)} className="hover:text-pink-400 transition-colors ml-0.5">
                                        <IoClose size={12} />
                                    </button>
                                </span>
                            ))}
                            <input
                                type="text"
                                value={tagInput}
                                onChange={e => setTagInput(e.target.value)}
                                onKeyDown={handleTagKeyDown}
                                placeholder={tags.length < 8 ? "Add a tag, press Enter…" : "Max 8 tags reached"}
                                disabled={tags.length >= 8}
                                className="flex-1 min-w-28 bg-transparent text-sm text-gray-300 placeholder-gray-600 outline-none"
                            />
                        </div>
                        {tagInput && (
                            <button type="button" onClick={addTag} className="mt-2 flex items-center gap-1 text-xs text-pink-400 hover:text-pink-300 transition-colors">
                                <IoAddOutline size={14} /> Add &quot;{tagInput}&quot;
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="live-url" className={labelCls}>
                                <span className="flex items-center gap-1.5"><IoLinkOutline size={15} /> Live Site URL</span>
                            </label>
                            <input id="live-url" type="text" value={liveSiteUrl} onChange={e => setLiveSiteUrl(e.target.value)} placeholder="https://yoursite.com" className={inputCls} />
                        </div>
                        <div>
                            <label htmlFor="github-url" className={labelCls}>
                                <span className="flex items-center gap-1.5"><IoLogoGithub size={15} /> GitHub URL</span>
                            </label>
                            <input id="github-url" type="text" value={githubUrl} onChange={e => setGithubUrl(e.target.value)} placeholder="https://github.com/you/repo" className={inputCls} />
                        </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                        <button type="button" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
                            {type === "create" ? "Save as draft" : "Cancel"}
                        </button>
                        <button type="submit" className="px-8 py-3 rounded-full bg-pink-500 hover:bg-pink-600 active:scale-95 text-white text-sm font-semibold transition-all duration-150 shadow-lg shadow-pink-500/20">
                            {type === "create" ? "Publish Project" : "Update Project"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}
