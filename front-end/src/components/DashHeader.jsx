import React from 'react'
import { Link } from 'react-router-dom'

const DashHeader = () => {
    const content = (
        <header className='dash-header'>
            <div className="dash-header__container">
                <Link to='/dash/notes'>
                    <h1 className="dash-header__title">Tech Notes</h1>
                </Link>
                <nav className="dash-header__nav">
                    {/* add nav buttons */}
                </nav>
            </div>
        </header>
    )
    return content
}

export default DashHeader