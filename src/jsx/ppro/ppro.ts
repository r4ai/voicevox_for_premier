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
    if (newTrackItem) {
      const moComp = newTrackItem.getMGTComponent();
      if (moComp) {
        const params = moComp.properties;
        const srcTextPram = params.getParamForDisplayName("Source Text");
        if (srcTextPram) {
          const oldVal = srcTextPram.getValue();
          srcTextPram.setValue(text);
        }
      } else {
        alert("Failed to get MGT component from track item");
        return;
      }
    } else {
      alert("No new track item");
      return;
    }
  } else {
    alert("No active sequence");
    return;
  }
};
