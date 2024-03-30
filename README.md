## 1. Download the Code
Green `< > Code` button -> Download ZIP

Unzip it

## 2. Download node.js
https://nodejs.org

## 3. Download `forever` module
`npm i forever -g`

## 4. Init `./archive-server`
`cd ./archive-server`
`npm i`

## 5. Win + R, Find 'taskschd.msc'
Add a schedule to run `run.cmd` on `Logon` (search for google for details)

## 6. Go to 'chrome://extensions/'
Add the entire folder by `Load unpacked` button

## 7. Modify 'run.cmd'

1st line: `[Name of the current drive]` (ex: `C:`)

2nd line: `cd [the location of folder]` (ex: `cd C:/auto-web-archiver`)

## 8. Execute `run.cmd`
If you created a schedule at 3., you won't need to execute it next time.

## 9. Check pages are archived at `./archive` folder
