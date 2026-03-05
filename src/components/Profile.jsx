import React from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Factory, Code, Server, CheckCircle2 } from 'lucide-react'

const timeline = [
    {
        icon: <Factory className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors" />,
        title: "製造業出身の強み",
        color: "from-gray-700 to-gray-800",
        desc: "もともと自身も製造業出身。だからこそ、現場の言葉や空気感が分かります。システム会社によくある「現場の要件を伝えるのが難しい」といったコミュニケーションの壁はありません。"
    },
    {
        icon: <Code className="w-6 h-6 text-gray-400 group-hover:text-secondary transition-colors" />,
        title: "IT企業 (搬送機器下請け)",
        color: "from-gray-800 to-gray-900",
        desc: "PLCによる機器制御・通信をメインに習得。ハードウェアとソフトウェアの繋がりを根本から理解しています。"
    },
    {
        icon: <Briefcase className="w-6 h-6 text-gray-400 group-hover:text-accent transition-colors" />,
        title: "社内SE (プレス加工メーカー)",
        color: "from-gray-900 to-[#111]",
        desc: "情報システム部にて、社内DXの推進やサーバー管理保守を担当。常に「ユーザー目線」でのシステム導入を実体験として持っています。"
    },
    {
        icon: <Server className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors" />,
        title: "データセンター",
        color: "from-[#111] to-black",
        desc: "サーバー構築・保守など堅牢なインフラ経験。24時間365日動くシステムの裏側で培った安定志向の実績。"
    }
]

export default function Profile() {
    return (
        <section id="profile" className="py-24 bg-background relative z-10">
            <div className="max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center mb-16"
                >
                    <span className="text-accent font-mono tracking-widest text-sm mb-2 block">PROFILE</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">代表・山田 直輝</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-accent to-emerald-500 mx-auto rounded-full mb-8" />
                    <p className="text-xl text-gray-300 font-medium">現場に光(light)を当て、ローカルAIの力で課題を解決する。</p>
                </motion.div>

                <div className="relative border-l border-gray-800 ml-4 md:ml-12 pl-8 md:pl-12 space-y-12">
                    {timeline.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            className="relative group"
                        >
                            {/* Timeline dot */}
                            <div className="absolute -left-[45px] md:-left-[61px] top-1 w-6 h-6 bg-surface border-4 border-gray-800 rounded-full group-hover:border-primary shadow-[0_0_10px_rgba(59,130,246,0)] group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300 z-10" />

                            <div className={`bg-gradient-to-br ${item.color} p-6 md:p-8 rounded-2xl border border-gray-800/50 hover:border-gray-600 transition-colors shadow-lg`}>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-gray-800/50 rounded-lg">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-100 group-hover:text-white transition-colors">
                                        {item.title}
                                    </h3>
                                </div>
                                <p className="text-gray-400 leading-relaxed text-sm md:text-base pl-2 border-l border-gray-700/50">
                                    {item.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}

                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="absolute -left-[53.5px] md:-left-[69.5px] bottom-0"
                    >
                        <CheckCircle2 className="w-10 h-10 text-primary bg-background rounded-full" />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
