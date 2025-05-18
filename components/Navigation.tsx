'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import { BtnList } from '@/app/data'
import useScreenSize from '@/app/hooks/useScreenSize';
import ResponsiveComponent from './ResponsiveComponent';


// x,y軸の計算をサーバーではなくクライアント側で完結させるため、NavButton をクライアントサイド専用にする
const NavButton = dynamic(() => import('./NavButton'), { ssr: false });

const Navigation = () => {
    const angleIncrement = 360 / BtnList.length;
    const size = useScreenSize();
    if (size === undefined) {
        return <p>Loading...</p>;
    }

    const isLarge = size >= 1024;
    const isMedium = size >= 768;

    return (
        <div className='w-full fixed h-screen flex items-center justify-center'>
            <ResponsiveComponent>
                {({ size }) => {
                    if (size === undefined) return <p>Loading...</p>;
                    return size && size >= 480 ? (
                        <div className='w-max flex items-center justify-between relative animate-spin-slow group hover:[animation-play-state:paused]'>{
                            BtnList.map((btn, index) => {
                                const angleRad = (index * angleIncrement * Math.PI) / 180
                                const radius = isLarge ? 'calc(20vw - 1rem)' : isMedium ? 'calc(30vw - 1rem)' : 'calc(40vw - 1rem)'
                                const x = `calc(${radius}*${Math.cos(angleRad)})`;
                                const y = `calc(${radius}*${Math.sin(angleRad)})`;

                                return <NavButton key={btn.label} x={x} y={y} {...btn} labelDirection="right" />
                            })
                        }</div>)

                        : (
                            <><div className="w-full px-2.5 sm:p-0 sm:w-max flex flex-col space-y-4 items-start sm:items-center justify-center relative group sm:hidden">
                                {BtnList.slice(0, BtnList.length / 2).map((btn) => {
                                    return <NavButton key={btn.label} x={'0'} y={'0'} {...btn} labelDirection="right" />;
                                })}
                            </div>
                                <div className='w-full px-2.5 sm:p-0 sm:w-max flex flex-col space-y-4 items-end sm:items-center justify-center relative group sm:hidden'>{
                                    BtnList.slice(BtnList.length / 2, BtnList.length).map((btn) => {

                                        return (
                                            <NavButton key={btn.label} x={'0'} y={'0'} {...btn} labelDirection="left" />
                                        )
                                    })
                                }</div>
                            </>
                        )

                }}
            </ResponsiveComponent>
        </div>
    )
}

export default Navigation