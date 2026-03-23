const pages = ["Explore", "Hire Talent", "Community"]
const Header = () => (

    <header className="text-white flex items-center justify-between px-8 py-4 border-b border-gray-500 shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight">Dribbble</h1>

        <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 rounded-full px-4 py-2">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                </svg>
                <input type="text" placeholder="What are you looking for?" className="bg-transparent text-sm outline-none w-52 placeholder-gray-400" />
            </div>

            <nav className="flex items-center gap-5 text-sm font-medium">
                {pages.map(item => (
                    <a key={item} href="#" className="">{item}</a>
                ))}
            </nav>
        </div>

        <div className="flex items-center gap-3">
            <button className="text-sm font-medium">Log in</button>
            <button className="text-sm font-semibold text-black px-4 py-2 rounded-full bg-white">Sign up</button>
        </div>
    </header>
)

export default Header