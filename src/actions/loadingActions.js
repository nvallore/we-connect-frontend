const showLoader = () => {
    return {
        type: "SHOW_LOADER"
    }
}

const hideLoader = () => {
    return {
        type: "HIDE_LOADER"
    }
}

export default {
    showLoader,
    hideLoader
}
