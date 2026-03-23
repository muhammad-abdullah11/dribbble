"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"

const cards = [
    { img: "https://cdn.dribbble.com/userupload/45110813/file/a14323e6644d4485ee89f540dd058df4.jpg?crop=0x0-1600x1200&format=webp&resize=320x240&vertical=center", title: "Mobile", desc: "100+ Projects" },
    { img: "https://cdn.dribbble.com/userupload/21255757/file/still-531e411b1b8982404d70aae10ed85d40.gif?format=webp&resize=320x240&vertical=center", title: "Branding", desc: "200+ Projects" },
    { img: "https://cdn.dribbble.com/userupload/43493460/file/original-e96b095e300586ab5eee3c039288f628.png?format=webp&resize=310x233&vertical=center", title: "Illustration", desc: "150+ Projects" },
    { img: "https://cdn.dribbble.com/userupload/43493460/file/original-e96b095e300586ab5eee3c039288f628.png?format=webp&resize=310x233&vertical=center", title: "Web Design", desc: "300+ Projects" },
    { img: "https://cdn.dribbble.com/userupload/45854573/file/70a6cbc104791ba4ae64fcf8ef4d13d5.png?format=webp&resize=320x240&vertical=center", title: "Mobile", desc: "100+ Projects" },
    { img: "https://cdn.dribbble.com/userupload/43130322/file/original-90810204d6e833b2f6be208265eda70e.jpg?format=webp&resize=320x240&vertical=center", title: "Branding", desc: "200+ Projects" },
    { img: "https://cdn.dribbble.com/userupload/41802188/file/original-efc3a09ed287c1cfc32b17ed8463dc59.jpg?format=webp&resize=320x240&vertical=center", title: "Illustration", desc: "150+ Projects" },
    { img: "https://cdn.dribbble.com/userupload/44841174/file/still-8858a51dce4472159585b86092e4acae.png?format=webp&resize=320x240&vertical=center", title: "Product Design", desc: "80+ Projects" },
]

const COLORS = ["bg-yellow-100", "bg-pink-100", "bg-blue-100", "bg-purple-100", "bg-green-100"]

export default function FloatingCards() {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        let frame: number
        const step = () => {
            el.scrollLeft += 0.8
            if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0
            frame = requestAnimationFrame(step)
        }
        frame = requestAnimationFrame(step)
        return () => cancelAnimationFrame(frame)
    }, [])

    const doubled = [...cards, ...cards]

    return (
        <main className="py-8 overflow-hidden">
            <div ref={ref} className="flex gap-6 w-full overflow-x-hidden">
                {doubled.map((card, i) => (
                    <div
                        key={i}
                        className="group shrink-0 w-44 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                    >
                        <div className={`relative h-36 rounded-t-2xl ${COLORS[i % COLORS.length]}`}>
                            <Image src={card.img} alt={card.title} fill className="object-cover rounded-t-2xl" />
                        </div>
                        <div className="px-3 py-3 bg-gray-300 rounded-b-2xl">
                            <p className="text-sm font-semibold text-gray-900 group-hover:text-pink-500 transition-colors">{card.title}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{card.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
}