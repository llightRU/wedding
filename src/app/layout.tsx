import type { Metadata } from 'next';
import '@/styles/reset.css';
import '@/styles/variables.css';
import '@/styles/layout.css';
import '@/styles/animations.css';

export const metadata: Metadata = {
    title: 'Thiệp Cưới - Ngô Hồng Quang & Đỗ Liên Nhung',
    description: 'Thiệp mời đám cưới Ngô Hồng Quang & Đỗ Liên Nhung - 07/04/2026',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="vi">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>{children}</body>
        </html>
    );
}
