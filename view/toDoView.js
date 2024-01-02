import { controller } from '../controller/controller.js'

const toDoView = {
	init() {
		this.toDoSection = document.getElementById('todo-section')
	},
	
    index() {
		this.completeToDoIcons = document.querySelectorAll('.complete-todo-icon')
		this.deleteToDoIcons = document.querySelectorAll('.delete-todo-icon')
		this.completeToDoIcons.forEach((icon, index) => icon.addEventListener('click', () => {this.completeToDo(index)}))
		this.deleteToDoIcons.forEach((icon, index) => icon.addEventListener('dblclick', () => {this.deleteToDo(index)}))
	},
	
	completeToDo(index) {
		const toDos = controller.getToDos()
		const currentToDos = controller.getCurrentToDos()
		const toDoIndex = toDos.findIndex(({ id }) => id === currentToDos[index].id)
		controller.completeToDo(toDoIndex)
	},
	
	deleteToDo(index) {
		const toDos = controller.getToDos()
		const currentToDos = controller.getCurrentToDos()
		const toDoIndex = toDos.findIndex(({ id }) => id === currentToDos[index].id)
		controller.deleteToDo(toDoIndex)
	},

	checkOverdue(date) {
		if (date === 'NA') return false
		
		const dueDate = new Date(`${date}T00:00:00`)
		const currentDate = new Date()
		currentDate.setHours(0, 0, 0, 0)
		return (dueDate >= currentDate) ? false : true
	}, 

	display(data) {
		const toDos = data
        this.toDoSection.innerHTML = ''
		
		if (toDos.length) {
			for (let toDo of toDos) {
				const overDue = this.checkOverdue(toDo.dueDate)
				const toDoHTML = `
					<div class="rounded-lg | bg-slate-800 | transition-all | p-3 mb-5 hover:bg-slate-600 ${ toDo.completed ? 'bg-slate-600' : '' }">
	
						<div class="py-1">
							<h3 class="rounded-lg | text-2xl font-bold | my-2 | ${ toDo.completed ? 'line-through text-rose-400' : '' }">${toDo.title}</h3>
							<p class="text-sm | my-2"><i>Created: ${toDo.creation_date}</i></p>
						</div>
						
						<div class="my-2"><hr class="border-1 border-solid border-sky-500"></div>
						
						<div class="flex flex-row content-center justify-between flex-wrap">
							
							<div class="flex items-center | min-w-[10rem] | text-lg | my-2 ">
								<p class="after:text-sm after:italic after:ml-1 ${overDue && !toDo.completed ? "after:content-['overdue_>:_(']" : "" }">
									Due: 
									<span class="text-white text-bold | p-1 rounded-md | ${ overDue && !toDo.completed ? 'bg-rose-500': 'bg-green-700'}">
										${ toDo.due_date } 
									</span>
								</p>
							</div>
	
							<div class="flex items-center">
								
								<div class="flex items-center | my-2 mr-4">
									<h3 class="text-lg">complete</h3>
									<div class="border-2 rounded-md | h-fit ml-2">
										<div class="complete-todo-icon | p-2 rounded-md | bg-slate-700 hover:bg-slate-800 | transition-all">
											<div>
												<img src="/images/checkbox.svg" alt="checkbox icon" class="w-4 h-5">
											</div>
											<div class="absolute translate-y-[-1.475rem] translate-x-[0.075rem] | ${ toDo.completed ? 'opacity-100' : 'opacity-0' } | transition-all">
												<img src="/images/checkmark.svg" width="20px" height="20px" alt="checkmark" class="w-5 h-5">
											</div>
										</div>  
									</div>
								</div>
								
								<div class="flex items-center | my-2">
									<h3 class="text-lg text-rose-500">delete&lt!&gt</h3>
									<div class="border-2 rounded-md | h-fit ml-2">
										<div class="delete-todo-icon | p-2 rounded-md | bg-slate-700 hover:bg-slate-800 | transition-all">
											<img src="/images/delete-icon.svg" alt="icon for new list button" class="h-5 w-3.5">   
										</div>      
									</div>
								</div>

							</div>

						</div>

					</div>
				`
				const parser = new DOMParser()
				this.toDoSection.appendChild(parser.parseFromString(toDoHTML, 'text/html').body.firstChild)
			}
		} else {
			const toDoHTML = `
			<div class="mt-10 mb-8">
				<h2 class="text-center text-2xl font-bold | my-4">This list is empty.</h2>
				<h2 class="text-center text-xl">Create a new to-do to get started.<h2>
			</div>
			`
			const parser = new DOMParser()
			this.toDoSection.appendChild(parser.parseFromString(toDoHTML, 'text/html').body.firstChild)
		}
		this.index()
	}
}

export { toDoView }