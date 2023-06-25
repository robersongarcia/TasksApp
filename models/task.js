const { v4: uuidv4 } = require('uuid')

class Task{
    id = '';
    description = ''
    completedIn = null

    constructor(description){
        this.description = description
        this.id = uuidv4()
    }
    
}

module.exports = Task