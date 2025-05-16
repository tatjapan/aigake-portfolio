'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import { BtnList } from '@/app/data'


// x,y軸の計算をサーバーではなくクライアント側で完結させるため、NavButton をクライアントサイド専用にする
const NavButton = dynamic(() => import('./NavButton'), { ssr: false });

const Navigation = () => {
    const angleIncrement = 360 / BtnList.length;

    return (
        <div className='w-full fixed h-screen flex items-center justify-center'>
            <div className='w-max flex items-center justify-between relative animate-spin-slow group hover:[animation-play-state:paused]'>{
                BtnList.map((btn, index) => {
                    const angleRad = (index * angleIncrement * Math.PI) / 180
                    const radius = 'calc(20vw - 1rem)'
                    const x = `calc(${radius}*${Math.cos(angleRad)})`;
                    const y = `calc(${radius}*${Math.sin(angleRad)})`;

                    // console.log(index, angleRad, x, y)

                    return <NavButton key={btn.label} x={x} y={y} {...btn} />
                })
            }</div>
        </div>
    )
}

export default Navigation