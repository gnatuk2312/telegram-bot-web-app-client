const useTelegram = () => {
    const tg = window.Telegram.WebApp

    const onClose = () => tg.close()

    const onToggleButton = () => {
        if (tg.MainButton.isVisible) {
            tg.MainButton.hide()
        } else {
            tg.MainButton.show()
        }
    }

    return {
        tg,
        onClose,
        onToggleButton,
        user: tg.initDataUnsafe?.user,
        queryId: tg.initDataUnsafe?.query_id,
    }
}

export default useTelegram;