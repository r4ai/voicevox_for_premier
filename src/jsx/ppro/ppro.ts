export const helloWorld = () => {
  alert("HelloWorld");
};

export function invokeAlert(msg: string) {
  alert(msg);
}

/**
 * win: C:\Users\UserName\AppData\Roaming\Adobe\Common\Motion Graphics Templates\Credits
 */
export const mogrt = () => {
  // const filterString = match(Folder.fs)
  //   .with("Windows", () => "Motion Graphics Templates:*.mogrt")
  //   .otherwise(() => "");
  // const mogrtToImport = File.openDialog(
  //   "字幕の生成に使うMoGRTファイルを選択", // title
  //   filterString, // filter available files?
  //   false
  // );
  // alert("Selected file: " + mogrtToImport.fsName);
  // return mogrtToImport.fsName;
  alert("hoge");
  return "a";
};

export function addTextFromMogrt(mogrtFile: File, text: string) {
  if (!mogrtFile.exists) {
    alert("Could not find the `Classic Title.mogrt` file!");
    return;
  }

  const proj = app.project;
  const activeSeq = proj.activeSequence;
  const targetTime = activeSeq.getPlayerPosition();

  const vidTrackOffset = 0;
  const audTrackOffset = 0;

  const newTrackItem = activeSeq.importMGT(
    mogrtFile.fsName,
    targetTime.ticks,
    vidTrackOffset,
    audTrackOffset
  );

  if (!newTrackItem) {
    alert("Could not import the MoGRT file!");
    return;
  }

  const moComp = newTrackItem.getMGTComponent();
  if (moComp) {
    var params = moComp.properties;
    var srcTextParam = params.getParamForDisplayName("Main Title");
    if (srcTextParam) {
      var val = srcTextParam.getValue();
      srcTextParam.setValue(text);
    } else {
      alert("Could not find the text parameter!");
      return;
    }
  } else {
    alert("Could not find the MGTComponent!");
    return;
  }
  alert("Done!");
}

export function addTextLayer(text: string) {
  const proj = app.project;
  const activeSeq = proj.activeSequence;
  const targetTime = activeSeq.getPlayerPosition();

  const extensionPath = File($.fileName).parent.parent;
  const adobePath = extensionPath.parent.parent.parent;
  const essentialGraphicsPath = File(
    adobePath + "/Common" + "/Motion Graphics Templates"
  );
  if (!essentialGraphicsPath.exists) {
    alert("Could not find the Motion Graphics Templates folder!");
    return;
  }
  const mogrtPath = File(
    essentialGraphicsPath +
      "/Captions and Subtitles" +
      "/Classic Web Caption.mogrt"
  );
  if (!mogrtPath.exists) {
    alert("Could not find the `Classic Title.mogrt` file!");
    return;
  }

  const vidTrackOffset = 0;
  const audTrackOffset = 0;
  const newTrackItem = activeSeq.importMGT(
    mogrtPath.fsName,
    targetTime.ticks,
    vidTrackOffset,
    audTrackOffset
  );
  if (!newTrackItem) {
    alert("Could not import the MGT file!");
    return;
  }

  const moComp = newTrackItem.getMGTComponent();
  if (moComp) {
    var params = moComp.properties;
    var srcTextParam = params.getParamForDisplayName("Main Title");
    if (srcTextParam) {
      var val = srcTextParam.getValue();
      srcTextParam.setValue("New value set by PProPanel!");
    } else {
      alert("Could not find the text parameter!");
      return;
    }
  } else {
    alert("Could not find the MGTComponent!");
    return;
  }
  alert("Done!");
}
