import React from 'react'
import { motion, useScroll } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Demo from './components/Demo'
import Features from './components/Features'
import Skills from './components/Skills'
import Profile from './components/Profile'
import CTA from './components/CTA'

function App() {
    const { scrollYProgress } = useScroll()

    return (
        <div className="min-h-screen bg-background overflow-hidden selection:bg-primary/30 text-gray-100 relative">
            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent z-[60] origin-left"
                style={{ scaleX: scrollYProgress }}
            />

            <Navbar />
            <Hero />
            <Demo />
            <Features />
            <Skills />
            <Profile />
            <CTA />

            <footer className="bg-[#0f0f0f] py-12 text-center text-sm text-gray-400 border-t border-gray-800">
                <p>&copy; {new Date().getFullYear()} Laight. All Rights Reserved.</p>
                <p className="mt-2 text-xs opacity-50 font-mono tracking-widest mt-4">LOCAL AI & DATA VISUALIZATION</p>
            </footer>
        </div>
    )
}

export default App
