export default {
    install(app) {
        app.provide('getDateTime', () => {
            let today = new Date()
            return String(today.getDate()).padStart(2, '0') + '.' +
                String(today.getMonth() + 1).padStart(2, '0') + '.' +
                today.getFullYear()  + ' ' +
                String(today.getHours()).padStart(2, '0')  + ':' +
                String(today.getMinutes()).padStart(2, '0')
        })
        app.provide('toLowerCaseBesidesFirst', (string) => {
            return string[0] + string.slice(1).toLowerCase()
        })
    }
}