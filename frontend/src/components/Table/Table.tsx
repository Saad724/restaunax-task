"use client";
import React, { useState } from "react";
import {
  AllCommunityModule,
  DomLayoutType,
  ModuleRegistry,
  themeMaterial,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

import "./Table.scss";
import { Box, InputAdornment, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

ModuleRegistry.registerModules([AllCommunityModule]);

interface TableInterface {
  data: Array<any>;
  columns: Array<any>;
  context?: Record<string, unknown>;
}

const Table: React.FC<TableInterface> = ({ data, columns, context }) => {
  const isSmallScreen = window.innerWidth <= 1200;
  const [quickFilterText, setQuickFilterText] = useState("");
  const paginationPageSize = 10;

  function getGridOptions() {
    const gridOptions = {
      domLayout: "autoHeight" as DomLayoutType,
      suppressAutoSize: true,
      suppressColumnVirtualisation: false,
      suppressPaginationPanel: false,
      overlayLoadingTemplate: "Loading...",
      embedFullWidthRows: true,
      suppressRowTransform: true,
      overlayNoRowsTemplate: "<span>No data found</span>",
      defaultColDef: {},
    };

    if (!isSmallScreen) {
      gridOptions.defaultColDef = {
        flex: 1,
        resizable: true,
      };
    }

    return gridOptions;
  }

  const gridOptions = getGridOptions();

  const theme = themeMaterial.withParams({
    backgroundColor: "#fff",
    foregroundColor: "#000",
    headerTextColor: "#000",
    headerBackgroundColor: "rgb(0, 0, 0, 0.03)",
    oddRowBackgroundColor: "rgb(0, 0, 0, 0.03)",
  });

  return (
    <Box>
      <TextField
        placeholder="Search..."
        size="small"
        value={quickFilterText}
        onChange={(e) => setQuickFilterText(e.target.value)}
        sx={{
          mb: 2,
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FontAwesomeIcon icon={faSearch} style={{ fontSize: 14 }} />
            </InputAdornment>
          ),
        }}
        inputProps={{ "aria-label": "Search table" }}
      />
      <AgGridReact
        rowData={data}
        theme={theme}
        columnDefs={columns}
        context={context}
        pagination
        paginationPageSize={paginationPageSize}
        paginationPageSizeSelector={[
          paginationPageSize,
          paginationPageSize * 2,
          paginationPageSize * 3,
        ]}
        gridOptions={gridOptions}
        quickFilterText={quickFilterText}
      />
    </Box>
  );
};

export default Table;
