import { motion } from 'framer-motion'
import { slideFromLeftVariants, slideFromRightVariants } from './variants/variants'
import { menuData } from '../mocks/MenuMock'

export const TakeHomeSection = () => {
    const toGo = menuData.menu.to_go[0]

    return (
        <section className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 pb-20 overflow-x-clip">
            <div className="bg-[#1C2D2B] text-white rounded-4xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center overflow-hidden">
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ amount: 0.3, once: false }}
                    variants={slideFromLeftVariants}
                    className="lg:col-span-7 space-y-6"
                >
                    <h2 className="font-bricolage font-extrabold text-3xl md:text-5xl">
                        Llévate la <span className="text-[#4bc0bc]">Sonrisa</span> a Casa
                    </h2>
                    <p className="text-gray-300 text-sm leading-relaxed max-w-lg">
                        {toGo.descripcion}
                    </p>
                    <div className="space-y-2 text-sm text-gray-300">
                        <p className="flex items-center gap-2"><span>🍨</span> <strong>{toGo.nombre}</strong> — {toGo.presentaciones?.join(', ')}</p>
                    </div>
                    <button className="bg-[#4bc0bc] hover:bg-[#3da3a0] text-white font-bold px-8 py-3.5 rounded-xl transition-all text-sm mt-4">
                        Encargar de Forma Directa
                    </button>
                </motion.div>

                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ amount: 0.3, once: false }}
                    variants={slideFromRightVariants}
                    className="lg:col-span-5 rounded-2xl overflow-hidden shadow-2xl"
                >
                    <img src="https://images.unsplash.com/photo-1580915411954-282cb1b0d780?auto=format&fit=crop&q=80&w=600" alt="Helados para llevar" className="w-full h-full object-cover" />
                </motion.div>
            </div>
        </section>
    )
}