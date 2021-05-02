import React from 'react';
import { FaGithub, FaUser } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';

interface LayoutProps {
    children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <>
            <header className='top-0 left-auto flex-shrink-0 bg-gray-800 bg-opacity-40'>
                <div className='container mx-auto flex p-4 items-center'>
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
            <main>
                <div className='container mx-auto p-4'>{children}</div>
            </main>
        </>
    );
}
