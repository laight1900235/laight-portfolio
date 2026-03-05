import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'
import { DatabaseZap, Activity, Loader2, Target, Gauge, ScrollText, PlayCircle, Camera, ClipboardList, MessagesSquare, AlertTriangle } from 'lucide-react'

// Dummy Data Generator for Machining Center (Spindle Load & Status)
const generateDummyData = () => {
    const data = []
    let timeObj = new Date();
    timeObj.setHours(10, 0, 0, 0);

    for (let i = 0; i < 20; i++) {
        // Simulate a machining cycle: idle -> high load -> idle -> high load
        let load = 0;
        if (i > 2 && i < 8) load = Math.floor(Math.random() * 30) + 70; // 70-100% active cut
        else if (i === 8) load = 120; // Peak load
        else if (i > 12 && i < 18) load = Math.floor(Math.random() * 20) + 60; // 60-80% active cut
        else load = Math.floor(Math.random() * 5); // 0-5% idle

        data.push({
            time: timeObj.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }),
            主軸負荷: load,
            アラーム: load > 110 ? 1 : 0 // Peak triggers an alarm line visually
        })
        timeObj.setMinutes(timeObj.getMinutes() + 1);
    }
    return data
}

const webAppExamples = [
    {
        icon: <Camera className="w-8 h-8 text-secondary" />,
        title: <><span className="inline-block">安価な監視カメラ</span> <span className="inline-block">AI物体検知</span></>,
        desc: "Raspberry Piなど数千円の基板とカメラで、異常停止を画像検知してLINE等へ通知。",
        mockup: (
            <div className="flex flex-col h-full gap-2">
                <div className="w-full h-24 bg-gray-800 rounded-lg relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')]"></div>
                    <div className="w-16 h-16 border-2 border-red-500/50 rounded-lg absolute left-1/4 top-1/2 -translate-y-1/2 flex items-start p-1">
                        <span className="text-[8px] text-red-500 font-mono bg-red-500/10 px-1">切粉検知: 98%</span>
                    </div>
                </div>
                <div className="flex bg-[#00B900]/20 text-[#00B900] text-xs p-2 rounded-md items-center gap-2">
                    <AlertTriangle className="w-3 h-3" /> 異常停止を検知しました
                </div>
            </div>
        )
    },
    {
        icon: <ClipboardList className="w-8 h-8 text-primary" />,
        title: <><span className="inline-block">リアルタイム</span><span className="inline-block">工程管理</span></>,
        desc: "ホワイトボードの予定表を大型モニターへ。各機械の現在の加工品名や進捗がひと目でわかります。",
        mockup: (
            <div className="flex flex-col h-full bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                <div className="grid grid-cols-3 bg-gray-800 text-[9px] text-gray-400 p-1.5 border-b border-gray-700 font-bold">
                    <div className="text-center">設備</div>
                    <div className="text-center">図面番/品名</div>
                    <div className="text-center">状況</div>
                </div>
                {[
                    { m: "MC-01", p: "ブラケットA", s: "稼働中", c: "text-[#10b981]" },
                    { m: "MC-02", p: "ベース板", s: "段取中", c: "text-secondary" },
                    { m: "NC-05", p: "フランジB", s: "待機", c: "text-primary" }
                ].map((row, i) => (
                    <div key={i} className="grid grid-cols-3 text-[9px] p-1.5 border-b border-gray-800/50 items-center">
                        <div className="text-gray-300 text-center font-mono">{row.m}</div>
                        <div className="text-gray-400 text-center truncate px-1">{row.p}</div>
                        <div className={`text-center font-bold px-1 py-0.5 rounded bg-gray-800 mx-auto ${row.c}`}>{row.s}</div>
                    </div>
                ))}
            </div>
        )
    },
    {
        icon: <ScrollText className="w-8 h-8 text-accent" />,
        title: <><span className="inline-block">紙ベース脱却！</span><span className="inline-block">図面ビューワー</span></>,
        desc: "油で汚れた紙図面から卒業。タブレットから常に最新図面を引き出し、現場で指先一つで拡大確認。",
        mockup: (
            <div className="w-full h-full bg-gray-800 rounded-lg p-2 relative overflow-hidden border border-gray-700 flex flex-col items-center justify-center">
                <div className="w-full h-full border border-accent/30 bg-accent/5 rounded flex items-center justify-center relative">
                    <div className="w-16 h-[1px] bg-accent/40 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="w-[1px] h-16 bg-accent/40 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="w-12 h-12 border border-accent/40 rounded-full"></div>
                    <div className="absolute bottom-1 right-1 bg-accent text-white text-[8px] px-1 rounded">200% ▼</div>
                </div>
            </div>
        )
    },
    {
        icon: <MessagesSquare className="w-8 h-8 text-pink-500" />,
        title: <><span className="inline-block">現場と事務所の</span><span className="inline-block">連携チャット</span></>,
        desc: "「この図面のここは？」チャット感覚で事務所と現場を繋ぎ、歩く手間と確認漏れを無くす専用ツール。",
        mockup: (
            <div className="flex flex-col h-full gap-2">
                <div className="bg-gray-800 rounded-lg p-2 text-[10px] text-gray-300 w-3/4 self-start relative">
                    MC3号機のA寸法、図面公差きついですが調整しますか？
                </div>
                <div className="bg-pink-500/20 text-pink-100 border border-pink-500/30 rounded-lg p-2 text-[10px] w-3/4 self-end text-right">
                    確認しました！+0.05まで許容でOKです。
                </div>
                <div className="mt-auto flex gap-1">
                    <div className="h-4 bg-gray-800 rounded-full flex-grow"></div>
                    <div className="w-4 h-4 rounded-full bg-pink-500/50"></div>
                </div>
            </div>
        )
    }
]

export default function Demo() {
    const [isFetching, setIsFetching] = useState(false)
    const [dataLoaded, setDataLoaded] = useState(false)
    const [data, setData] = useState([])
    const [animatedLoad, setAnimatedLoad] = useState(0)
    const [showTooltip, setShowTooltip] = useState(false)

    const handleFetchData = () => {
        setIsFetching(true)
        setDataLoaded(false)
        setData([])
        setShowTooltip(false)

        setTimeout(() => {
            setData(generateDummyData())
            setIsFetching(false)
            setDataLoaded(true)

            let count = 0
            const target = 85 // 表示用の瞬間主軸負荷
            const interval = setInterval(() => {
                count += 3
                setAnimatedLoad(count > target ? target : count)
                if (count >= target) {
                    clearInterval(interval)
                    setTimeout(() => setShowTooltip(true), 800)
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
                    <span className="text-secondary font-mono tracking-widest text-sm mb-2 block">LIVE DEMO</span>
                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-500 mb-4 inline-block">データの見える化ダッシュボード</h2>
                    <p className="text-gray-400 max-w-3xl mx-auto">
                        マシニングセンタやNC旋盤の通信ポートから、主軸負荷やアラーム情報をリアルタイム取得。<br className="hidden md:block" />「今、機械が動いているか？ムリをしていないか？」をどこからでも数字とグラフで直感的に把握できます。
                    </p>
                </motion.div>

                {/* --- DEMO 1: Machining Data --- */}
                <div className="bg-[#1a1a1a] rounded-2xl border border-gray-800 p-8 shadow-2xl relative overflow-hidden mb-24">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 border-b border-gray-800 pb-6 relative z-10">
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-[#10b981] shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse" />
                            <span className="text-gray-400 font-mono text-sm tracking-widest">対象: 第1工場 MC-05</span>
                        </div>

                        <button
                            onClick={handleFetchData}
                            disabled={isFetching}
                            className={`px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all duration-300 relative ${isFetching
                                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                : 'bg-primary hover:bg-primary/80 hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] text-white group outline-none'
                                }`}
                        >
                            {isFetching ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    コントローラーから取得中...
                                </>
                            ) : (
                                <>
                                    <DatabaseZap className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    設備の稼働データを取得
                                </>
                            )}
                        </button>
                    </div>

                    <div className="min-h-[400px] flex flex-col items-center justify-center relative">
                        {!dataLoaded && !isFetching && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-gray-600 flex flex-col items-center gap-4 text-center p-8"
                            >
                                <Activity className="w-16 h-16 opacity-20" />
                                <p>ボタンをクリックしてNCプログラムの<br />負荷モニター取得をシミュレートします</p>
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
                                        <Gauge className="w-8 h-8 text-primary animate-pulse" />
                                    </div>
                                </div>
                                <div className="text-primary font-mono typing-animation">CONNECTING TO FOCAS...</div>
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
                                            <p className="text-gray-400 text-sm mb-1 flex items-center gap-2"><PlayCircle className="w-4 h-4 text-[#10b981]" /> 設備ステータス</p>
                                            <h3 className="text-4xl font-bold font-mono text-[#10b981] mt-2">自動運転中</h3>
                                        </div>

                                        <div className="bg-surface/80 p-6 rounded-xl border border-gray-700 relative group overflow-hidden">
                                            <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="text-gray-400 text-sm mb-1 flex items-center gap-2"><Gauge className="w-4 h-4 text-primary" /> 瞬間 主軸負荷</p>
                                                    <h3 className="text-4xl font-bold font-mono text-white flex items-baseline gap-2">
                                                        {animatedLoad}
                                                        <span className="text-xl text-gray-500">%</span>
                                                    </h3>
                                                </div>
                                            </div>

                                            <AnimatePresence>
                                                {showTooltip && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                                        className="absolute right-0 top-0 -mt-12 -mr-4 bg-orange-500 text-white text-xs px-3 py-1.5 rounded-md shadow-[0_0_15px_rgba(249,115,22,0.5)] font-bold before:content-[''] before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-orange-500"
                                                    >
                                                        過負荷注意(80%越え)
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        <div className="bg-surface/80 p-6 rounded-xl border border-gray-700 group hover:border-gray-500 transition-colors cursor-default">
                                            <p className="text-gray-400 text-sm mb-1">現在の実加工時間 (本日)</p>
                                            <h3 className="text-4xl font-bold font-mono text-white flex items-baseline gap-2">
                                                {animatedLoad > 0 ? '4H 32M' : '--'}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="h-[250px] sm:h-[300px] w-full mt-8 bg-surface/30 rounded-xl p-2 sm:p-4 border border-gray-800 overflow-hidden">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                                <defs>
                                                    <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                                <XAxis dataKey="time" stroke="#666" tick={{ fill: '#666', fontSize: 12 }} tickLine={false} axisLine={false} />
                                                <YAxis stroke="#666" tick={{ fill: '#666', fontSize: 12 }} tickLine={false} axisLine={false} domain={[0, 150]} width={40} />
                                                <ChartTooltip
                                                    contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', borderRadius: '8px', color: '#fff' }}
                                                    itemStyle={{ color: '#fff' }}
                                                    formatter={(value, name) => [value + '%', name]}
                                                />
                                                <Area type="monotone" name="主軸負荷" dataKey="主軸負荷" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorLoad)" animationDuration={2000} />
                                                {/* Reference Line for overload simulation */}
                                                <Line type="step" dataKey={() => 100} stroke="#ef4444" strokeWidth={1} strokeDasharray="5 5" activeDot={false} isAnimationActive={false} />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="text-right mt-2 text-xs text-red-500/80">※ 赤点線は100%負荷のアラート閾値</div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* --- DEMO 2: Rich Web App Examples --- */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="mt-32"
                >
                    <div className="text-center mb-16">
                        <span className="text-accent font-mono tracking-widest text-sm mb-2 block">APPLICATION MOCKUPS</span>
                        <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">WEBアプリのカスタム実装例</h3>
                        <p className="text-gray-400">データを見せるだけでなく、現場の「困った」を解決する多種多様なアプリを構築します。<br className="hidden md:block" />カードにマウスを重ねて（タップして）イメージをご確認ください。</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {webAppExamples.map((app, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -5 }}
                                className="bg-surface border border-gray-800 rounded-2xl relative group overflow-hidden h-[300px] flex flex-col cursor-pointer shadow-lg"
                            >
                                {/* Default View (Icon + Text) */}
                                <div className="p-8 flex flex-col items-center justify-center text-center h-full group-hover:opacity-0 transition-opacity duration-300 relative z-10">
                                    <div className="p-4 bg-gray-900 rounded-2xl ring-1 ring-gray-700 mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                                        {app.icon}
                                    </div>
                                    <h4 className="text-lg font-bold text-gray-100 mb-3">{app.title}</h4>
                                    <p className="text-gray-400 text-sm leading-relaxed">{app.desc}</p>
                                </div>

                                {/* Hover Reveal View (Mockup UI) */}
                                <div className="absolute inset-0 bg-[#141414] p-6 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] z-20 flex flex-col justify-between border-t border-primary/30">
                                    <div className="mb-4 text-white font-bold text-sm flex items-center gap-2">
                                        {app.icon} {app.title}
                                    </div>
                                    <div className="flex-grow bg-background rounded-xl p-4 ring-1 ring-gray-800 overflow-hidden shadow-inner">
                                        {app.mockup}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </section>
    )
}
