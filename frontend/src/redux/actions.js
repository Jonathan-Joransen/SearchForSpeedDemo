export function loadPages(pages) {
    return {
        type: 'LOAD_PAGES',
        pages
    }
}
export function loadPosts(posts) {
    return {
        type: 'LOAD_POSTS',
        posts
    }
}

export function loginUser(user) {
    return {
        type: 'LOGIN_USER',
        user
    }
}

export function setUser(user) {
    return {
        type: 'SET_USER',
        user
    }
}

export function setLikedCars(likedCars) {
    return {
        type: 'SET_LIKED_CARS',
        likedCars
    }
}

export function setSearches(email) {
    return {
        type: 'SET_SEARCHES',
        email
    }
}
export function logoutUser(user) {
    return {
        type: 'LOGOUT_USER',
        user
    }
}
