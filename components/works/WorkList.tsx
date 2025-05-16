'use client'
import { workData } from '@/app/workData';
import { useState } from 'react';
import Image from 'next/image'
import Lightbox from './Lightbox';

const ITEMS_PER_PAGE = 9;


const WorkList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const handleNavigate = (direction: 'prev' | 'next') => {
        if (selectedIndex === null) return;
        const newIndex =
            direction === 'prev'
                ? Math.max(0, selectedIndex - 1)
                : Math.min(workData.length - 1, selectedIndex + 1);
        setSelectedIndex(newIndex);
    };


    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentImages = workData.slice(startIdx, startIdx + ITEMS_PER_PAGE);
    const totalPages = Math.ceil(workData.length / ITEMS_PER_PAGE);

    return (
        <div className='max-w-6xl w-full px-4 py-12'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                {currentImages.map((img, idx) => {
                    const globalIndex = (currentPage - 1) * ITEMS_PER_PAGE + idx;
                    return (
                        <div
                            key={img.id}
                            className='relative aspect-square cursor-pointer overflow-hidden rounded shadow'
                            onClick={() => setSelectedIndex(globalIndex)}
                        >
                            <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                className='object-cover hover:scale-105 transition-transform duration-300'
                            />
                        </div>
                    )
                }

                )}
            </div>
            <div className='flex justify-center mt-6 space-x-2'>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 border rounded ${currentPage === i + 1
                            ? 'bg-accent text-black font-bold'
                            : 'text-foreground hover:bg-accent/30'
                            }`}
                    >{i + 1}
                    </button>
                ))}
            </div>
            {selectedIndex !== null && (
                <Lightbox
                    images={workData}
                    currentIndex={selectedIndex}
                    onClose={() => setSelectedIndex(null)}
                    onNavigate={handleNavigate}
                />
            )}
        </div>
    )
}

export default WorkList
