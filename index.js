const { program } = require("commander")
const globby = require("globby")
const fs = require("fs")
const util = require("util")

const read = util.promisify(fs.readFile)
const write = util.promisify(fs.writeFile)

const parse = (csv, numberize) => {
    let items = csv.trim().split("\n")
    let label = items.splice(0, 1)[0].split(",").map(x => x.trim())
    return {label, data: items.map(
        item => 
            item.split(",")
                .map(
                    x => {
                        const data = x.trim()
                        return numberize 
                            ? (isNaN(data) ? data : Number(data)) 
                            : data
                    }
                )
    )}
}

const target = {
    require: input => `module.exports=${input}`,
    es: input => `export default ${input}`,
}

module.exports = async () => {
    program
        .version("0.2.2")
        .option("-t, --target <target>", "module export type (require or es)")
        .option("-n, --numberize", "numberize data")
        .parse(process.argv)

        const files = await globby("**/*.csv")
        const data = await Promise.all(files.map(file => read(file, "utf-8")))
        data.forEach((datum, i) => {
            write(files[i].replace(/(.*)\.csv/, "$1.js"), 
                target[program.target || "require"](JSON.stringify(parse(datum, program.numberize)))
            )
        } )
}