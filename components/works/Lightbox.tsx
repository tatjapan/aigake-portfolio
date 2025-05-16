'use client'
import React from 'react'
import Image from 'next/image'
import { WorkItem } from '@/app/workData'

type Props = {
    images: WorkItem[];
    currentIndex: number;
    onClose: () => void;
    onNavigate: (direction: 'prev' | 'next') => void;
}

const Lightbox = ({ images, currentIndex, onClose, onNavigate }: Props) => {
    const item = images[currentIndex];

    if (!item) {
        console.error("Lightbox: currentIndex out of range:", currentIndex);
        return null;
    }

    return (
        <div className='fixed inset-0 bg-black/70 z-50 flex items-cneter justify-center backdrop-blur-sm'>
            <div className='relative w-11/12 max-w-3xl text-center'>
                <Image
                    src={item.src}
                    alt={item.alt}
                    width={1000}
                    height={1000}
                    className='rounded-lg shadow-lg object-contain w-full h-auto'
                />
                <div className='text-white mt-2'>{item.title}</div>
                {/* Close Button */}
                <button
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white text-black px-2 py-1 rounded"
                    onClick={onClose}
                >
                    ×
                </button>

                {/* Navigation Buttons */}
                {currentIndex > 0 && (
                    <button
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-black px-3 py-1 rounded"
                        onClick={() => onNavigate('prev')}
                    >
                        ←
                    </button>
                )}
                {currentIndex < images.length - 1 && (
                    <button
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-black px-3 py-1 rounded"
                        onClick={() => onNavigate('next')}
                    >
                        →
                    </button>
                )}
            </div>
        </div>
    )
}

export default Lightbox