import * as Xlsx from 'xlsx'

const DownloadExcel = (cols, datas,excelStructure) =>{

    const workSheet = Xlsx.utils.json_to_sheet(datas);
    const workBook = Xlsx.utils.book_new();
    Xlsx.utils.book_append_sheet(workBook ,workSheet,excelStructure.sheetName )
    Xlsx.utils.sheet_add_aoa(workSheet, excelStructure.columns, { origin: "A1" });
  
    let buf = Xlsx.write(workBook,{bookType:"xlsx", type:"buffer"})
    Xlsx.write(workBook,{bookType:"xlsx", type:"binary"})
    Xlsx.writeFile(workBook,excelStructure.fileName)
  
  }

export default DownloadExcel