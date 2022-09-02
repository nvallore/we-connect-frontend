const loader = (state = false, action) => {
    switch(action.type){
        case "SHOW_LOADER":
            return true
        case "HIDE_LOADER":
            return false
        default: 
            return state
    }
}

export default loader