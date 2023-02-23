ActionDescriptor.prototype.toUXP = function () {
  return "{ " + this.toUXPSerialized() + " }";
}

ActionDescriptor.prototype.toUXPSerialized = function () {
  var count = this.count;
  // This will return a comma separated list of key value pairs, toUXP is responsible for wrapping in curlies
  var form = "";

  for (var i = 0; i < count; i++) {
    var key = this.getKey(i);
    var type = this.getType(key);
    var keyStr = typeIDToStringIDForUXP(key);

    if (keyStr === "null") {
      keyStr = "_target";
    } else if (keyStr === "grain" || keyStr === "green") {
      keyStr = "$Grn ";
    }

    form += "\"" + keyStr + "\": ";
    
    switch (type) {
      case DescValueType.ALIASTYPE:
        var f = this.getPath(key).fsName;
        form += "{ \"_path\": \"" + f + "\" }";
        break;
      case DescValueType.BOOLEANTYPE:
        var b = this.getBoolean(key);
        form += b ? "true" : "false";
        break;
      case DescValueType.CLASSTYPE:
        var c = this.getClass(key);
        form += "{ \"_class\": \"" + typeIDToStringIDForUXP(c) + "\" }";
        break;
      case DescValueType.DOUBLETYPE:
        var f = this.getDouble(key);
        form += f.toString();
        break;
      case DescValueType.ENUMERATEDTYPE:
        var t = this.getEnumerationType(key);
        var v = this.getEnumerationValue(key);
        form += "{ \"_enum\": \"" + typeIDToStringIDForUXP(t) + "\", \"_value\": \"" + typeIDToStringIDForUXP(v) + "\" }";
        break;
      case DescValueType.INTEGERTYPE:
        var intv = this.getInteger(key);
        form += intv.toString();
        break;
      case DescValueType.LARGEINTEGERTYPE:
        var bigint = this.getLargeInteger(key);
        form += bigint.toString();
        break;
      case DescValueType.LISTTYPE:
        var list = this.getList(key);
        form += list.toUXP();
        break;
      case DescValueType.OBJECTTYPE:
        var objt = this.getObjectType(key);
        var objv = this.getObjectValue(key);
        form += "{ \"_obj\": \"" + typeIDToStringIDForUXP(objt) + "\" ";
        if (objv !== undefined && objv.count > 0) {
          form += "," + objv.toUXPSerialized();
        }
        form += " }";
        break;
      case DescValueType.RAWTYPE:
        // Not supported - for now
        break;
      case DescValueType.REFERENCETYPE:
        form += this.getReference(key).toUXP();
        break;
      case DescValueType.STRINGTYPE:
        form += "\"" + this.getString(key) + "\"";
        break;
      case DescValueType.UNITDOUBLE:
        form += "{ \"_unit\": \"" + typeIDToStringIDForUXP(this.getUnitDoubleType(key)) + "\",\n\"_value\": " + this.getUnitDoubleValue(key).toString() + " }";
        break;
    }
    if (i < count - 1) {
      form += ", ";
    }
  }

  return form;
}

ActionList.prototype.toUXP = function () {
  var count = this.count;
  if (count === 0) {
    return "[]";
  }
  var form = "[\n";
  var type = this.getType(0);

  for (var i = 0; i < count; i++) {
    form += "\t";
    switch (type) {
      case DescValueType.ALIASTYPE:
        var f = this.getPath(i).fsName;
        form += "{ \"_path\": \"" + f + "\" }";
        break;
      case DescValueType.BOOLEANTYPE:
        var b = this.getBoolean(i);
        form += b ? "true" : "false";
        break;
      case DescValueType.CLASSTYPE:
        var c = this.getClass(i);
        form += "{ \"_class\": \"" + typeIDToStringIDForUXP(c) + "\" }";
        break;
      case DescValueType.DOUBLETYPE:
        var f = this.getDouble(i);
        form += f.toString();
        break;
      case DescValueType.ENUMERATEDTYPE:
        var t = this.getEnumerationType(i);
        var v = this.getEnumerationValue(i);
        form += "{ \"_enum\": \"" + typeIDToStringIDForUXP(t) + "\", \"_value\": \"" + typeIDToStringIDForUXP(v) + "\" }";
        break;
      case DescValueType.INTEGERTYPE:
        var intv = this.getInteger(i);
        form += intv.toString();
        break;
      case DescValueType.LARGEINTEGERTYPE:
        var bigint = this.getLargeInteger(i);
        form += bigint.toString();
        break;
      case DescValueType.LISTTYPE:
        var list = this.getList(i);
        form += list.toUXP();
        break;
      case DescValueType.OBJECTTYPE:
        var objt = this.getObjectType(i);
        var objv = this.getObjectValue(i);
        form += "{ \"_obj\": \"" + typeIDToStringIDForUXP(objt) + "\" ";
        if (objv !== undefined && objv.count > 0) {
          form += "," + objv.toUXPSerialized();
        }
        form += " }";
        break;
      case DescValueType.RAWTYPE:
        // Not supported - for now
        break;
      case DescValueType.REFERENCETYPE:
        form += this.getReference(i).toUXP();
        break;
      case DescValueType.STRINGTYPE:
        form += "\"" + this.getString(i) + "\"";
        break;
      case DescValueType.UNITDOUBLE:
        form += "{ \"_unit\": \"" + typeIDToStringIDForUXP(this.getUnitDoubleType(i)) + "\", \"_value\": " + this.getUnitDoubleValue(i).toString() + " }";
        break;
    }
    if (i < count - 1) {
      form += ",";
    }
    form += "\n";
  }
  form += "]";
  return form;
}

/**
 * _target: {_ref: [
            {_property: "targetLayersIDs"}, 
            {_ref: "document", _enum: "ordinal", _value: "targetEnum"}
        ]}
 */
ActionReference.prototype.toUXP = function () {
  switch (this.getForm()) {
    case ReferenceFormType.CLASSTYPE:
      return "{ \"_ref\": \"" + typeIDToStringIDForUXP(this.getDesiredClass()) + "\" }";
      break;
    case ReferenceFormType.ENUMERATED:
      return "{ \"_ref\": \"" + typeIDToStringIDForUXP(this.getDesiredClass()) + "\", \"_enum\": \"" + typeIDToStringIDForUXP(this.getEnumeratedType()) + "\", \"_value\": \"" + typeIDToStringIDForUXP(this.getEnumeratedValue()) + "\" }";
      break;
    case ReferenceFormType.IDENTIFIER:
      return "{ \"_ref\": \"" + typeIDToStringIDForUXP(this.getDesiredClass()) + "\", \"_id\": " + this.getIdentifier().toString() + " }";
      break;
    case ReferenceFormType.INDEX:
      return "{ \"_ref\": \"" + typeIDToStringIDForUXP(this.getDesiredClass()) + "\", \"_index\": " + this.getIndex().toString() + " }";
      break;
    case ReferenceFormType.NAME:
      return "{ \"_ref\": \"" + typeIDToStringIDForUXP(this.getDesiredClass()) + "\", \"_name\": \"" + this.getName() + "\" }";
      break;
    case ReferenceFormType.OFFSET:
      return "{ \"_ref\": \"" + typeIDToStringIDForUXP(this.getDesiredClass()) + "\", \"_offset\": " + this.getOffset().toString() + " }";
      break;
    case ReferenceFormType.PROPERTY:
      var container = this.getContainer();
      return "{ \"_ref\": [{ \"_property\": \"" + typeIDToStringIDForUXP(this.getProperty())
          + "\" }, " + container.toUXP() + "]}";
  }


}

executeActionForUXP = function (eventID, descriptor, displayDialogs) {
  var finalForm = "require('photoshop').action.batchPlay([{ \"_obj\": \"" + typeIDToStringIDForUXP(eventID) + "\"";
  if (descriptor !== undefined && descriptor.count > 0) {
    finalForm += "," + descriptor.toUXPSerialized();
  }
  if (displayDialogs) {
    finalForm += ", \"_options\": { \"dialogOptions\": ";
    switch (displayDialogs) {
      case DialogModes.ERROR:
        finalForm += "\"silent\"";
        break;
      case DialogModes.ALL:
        finalForm += "\"display\"";
        break;
      case DialogModes.NO:
        finalForm += "\"dontDisplay\"";
        break;
    }
    finalForm += " }";
  }
  finalForm += " }], { \"synchronousExecution\": true })";

  var logFile = new File(Folder.desktop.absoluteURI + "/batchplay.log");
  logFile.open("a")
  logFile.writeln(finalForm);
  logFile.writeln("-----------");
  logFile.close();

  $.writeln(finalForm);
  
  return app.executeAction(eventID, descriptor, displayDialogs);
};

executeActionGetForUXP = function (reference) {
  var finalForm = "require('photoshop').action.batchPlay([{ \"_obj\": \"get\", \"_target\":";
  finalForm += reference.toUXP();
  finalForm += " }], {})";

  var logFile = new File(Folder.desktop.absoluteURI + "/batchplay.log");
  var x = logFile.open("a");
  logFile.writeln(finalForm);
  logFile.writeln("-----------");
  logFile.close();

  $.writeln(finalForm);
  
  return app.executeActionGet(reference);
}

typeIDToStringIDForUXP = function (key) {
  return typeIDToStringID(key) || "$" + typeIDToCharID(key);
}
