import instance from './instance'

import kanbanModule from './kanban'
import taskModule from './task'
import authModule from './auth'
import router from "@/router";

instance.interceptors.response.use({}, err => {
    if(err.response.status === 401 || err.response.status === 419) {
        const token = localStorage.getItem('x_xsrf_token')
        if(token) {
            localStorage.removeItem('x_xsrf_token')
        }
        router.push({name: 'user.login'})
    } else if (err.response.status >= 500) {
        console.log("Ошибка на сервере!")
        alert("На сервере ведутся работы! Приносим свои извинения!");
    } else if (err.response.status === 429) {
        console.log("Слишком много запросов")
        alert("Слишком много запросов");
    } else if(err.response.status === 422 && document.location.pathname === '/user/login'){// неверные данные для входа
        console.log("Неверный логин или пароль")
        alert("Неверный логин или пароль");
    } else if(err.response.status === 404){
        console.log("Ресурс не найден!")
        alert("Ресурс не найден!");
    }

    if(err.response.status === 422 && document.location.pathname === '/user/registration'){
        const objectErrors = err.response.data.errors;
        const keys = Object.keys(objectErrors);
        console.log(objectErrors[keys[0]][0])
        alert(objectErrors[keys[0]][0]);
    }
})

export default {
    kanban: kanbanModule(instance),
    task: taskModule(instance),
    auth: authModule(instance),
}
