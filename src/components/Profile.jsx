import React from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Factory, Code, Server, CheckCircle2, Mail, ExternalLink } from 'lucide-react'

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
        <section id="profile" className="py-24 bg-background relative z-10 border-t border-gray-800">
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

                    <div className="bg-surface/50 border border-gray-800 rounded-2xl p-8 mb-12 backdrop-blur-sm max-w-2xl mx-auto shadow-xl">
                        <h3 className="flex flex-col items-center justify-center gap-1 mb-6">
                            <span className="text-gray-400 text-sm font-medium">個人事業主</span>
                            <span className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">Laight</span>
                            <span className="text-gray-400 text-sm font-medium">（ライト）</span>
                        </h3>
                        <p className="text-gray-300 leading-relaxed mb-6">
                            屋号には、ローカルな「<strong>AI</strong>」運用が得意であることと、モノづくりの現場に「<strong>光（light）</strong>」を当てることで課題を解決するという意味を込めています。
                        </p>

                        <div className="flex justify-center w-full">
                            <a
                                href="mailto:n.yamada@laight.net"
                                className="inline-flex items-center justify-center gap-2 md:gap-3 px-4 md:px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all group border border-gray-600 hover:border-primary shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] max-w-full"
                            >
                                <Mail className="w-4 h-4 md:w-5 md:h-5 text-primary group-hover:scale-110 transition-transform flex-shrink-0" />
                                <span className="font-mono text-sm md:text-base break-all">n.yamada@laight.net</span>
                                <ExternalLink className="w-3 h-3 md:w-4 md:h-4 text-gray-400 group-hover:text-white flex-shrink-0" />
                            </a>
                        </div>
                    </div>

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
