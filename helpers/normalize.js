

exports.normalizeBy = key => {
    return (data, item) => {
        data[item[key]] = item
        return data
    }
}