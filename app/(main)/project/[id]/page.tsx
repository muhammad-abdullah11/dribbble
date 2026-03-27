import Image from 'next/image'
import { IoHeartOutline, IoBookmarkOutline, IoMailOutline, IoLogoTwitter, IoLinkOutline, IoLogoGithub, IoGridOutline } from "react-icons/io5"
import { HiDownload } from "react-icons/hi"
import { BsThreeDots } from "react-icons/bs"

interface PageProps {
    params: Promise<{ id: string }>
}

const project = {
    title: "Personal Finance Investment Mobile App Design",
    author: {
        name: "Abdullah IT | UI/UX Team",
        role: "Available for work",
        email: "[EMAIL_ADDRESS]",
        website: "abc",
        avatar: "https://cdn.dribbble.com/userupload/47120482/file/6b9a9d0e27b278b503b4bb85c03ebfcc.png?resize=2048x1536&vertical=center",
    },
    liveSiteUrl: "abc",
    githubUrl: "abc",
    category: "Mobile App",
    image: "https://cdn.dribbble.com/userupload/47120482/file/6b9a9d0e27b278b503b4bb85c03ebfcc.png?resize=2048x1536&vertical=center",
    description1: "Hello there! Here's a design concept for a modern mobile app focused on personal finance management – perfect for anyone wanting fast, clear control over budgets, spending, and money transfers.",
    description2: "This project spotlights three main screens: a home dashboard that puts your balance and latest transactions front and center, an analytics page for easy tracking of expenses across categories with vibrant charts, and a clean transfer screen for sending money to any recipient in just a few taps.",
    description3: "The palette is energetic, with bold blue and purple tones that evoke trust, clarity, and a sense of tech-forward convenience. These colors help visually distinguish different categories and functions, keeping the app interface both lively and user-friendly.",
    description4: "A highlight of this UI/UX design and overall finance mobile app is its use of concise navigation, inviting visual structure, and intuitive chart design. Whether for budgeting, investing, or daily wallet use, this concept is built to inspire confidence and deliver a top-tier money management experience – on both iOS and Android.",
    tags: ["Personal Finance", "Investment", "Mobile App", "UI Design", "Fintech"],
    likes: 33,
    saves: 12,
    moreprojects: [
        "https://cdn.dribbble.com/userupload/47120482/file/6b9a9d0e27b278b503b4bb85c03ebfcc.png?resize=2048x1536&vertical=center",
        "https://cdn.dribbble.com/userupload/47120482/file/6b9a9d0e27b278b503b4bb85c03ebfcc.png?resize=2048x1536&vertical=center",
        "https://cdn.dribbble.com/userupload/47120482/file/6b9a9d0e27b278b503b4bb85c03ebfcc.png?resize=2048x1536&vertical=center",
        "https://cdn.dribbble.com/userupload/47120482/file/6b9a9d0e27b278b503b4bb85c03ebfcc.png?resize=2048x1536&vertical=center",
    ],
}

export default async function ProjectPage({ params }: PageProps) {
    const { id } = await params

    return (
        <main className="">

            <section className="border-b border-gray-200 px-8 py-3 flex  items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200 shrink-0">
                        <Image src={project.author.avatar} alt={project.author.name} fill className="object-cover" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm ">{project.author.name}</span>
                            <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">Available for work</span>
                            <span className="text-xs text-pink-500 font-medium cursor-pointer hover:underline">Follow</span>
                        </div>
                        <div className="flex items-center gap-3 mt-0.5">
                            <span className="text-xs text-gray-500 flex items-center gap-1">✉ {project.author.email}</span>
                            <span className="text-xs text-gray-500 flex items-center gap-1">🖥 {project.author.website}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-300 hover:border-gray-400 text-sm font-medium  transition-colors">
                        <IoHeartOutline size={16} />
                        <span>{project.likes}</span>
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
                    <a
                        href={project.liveSiteUrl}
                        target="_blank"

                        className="flex items-center gap-1.5 text-sm text-pink-500 border border-pink-200 bg-pink-50 hover:bg-pink-100 px-3 py-1.5 rounded-full transition-colors"
                    >
                        <IoLinkOutline size={14} />
                        Live Site
                    </a>
                    <a
                        href={project.githubUrl}
                        target="_blank"

                        className="flex items-center gap-1.5 text-sm text-pink-500  border border-gray-200 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-full transition-colors"
                    >
                        <IoLogoGithub size={14} />
                        GitHub
                    </a>
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
                    <Image
                        src={project.image}
                        alt={project.title}
                        width={1600}
                        height={1200}
                        className="w-full h-auto object-cover"
                        priority
                    />
                </div>

                <div className="mt-10 space-y-4  text-base leading-relaxed">
                    <p>{project.description1}</p>
                    <p>{project.description2}</p>
                </div>

                <div className="mt-8 rounded-2xl overflow-hidden bg-gray-100">
                    <Image
                        src={project.image}
                        alt="Branding"
                        width={1600}
                        height={1200}
                        className="w-full h-auto object-cover"
                    />
                </div>

                <div className="mt-6 space-y-4  text-base leading-relaxed">
                    <p>{project.description3}</p>
                    <p>{project.description4}</p>
                </div>

                <div className="flex flex-wrap gap-2 mt-8">
                    {project.tags.map(tag => (
                        <span key={tag} className="px-4 py-1.5 rounded-full border border-gray-300 text-sm hover:border-pink-400 hover:text-pink-500 transition-colors cursor-pointer">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="flex items-center justify-between mt-10 pt-8 border-t border-gray-200">
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-300 hover:border-pink-400 text-sm font-medium  transition-colors">
                            <IoHeartOutline size={18} /> {project.likes}
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
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border border-gray-200 mb-4">
                        <Image src={project.author.avatar} alt={project.author.name} fill className="object-cover" />
                    </div>
                    <h3 className="text-lg font-bold ">{project.author.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">We make complex applications simple for users ❤</p>
                    <button className="mt-4 px-6 py-2 rounded-full bg-pink-500 hover:bg-pink-600 text-white text-sm font-semibold transition-colors">
                        Get in touch
                    </button>
                    <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                        <span>✉ {project.author.email}</span>
                        <span>🖥 {project.author.website}</span>
                    </div>
                </div>

                <div className="mt-10">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold ">More by {project.author.name}</h4>
                        <span className="text-sm text-pink-500 cursor-pointer hover:underline">View profile</span>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {project.moreprojects.map((src, i) => (
                            <div key={i} className="aspect-[4/3] relative rounded-xl overflow-hidden bg-gray-100 cursor-pointer hover:opacity-90 transition-opacity">
                                <Image src={src} alt={`project ${i + 1}`} fill className="object-cover" />
                            </div>
                        ))}
                    </div>
                </div>

            </section>
        </main>
    )
}