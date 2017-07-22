function reducer(state, action) {
    switch (action.type) {
        case 'CHANGE_IMG':
            return Object.assign({}, state, {
                img: action.img
            })
        case 'CHANGE_NOW':
            return Object.assign({}, state, {
                statenow: action.statenows
            })
        case 'CHANGE_COMING':
            return Object.assign({}, state, {
                statecome: action.statecoming
            })
        case 'CHANGE_FILMNOW':
            return Object.assign({}, state, {
                filmnow: action.filmnows
            })
        case 'CHANGE_FILMCOMING':
            return Object.assign({}, state, {
                filmcoming: action.filmcomings
            })
        case 'CHANGE_AREA':
            return Object.assign({}, state, {
                cinema: action.cinema
            })
        case 'CHANGE_DETAILS':
            return Object.assign({}, state, {
                detail: action.detail
            })
         case 'CHANGE_TXT':
            return Object.assign({}, state, {
                txt: action.txt
            })
            case 'CHANGE_TITLE':
            return Object.assign({}, state, {
                title: action.title
            })
            case 'CHANGE_USERNAME':
            return Object.assign({}, state, {
                username: action.username
            })
            case "CHANGE_TITLESSSS":
            return Object.assign({}, state, {
                titless: action.data
            })
        default:
            return state;
    }
}

export default reducer;