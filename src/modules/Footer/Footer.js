import React from 'react'
import './footer.css'
import wpp from '../Navbar/assets/whatsapp.ico'
import tw from '../Navbar/assets/twitter.ico'
import ig from '../Navbar/assets/instagram.ico'
import fb from '../Navbar/assets/facebook.ico'


const Footer = () => {
    return (
        <div className='footer'>
            <div className="footer-items">
        
                <div className="redes">
                    <h5>Contactanos por nuestras redes</h5>
                    <div className="redes-items">
                        <img src={wpp} alt="" />
                        <img src={tw} alt="" />
                        <img src={ig} alt="" />
                        <img src={fb} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
