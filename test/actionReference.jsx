var mainScriptPath = Folder($.fileName).parent.parent ; 
$.evalFile(new File(mainScriptPath + '/ad-to-uxp.jsx'));
cTID = charIDToTypeID;
sTID = stringIDToTypeID;

var refClass = new ActionReference();
refClass.putClass(cTID('Lyr '))
$.writeln(refClass.toUXP())

var refEnum = new ActionReference();
refEnum.putEnumerated(cTID('Lyr '), cTID('Ordn'), sTID('current'))
$.writeln(refEnum.toUXP())

var refId = new ActionReference();
refId.putIdentifier(cTID('Lyr '), 3);
$.writeln(refId.toUXP())

var refIndex = new ActionReference();
refIndex.putIndex(cTID('Lyr '), 3);
$.writeln(refIndex.toUXP())

var refName = new ActionReference();
refName.putName(cTID('Lyr '), 'test');
$.writeln(refName.toUXP());

var refOffset = new ActionReference();
refOffset.putOffset(cTID('Lyr '), 2);
$.writeln(refOffset.toUXP());

var refProp = new ActionReference();
refProp.putProperty(cTID('Prpr'), sTID('name'));
refProp.putIdentifier(cTID('Lyr '), 5);
$.writeln(refProp.toUXP());

var ref = new ActionReference();
var ls;
ref.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
var desc = executeActionGetForUXP(ref);
    