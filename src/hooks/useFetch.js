import { useState, useEffect } from 'react'
import getExchange from '../api/coingecko'

const useFetchExhange = (name) => {
    const [state, setState] = useState({
        data: {},
        loading: true
    })

    useEffect(() => {
        getExchange(name).then(item => {
            setState({
                data: item,
                loading: false
            })
        })
    }, [])

    return state;
}

export default useFetchExhange