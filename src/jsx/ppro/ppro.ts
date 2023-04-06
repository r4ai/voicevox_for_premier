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
