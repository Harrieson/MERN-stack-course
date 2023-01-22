import React from 'react'
import { Link } from 'react-router-dom'

const Welcome = () => {
    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)
    const content = (
        <section className='welcome'>
            <p>{today}</p>
            <p>welcome</p>
            <p><Link to="/dashboard/notes">View Tech Notes</Link></p>
            <p><Link to="/dashboard/users" >View User Settings</Link></p>
        </section>
    )
    return content
}

export default Welcome