import React from 'react'
import Header from '../components/header/Header'

const Layout = ({ children }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', position: 'fixed', gap: '20px' }}>
            <Header />
            {/* <main className='overflow-y-auto h-screen md:py-20 py-20 md:px-44 px-4'>{children}</main> */}
            <main style={{ overflowY: 'auto', height: 'screen', padding: '80px 4px' }}>{children}</main>
        </div>
    )
}

export default Layout