"use client"

import api from "@/config";
import { X, ZoomIn } from "lucide-react";
import { useEffect, useState } from "react";
import Masonry from 'react-masonry-css'; 
import GlobalSkeleton from "./GlobalSkeleton";

const breakpointColumnsObj = {
  default: 4, 
  1100: 3,    
  700: 2,     
  500: 1      
};

export default function PhotoGallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchGalleryImages(1);
  },[]);

  const fetchGalleryImages = async () => {
    setIsLoading(true);
    try {
      const data = await api.get(`/gallery`); 
      setGallery(data?.data?.galleries || []);
    
    } catch (error) {
      
      console.error("Error fetching gallery images:", error);
    } finally {
      setIsLoading(false);
    }
  }
 
 
  const isMasonry = gallery.length >= 2;
  
  const GalleryItem = ({ item }) => (
    <div
      className={`group relative cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 ${isMasonry ? 'mb-6' : 'h-full'}`}
      onClick={() => setSelectedImage(item)}
    >
      <div className="relative overflow-hidden">
        <img
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px]">
          <div className="absolute inset-0 flex flex-col justify-between p-6">
            <div className="flex justify-end">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center transform translate-y-[-20px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                <ZoomIn className="w-5 h-5 text-white" />
              </div>
            </div>
            
            <div className="space-y-3 transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-150">
              <span className="inline-block px-4 py-1.5 bg-blue-500/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                {item.category}
              </span>
              <h3 className="text-white text-xl font-bold leading-tight drop-shadow-lg">
                {item.title}
              </h3>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 ring-1 ring-inset ring-black/10 dark:ring-white/10 rounded-2xl pointer-events-none"></div>
      </div>
    </div>
  );

  return (
    <section id="gallery" className="py-20 lg:py-32 bg-gradient-to-b from-transparent to-gray-50/50 dark:to-gray-900/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
         
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            Event Gallery
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Relive the memorable moments from our events, workshops, and community gatherings
          </p>
        </div>

       {
        isLoading ? <GlobalSkeleton /> : ( isMasonry ? (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex -ml-6 w-auto" 
            columnClassName="pl-6 bg-clip-padding" 
          >
            {gallery.map((item) => <GalleryItem key={item.id} item={item} />)}
          </Masonry>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((item) => <GalleryItem key={item.id} item={item} />)}
          </div>
        )
)
       }
       

        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 hover:rotate-90 z-10"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6 text-white" />
            </button>
            
            <div className="max-w-6xl w-full animate-in zoom-in-95 duration-500" onClick={(e) => e.stopPropagation()}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-auto max-h-[85vh] object-contain bg-gray-900"
                />
              </div>
              
              <div className="mt-6 text-center space-y-3 animate-in slide-in-from-bottom-4 duration-500 delay-150">
                <span className="inline-block px-4 py-2 bg-blue-500/90 backdrop-blur-sm text-white text-sm font-semibold rounded-full">
                  {selectedImage.category}
                </span>
                <h3 className="text-white text-2xl font-bold">{selectedImage.title}</h3>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  )
}