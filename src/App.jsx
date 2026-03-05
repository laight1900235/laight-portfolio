import React from 'react'
import Hero from './components/Hero'
import Demo from './components/Demo'
import Features from './components/Features'
import Skills from './components/Skills'
import Profile from './components/Profile'

function App() {
    return (
        <div className="min-h-screen bg-background overflow-hidden selection:bg-primary/30 text-gray-100">
            <Hero />
            <Demo />
            <Features />
            <Skills />
            <Profile />
            <footer className="bg-surface py-8 text-center text-sm text-gray-400 border-t border-gray-800">
                <p>&copy; {new Date().getFullYear()} Laight. All Rights Reserved.</p>
                <p className="mt-2 text-xs opacity-50">Local AI & Data Visualization for Manufacturing.</p>
            </footer>
        </div>
    )
}

export default App
