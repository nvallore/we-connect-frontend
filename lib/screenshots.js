async function takeScreenshot(element){
    let encodedString = await element.takeScreenshot()
    return encodedString
}

module.exports = {
    takeScreenshot
}