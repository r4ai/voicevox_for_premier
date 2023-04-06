export const helloWorld = () => {
  alert("HelloWorld");
};

export const invokeAlert = (msg: string) => {
  alert(msg);
};

export const importMogrt = (): string => {
  const os = Folder.fs;
  let filterString = "";
  if (os.toLocaleLowerCase() === "windows") {
    filterString = "Mogrt files:*.mogrt";
  }
  const mogrtFile = File.openDialog("Select a mogrt file", filterString, false);
  return mogrtFile.fsName;
};

export const addText = (mogrtPath: string, text: string) => {
  const activeSeq = app.project.activeSequence;
  if (activeSeq) {
    const targetTime = activeSeq.getPlayerPosition();
    const vidTrackOffset = 0;
    const audTrackOffset = 0;
    const newTrackItem = activeSeq.importMGT(
      mogrtPath,
      targetTime.ticks,
      vidTrackOffset,
      audTrackOffset
    );
    alert("done");
  } else {
    alert("No active sequence");
    return;
  }
};
