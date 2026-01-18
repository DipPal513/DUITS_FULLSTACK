import { Code2, Cpu, Layers } from "lucide-react"
export default function RightContent({rightVisualRef}) {
  return (
    <div ref={rightVisualRef} className="relative h-[600px] w-full hidden lg:flex items-center justify-center perspective-[1500px]">
          
          {/* Card 1: Development (Back) */}
          <div className="tech-card absolute z-10 w-80 h-96 bg-gray-900 dark:bg-[#18181b] rounded-2xl p-6 shadow-2xl border border-gray-700 dark:border-gray-800 flex flex-col justify-between origin-bottom-left">
             <div className="flex justify-between items-center text-gray-500">
                <Code2 className="w-8 h-8 text-blue-500" />
                <span className="text-xs font-mono uppercase">System.dev</span>
             </div>
             <div className="space-y-2">
                <div className="h-2 w-full bg-gray-800 rounded-full"></div>
                <div className="h-2 w-3/4 bg-gray-800 rounded-full"></div>
                <div className="h-2 w-1/2 bg-blue-900/40 rounded-full"></div>
             </div>
             <div>
               <h3 className="text-xl font-bold text-gray-900 dark:text-white">Software Wing</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Fullstack and AI</p>
             </div>
          </div>

          {/* Card 2: Robotics (Middle) */}
          <div className="tech-card absolute z-20 w-80 h-96 bg-white dark:bg-[#202025] rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-gray-200 dark:border-gray-700 flex flex-col justify-between origin-bottom-center">
             <div className="flex justify-between items-center text-gray-400">
                <Cpu className="w-8 h-8 text-red-600" />
                <span className="text-xs font-mono uppercase">Hardware.io</span>
             </div>
             {/* Abstract Circuit visual */}
             <div className="relative h-20 w-full border-t border-b border-gray-100 dark:border-gray-800 my-4 flex items-center justify-around">
                <div className="w-8 h-8 border border-red-200 dark:border-red-900/30 rounded-full flex items-center justify-center">
                   <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                </div>
                <div className="h-px w-full bg-gray-200 dark:bg-gray-700 absolute"></div>
             </div>
             <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Robotics Wing</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">IoT & Automation</p>
             </div>
          </div>

          {/* Card 3: Design/Network (Front) */}
          <div className="tech-card absolute z-30 w-80 h-96 bg-gray-100 dark:bg-black rounded-2xl p-6 shadow-2xl border border-gray-300 dark:border-gray-800 flex flex-col justify-between origin-bottom-right">
             <div className="flex justify-between items-center text-gray-400">
                <Layers className="w-8 h-8 text-purple-600" />
                <span className="text-xs font-mono uppercase">Creative.ui</span>
             </div>
             
             {/* Abstract Design Visual */}
             <div className="grid grid-cols-2 gap-2 my-4">
                <div className="aspect-square rounded-lg bg-purple-100 dark:bg-purple-900/20"></div>
                <div className="aspect-square rounded-lg bg-gray-200 dark:bg-gray-800"></div>
                <div className="aspect-square rounded-lg bg-gray-200 dark:bg-gray-800"></div>
                <div className="aspect-square rounded-lg bg-red-100 dark:bg-red-900/20"></div>
             </div>

             <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Creative & Net</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Design & Infrastructure</p>
             </div>
          </div>

        </div>
  )
}
