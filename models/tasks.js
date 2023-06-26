const Task = require("./task")

class Tasks {

    _list = {}

    get listArr() {
        const list = []
        Object.keys(this._list).forEach(key => {
            const task = this._list[key]
            list.push(task)
        })
        return list
    }

    constructor() {
        this._list = {}
    }

    createTask(description = '') {
        const task = new Task(description)
        this._list[task.id] = task
    }

    loadTasksFromArray(tasks = []) {
        tasks.forEach(task => {
            this._list[task.id] = task
        })
    }

    listAllTasks(){
        console.log()
        this.listArr.forEach((task, i) => {
            const idx = `${i + 1}.`.green
            const {description, completedIn} = task
            const state = (completedIn) ? 'Completed'.green : 'Pending'.red
            console.log(`${idx} ${description} :: ${state}`)
        })
    }

    listCompletedTasks(completed = true){
        console.log()
        let counter = 0
        this.listArr.forEach(task => {
            const {description, completedIn} = task
            const state = (completedIn) ? 'Completed'.green : 'Pending'.red
            if(completed){
                if(completedIn){
                    counter += 1
                    console.log(`${(counter + '.').green} ${description} :: ${completedIn.green}`)
                }
            }else{
                if(!completedIn){
                    counter += 1
                    console.log(`${(counter + '.').green} ${description} :: ${state}`)
                }
            }
        })
    }    

    deleteTask(id = ''){
        if(this._list[id]){
            delete this._list[id]            
        }
    }

    toggleCompleted(ids = []){
        ids.forEach(id => {
            const task = this._list[id]
            if(!task.completedIn){
                task.completedIn = new Date().toISOString()
            }
        })

        this.listArr.forEach(task => {
            if(!ids.includes(task.id)){
                this._list[task.id].completedIn = null
            }
        })
    }


}

module.exports = Tasks