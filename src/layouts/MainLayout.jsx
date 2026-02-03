import Navbar from "../components/Navbar";

export default function MainLayout({ children }) {
    return (
        <div className="min-h-screen bg-bg text-text selection:bg-accent selection:text-black overflow-x-hidden">
            <Navbar />
            {/* Add padding-top to account for fixed navbar height (20 = 5rem) */}
            <main className="pt-20 relative">
                {children}
            </main>
        </div>
    );
}
