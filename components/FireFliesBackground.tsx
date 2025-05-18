'use client'
import React, { useEffect, useState, memo, useMemo } from 'react'

type Firefly = {
    id: number;
    top: string;
    left: string;
    animationDuration: string;
};

const MAX_FIREFLIES = 20;

const createFirefly = (): Firefly => ({
    id: Math.random(),
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    animationDuration: `${Math.random() * 5 + 5}s`,
})

// Firefly 個別のメモ化コンポーネント
const FirelryDot = memo(({ firefly }: { firefly: Firefly }) => {
    return (
        <div
            className='absolute rounded-full w-[10px] h-[10px] bg-firefly-radial'
            style={
                {
                    top: firefly.top,
                    left: firefly.left,
                    animation: `move ${firefly.animationDuration} infinite alternate`
                }
            }
        />
    )
})

FirelryDot.displayName = 'FireflyDot'

const FireFliesBackground = () => {
    const [fireflies, setFireflies] = useState<Firefly[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setFireflies(prev => {
                const next = [...prev, createFirefly()];
                return next.slice(-MAX_FIREFLIES);
            })
        }, 1200);

        return () => clearInterval(interval);
    }, []);

    // 再レンダリングを防ぐ useMemo
    const renderedFireflies = useMemo(() => (
        fireflies.map(firefly => (
            <FirelryDot key={firefly.id} firefly={firefly} />))
    ), [fireflies])

    return (
        <div className='fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none motion-reduce:hidden'>
            {renderedFireflies}
        </div>
    )
}

export default memo(FireFliesBackground)