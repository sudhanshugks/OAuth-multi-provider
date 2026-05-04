import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [time, setTime] = useState(new Date());
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/api/user', { withCredentials: true })
            .then(res => { setUser(res.data); setLoading(false); })
            .catch(() => navigate('/login'));
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, [navigate]);

    const handleLogout = () => {
        axios.post('http://localhost:8080/logout', {}, { withCredentials: true })
            .finally(() => navigate('/login'));
    };

    const greeting = () => {
        const h = new Date().getHours();
        if (h < 12) return '🌅 Good Morning';
        if (h < 17) return '☀️ Good Afternoon';
        return '🌙 Good Evening';
    };

    if (loading) return (
        <div className="dash-loader">
            <div className="loader-ring" />
            <span>Loading your workspace...</span>
        </div>
    );

    // Fallback user for demo purposes if backend data is empty
    const displayUser = user?.name ? user : {
        name: "Demo User",
        email: "demo.user@example.com",
        login: null,
        avatar: "https://ui-avatars.com/api/?name=Demo+User&background=6366f1&color=fff&size=128"
    };

    return (
        <div className="dash-page">
            <div className="blob b1" /><div className="blob b2" />

            <div className="dash-wrap">
                {/* Top bar */}
                <header className="topbar">
                    <div className="topbar-brand">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#818cf8" strokeWidth="1.5" strokeLinejoin="round" />
                            <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#a5b4fc" strokeWidth="1.5" strokeLinejoin="round" />
                        </svg>
                        <span>AuthPortal</span>
                    </div>
                    <div className="topbar-time">
                        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </div>
                    <button className="topbar-logout" onClick={handleLogout}>Sign Out ↗</button>
                </header>

                {/* Hero */}
                <section className="hero">
                    <p className="greeting">{greeting()}</p>
                    <h1 className="hero-name">{displayUser.name}</h1>
                    <p className="hero-sub">You're securely signed in via OAuth 2.0</p>
                </section>

                {/* Profile card + stats */}
                <div className="grid">
                    <div className="profile-card">
                        <div className="avatar-wrap">
                            <img
                                src={displayUser.avatar}
                                alt="avatar"
                                className="avatar"
                            />
                            <div className="status-dot" />
                        </div>
                        <h2 className="p-name">{displayUser.name}</h2>
                        <p className="p-email">{displayUser.email || displayUser.login}</p>
                        <div className="badge-row">
                            <span className="badge verified">✓ Verified</span>
                            <span className="badge active">● Active</span>
                        </div>
                    </div>

                    <div className="info-panel">
                        <div className="info-row">
                            <div className="info-icon">👤</div>
                            <div>
                                <p className="i-label">Full Name</p>
                                <p className="i-val">{displayUser.name}</p>
                            </div>
                        </div>
                        <div className="info-row">
                            <div className="info-icon">✉️</div>
                            <div>
                                <p className="i-label">Email Address</p>
                                <p className="i-val">{displayUser.email}</p>
                            </div>
                        </div>
                        {displayUser.login && (
                            <div className="info-row">
                                <div className="info-icon">🐙</div>
                                <div>
                                    <p className="i-label">GitHub Username</p>
                                    <p className="i-val">@{displayUser.login}</p>
                                </div>
                            </div>
                        )}
                        <div className="info-row">
                            <div className="info-icon">🔐</div>
                            <div>
                                <p className="i-label">Auth Method</p>
                                <p className="i-val">{displayUser.login ? 'GitHub OAuth 2.0' : 'Google OAuth 2.0'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <p className="footer">🔒 Session secured · Spring Boot + React OAuth2</p>
            </div>
        </div>
    );
}