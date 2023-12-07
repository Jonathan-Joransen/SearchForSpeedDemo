
class User {
    constructor(firstName, lastName, sub, email, password, loggedIn) {
        this.firstName = firstName
        this.lastName = lastName
        this.password = password
        this.sub = sub
        this.email = email
        this.loggedIn = loggedIn
    }
}

export default User;