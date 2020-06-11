# ExtendScript BatchPlay logger

This code, when used in an ExtendScript project, and calls replaced by the given methods, will print out all `executeAction` and `executeActionGet` methods in batchPlay format.

## Usage

Call the `ad-to-uxp.jsx` file using $.evalFile method in ExtendScript:

```
var mainScriptPath = Folder($.fileName).parent.parent ; 
$.evalFile(new File(mainScriptPath + '/ad-to-uxp.jsx'));
```

And replace all the calls to `executeAction` and `executeActionGet` with `executeActionForUXP` and `executeActionGetForUXP`. Mind the string matching for executeActionGets so you don't end up with `executeActionForUXPGetForUXP`.

Now, when you run an extendscript like this:

```
var ref = new ActionReference();
ref.putProperty(charIDToTypeID('Prpr'), charIDToTypeID("Nm  "));
ref.putIndex(charIDToTypeID('Lyr '), 1);
executeActionGetForUXP(ref);    
```

You will get a print out like this, and your script will continue to function.

```
require('photoshop').action.batchPlay([{ "_obj": "get", "_target":{ "_ref": [{ "_property": "name" }, { "_ref": "layer", "_index": 1" }]} }], {})
```