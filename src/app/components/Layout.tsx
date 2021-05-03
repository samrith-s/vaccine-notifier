import React from 'react';
import { FaGithub, FaUser } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';

interface LayoutProps {
    children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className='grid h-full' style={{ gridTemplateRows: 'max-content auto' }}>
            <header>
                <div className='container mx-auto flex p-4 items-center min-h-full'>
                    <Link
                        to='/'
                        className='mr-auto text-green-300 hover:text-green-500 font-bold text-2xl transition'
                    >
                        <h1 className='m-0'>🇮🇳 Vaccine Notifier</h1>
                    </Link>
                    <nav className='flex'>
                        <NavLink
                            to='/about'
                            className='ml-2 px-2 py-0 transition hover:text-green-200 text-2xl'
                            activeClassName='text-green-300'
                            title='About'
                        >
                            <FaUser />
                        </NavLink>
                        <a
                            className='ml-2 px-2 py-0 transition hover:text-green-200 text-2xl'
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
            <main className='overflow-x-hidden p-4 pt-0 overflow-y-auto min-h-full'>
                <div className='grid grid-cols-12 gap-4 container mx-auto min-h-full'>
                    {children}
                </div>
            </main>
        </div>
    );
}
