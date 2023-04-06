alert("hoge");

function importMogrt() {
  var filterString = "";
  if (Folder.fs === "Windows") {
    filterString = "Motion Graphics Templates:*.mogrt";
  }
  var mogrtToImport = File.openDialog(
    "字幕の生成に使うMoGRTファイルを選択",
    filterString,
    false
  );
  return mogrtToImport;
}
