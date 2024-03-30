# Setup

## 1. Download the Code
Green `< > Code` button -> `Download ZIP`

Unzip it

## 2. Download node.js
https://nodejs.org

## 3. Download `forever` and `http-server` module
Open `cmd/powershell` and enter

`npm i forever http-server -g`

## 4. Init `./archive-server`
`Shift + Right Click` at the background of the folder -> `Open PowerShell window here` and enter

`cd ./archive-server`

`npm i`

## 5. Win + R, Find 'taskschd.msc' (Optional)
Add a schedule to run `run.cmd` on `Logon` (search for google for details)

## 6. Go to 'chrome://extensions/'
Add the entire folder by `Load unpacked` button

## 7. Modify `run.cmd`

1st line: `[Name of the current drive]` (ex: `C:`)

2nd line: `cd [the location of folder]` (ex: `cd C:/auto-web-archiver`)

## 8. Execute `run.cmd`
If you created a schedule at 5., you won't need to execute it next time.

## 9. Check if visited pages are archived in `./archive` folder
May take ~50sec

Open `index.html`

# Tips
**Some archives may need to be opened using other methods**

## 1. CROS error
`Shift + Right Click` at the background of the folder -> `Open PowerShell window here` and enter

`npx http`

Open the link in the console (usually `http://192.168.0.8:8080/`)

## 2. Broken render
Disable javascript in the browser settings

And open `index.html`
