import React, { useState, useEffect } from 'react'
import {
  Table as TableIcon,
  Plus,
  Trash2,
  X,
  Check,
  RotateCcw,
  Eraser,
  Grid,
  Layers,
  Sparkles,
  Minus
} from 'lucide-react'

/**
 * Parses simple HTML table string into 2D array of strings and hasHeader flag
 */
function parseHtmlTable(html) {
  if (!html || typeof window === 'undefined') return null
  try {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    const table = doc.querySelector('table')
    if (!table) return null

    const trs = Array.from(table.querySelectorAll('tr'))
    if (!trs.length) return null

    const grid = []
    let hasHeader = false

    trs.forEach((tr, rIdx) => {
      const ths = Array.from(tr.querySelectorAll('th'))
      const tds = Array.from(tr.querySelectorAll('td'))

      if (ths.length > 0 && rIdx === 0) {
        hasHeader = true
        grid.push(ths.map(th => th.textContent.trim()))
      } else {
        const cells = ths.length ? ths : tds
        grid.push(cells.map(c => c.textContent.trim()))
      }
    })

    const maxCols = Math.max(...grid.map(row => row.length), 1)
    const normalized = grid.map(row => {
      const copy = [...row]
      while (copy.length < maxCols) copy.push('')
      return copy
    })

    return { grid: normalized, hasHeader }
  } catch (err) {
    console.error('Failed to parse table:', err)
    return null
  }
}

/**
 * Converts 2D array or dimensions into responsive HTML table
 */
function generateHtmlTable(grid, hasHeader, makeEmpty = false) {
  if (!grid || !grid.length) return ''

  // Preserve all rows created by user (do not filter out empty rows!)
  const rows = grid
  const colCount = Math.max(...rows.map(r => r.length), 1)

  let html = `<div class="tgs-table-wrapper overflow-x-auto my-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-xs">\n`
  html += `  <table class="tgs-blog-table min-w-full text-left text-sm border-collapse">\n`

  if (hasHeader && rows.length > 0) {
    const headerRow = rows[0]
    html += `    <thead>\n`
    html += `      <tr class="bg-gray-100 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 font-bold border-b border-gray-200 dark:border-gray-800">\n`
    for (let c = 0; c < colCount; c++) {
      const cellVal = makeEmpty ? `Header ${c + 1}` : ((headerRow[c] || '').trim() || `Header ${c + 1}`)
      html += `        <th class="px-4 py-3 border-r border-gray-200 dark:border-gray-800 last:border-r-0 font-bold">${cellVal}</th>\n`
    }
    html += `      </tr>\n`
    html += `    </thead>\n`
  }

  const bodyRows = hasHeader ? rows.slice(1) : rows
  html += `    <tbody class="divide-y divide-gray-200 dark:divide-gray-800 bg-white dark:bg-gray-900/50">\n`

  if (bodyRows.length === 0) {
    // If only header row exists, provide 1 editable row
    html += `      <tr>\n`
    for (let c = 0; c < colCount; c++) {
      html += `        <td class="px-4 py-3 border-r border-gray-200 dark:border-gray-800 last:border-r-0 text-gray-700 dark:text-gray-300"><br></td>\n`
    }
    html += `      </tr>\n`
  } else {
    bodyRows.forEach((row, rIdx) => {
      const isEven = rIdx % 2 === 1
      const zebraClass = isEven ? 'bg-gray-50/60 dark:bg-gray-800/30' : ''
      html += `      <tr class="${zebraClass} hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors">\n`
      for (let c = 0; c < colCount; c++) {
        const val = makeEmpty ? '' : (row[c] || '').trim()
        // Use <br> inside empty cell so it can be focused and typed into inside Quill
        const content = val.length > 0 ? val : '<br>'
        html += `        <td class="px-4 py-3 border-r border-gray-200 dark:border-gray-800 last:border-r-0 text-gray-700 dark:text-gray-300">${content}</td>\n`
      }
      html += `      </tr>\n`
    })
  }

  html += `    </tbody>\n`
  html += `  </table>\n`
  html += `</div>\n<p><br></p>\n`

  return html
}

const TableEditorModal = ({ isOpen, onClose, onInsertTable, currentContent = '' }) => {
  // Active Tab: 'content' (interactive prefilled grid) or 'empty' (blank table generator)
  const [activeTab, setActiveTab] = useState('empty')

  // Shared Header toggle
  const [hasHeader, setHasHeader] = useState(true)

  // Interactive Content Grid State
  const [grid, setGrid] = useState([
    ['Column 1', 'Column 2', 'Column 3'],
    ['Sample text', 'Sample text', 'Sample text'],
    ['Sample text', 'Sample text', 'Sample text']
  ])

  // Blank Table Quick Dimension State
  const [blankRows, setBlankRows] = useState(3)
  const [blankCols, setBlankCols] = useState(3)

  // Check if current blog content already has a table
  const [existingTableFound, setExistingTableFound] = useState(false)

  useEffect(() => {
    if (isOpen) {
      const match = currentContent && currentContent.includes('<table')
      setExistingTableFound(Boolean(match))
    }
  }, [isOpen, currentContent])

  if (!isOpen) return null

  const rowCount = grid.length
  const colCount = grid[0]?.length || 0

  // Cell change
  const handleCellChange = (rIdx, cIdx, value) => {
    setGrid(prev => {
      const next = prev.map((row, r) => {
        if (r !== rIdx) return row
        const rowCopy = [...row]
        rowCopy[cIdx] = value
        return rowCopy
      })
      return next
    })
  }

  // Add row in grid
  const addRow = () => {
    setGrid(prev => {
      const cols = prev[0]?.length || 3
      const newRow = Array(cols).fill('')
      return [...prev, newRow]
    })
  }

  // Remove row in grid
  const removeRow = (rIdx) => {
    if (grid.length <= 1) return
    setGrid(prev => prev.filter((_, idx) => idx !== rIdx))
  }

  // Add column in grid
  const addColumn = () => {
    setGrid(prev => {
      return prev.map((row, rIdx) => [
        ...row,
        hasHeader && rIdx === 0 ? `Header ${row.length + 1}` : ''
      ])
    })
  }

  // Remove column in grid
  const removeColumn = (cIdx) => {
    if (colCount <= 1) return
    setGrid(prev => prev.map(row => row.filter((_, idx) => idx !== cIdx)))
  }

  // Clear all cell text in grid to make it empty
  const handleClearAllCells = () => {
    setGrid(prev => {
      return prev.map((row, rIdx) =>
        row.map((_, cIdx) => (hasHeader && rIdx === 0 ? `Header ${cIdx + 1}` : ''))
      )
    })
  }

  // Reset to default
  const handleReset = () => {
    setGrid([
      ['Feature / Item', 'Standard', 'Enterprise'],
      ['Specification A', 'Supported', 'Unlimited'],
      ['Specification B', 'Tier 1', 'Dedicated SLA']
    ])
    setHasHeader(true)
  }

  // Load existing table from blog content
  const handleLoadFromContent = () => {
    const parsed = parseHtmlTable(currentContent)
    if (parsed && parsed.grid.length) {
      setGrid(parsed.grid)
      setHasHeader(parsed.hasHeader)
      setActiveTab('content')
    } else {
      alert('Could not find any <table> tag in the current content.')
    }
  }

  // Insert Table with Content
  const handleInsertWithContent = () => {
    const tableHtml = generateHtmlTable(grid, hasHeader, false)
    onInsertTable(tableHtml)
    onClose()
  }

  // Insert Table as completely Empty / Blank
  const handleInsertEmptyTable = (customRows = null, customCols = null) => {
    const rCount = customRows || (activeTab === 'empty' ? blankRows : rowCount)
    const cCount = customCols || (activeTab === 'empty' ? blankCols : colCount)

    // Build empty matrix of rCount × cCount
    const emptyGrid = Array.from({ length: rCount }, (_, rIdx) =>
      Array.from({ length: cCount }, (_, cIdx) => (hasHeader && rIdx === 0 ? `Header ${cIdx + 1}` : ''))
    )

    const tableHtml = generateHtmlTable(emptyGrid, hasHeader, false)
    onInsertTable(tableHtml)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-background dark:bg-black/70 backdrop-blur-xs animate-fade-in">
      <div 
        className="w-full max-w-4xl bg-[var(--admin-bg-surface)] border border-[var(--admin-border-base)] rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--admin-border-base)] bg-[var(--admin-bg-elevated)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--admin-primary-soft)] text-[var(--admin-primary)] border border-[var(--admin-primary)]/20 flex items-center justify-center shadow-xs">
              <TableIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[var(--admin-text-primary)]">
                  Add Table to Blog
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[var(--admin-primary-soft)] text-[var(--admin-primary)]">
                  {activeTab === 'empty' ? `${blankRows} Rows × ${blankCols} Columns (Blank)` : `${rowCount} Rows × ${colCount} Columns (With Content)`}
                </span>
              </div>
              <p className="text-xs text-[var(--admin-text-muted)]">
                Create a blank table template or pre-fill content with full row/column controls.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] hover:bg-[var(--admin-bg-card)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-2 px-5 pt-3 pb-2 border-b border-[var(--admin-border-subtle)] bg-[var(--admin-bg-card)]">
          <button
            type="button"
            onClick={() => setActiveTab('empty')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'empty'
                ? 'bg-[var(--admin-primary)] text-white shadow-sm'
                : 'bg-[var(--admin-bg-elevated)] text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-primary)]'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Create Empty Table (Row & Column)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('content')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'content'
                ? 'bg-[var(--admin-primary)] text-white shadow-sm'
                : 'bg-[var(--admin-bg-elevated)] text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-primary)]'
            }`}
          >
            <TableIcon className="w-3.5 h-3.5" />
            <span>Fill Content in Table</span>
          </button>

          {existingTableFound && (
            <button
              type="button"
              onClick={handleLoadFromContent}
              className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Load Existing Table from Content</span>
            </button>
          )}
        </div>

        {/* TAB 1: QUICK EMPTY TABLE GENERATOR */}
        {activeTab === 'empty' && (
          <div className="flex-1 overflow-auto p-6 admin-scrollbar bg-[var(--admin-bg-canvas)] space-y-6">
            <div className="admin-card p-5 space-y-5">
              <div className="border-b border-[var(--admin-border-subtle)] pb-3">
                <h4 className="text-sm font-bold text-[var(--admin-text-primary)]">
                  Configure Empty Table Dimensions
                </h4>
                <p className="text-xs text-[var(--admin-text-muted)] mt-0.5">
                  Select rows and columns for a completely empty table. Cells can be edited directly inside the blog editor.
                </p>
              </div>

              {/* Rows and Columns Pickers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Number of Rows */}
                <div className="p-4 rounded-xl bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-subtle)] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--admin-text-primary)]">
                      Total Rows
                    </span>
                    <span className="text-base font-black text-[var(--admin-primary)] font-mono">
                      {blankRows}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setBlankRows(prev => Math.max(1, prev - 1))}
                      className="w-9 h-9 rounded-lg bg-[var(--admin-bg-surface)] border border-[var(--admin-border-base)] flex items-center justify-center text-[var(--admin-text-primary)] hover:border-[var(--admin-primary)] transition-all font-bold"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      min={1}
                      max={30}
                      value={blankRows}
                      onChange={(e) => setBlankRows(Math.max(1, parseInt(e.target.value) || 1))}
                      className="flex-1 text-center font-bold text-sm admin-input h-9"
                    />
                    <button
                      type="button"
                      onClick={() => setBlankRows(prev => Math.min(30, prev + 1))}
                      className="w-9 h-9 rounded-lg bg-[var(--admin-bg-surface)] border border-[var(--admin-border-base)] flex items-center justify-center text-[var(--admin-text-primary)] hover:border-[var(--admin-primary)] transition-all font-bold"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Number of Columns */}
                <div className="p-4 rounded-xl bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-subtle)] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--admin-text-primary)]">
                      Total Columns
                    </span>
                    <span className="text-base font-black text-[var(--admin-primary)] font-mono">
                      {blankCols}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setBlankCols(prev => Math.max(1, prev - 1))}
                      className="w-9 h-9 rounded-lg bg-[var(--admin-bg-surface)] border border-[var(--admin-border-base)] flex items-center justify-center text-[var(--admin-text-primary)] hover:border-[var(--admin-primary)] transition-all font-bold"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      min={1}
                      max={12}
                      value={blankCols}
                      onChange={(e) => setBlankCols(Math.max(1, parseInt(e.target.value) || 1))}
                      className="flex-1 text-center font-bold text-sm admin-input h-9"
                    />
                    <button
                      type="button"
                      onClick={() => setBlankCols(prev => Math.min(12, prev + 1))}
                      className="w-9 h-9 rounded-lg bg-[var(--admin-bg-surface)] border border-[var(--admin-border-base)] flex items-center justify-center text-[var(--admin-text-primary)] hover:border-[var(--admin-primary)] transition-all font-bold"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Preset Buttons */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--admin-text-muted)] block">
                  Quick Presets:
                </span>
                <div className="flex items-center gap-2 flex-wrap">
                  {[
                    { label: '2 × 2 Table', r: 2, c: 2 },
                    { label: '3 × 3 Standard', r: 3, c: 3 },
                    { label: '4 × 3 Comparison', r: 4, c: 3 },
                    { label: '5 × 4 Matrix', r: 5, c: 4 },
                    { label: '6 × 2 Key-Value', r: 6, c: 2 },
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => {
                        setBlankRows(preset.r)
                        setBlankCols(preset.c)
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        blankRows === preset.r && blankCols === preset.c
                          ? 'bg-[var(--admin-primary-soft)] text-[var(--admin-primary)] border-[var(--admin-primary)] font-bold'
                          : 'bg-[var(--admin-bg-surface)] text-[var(--admin-text-secondary)] border-[var(--admin-border-subtle)] hover:border-[var(--admin-border-hover)]'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Header Toggle */}
              <label className="inline-flex items-center gap-2 p-3 rounded-xl bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-subtle)] text-xs font-medium text-[var(--admin-text-primary)] cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={hasHeader}
                  onChange={(e) => setHasHeader(e.target.checked)}
                  className="rounded text-[var(--admin-primary)] focus:ring-0"
                />
                <span>Include Bold Header Row at top (Header 1, Header 2, ...)</span>
              </label>

              {/* Real-time Visual Skeleton Preview of Empty Table */}
              <div className="space-y-2 pt-2 border-t border-[var(--admin-border-subtle)]">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--admin-text-muted)] flex items-center gap-1.5">
                  <Grid className="w-3.5 h-3.5 text-[var(--admin-primary)]" />
                  <span>Preview ({blankRows} Rows × {blankCols} Columns):</span>
                </span>

                <div className="overflow-x-auto rounded-xl border border-[var(--admin-border-base)] bg-[var(--admin-bg-surface)] p-2">
                  <table className="w-full text-xs border-collapse">
                    {hasHeader && (
                      <thead>
                        <tr className="bg-[var(--admin-bg-elevated)] border-b border-[var(--admin-border-base)]">
                          {Array.from({ length: blankCols }).map((_, c) => (
                            <th key={c} className="px-3 py-2 border-r border-[var(--admin-border-subtle)] last:border-r-0 text-left font-bold text-[var(--admin-text-primary)]">
                              Header {c + 1}
                            </th>
                          ))}
                        </tr>
                      </thead>
                    )}
                    <tbody className="divide-y divide-[var(--admin-border-subtle)]">
                      {Array.from({ length: Math.max(1, hasHeader ? blankRows - 1 : blankRows) }).map((_, r) => (
                        <tr key={r} className="hover:bg-[var(--admin-bg-elevated)]/40 transition-colors">
                          {Array.from({ length: blankCols }).map((_, c) => (
                            <td key={c} className="px-3 py-2 border-r border-[var(--admin-border-subtle)] last:border-r-0 text-[var(--admin-text-muted)] italic">
                              [Empty Cell]
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE CONTENT GRID */}
        {activeTab === 'content' && (
          <>
            {/* Toolbar Ribbon for Grid */}
            <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-[var(--admin-border-subtle)] bg-[var(--admin-bg-card)] flex-wrap">
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={addRow}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--admin-primary)] text-white hover:opacity-90 shadow-xs transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Row</span>
                </button>

                <button
                  type="button"
                  onClick={addColumn}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--admin-primary-soft)] text-[var(--admin-primary)] border border-[var(--admin-primary)]/30 hover:bg-[var(--admin-primary)] hover:text-white transition-all shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Column</span>
                </button>

                <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-subtle)] text-xs font-medium text-[var(--admin-text-secondary)] cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={hasHeader}
                    onChange={(e) => setHasHeader(e.target.checked)}
                    className="rounded text-[var(--admin-primary)] focus:ring-0"
                  />
                  <span>Header Row (Bold)</span>
                </label>

                <button
                  type="button"
                  onClick={handleClearAllCells}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 transition-all"
                  title="Clear all cell text to make empty"
                >
                  <Eraser className="w-3.5 h-3.5" />
                  <span>Clear All Content (Make Empty)</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] hover:bg-[var(--admin-bg-elevated)] transition-colors"
                title="Reset table"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Scrollable Interactive Table Grid Area */}
            <div className="flex-1 overflow-auto p-5 admin-scrollbar bg-[var(--admin-bg-canvas)]">
              <div className="inline-block min-w-full align-middle">
                {/* Column Delete / Action Controls Above Header */}
                <div className="flex items-center mb-1.5 pl-12 gap-2">
                  {Array.from({ length: colCount }).map((_, cIdx) => (
                    <div key={cIdx} className="flex-1 min-w-[160px] flex items-center justify-between px-2 py-1 rounded bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-subtle)] text-[11px] font-mono text-[var(--admin-text-muted)]">
                      <span>Col {cIdx + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeColumn(cIdx)}
                        disabled={colCount <= 1}
                        className="p-1 rounded hover:bg-red-500/10 hover:text-red-500 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                        title={colCount > 1 ? `Delete Column ${cIdx + 1}` : 'At least one column required'}
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Editable Rows */}
                <div className="space-y-2">
                  {grid.map((row, rIdx) => {
                    const isHeaderRow = hasHeader && rIdx === 0

                    return (
                      <div key={rIdx} className="flex items-center gap-2 group">
                        {/* Row control handle & delete */}
                        <div className="w-10 shrink-0 flex items-center justify-center gap-1">
                          <span className="text-[11px] font-mono text-[var(--admin-text-muted)] w-4 text-right">
                            {rIdx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeRow(rIdx)}
                            disabled={rowCount <= 1}
                            className="p-1 rounded text-[var(--admin-text-muted)] hover:text-red-500 hover:bg-red-500/10 disabled:opacity-20 disabled:hover:bg-transparent transition-colors"
                            title={rowCount > 1 ? `Delete Row ${rIdx + 1}` : 'At least one row required'}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Row Cells */}
                        <div className="flex-1 flex items-center gap-2">
                          {row.map((cellValue, cIdx) => (
                            <div key={cIdx} className="flex-1 min-w-[160px]">
                              <input
                                type="text"
                                value={cellValue}
                                onChange={(e) => handleCellChange(rIdx, cIdx, e.target.value)}
                                placeholder={isHeaderRow ? `Header ${cIdx + 1}` : `[Empty Cell]`}
                                className={`w-full px-3 py-2 text-xs rounded-lg border transition-all ${
                                  isHeaderRow
                                    ? 'bg-[var(--admin-bg-elevated)] font-bold text-[var(--admin-text-primary)] border-[var(--admin-primary)]/40 focus:border-[var(--admin-primary)]'
                                    : 'bg-[var(--admin-bg-surface)] text-[var(--admin-text-secondary)] border-[var(--admin-border-base)] hover:border-[var(--admin-border-hover)] focus:border-[var(--admin-primary)] focus:bg-[var(--admin-bg-surface)]'
                                } focus:outline-none focus:ring-1 focus:ring-[var(--admin-primary)]`}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Quick Add Row Button at Bottom of Grid */}
                <div className="mt-3 pl-12">
                  <button
                    type="button"
                    onClick={addRow}
                    className="w-full py-2.5 rounded-xl border border-dashed border-[var(--admin-border-base)] hover:border-[var(--admin-primary)] hover:bg-[var(--admin-primary-soft)] text-xs font-semibold text-[var(--admin-text-muted)] hover:text-[var(--admin-primary)] flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Row #{rowCount + 1}</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Modal Footer with Both Insert Options */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-[var(--admin-border-base)] bg-[var(--admin-bg-elevated)] flex-wrap gap-3">
          <div className="text-xs text-[var(--admin-text-muted)] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[var(--admin-primary)]" />
            <span>Table will be inserted into editor with full borders & mobile scroll.</span>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              type="button"
              onClick={onClose}
              className="admin-btn admin-btn-secondary h-9 px-3.5 text-xs font-medium"
            >
              Cancel
            </button>

            {/* If in Content tab, provide option to insert as empty table as well */}
            {activeTab === 'content' && (
              <button
                type="button"
                onClick={() => handleInsertEmptyTable(rowCount, colCount)}
                className="admin-btn admin-btn-secondary h-9 px-3.5 text-xs font-semibold flex items-center gap-1.5 border-[var(--admin-border-base)] hover:border-[var(--admin-primary)]"
                title="Insert these rows and columns with empty cells"
              >
                <Grid className="w-3.5 h-3.5 text-[var(--admin-text-muted)]" />
                <span>Insert as Empty ({rowCount}×{colCount})</span>
              </button>
            )}

            {/* Primary Action Button */}
            {activeTab === 'empty' ? (
              <button
                type="button"
                onClick={() => handleInsertEmptyTable(blankRows, blankCols)}
                className="admin-btn admin-btn-primary h-9 px-4 text-xs font-semibold flex items-center gap-1.5 shadow-md"
              >
                <Check className="w-4 h-4" />
                <span>Insert Empty Table ({blankRows} Rows × {blankCols} Cols)</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleInsertWithContent}
                className="admin-btn admin-btn-primary h-9 px-4 text-xs font-semibold flex items-center gap-1.5 shadow-md"
              >
                <Check className="w-4 h-4" />
                <span>Insert Table with Content</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TableEditorModal
