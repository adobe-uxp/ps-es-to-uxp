var mainScriptPath = Folder($.fileName).parent.parent ; 
var scriptFile = new File(mainScriptPath + '/ad-to-uxp.jsx')
$.evalFile(scriptFile);
cTID = charIDToTypeID;
sTID = stringIDToTypeID;

// Alias
var listAlias = new ActionList();
listAlias.putPath(mainScriptPath);
listAlias.putPath(scriptFile);
$.writeln(listAlias.toUXP());

// Boolean
var listBool = new ActionList();
listBool.putBoolean(true)
listBool.putBoolean(false)
$.writeln(listBool.toUXP())

var listClass = new ActionList();
listClass.putClass(cTID('Lyr '));
listClass.putClass(cTID('capp'));
$.writeln(listClass.toUXP());

var listDouble = new ActionList();
listDouble.putDouble(3.14523);
listDouble.putDouble(1.61819);
$.writeln(listDouble.toUXP());

var listEnum = new ActionList();
listEnum.putEnumerated(cTID('Ordn'), cTID('Trgt'));
listEnum.putEnumerated(sTID('state'), sTID('enter'));
$.writeln(listEnum.toUXP());

var listInt = new ActionList();
listInt.putInteger(123);
listInt.putInteger(345);
$.writeln(listInt.toUXP());

var listBigInt = new ActionList();
listBigInt.putLargeInteger(40000000000);
listBigInt.putLargeInteger(450000000000);
$.writeln(listBigInt.toUXP());

var listObj = new ActionList();
var objOne = new ActionDescriptor();
objOne.putString(cTID('Lyr '), "boo");
objOne.putInteger(sTID('key'), 13);
listObj.putObject(sTID('tool'), objOne);
listObj.putObject(sTID('brush'), new ActionDescriptor());
$.writeln(listObj.toUXP());

var listRef = new ActionList();
var refClass = new ActionReference();
var refEnum = new ActionReference();
refClass.putClass(cTID('Lyr '));
refEnum.putEnumerated(cTID('Lyr '), cTID('Ordn'), sTID('current'));
listRef.putReference(refClass);
listRef.putReference(refEnum);
$.writeln(listRef.toUXP());

var listString = new ActionList();
listString.putString("test");
listString.putString("foo");
listString.putString("bar");
$.writeln(listString.toUXP());

var listDoubleUnit = new ActionList();
listDoubleUnit.putUnitDouble(sTID('angleUnit'), 1.5);
listDoubleUnit.putUnitDouble(sTID('pixelsUnit'), 300);
$.writeln(listDoubleUnit.toUXP());