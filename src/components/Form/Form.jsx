import { useCallback, useEffect, useState } from "react";

import "./Form.css"
import useTelegram from "../../hooks/useTelegram";

const Form = () => {
    const [country, setCountry] = useState("")
    const [street, setStreet] = useState("")
    const [select, setSelect] = useState("single")
    const {tg} = useTelegram()

    const onSendData = useCallback(() => {
        const data = {
            country,
            street,
            select
        }
        tg.sendData(JSON.stringify(data))
    }, [country, street, select, tg])

    useEffect(() => {
        tg.onEvent("mainButtonClicked", onSendData)

        return () => {
            tg.offEvent("mainButtonClicked", onSendData)
        }
    }, [tg, onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: "Send"
        })
    }, [tg])

    useEffect(() => {
        if (!country || !street) {
            tg.MainButton.hide()
        } else {
            tg.MainButton.show()
        }
    }, [tg, country, street])

    const onChangeCountry = (e) => setCountry(e.target.value)
    const onChangeCity = (e) => setStreet(e.target.value)
    const onChangeSelect = (e) => setSelect(e.target.value)

    return (
        <form className="form">
            <h3>Enter your data</h3>
            <input type="text" className="input" placeholder="Country" value={country} onChange={onChangeCountry} />
            <input type="text" className="input" placeholder="Street" value={street} onChange={onChangeCity} />
            <select className="select" value={select} onChange={onChangeSelect}>
                <option value="single">Single</option>
                <option value="multiple">Multiple</option>
            </select>
        </form>
    )
}

export default Form;