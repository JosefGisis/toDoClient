import { controller } from '../controller/controller.js'

const toggler = {
    toggleChangeList() {
        changeListView.toggleForm()
        newListView.cancel()
        deleteListView.cancel()
    },

    toggleNewList() {
        changeListView.cancel()
        newListView.toggleForm()
        deleteListView.cancel()
    },

    toggleDeleteList() {
        changeListView.cancel()
        newListView.cancel()
        deleteListView.toggleForm()
    }
}

const changeListView = {
    init() {
        this.changeList = document.getElementById('change-list')
        this.changeListButton = document.getElementById('change-list-button')
        this.changeListCancel = document.getElementById('change-list-cancel')
        this.changeListSubmit = document.getElementById('change-list-submit')
        this.listChangeMenu = document.getElementById('list-change-menu')
    },
    
    createEventListeners() {
        this.changeListButton.addEventListener('click', () => toggler.toggleChangeList())
        this.changeListCancel.addEventListener('click', () => this.cancel())
        this.changeListSubmit.addEventListener('click', () => this.handleSubmission())
    },
    
    handleSubmission() {
        const lists = controller.getLists()
        const index = lists.findIndex((list) => list.id === Number(this.listChangeMenu.value.split(' ')[0]) - 1)
        controller.changeCurrentList(index)
        changeListView.cancel()
    },

    displayLists(data) {
        const lists = data

		const currentList = controller.getCurrentList()
		this.listChangeMenu.innerHTML = ''

		for (let list of lists) {
			const option = document.createElement('option')
			option.textContent = `${list.id} ${list.title}`
			if (list.id === currentList.id) option.selected = option.disabled = true
			this.listChangeMenu.appendChild(option)
		}
	},

	toggleForm() {
		if (this.changeList.classList.contains('hidden')) {
			this.changeList.classList.replace('hidden', 'block')
		} else this.changeList.classList.replace('block', 'hidden')
	},

	cancel() {
		this.changeList.classList.replace('block', 'hidden')
	},
}

const newListView = {
    init() {
        this.newList = document.getElementById('new-list')
        this.newListButton = document.getElementById('new-list-button')
        this.newListCancel = document.getElementById('new-list-cancel')
        this.newListSubmit = document.getElementById('new-list-submit')
        this.newListTitle = document.getElementById('new-list-title')
        this.newListDescription = document.getElementById('new-list-description')
    },
    
    createEventListeners() {
        this.newListButton.addEventListener('click', () => toggler.toggleNewList())
        this.newListCancel.addEventListener('click', () => this.cancel())
        this.newListTitle.addEventListener('input', () => this.checkTitleField())
        this.newListSubmit.addEventListener('click', () => this.handleSubmission())
    },
    
    checkTitleField() {
        this.newListSubmit.style.backgroundColor = this.newListTitle.value ? 'rgb(14 165 233)' : 'rgb(7, 89, 133)'
        this.newListSubmit.disabled = this.newListTitle.value ? false : true
    },

    handleSubmission() {
        controller.newList(this.newListTitle.value, this.newListDescription.value)
        this.cancel()
    },
    
	toggleForm() {
        if (this.newList.classList.contains('hidden')) {
            this.newList.classList.replace('hidden', 'block')
			this.checkTitleField()
        } else this.newList.classList.replace('block', 'hidden')
	},
    
	cancel() {
        this.newList.classList.replace('block', 'hidden')
		this.clearFields()
	},

    clearFields() {
        this.newListTitle.value = this.newListDescription.value = ''
    }
}

const deleteListView = {
    init() {
        this.deleteList = document.getElementById('delete-list')
        this.deleteListButton = document.getElementById('delete-list-button')
        this.deleteListForm = document.getElementById('change-list-form')
        this.deleteListCancel = document.getElementById('delete-list-cancel')
        this.deleteListSubmit = document.getElementById('delete-list-submit')
    },
    
    createEventListeners() {
        this.deleteListButton.addEventListener('click', () => toggler.toggleDeleteList())
        this.deleteListCancel.addEventListener('click', () => this.cancel())
        this.deleteListSubmit.addEventListener('click', () => this.handleSubmission())
    },
    
    handleSubmission() {
        if (controller.getCurrentToDos()) controller.deleteCurrentToDos()
        if (controller.getCurrentList().id !== 0) controller.deleteCurrentList()
        this.cancel()
    },

    toggleForm() {
        if (this.deleteList.classList.contains('hidden')) this.deleteList.classList.replace('hidden', 'block')
        else this.deleteList.classList.replace('block', 'hidden')
    },

    cancel() {
        this.deleteList.classList.replace('block', 'hidden')
    },
} 

export {changeListView, newListView, deleteListView}