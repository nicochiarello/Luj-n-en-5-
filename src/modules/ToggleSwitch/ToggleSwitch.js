import React,{useState} from 'react'
import './toggleSwitch.css'

const ToggleSwitch = () => {
    const [switchLight ,setSwitchLight] = useState(true)


    return (
        <div onClick={()=>setSwitchLight(!switchLight)} className={switchLight ? 'toggle' : 'toggle night' } >
           <div className='notch'>
               <div className='crater'></div>
               <div className='crater'></div>
           </div>
           <div>
                <div className='shape sm'></div>
                <div className='shape sm'></div>
                <div className='shape md'></div>
                <div className='shape lg'></div>
           </div>

        </div>
    )
}

export default ToggleSwitch
