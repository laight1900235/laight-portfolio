import React from 'react'
import { motion } from 'framer-motion'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { AlertCircle } from 'lucide-react'

const skillData = [
    { subject: 'AI関係', A: 90, fullMark: 100, note: "物体検知、LLMのローカル環境構築など" },
    { subject: 'WEB・アプリ', A: 70, fullMark: 100, note: "データの見える化ダッシュボード実装など" },
    { subject: 'サーバー', A: 70, fullMark: 100, note: "データセンターでの実務経験あり" },
    { subject: 'DB構築設計', A: 50, fullMark: 100, note: "構築・管理・設計" },
    { subject: 'オフィスIT', A: 50, fullMark: 100, note: "社内SEとしてのサポート経験" },
    { subject: 'ネットワーク', A: 50, fullMark: 100, note: "基礎的な構築・保守" },
    { subject: '現場機器配線', A: 30, fullMark: 100, note: "PLC制御、SBC連携など（※専門パートナーと協業）" },
    { subject: 'MS Office', A: 30, fullMark: 100, note: "Excel等（データ処理・VBAマクロなど）" },
]

export default function Skills() {
    return (
        <section id="skills" className="py-24 bg-surface/30 border-t border-gray-800 relative z-10">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center mb-16"
                >
                    <span className="text-secondary font-mono tracking-widest text-sm mb-2 block">SKILL SET</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">対応スキル</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-secondary to-orange-500 mx-auto rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Radar Chart */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, type: "spring" }}
                        className="h-[400px] sm:h-[500px] w-full bg-[#111] rounded-3xl p-4 sm:p-8 border border-gray-800 shadow-[0_0_30px_rgba(250,204,21,0.05)] relative"
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.1)_0%,transparent_70%)] pointer-events-none" />
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="55%" data={skillData}>
                                <PolarGrid stroke="#333" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#aaa', fontSize: 10 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Tooltip
                                    formatter={(value, name, props) => [props.payload.note, '補足']}
                                    contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                                />
                                <Radar name="Skills" dataKey="A" stroke="#facc15" fill="#facc15" fillOpacity={0.4} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </motion.div>

                    {/* Skill List with Tooltips */}
                    <div className="space-y-6">
                        <div className="bg-surface border border-gray-800 rounded-2xl p-6 sm:p-8">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                IT領域の広さが強み
                            </h3>

                            <div className="space-y-4">
                                {skillData.map((skill, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="group relative"
                                    >
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-gray-300 font-medium">{skill.subject}</span>
                                            <span className="text-gray-500 font-mono text-sm">{skill.A}%</span>
                                        </div>
                                        <div className="w-full bg-gray-800 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full ${skill.A >= 80 ? 'bg-primary' : skill.A >= 60 ? 'bg-secondary' : 'bg-gray-500'}`}
                                                style={{ width: `${skill.A}%` }}
                                            />
                                        </div>

                                        {/* Hover Info */}
                                        <div className="absolute left-0 -top-10 hidden group-hover:block bg-gray-800 text-white text-xs px-3 py-1.5 rounded-md shadow-lg whitespace-nowrap z-20 border border-gray-600">
                                            {skill.note}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.8 }}
                            className="bg-accent/10 border border-accent/20 rounded-xl p-6 flex flex-col sm:flex-row gap-4 items-start"
                        >
                            <AlertCircle className="text-accent w-6 h-6 flex-shrink-0 mt-1" />
                            <p className="text-sm text-gray-300 leading-relaxed">
                                幅広いIT領域をカバーしていますが、経験が浅い分野や大規模な施工（例：現場機器・配線など）については、技術力と信頼性の高い<span className="text-white font-bold border-b border-accent/50 pb-0.5">パートナー企業と連携して対応可能</span>な体制を整えています。お客様に最適なソリューションを提供します。
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
