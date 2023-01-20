import { Link } from 'react-router-dom'
import React from 'react'

const Public = () => {
    const content = (
        <section className='public'>
            <header>
                <h1>Welcome to <span className='nowrap'>Master G Shop</span></h1>
            </header>
            <main className='public__main'>
                <p>Located in beautiful downtown. Welcome for consultancy and onsite repairs</p>
                <address className='public__addr'>
                    Master G Repairs <br />
                    435 Downtown <br />
                    Nrb Central 2423 <br />

                    <a href="tel:+25412345678">+24312345678</a>
                </address>
                <br />
                <p>Owner: Master G Ent</p>
            </main>
            <footer>
                <Link to='/login'>Employee Login</Link>
            </footer>
        </section>
    )
    return content
}

export default Public