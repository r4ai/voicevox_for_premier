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

export const getProjectName = (): string => {
  const project = app.project;
  if (project) {
    return project.name;
  } else {
    alert("No active project");
    return "";
  }
};

export const getProjectPath = (): string => {
  const project = app.project;
  if (project) {
    let pPath = project.path;
    if (Folder.fs.toLocaleLowerCase() === "windows") {
      pPath = pPath.replace(/\\/g, "\\\\");
    }
    return pPath;
  } else {
    alert("No active project");
    return "";
  }
};

export const selectProjectDir = (): string => {
  const projectDir = Folder.selectDialog("Select a project directory");
  return projectDir.fsName;
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

export const addCaption = (filePath: string) => {
  const destBin: ProjectItem | 0 = app.project.getInsertionBin();
  if (destBin) {
    const prevItemCount = destBin.children.numItems;

    // * Import file
    if (app.project) {
      const suppressWarnings = true;
      const importAsStills = false;
      app.project.importFiles(
        [filePath],
        suppressWarnings,
        app.project.getInsertionBin(),
        importAsStills
      );
    } else {
      alert("No project");
      return;
    }

    const newItemCount = destBin.children.numItems;
    if (newItemCount > prevItemCount) {
      const importedSRT = destBin.children[newItemCount - 1];
      if (importedSRT) {
        const activeSeq = app.project.activeSequence;
        if (activeSeq) {
          const startAtTime = 0;

          /* `createCaptionTrack` method exists */
          /* https://ppro-scripting.docsforadobe.dev/sequence/sequence.html#sequence-createcaptiontrack */
          /* @ts-ignore */
          const result: boolean = app.project.activeSequence.createCaptionTrack(
            importedSRT,
            startAtTime
          );
          if (result) {
            alert("Caption track created");
            return;
          } else {
            alert("Failed to create caption track");
            return;
          }
        } else {
          alert("No active sequence");
          return;
        }
      } else {
        alert("Failed to get imported SRT");
        return;
      }
    } else {
      alert(
        "importFiles() failed to import, OR return an error message. I quit!"
      );
      return;
    }
  } else {
    alert("No destination bin available");
    return;
  }
};
