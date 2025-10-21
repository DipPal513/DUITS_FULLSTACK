"use client"

import { Card } from "@/components/ui/card";
import api from "@/config";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [gallery, setGallery] = useState([]);

useEffect(() => {
    fetchGalleryImages();
},[]);

const fetchGalleryImages = async () => {
const data = await api.get('/gallery');
setGallery(data.galleries || []);
  }

  return (
    <section id="gallery" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Event Gallery</h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Relive the memorable moments from our events, workshops, and community gatherings
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.length === 0 ? <p className="">No images found</p> : gallery.map((item, index) => (
            <Card
              key={index}
              className="overflow-hidden border-border/50 py-0 hover:border-primary/50 transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedImage(item)}
            >
              <div className="relative h-96 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="inline-block px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded mb-2">
                      {item.category}
                    </span>
                    <h3 className="text-white font-semibold">{item.title}</h3>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <div className="max-w-5xl w-full">
              <img
                src={selectedImage.image}
                alt={"Selected"}
                className="w-full h-auto rounded-lg"
              />
              <div className="mt-4 text-center">
                <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded mb-2">
                  {selectedImage.category}
                </span>
                <h3 className="text-white text-xl font-semibold">{selectedImage.title}</h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
