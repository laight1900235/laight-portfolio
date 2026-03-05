import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'
import { DatabaseZap, Activity, Loader2, Target, Thermometer } from 'lucide-react'

// Dummy Data Generator
const generateDummyData = () => {
    const data = []
    for (let i = 0; i < 20; i++) {
        data.push({
            time: `10:${i.toString().padStart(2, '0')}`,
            稼働率: Math.floor(Math.random() * 20) + 70, // 70-90%
            温度: Math.floor(Math.random() * 10) + 40,   // 40-50度
        })
    }
    return data
}

export default function Demo() {
    const [isFetching, setIsFetching] = useState(false)
    const [dataLoaded, setDataLoaded] = useState(false)
    const [data, setData] = useState([])
    const [animatedOee, setAnimatedOee] = useState(0)
    const [showTooltip, setShowTooltip] = useState(false)

    const handleFetchData = () => {
        setIsFetching(true)
        setDataLoaded(false)
        setData([])
        setShowTooltip(false)

        // Simulate network delay and data processing
        setTimeout(() => {
            setData(generateDummyData())
            setIsFetching(false)
            setDataLoaded(true)

            // Count up animation for KPI
            let count = 0
            const target = 85
            const interval = setInterval(() => {
                count += 2
                setAnimatedOee(count > target ? target : count)
                if (count >= target) {
                    clearInterval(interval)
                    setTimeout(() => setShowTooltip(true), 1000)
                }
            }, 30)

        }, 2000)
    }

    return (
        <section id="demo" className="py-24 bg-surface/50 border-t border-gray-800 relative z-10 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-500 mb-4 inline-block">データの取得〜見える化</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        古い設備からでもデータを引っ張り出し、スマホやPCでいつでも確認できる状態にします。以下のボタンでデモを体験してください。
                    </p>
                </motion.div>

                <div className="bg-[#1a1a1a] rounded-2xl border border-gray-800 p-8 shadow-2xl relative overflow-hidden">
                    {/* Top Control Bar */}
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 border-b border-gray-800 pb-6 relative z-10">
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.6)] animate-pulse" />
                            <span className="text-gray-400 font-mono text-sm tracking-widest">PLC: MAIN_LINE_01</span>
                        </div>

                        <button
                            onClick={handleFetchData}
                            disabled={isFetching}
                            className={`px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all duration-300 relative ${isFetching
                                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                    : 'bg-primary hover:bg-primary/80 hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] text-white group'
                                }`}
                        >
                            {isFetching ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    データ抽出中...
                                </>
                            ) : (
                                <>
                                    <DatabaseZap className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    PLCからデータを取得
                                </>
                            )}
                        </button>
                    </div>

                    {/* Visualization Area */}
                    <div className="min-h-[400px] flex flex-col items-center justify-center relative">
                        {!dataLoaded && !isFetching && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-gray-600 flex flex-col items-center gap-4 text-center p-8"
                            >
                                <Activity className="w-16 h-16 opacity-20" />
                                <p>上のボタンをクリックして<br />リアルタイムデータの取得をシミュレート</p>
                            </motion.div>
                        )}

                        {isFetching && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center gap-4 py-20"
                            >
                                <div className="relative">
                                    <div className="w-24 h-24 border-4 border-gray-800 rounded-full" />
                                    <div className="w-24 h-24 border-4 border-primary rounded-full absolute top-0 left-0 animate-spin border-t-transparent shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <DatabaseZap className="w-8 h-8 text-primary animate-pulse" />
                                    </div>
                                </div>
                                <div className="text-primary font-mono typing-animation">CONNECTING TO PLC...</div>
                            </motion.div>
                        )}

                        <AnimatePresence>
                            {dataLoaded && (
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, type: "spring" }}
                                    className="w-full h-full"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-4 relative z-10">
                                        <div className="bg-surface/80 p-6 rounded-xl border border-gray-700 relative group overflow-hidden">
                                            <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="text-gray-400 text-sm mb-1 flex items-center gap-2"><Target className="w-4 h-4 text-primary" /> 総合設備効率 (OEE)</p>
                                                    <h3 className="text-4xl font-bold font-mono text-white">{animatedOee}<span className="text-xl text-gray-500 ml-1">%</span></h3>
                                                </div>
                                                <div className="p-2 bg-primary/20 rounded-lg"><Activity className="w-6 h-6 text-primary" /></div>
                                            </div>

                                            {/* Interactive Popup Simulation */}
                                            <AnimatePresence>
                                                {showTooltip && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                                        className="absolute right-0 top-0 -mt-12 -mr-4 bg-primary text-white text-xs px-3 py-1.5 rounded-md shadow-lg font-bold before:content-[''] before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-primary"
                                                    >
                                                        目標達成!
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        <div className="bg-surface/80 p-6 rounded-xl border border-gray-700 group hover:border-gray-500 transition-colors cursor-default">
                                            <p className="text-gray-400 text-sm mb-1 flex items-center gap-2"><Thermometer className="w-4 h-4 text-orange-500" /> 平均モーター温度</p>
                                            <h3 className="text-4xl font-bold font-mono text-white flex items-baseline gap-2">
                                                {animatedOee > 0 ? '43.2' : '--'}
                                                <span className="text-xl text-gray-500">°C</span>
                                            </h3>
                                        </div>

                                        <div className="bg-surface/80 p-6 rounded-xl border border-gray-700 group hover:border-gray-500 transition-colors cursor-default">
                                            <p className="text-gray-400 text-sm mb-1">直近生産数</p>
                                            <h3 className="text-4xl font-bold font-mono text-white flex items-baseline gap-2">
                                                {animatedOee > 0 ? (animatedOee * 12) : '--'}
                                                <span className="text-xl text-gray-500">個</span>
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="h-[300px] w-full mt-8 bg-surface/30 rounded-xl p-4 border border-gray-800">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={data}>
                                                <defs>
                                                    <linearGradient id="colorOee" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                                    </linearGradient>
                                                    <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#facc15" stopOpacity={0.3} />
                                                        <stop offset="95%" stopColor="#facc15" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                                <XAxis dataKey="time" stroke="#666" tick={{ fill: '#666' }} tickLine={false} axisLine={false} />
                                                <YAxis stroke="#666" tick={{ fill: '#666' }} tickLine={false} axisLine={false} />
                                                <Tooltip
                                                    contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', borderRadius: '8px', color: '#fff' }}
                                                    itemStyle={{ color: '#fff' }}
                                                />
                                                <Area type="monotone" dataKey="稼働率" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorOee)" animationDuration={2000} />
                                                <Area type="monotone" dataKey="温度" stroke="#facc15" strokeWidth={2} fillOpacity={1} fill="url(#colorTemp)" animationDuration={2500} />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Animated Background Lines for tech effect */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
                        <div className="w-[200%] h-px bg-primary absolute top-1/4 -rotate-12 translate-x-[-50%] animate-[slideRight_10s_linear_infinite]" />
                        <div className="w-[200%] h-px bg-secondary absolute bottom-1/3 rotate-6 translate-x-[-10%] animate-[slideLeft_15s_linear_infinite]" />
                    </div>
                </div>
            </div>
        </section>
    )
}
