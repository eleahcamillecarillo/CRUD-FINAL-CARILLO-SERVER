import React, { useEffect, useMemo, useState } from "react";
import "./datatable.css";

function getSortValue(item, key) {
  if (key === "name" || key === "category") {
    return String(item[key]).toLowerCase();
  }
  return Number(item[key]);
}

export default function ProductTable({ items = [] }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortKey, setSortKey] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");
  const [themeMode, setThemeMode] = useState("light");
  const [selectedToolId, setSelectedToolId] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const categories = useMemo(() => {
    return ["All", ...new Set(items.map((item) => item.category))];
  }, [items]);

  const filteredItems = useMemo(() => {
    const term = search.trim().toLowerCase();
    return items.filter((item) => {
      const matchesSearch =
        !term ||
        item.name.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term) ||
        String(item.id).includes(term);

      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [items, search, selectedCategory]);

  const sortedItems = useMemo(() => {
    const data = [...filteredItems];
    data.sort((a, b) => {
      const aValue = getSortValue(a, sortKey);
      const bValue = getSortValue(b, sortKey);

      if (aValue < bValue) {
        return sortDirection === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    });
    return data;
  }, [filteredItems, sortDirection, sortKey]);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(sortedItems.length / rowsPerPage));
  }, [sortedItems.length, rowsPerPage]);

  const pagedItems = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return sortedItems.slice(start, start + rowsPerPage);
  }, [sortedItems, currentPage, rowsPerPage]);

  useEffect(() => {
    if (sortedItems.length === 0) {
      setSelectedToolId(null);
      return;
    }

    const selectedStillVisible = sortedItems.some((item) => item.id === selectedToolId);
    if (!selectedStillVisible) {
      setSelectedToolId(null);
    }
  }, [sortedItems, selectedToolId]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory, sortKey, sortDirection, rowsPerPage]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const selectedTool = useMemo(() => {
    return sortedItems.find((item) => item.id === selectedToolId) || null;
  }, [sortedItems, selectedToolId]);

  function onSort(key) {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
      return;
    }
    setSortKey(key);
    setSortDirection("asc");
  }

  function sortLabel(key) {
    if (sortKey !== key) return "";
    return sortDirection === "asc" ? " ^" : " v";
  }

  const pageStart = sortedItems.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const pageEnd = Math.min(currentPage * rowsPerPage, sortedItems.length);

  return (
    <section className={`datatable-layout dt-theme-${themeMode}`}>
      <div className={`datatable-content-row ${selectedTool ? "has-detail" : ""}`}>
        <div className="datatable-wrap">
          <div className="datatable-toolbar">
            <h3 className="datatable-panel-title">Search & Filters</h3>

            <div className="datatable-control-group">
              <label className="datatable-label" htmlFor="search-tools">
                Search
              </label>
              <input
                id="search-tools"
                type="text"
                placeholder="Search id, name, category"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="datatable-input"
              />
            </div>

            <div className="datatable-control-group">
              <label className="datatable-label" htmlFor="filter-category">
                Category
              </label>
              <select
                id="filter-category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="datatable-input"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="datatable-control-group">
              <label className="datatable-label" htmlFor="sort-by">
                Sort By
              </label>
              <select
                id="sort-by"
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value)}
                className="datatable-input"
              >
                <option value="id">ID</option>
                <option value="name">Product Name</option>
                <option value="price">Price</option>
                <option value="category">Category</option>
              </select>
            </div>

            <div className="datatable-control-group">
              <label className="datatable-label" htmlFor="sort-direction">
                Direction
              </label>
              <select
                id="sort-direction"
                value={sortDirection}
                onChange={(e) => setSortDirection(e.target.value)}
                className="datatable-input"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>

            <div className="datatable-control-group">
              <label className="datatable-label" htmlFor="theme-mode">
                Theme
              </label>
              <select
                id="theme-mode"
                value={themeMode}
                onChange={(e) => setThemeMode(e.target.value)}
                className="datatable-input"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
          </div>

          <div className="datatable-summary">
            Showing {pageStart}-{pageEnd} of {sortedItems.length} filtered items
          </div>

          <div className="datatable-scroll-area">
            <table className="datatable-table">
              <thead>
                <tr>
                  <th className="datatable-th" onClick={() => onSort("id")}>
                    ID{sortLabel("id")}
                  </th>
                  <th className="datatable-th" onClick={() => onSort("name")}>
                    Product Name{sortLabel("name")}
                  </th>
                  <th className="datatable-th" onClick={() => onSort("price")}>
                    Price (Php){sortLabel("price")}
                  </th>
                  <th className="datatable-th" onClick={() => onSort("category")}>
                    Category{sortLabel("category")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {pagedItems.length > 0 ? (
                  pagedItems.map((item) => (
                    <tr
                      key={item.id}
                      className={`datatable-row ${selectedToolId === item.id ? "is-selected" : ""}`}
                      onClick={() => setSelectedToolId(item.id)}
                    >
                      <td className="datatable-td">{item.id}</td>
                      <td className="datatable-td">{item.name}</td>
                      <td className="datatable-td">{item.price}</td>
                      <td className="datatable-td">{item.category}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="datatable-empty" colSpan={4}>
                      No items match the current search/filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="datatable-pagination">
            <div className="datatable-pagination-left">
              <label className="datatable-label" htmlFor="rows-per-page">
                Rows per page
              </label>
              <select
                id="rows-per-page"
                className="datatable-input datatable-input-small"
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(Number(e.target.value))}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
            </div>

            <div className="datatable-pagination-right">
              <span className="datatable-page-info">
                Page {currentPage} of {totalPages}
              </span>
              <button
                type="button"
                className="datatable-page-btn"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <button
                type="button"
                className="datatable-page-btn"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {selectedTool ? (
          <aside className="datatable-detail-panel is-open">
            <h3 className="datatable-panel-title">Tool Details</h3>
            <div className="datatable-detail-content">
              <div className="datatable-detail-item">
                <span className="detail-label">ID</span>
                <span className="detail-value">{selectedTool.id}</span>
              </div>
              <div className="datatable-detail-item">
                <span className="detail-label">Name</span>
                <span className="detail-value">{selectedTool.name}</span>
              </div>
              <div className="datatable-detail-item">
                <span className="detail-label">Price</span>
                <span className="detail-value">PHP {selectedTool.price}</span>
              </div>
              <div className="datatable-detail-item">
                <span className="detail-label">Category</span>
                <span className="detail-value">{selectedTool.category}</span>
              </div>
            </div>
          </aside>
        ) : null}
      </div>
    </section>
  );
}
