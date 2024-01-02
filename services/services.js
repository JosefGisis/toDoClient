const services = {
    async fetchUsers() {
        return fetch('http://localhost:3000/api/users')
            .then(res => {return res.json()})
            .then(data => {return data})
            .catch(err => console.log(err))
    },
    
    async fetchLists() {
        try {
            const response = await fetch('http://localhost:3000/api/lists')
            if (!response.ok) throw new Error('error fetching data')
            const data = await response.json()
            return data
        } catch (err) {
            console.log(err)
        }
    },

    async fetchToDos() {
        try {
            const response = await fetch('http://localhost:3000/api/to_dos')
            if (!response.ok) throw new Error('error fetching data')
            const data = await response.json()
            return data
        } catch (err) {console.log(err)}
    }
}

export { services }
