'use client'
import useScreenSize from '@/app/hooks/useScreenSize'
import React from 'react'

type ResponsiveComponentProps = {
    children: (props: { size: number | undefined }) => React.ReactNode
}

const ResponsiveComponent = ({ children }: ResponsiveComponentProps) => {
    const size = useScreenSize();

    return (
        <>
            {children({ size })}
        </>
    )
}

export default ResponsiveComponent;