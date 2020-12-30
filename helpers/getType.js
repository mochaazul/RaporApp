module.exports = function getType(type) {
    switch (typeof type) {
        case "number":
            return "INT"
        case "string":
            return "VARCHAR(255)"
        case "undefined":
            return "INT"
        default:
            return "INT"
    }
}