# csvwrap
Simple CLI tool: CSV -> JS
## Install
```sh
npm i csvwrap -g
```
## Use
```sh
csvwrap
```
It will create `.js` file for each `.csv` file.
## Example
### Source CSV
data.csv
```csv
Name, Age
Foo, 10
Bar, 20
Baz, 11
```
### Output
data.js
```js
module.exports = [{"Name":"Foo","Age":"10"},{"Name":"Bar","Age":"20"},{"Name":"Baz","Age":"11"}]
```
## TODO
- [ ] Custom separator
- [ ] `.d.ts`
- [ ] Stream
- [ ] Filter option
