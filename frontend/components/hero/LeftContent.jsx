
import { ArrowRight, Globe, Zap , Users} from "lucide-react"

export default function LeftContent({leftContentRef}) {

  return (
    <div ref={leftContentRef} className="space-y-8 max-w-2xl">
          
          {/* Top Label */}
          <div className="flex items-center gap-3">
             <div className="h-px w-12 bg-blue-600"></div>
             <span className="text-sm font-bold tracking-widest uppercase text-gray-500 dark:text-gray-400">
               University of Dhaka
             </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-[1.1] tracking-tight">
            Technology, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500 dark:from-blue-500 dark:to-blue-500">
              Community,
            </span> <br />
            Leadership.
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed border-l-4 border-gray-200 dark:border-gray-800 pl-6">
            The University's premier platform for digital innovation. We are a multidisciplinary ecosystem connecting <strong className="text-gray-900 dark:text-white">Coders</strong>, <strong className="text-gray-900 dark:text-white">Engineers</strong>, and <strong className="text-gray-900 dark:text-white">Designers</strong> to build the future.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button className="group relative px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-lg overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
               <span className="relative z-10 flex items-center gap-2">
                 Join the Society
                 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </span>
            </button>
            
            <button className="px-8 py-4 bg-transparent border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-white font-semibold rounded-lg hover:border-red-600 hover:text-red-600 dark:hover:border-red-500 dark:hover:text-red-500 transition-colors">
              Explore Departments
            </button>
          </div>

          {/* Trust Bar */}
          <div className="pt-8 flex items-center gap-6 text-sm font-medium text-gray-500 dark:text-gray-500 grayscale opacity-80">
             <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" /> Est. 2011
             </div>
             <div className="h-4 w-px bg-gray-300 dark:bg-gray-700"></div>
             <div className="flex items-center gap-2">
                <Users className="w-4 h-4" /> 3,500+ Alumni
             </div>
             <div className="h-4 w-px bg-gray-300 dark:bg-gray-700"></div>
             <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" /> 50+ Annual Events
             </div>
          </div>
        </div>

  )
}
