import React from 'react'
import '../styles/Header.css'

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-title">
          <svg className="header-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          <h1 className="header-text">Restaurant Finder</h1>
        </div>
      </div>
    </header>
  )
}

