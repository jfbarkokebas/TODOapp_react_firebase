import { async } from '@firebase/util'

import { useState, useEffect } from 'react'
import { auth } from '../firebaseConection'
import { Navigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'

const Private = ({ children }) => {

    const [loading, setLoading] = useState(true)
    const [isSigned, setIsSigned] = useState(false)

    useEffect(() => {

        async function checkSigned() {

            const unsub = onAuthStateChanged(auth, user => {
                if (user) {
                    
                    const userData = {
                        uid: user.uid,
                        email: user.email
                    }

                    localStorage.setItem("@detailUser", JSON.stringify(userData))
                    
                    setLoading(false)
                    setIsSigned(true)

                } else {
                    setLoading(false)
                    setIsSigned(false)
                }
            })            
        }

        checkSigned()

    }, [])

    if(loading){
        return(
            <div></div>
        )
    }

    if(!isSigned){
       return <Navigate to = '/'/>
    }

    return children
}

export default Private