// const { default: inquirer } = require('inquirer')
const { default: ConfirmPrompt } = require('inquirer/lib/prompts/confirm')
const { inquirerMenu, pause, readInput, listTasksToDelete, confirm, showListChecklist } = require('./helpers/inquirer')
const { saveDB, readDB } = require('./helpers/saveFile')
const Tasks = require('./models/tasks')

require('colors')
// const {showMenu, pause} = require('./helpers/messages')

console.clear()



const main = async () => { 
    let option = ''   
    const tasks = new Tasks()

    const tasksDB = readDB()

    if(tasksDB){
        tasks.loadTasksFromArray(tasksDB)
    }

    do{
        option = await inquirerMenu()   

        switch(option.option){
            case '1':                
                const description = await readInput('Description: ')
                tasks.createTask(description)                
                break
            case '2':
                tasks.listAllTasks()
                break
            case '3':
                tasks.listCompletedTasks(true)
                break
            case '4':
                tasks.listCompletedTasks(false)
                break   
            case '5':
                const ids = await showListChecklist(tasks.listArr)
                
                tasks.toggleCompleted(ids)
                
                break
            case '6':
                const id = await listTasksToDelete(tasks.listArr)                
                // console.log({id})   
                
                if(id !== '0'){

                    const ok = await confirm('Are you sure?')
                    if(ok){
                        tasks.deleteTask(id)
                        console.log('Task deleted')
                    }
                }

                break
        }

        saveDB(tasks.listArr)

        await pause()
        
    }while(option.option !== '0')
}

main()