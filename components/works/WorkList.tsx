'use client'
import React, { useCallback, useMemo, useState } from 'react';
import WorkListItem from './WorkListItem';
import type { WorkItem } from '@/app/workData'
import dynamic from 'next/dynamic';


type Props = {
    works: WorkItem[]
}

const ITEMS_PER_PAGE = 9;

// 遅延読み込み（クライアント専用）
const Lightbox = dynamic(() => import('./Lightbox'), {
    ssr: false,
    loading: () => <div className="text-white text-center">Loading...</div>,
});


const WorkList = ({ works }: Props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    const pagenatedWorks = useMemo(
        () => works.slice(startIdx, startIdx + ITEMS_PER_PAGE),
        [works, startIdx]
    );

    const handleNavigate = useCallback((direction: 'prev' | 'next') => {
        setSelectedIndex((prev) => {
            if (prev === null) return null;
            if (direction === 'prev') return Math.max(0, prev - 1);
            if (direction === 'next') return Math.min(works.length - 1, prev + 1);
            return prev;
        });
    }, [works.length]);

    const handleClick = useCallback((idx: number) => {
        setSelectedIndex(startIdx + idx);//全体のインデックスを渡す
    }, [startIdx]);

    const handleClose = () => setSelectedIndex(null);

    const totalPages = Math.ceil(works.length / ITEMS_PER_PAGE);

    return (
        <div className='max-w-6xl w-full px-4 py-12'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                {pagenatedWorks.map((work, idx) => (
                    <WorkListItem
                        key={work.id}
                        work={work}
                        index={idx}
                        onClick={handleClick}
                    />))}
            </div>

            {/* Pagination */}
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
            {/* Lightbox */}
            {selectedIndex !== null && (
                <Lightbox
                    images={works}
                    currentIndex={selectedIndex}
                    onNavigate={handleNavigate}
                    onClose={handleClose}
                />
            )}
        </div>
    )
}

export default WorkList
