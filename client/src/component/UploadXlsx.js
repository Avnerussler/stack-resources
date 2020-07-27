import React, { useState } from "react";
import XLSX from "xlsx";
import { Upload } from "antd";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { Skeleton } from "antd";
export const UploadXlsx = () => {
  const [fileUploaded, setFileUploaded] = useState("");

  const handleChange = (e) => {
    const files = e.target.files;

    const f = files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      let data = e.target.result;
      let readedData = XLSX.read(data, { type: "binary" });

      const wsname = readedData.SheetNames[0];
      const ws = readedData.Sheets[wsname];
      const dataParse = XLSX.utils.sheet_to_json(
        ws,
        {
          header: "Hostname",
        },
        { header: "LocalStorage(total)" },
        { header: "RAM(total" },
        { header: "Status" },
        { header: "VCPUs(total)" }
      );
      setFileUploaded(dataParse);
    };
    if (f) {
      reader.readAsBinaryString(f);
    }
  };
  console.log(fileUploaded);
  const columnDefs = [
    {
      headerName: "Hostname",
      field: "Hostname",
    },
    { headerName: "Status", field: "Status" },
    { headerName: "VCPUs(total)", field: "VCPUs" },
    { headerName: "RAM(total)", field: "RAM" },
    { headerName: "LocalStorage(total)", field: "LocalStorage" },
  ];

  const defaultColDef = {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
  };

  return (
    <div>
      <input type="file" onChange={(e) => handleChange(e)}></input>
      {fileUploaded ? (
        <div
          id="myGrid"
          className="ag-theme-alpine"
          style={{ height: "500px", width: "100%", textAlign: "center" }}
        >
          <AgGridReact
            columnDefs={columnDefs}
            rowData={fileUploaded}
            defaultColDef={defaultColDef}
          ></AgGridReact>
        </div>
      ) : (
        <Skeleton active={true} rows={12} />
      )}
    </div>
  );
};
