import styles from './Message.module.css'
import {userState, userEffect} from 'react'

function Message({type, msg}){

    const [visible, setVisible] = userState(false)

    userEffect(() => {
        if(!msg){
            setVisible(false)
            return
        }

        setVisible(true)
        
        const timer = setTimeout(()=>{
            setVisible(false)
        }, 3000)

        return () => clearTimeout(timer)

    }, [msg])

//fragment <></> ajuda a criar o if
    return (<> 
        {visible && (
            <div className = {`${styles.message} ${styles[type]}`}> {msg}</div>
        )}

        
    </>)
}

export default Message