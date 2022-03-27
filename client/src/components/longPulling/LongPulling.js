import {Container} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import './LongPulling.scss'
import axios from "axios";

const LongPulling = () => {
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')

    const sendMessage = async () => {
        const data = {
            message: value,
            id: Date.now()
        }
        await axios.post('https://real-time-test-back.herokuapp.com/new-messages/', {
            ...data
        })
    }

    useEffect(() => {
        subscribe()
    }, [])

    const subscribe = async () => {
        try {
            const {data} = await axios.get('https://real-time-test-back.herokuapp.com/new-messages/')
            setMessages(prev => [data, ...prev])
            await subscribe()
        } catch (e) {
            setTimeout(() => {
                subscribe()
            }, 500)
        }
    }

    return (
        <div className="LongPulling">
            <div className="mb-3 mt-5">
                <label htmlFor="exampleFormControlInput1" className="form-label">Введите сообщение</label>
                <input
                    onChange={e => setValue(e.target.value)}
                    value={value}
                    type="text"
                    className="form-control"/>
            </div>
            <button
                onClick={sendMessage}
                type="button"
                className="btn btn-info">Отправить
            </button>
            <div className="bd-example">
                <table className="table">

                    <tbody>
                    {messages.map((message, i) => {
                        if (i % 2 === 0) {
                            return <tr key={message.id}>
                                <td></td>
                                <td className="table-primary">{message.message}</td>
                            </tr>
                        } else {
                            return <tr key={message.id}>
                                <td className="table-info">{message.message}</td>
                                <td></td>
                            </tr>
                        }
                    })}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default LongPulling