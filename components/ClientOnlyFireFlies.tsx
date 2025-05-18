// FireFliesBackground を Client Component 側で読み込む別のレイアウトラッパーに分離
'use client';

import dynamic from 'next/dynamic';

// クライアント側でのみ表示
const FireFliesBackground = dynamic(
    () => import('@/components/FireFliesBackground'),
    { ssr: false }
);

const ClientOnlyFireFlies = () => {
    return <FireFliesBackground />;
};

export default ClientOnlyFireFlies;