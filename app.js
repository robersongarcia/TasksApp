// const { default: inquirer } = require('inquirer')
const { inquirerMenu, pause, readInput } = require('./helpers/inquirer')
const { saveDB } = require('./helpers/saveFile')
const Tasks = require('./models/tasks')

require('colors')
// const {showMenu, pause} = require('./helpers/messages')

console.clear()



const main = async () => { 
    let option = ''   
    const tasks = new Tasks()
    do{
        option = await inquirerMenu()   

        switch(option.option){
            case '1':                
                const description = await readInput('Description: ')
                tasks.createTask(description)                
                break
            case '2':
                console.log(tasks._list)
                break
        }

        saveDB(tasks.listArr)

        await pause()
        
    }while(option.option !== '0')
}

main()