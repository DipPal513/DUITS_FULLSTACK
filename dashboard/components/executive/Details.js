
import { Mail, X } from "lucide-react"
export default function DetailsExecutiveModal({selectedexecutive, setShowDetailsModal}) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-in zoom-in duration-200">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <h2 className="text-lg font-semibold text-slate-900">Executive Details</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-1 hover:bg-slate-100 rounded transition-all duration-200 hover:scale-110"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-semibold text-indigo-600">
                    {selectedexecutive?.name[0]}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">{selectedexecutive?.name}</h3>
                  <p className="text-sm text-slate-600">{selectedexecutive?.position} - {selectedexecutive?.department}</p>
                  <p className="text-sm text-slate-600">{selectedexecutive?.session}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Mail className="w-4 h-4" />
                  <span>{selectedexecutive?.email}</span>
                </div>
               
              </div>
            </div>
          </div>
        </div>
  )
}
