'use client';
import React, { memo } from "react";
import Image from "next/image";
import type { WorkItem } from "@/app/workData";

type Props = {
    work: WorkItem;
    onClick: (id: number) => void;
    index: number;
};

const WorkListItem = ({ work, onClick, index }: Props) => {
    return (
        <div
            className='relative aspect-square cursor-pointer overflow-hidden rounded shadow'
            onClick={() => onClick(index)}
        >
            <Image
                src={work.src}
                alt={work.alt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className='object-cover hover:scale-105 transition-transform ease-in-out duration-300'
                loading="lazy"
            />
        </div>
    )
}

export default memo(WorkListItem);