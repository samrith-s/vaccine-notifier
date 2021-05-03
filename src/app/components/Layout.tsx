import React from 'react';
import { FaExclamationCircle, FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface LayoutProps {
    children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className='grid h-full' style={{ gridTemplateRows: 'max-content max-content auto' }}>
            <header>
                <div className='container mx-auto flex p-4 items-center min-h-full'>
                    <Link
                        to='/'
                        className='mr-auto text-green-300 hover:text-green-500 font-bold text-2xl transition'
                    >
                        <h1 className='m-0'>🇮🇳 Vaccine Notifier</h1>
                    </Link>
                    <nav className='flex'>
                        <a
                            className='ml-2 px-2 py-0 transition hover:text-green-400 text-2xl'
                            rel='noopener noreferrer'
                            href='https://github.com/samrith-s/vaccine-notifier'
                            target='_blank'
                            title='GitHub'
                        >
                            <FaGithub />
                        </a>
                    </nav>
                </div>
            </header>
            <div className='container mx-auto'>
                {(window as any).__UNAVAILABLE && (
                    <div className='bg-yellow-500 p-4 flex items-center text-yellow-900 rounded mb-5'>
                        <FaExclamationCircle className='mr-5 flex-shrink-0 text-xl' />
                        <div>
                            We cannot send you notifications. This is either because you have
                            disabled notifications or your browser does not support the feature.
                        </div>
                    </div>
                )}
            </div>
            <main className='overflow-x-hidden p-4 pt-0 overflow-y-auto min-h-full'>
                <div className='grid grid-cols-12 gap-4 container mx-auto min-h-full'>
                    {children}
                </div>
            </main>
        </div>
    );
}
