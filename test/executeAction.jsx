var mainScriptPath = Folder($.fileName).parent.parent ; 
$.evalFile(new File(mainScriptPath + '/ad-to-uxp.jsx'));
cTID = charIDToTypeID;
sTID = stringIDToTypeID;

function solidColor ()
{
  var desc196 = new ActionDescriptor();
  var ref19 = new ActionReference();
  ref19.putClass(sTID('contentLayer'));
  desc196.putReference(cTID('null'), ref19);
  var desc197 = new ActionDescriptor();
  var desc198 = new ActionDescriptor();
  var desc199 = new ActionDescriptor();
  desc199.putDouble(cTID('Rd  '), 127);
  desc199.putDouble(cTID('Grn '), 35);
  desc199.putDouble(cTID('Bl  '), 220);
  desc198.putObject(cTID('Clr '), cTID('RGBC'), desc199);
  desc197.putObject(cTID('Type'), sTID('solidColorLayer'), desc198);
  desc196.putObject(cTID('Usng'), sTID('contentLayer'), desc197);
  executeActionForUXP(cTID('Mk  '), desc196);
}

solidColor()