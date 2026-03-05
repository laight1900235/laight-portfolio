import React from 'react'
import { motion } from 'framer-motion'
import { Mail, ArrowRight } from 'lucide-react'

export default function CTA() {
    return (
        <section className="py-32 bg-surface relative overflow-hidden border-t border-gray-800">
            {/* Background glowing effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                        現場のDX、<br className="md:hidden" />お気軽にご相談ください
                    </h2>
                    <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                        「何から始めればいいかわからない」「古い機械でもデータは取れる？」<br className="hidden md:block" />
                        些細な疑問でも構いません。まずは現状の課題をお聞かせください。
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                        <a
                            href="mailto:n.yamada@laight.net"
                            className="group relative inline-flex items-center justify-center gap-3 px-8 py-5 w-full sm:w-auto bg-gradient-to-r from-primary to-blue-600 rounded-full font-bold text-white text-lg overflow-hidden shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                            <Mail className="w-6 h-6 relative z-10" />
                            <span className="relative z-10 tracking-wider">無料で相談する</span>
                            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
