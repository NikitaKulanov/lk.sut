export default {
    install(app) {
        app.provide('errHandler', async (action, errHandler, message) => {
            try {
                await action()
                return true
            } catch (error) {
                if (errHandler) {
                    errHandler (error)
                    return false
                } else {
                    let response = error.response
                    alert(
                        response?.data?.message
                            ? response.data.message
                            : 'Ошибка на сервере! Приносим свои извинения!' + ' ' + message
                    )
                    console.log(error)
                    return false
                }
            }
        })
        // app.provide.$errorHandler = async (action, errHandler) => {
        //     try {
        //         await action()
        //     } catch (error) {
        //         if (errHandler) {
        //             errHandler (error)
        //         } else {
        //             console.log(error.response.data)
        //         }
        //     }
        // }
    }
}
