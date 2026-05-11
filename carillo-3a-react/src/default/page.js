import React from "react";
import ProductTable from "../components/data-table/data_table";
import data from "./data.json";

export default function DefaultPage() {
  return (
    <main style={{ padding: "24px" }}>
      <h2 style={{ margin: "0 0 16px 0" }}>Tools Data Table</h2>
      <ProductTable items={data} />
    </main>
  );
}