const { program } = require("commander")

const parse = csv => {
    let items = data.split("\n")
    let label = items.splice(0, 1)[0].split(",").map(x => x.trim())
    return items.map(item => 
        item.split(",")
            .reduce( (data, current, i) => {
                data[label[i]] = current.trim()
                return data
            }, {} )
    )
}

module.exports = () => {
    program
        .option("-x, --xx [word]", "X")

        .parse(process.argv)
        console.log(program.xx)
}