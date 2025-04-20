import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
    const navigate = useNavigate();

    const handleClick = (label) => {
        if (label === 'Cybersecurity') {
            navigate('/cybersecurity');
        } else {
            alert(`${label} module coming soon!`);
        }
    };

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
                    minHeight: 'calc(100vh - 8rem)',
                }}
            >
                <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Modules</h2>

                <div style={{
                    display: 'flex',
                    gap: '1.5rem',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    animation: 'fadeIn 2s ease-in-out'
                }}>
                    {['Programming', 'UI Design', 'Machine Learning', 'Cybersecurity'].map((label, index) => (
                        <button
                            key={index}
                            style={{
                                padding: '1rem 2rem',
                                fontSize: '1rem',
                                borderRadius: '8px',
                                border: 'none',
                                backgroundColor: '#646cff',
                                color: '#fff',
                                cursor: 'pointer',
                                transition: 'transform 0.3s ease',
                                animation: `slideInUp 0.5s ease ${index * 0.2}s forwards`,
                                opacity: 0,
                            }}
                            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
                            onMouseOut={e => e.currentTarget.style.transform = 'scale(1.0)'}
                            onClick={() => handleClick(label)}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                <style>{`
                @keyframes slideInUp {
                  from {
                    transform: translateY(20px);
                    opacity: 0;
                  }
                  to {
                    transform: translateY(0);
                    opacity: 1;
                  }
                }
              `}</style>
            </main>
        </div>
    );
};

export default DashboardPage;
