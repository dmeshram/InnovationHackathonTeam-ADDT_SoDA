import React from 'react';

const DashboardPage = () => {
    return (
        <div>
            <header
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    backgroundColor: '#f5f5f5',
                    padding: '1rem 0',
                    textAlign: 'center',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    zIndex: 1000,
                }}
            >
                <h1 style={{ margin: 0, fontSize: '2.5rem', color: '#000' }}>Dashboard</h1>
            </header>

            <main
                style={{
                    marginTop: '8rem',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    minHeight: 'calc(100vh - 8rem)'
                }}
            >
                <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Modules</h2>
            </main>

        </div>
    );
};

export default DashboardPage;
