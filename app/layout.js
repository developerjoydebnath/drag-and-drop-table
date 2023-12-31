'use client';

import { Inter } from 'next/font/google';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <DndProvider backend={HTML5Backend}>
                <body className={inter.className}>{children}</body>
            </DndProvider>
        </html>
    );
}
