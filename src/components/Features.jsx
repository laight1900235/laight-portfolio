import React from 'react'
import { motion } from 'framer-motion'
import { Wrench, ShieldCheck, ServerCog, Landmark } from 'lucide-react'

const features = [
    {
        icon: <Wrench className="w-8 h-8 text-primary" />,
        title: '現場とITの架け橋（DX化支援）',
        description: '搬送装置や加工装置のPLC配線、SBC（シングルボードコンピュータ）でのデータ受け取りなど、実機に直接触れる現場作業にも対応可能。古い設備でも見放しません。'
    },
    {
        icon: <ShieldCheck className="w-8 h-8 text-secondary" />,
        title: 'セキュアなローカルAI環境構築',
        description: '物体検知から最新のLLMまで、外部にデータを出さない「ローカル環境」でのAI構築・運用。図面やノウハウなどの機密情報を守りながら最新技術を現場に。'
    },
    {
        icon: <ServerCog className="w-8 h-8 text-accent" />,
        title: 'システム開発からインフラまで',
        description: '取得したデータを表示するWeb・スマホアプリの開発、データベースの設計、サーバーの構築・保守まで一貫して対応し、現場の見える化を実現します。'
    },
    {
        icon: <Landmark className="w-8 h-8 text-pink-500" />,
        title: 'IT導入補助金などの活用支援',
        description: '新しいシステムやAIの導入にかかるコスト負担を軽減するため、IT補助金など公的支援制度を活用した導入プランのご提案・サポートも行います。'
    }
]

export default function Features() {
    return (
        <section id="features" className="py-24 bg-background relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-primary font-mono tracking-widest text-sm mb-2 block">WHAT WE DO</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Laightができること</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-pink-500 mx-auto rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-surface border border-gray-800 rounded-2xl p-8 hover:bg-gray-900 transition-colors group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />

                            <div className="bg-gray-800/50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 border border-gray-700 group-hover:border-primary/50 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-100 mb-4 group-hover:text-white transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
