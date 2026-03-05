import React from 'react'
import { motion } from 'framer-motion'
import { Factory, Cpu, Network } from 'lucide-react'

export default function Hero() {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-background">
            {/* Dynamic Animated Grid & Particles Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />

                {/* Floating Particles */}
                {Array.from({ length: 24 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1.5 h-1.5 bg-primary/40 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                        initial={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            opacity: 0,
                            scale: 0
                        }}
                        animate={{
                            y: [0, -100, -200],
                            x: [0, Math.random() * 50 - 25, Math.random() * 50 - 25],
                            opacity: [0, 1, 0],
                            scale: [0, 1.5, 0]
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 10
                        }}
                    />
                ))}
            </div>

            {/* Floating abstract elements representing data/network */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-[100px] z-0"
                animate={{
                    x: [0, 50, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.2, 1]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] z-0"
                animate={{
                    x: [0, -50, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.1, 1]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />

            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex justify-center mb-6"
                >
                    <div className="flex items-center space-x-3 bg-surface/80 backdrop-blur-md px-6 py-3 rounded-full border border-gray-700/50 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                        <Cpu className="text-secondary w-6 h-6 animate-pulse-slow" />
                        <h1 className="text-2xl font-bold tracking-widest text-white">Laight</h1>
                    </div>
                </motion.div>

                <motion.h2
                    className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400 mb-6 leading-tight"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    工場の機械から、<br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent glow-text">最新のローカルAI</span>まで。
                </motion.h2>

                <motion.p
                    className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    現場のデータを「見える化」し、御社のDXに光を当てます。
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <a href="#demo" className="px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-1 shadow-[0_0_20px_rgba(59,130,246,0.4)] flex items-center gap-2">
                        <Network className="w-5 h-5" />
                        デモを見る
                    </a>
                    <a href="#features" className="px-8 py-4 bg-surface hover:bg-gray-800 text-white rounded-lg font-semibold transition-all duration-300 border border-gray-700 hover:border-gray-500 flex items-center gap-2">
                        <Factory className="w-5 h-5" />
                        Laightについて
                    </a>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
            >
                <span className="text-sm tracking-widest mb-2 uppercase">Scroll</span>
                <motion.div
                    className="w-px h-12 bg-gradient-to-b from-gray-500 to-transparent"
                    animate={{ height: ["0%", "100%"], opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </motion.div>
        </section>
    )
}
