const { program } = require("commander")
const globby = require("globby")
const fs = require("fs")
const util = require("util")

const read = util.promisify(fs.readFile)
const write = util.promisify(fs.writeFile)

const parse = csv => {
    let items = csv.split("\n")
    let label = items.splice(0, 1)[0].split(",").map(x => x.trim())
    return items.map(item => 
        item.split(",")
            .reduce( (data, current, i) => {
                data[label[i]] = current.trim()
                return data
            }, {} )
    )
}

module.exports = async () => {
    program
        .option("-x, --xx [word]", "X")

        .parse(process.argv)

        const files = await globby("**/*.csv")
        const data = await Promise.all(files.map(file => read(file, "utf-8")))
        data.forEach((datum, i) => {
            write(files[i].replace(/(.*)\.csv/, "$1.js"), 
                `module.exports = ${JSON.stringify(parse(datum))}`
            )
        } )
}