Forked from https://github.com/alhazmy13/angular-csv-ext

# SimpleCSV | Export to CSV in JS/TS

> A helper library for creating CSV files in javascript projects.

## Installation 

```javascript
npm install simple-csv-js
```

## Example 
```javascript

import { SimpleCsv } from 'simple-csv-js';

var data = [
  {
    name: "Test 1",
    age: 13,
    average: 8.2,
    approved: true,
    description: "using 'Content here, content here' "
  },
  {
    name: 'Test 2',
    age: 11,
    average: 8.2,
    approved: true,
    description: "using 'Content here, content here' "
  },
  {
    name: 'Test 4',
    age: 10,
    average: 8.2,
    approved: true,
    description: "using 'Content here, content here' "
  },
];

new SimpleCsv(data, 'My Report');

```

## API | **SimpleCsv(data, filename, options)**


| Option        | Default           | Description  |
| :------------- |:-------------:| -----|
| **fieldSeparator**      | , | Defines the field separator character |
| **quoteStrings**      | "      | If provided, will use this characters to "escape" fields, otherwise will use double quotes as deafult |
| **decimalseparator** | .      | Defines the decimal separator character (default is .). If set to "locale", it uses the [language sensitive representation of the number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString).|
| **showLabels** | false      | If provided, would use this attribute to create a header row |
| **showTitle** | false      |   |
| **useBom** | true      | If true, adds a BOM character at the start of the CSV |
| **useHeader** | false      | If true, only fields listed in header will be exported in CSV |
| **noDownload** | false      | If true, disables automatic download and returns only formatted CSV |
| **nullToEmptyString** | false      | If true, all null values will be changed to empty strings |


## Options Example

```javascript
  var options = { 
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true, 
    showTitle: true,
    title: 'Your title',
    useBom: true,
    noDownload: true,
    headers: ["First Name", "Last Name", "ID"],
    useHeader: false,
    nullToEmptyString: true,
  };

  SimpleCsv(data, filename, options);

```