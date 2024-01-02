import { controller } from '../controller/controller.js'

// Current list element handler. Responsible for displaying current list.
const listView = {
	init() {
		this.currentListSection = document.getElementById('current-list-section')
	},

	display() {
		const currentList = controller.getCurrentList()
		this.currentListSection.innerHTML = ''
		const currentListHTML = `
        <div>
          <h3 class="w-fit rounded-lg | bg-sky-500 | text-4xl font-bold | p-3  mb-5">${currentList.title}</h3>
          <p class=""><i>Created: ${currentList.creationDate}</i></p>
          <h4 class="text-2xl font-semibold my-2">${currentList.description}</h4>
        </div>
        `
		const parser = new DOMParser()
		this.currentListSection.appendChild(parser.parseFromString(currentListHTML, 'text/html').body.firstChild)
	},
}

export { listView }
