// Model is no longer used to control data. See router.
const model = {
    lists: [],
    toDos: [],
    currentList: ''
}

class List {
    static instanceCounter = 0

    constructor (title, description = null, creationDate) {
        this.title = title
        this.description = description
        this.creationDate = creationDate || new Date().toLocaleString()
        const id = List.instanceCounter
        List.instanceCounter++

        Object.defineProperty(this, 'id', {
            get: () => {return id}
        })
    }
}

class ToDo {
    static instanceCounter = 0

    constructor (title, membership, dueDate, creationDate) {
        this.title = title
        this.membership = membership
        this.dueDate = dueDate || 'NA'
        this.creationDate = creationDate || new Date().toDateString()
        this.completed = false
        const id = ToDo.instanceCounter
        ToDo.instanceCounter++
        
        Object.defineProperty(this, 'id', {
            get: () => {return id}
        })
    }
}

const lists = {
    retrieveLists() {
        const savedLists = JSON.parse(localStorage.getItem('lists'))
        if (!savedLists) return
        model.lists = savedLists.map(list => new List(list.title, list.description, list.creationDate))
    },
    
    retrieveCurrentList() {
        let savedCurrentList = localStorage.getItem('current list')
        savedCurrentList = (!savedCurrentList || !model.lists.length) ? this.createDefault() : savedCurrentList
        model.currentList = model.lists.find(list => list.title === savedCurrentList)
    },
    
    createDefault() {
        model.lists.unshift(new List('Have You?', 'This is your default list'))
        return 'Have You?'
    },

    saveLists() {
        localStorage.setItem('lists', JSON.stringify(model.lists))
    },

    saveCurrentList() {
        localStorage.setItem('current list', model.currentList.title)
    },
}

const toDos = {
    retrieveToDos() {
        const savedToDos = JSON.parse(localStorage.getItem('to-dos'))
        if (!savedToDos) return
        model.toDos = savedToDos.map(toDo => new ToDo(toDo.title, toDo.membership, toDo.dueDate, toDo.creationDate))
    },

    saveToDos() {
        localStorage.setItem('to-dos', JSON.stringify(model.toDos))
    },
}

const dataHandler = {
    retrieveAll() {
        lists.retrieveLists()
        lists.retrieveCurrentList()
        toDos.retrieveToDos()
    },

    saveAll() {
        lists.saveLists()
        lists.saveCurrentList()
        toDos.saveToDos()
    }
} 

export { model, ToDo, List, toDos, lists, dataHandler }