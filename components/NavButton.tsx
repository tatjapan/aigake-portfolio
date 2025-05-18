import React from 'react'
import Link from 'next/link'
import { Home, User, LucidePalette } from 'lucide-react';
import { LuMail } from 'react-icons/lu';
import { FaBluesky, FaXTwitter } from 'react-icons/fa6';
import clsx from "clsx";
import ResponsiveComponent from './ResponsiveComponent';

type NavButtonProps = {
    x: string;
    y: string;
    label: string;
    link: string;
    icon: string;
    newTab: boolean;
    labelDirection: string;
}

const getIcon = (icon: string) => {
    switch (icon) {
        case 'home':
            return <Home className='w-full h-auto' strokeWidth={1.5} />
        case 'about':
            return <User className='w-full h-auto' strokeWidth={1.5} />
        case 'works':
            return <LucidePalette className='w-full h-auto' strokeWidth={1.5} />
        case 'contact':
            return <LuMail className='w-full h-auto' strokeWidth={1.5} />
        case 'bluesky':
            return <FaBluesky className='w-full h-auto' strokeWidth={1.5} />
        case 'x':
            return <FaXTwitter className='w-full h-auto' strokeWidth={1.5} />

        default:
            return <Home className='w-full h-auto' strokeWidth={1.5} />
    }
}

const NavButton = ({ x, y, label, link, icon, newTab, labelDirection = "right" }: NavButtonProps) => {
    return (
        <ResponsiveComponent>
            {({ size }) => {
                if (size === undefined) return <p>Loading...</p>;
                return size && size >= 480 ? (
                    <div className='absolute cursor-pointer z-50'
                        style={{
                            transform: `translate(${x}, ${y})`
                        }}>
                        <Link href={link} target={newTab ? '_blank' : '_self'} className='text-foreground rounded-full flex items-center justify-center bg-background/20 border border-accent/30 border-solid backdrop-blur-[6px] shadow-glass-inset hover:shadow-glass-xs' aria-label={label}>
                            <span className='relative w-14 h-14 p-4 animate-spin-slow-reverse group-hover:[animation-play-state:paused]'>{getIcon(icon)}
                                <span className='peer bg-transparent absolute top-0 left-0 w-full h-full' />
                                <span className='absolute hidden peer-hover:block px-2 py-1 left-full mx-2 top-1/2 -translate-y-1/2 bg-background text-foreground text-xs rounded-md shadow-lg whitespace-nowrap'>{label}</span>
                            </span>
                        </Link>
                    </div>
                ) : (
                    <div className='w-fit cursor-pointer z-50'
                        style={{
                            transform: `translate(${x}, ${y})`
                        }}>
                        <Link href={link} target={newTab ? '_blank' : '_self'} className='text-foreground rounded-full flex items-center justify-center custom-bg'
                            aria-label={label}
                            prefetch={false}
                            scroll={false}
                        >
                            <span className='relative w-10 h-10 p-4 sm:w-14 sm:h-14 sm:p-4 rounded-full border border-accent/30 border-solid hover:text-accent'>{getIcon(icon)}
                                <span className='peer bg-transparent absolute top-0 left-0 w-full h-full' />
                                <span className={clsx(
                                    "absolute hidden peer-hover:block px-2 py-1 left-full mx-2 top-1/2 -translate-y-1/2 bg-background text-foreground text-sm rounded-md shadow-lg whitespace-nowrap",
                                    labelDirection === "left" ? "right-full left-auto" : ""
                                )}>{label}</span>
                            </span>
                        </Link>
                    </div>
                )
            }}
        </ResponsiveComponent>
    )
}

export default NavButton