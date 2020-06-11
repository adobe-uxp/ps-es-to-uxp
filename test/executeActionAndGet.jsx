var mainScriptPath = Folder($.fileName).parent.parent ; 
$.evalFile(new File(mainScriptPath + '/ad-to-uxp.jsx'));
cTID = charIDToTypeID;
sTID = stringIDToTypeID;

function customToggle (_name)
{
  if (_name == undefined) _name = "u34yhdfshfl4y8oo3rhs";
  var descHide = new ActionDescriptor(),
    listHide = new ActionList();
  var layers;
  var desc;

  try
  {
    activeDocument.backgroundLayer;
    layers = 0;
  }
  catch (e)
  {
    layers = 1;
  }

  while (true)
  {
    ref = new ActionReference();
    ref.putProperty(charIDToTypeID('Prpr'), charIDToTypeID("Nm  "));
    ref.putIndex(charIDToTypeID('Lyr '), layers);
    try
    {
      desc = executeActionGetForUXP(ref);
    }
    catch (err)
    {
      $.writeln(err)
      break;
    }
    if (desc.getString(charIDToTypeID('Nm  ')) != _name)
    {
      listHide.putReference(ref);
      
    }
    layers++;
  }
  try
  {
    descHide.putList(charIDToTypeID('null'), listHide);
    executeActionForUXP(charIDToTypeID('Hd  '), descHide, DialogModes.NO);
  }
  catch (e)
  {}
}

customToggle(true);