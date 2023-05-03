import { useEffect } from 'react'
import { cacheClear } from '../../api/TiltanicaApi';
import { Navigate } from 'react-router-dom';

export default function CacheClear() {

    useEffect( () => {
        cacheClear().then(data => {
            return <Navigate to="/" />
        })
    },[])

}