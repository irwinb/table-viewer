# Azure Table Viewer

To start in live mode:

```bash
$ npm run dev
```

## Architecture
This app is build around the components provided by [material-ui](https://github.com/callemall/material-ui). We try to compose instead of extending as often as possible.


### Components
All built-in components are prefixed with `T`.

##### TTable
Our base table component. Given an array of entries, it will render a row of the given type. This means that not only is `TTable` given the data to display, but also how to render each entry in the data. You do this by providing a react component usin gthe `rowType` property.

###### Props
* `entries`  an array containing the data to render
* `rowType`  the react component to use for each row of data

##### TTextRow
A built in row renderer.