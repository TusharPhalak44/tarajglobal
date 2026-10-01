const fs = require('fs');

function addQuillOverrides() {
  let content = fs.readFileSync('client/src/styles/admin.css', 'utf8');

  if (content.includes('.ql-toolbar')) return;

  const overrides = `
/* --------------------------------------------------------------------------
   8. QUILL EDITOR CUSTOM THEME
   -------------------------------------------------------------------------- */
.ql-toolbar.ql-snow {
  background: var(--admin-bg-elevated);
  border: 1px solid var(--admin-border-base) !important;
  border-top-left-radius: var(--admin-radius-md);
  border-top-right-radius: var(--admin-radius-md);
  border-bottom: none !important;
  font-family: var(--font-family-primary);
}

.ql-container.ql-snow {
  background: var(--admin-bg-surface);
  border: 1px solid var(--admin-border-base) !important;
  border-bottom-left-radius: var(--admin-radius-md);
  border-bottom-right-radius: var(--admin-radius-md);
  color: var(--admin-text-primary);
  font-family: var(--font-family-primary);
  font-size: var(--font-size-input);
}

.ql-editor {
  min-height: 400px;
}

.ql-editor.ql-blank::before {
  color: var(--admin-text-muted) !important;
  font-style: normal !important;
}

.ql-snow .ql-stroke {
  stroke: var(--admin-text-primary) !important;
}

.ql-snow .ql-fill, .ql-snow .ql-stroke.ql-fill {
  fill: var(--admin-text-primary) !important;
}

.ql-snow .ql-picker {
  color: var(--admin-text-primary) !important;
}

.ql-snow .ql-picker-options {
  background: var(--admin-bg-surface) !important;
  border: 1px solid var(--admin-border-base) !important;
  box-shadow: var(--admin-shadow-md);
}

.ql-snow.ql-toolbar button:hover .ql-stroke,
.ql-snow .ql-toolbar button:hover .ql-stroke,
.ql-snow.ql-toolbar button.ql-active .ql-stroke,
.ql-snow .ql-toolbar button.ql-active .ql-stroke,
.ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke,
.ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke,
.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke,
.ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke {
  stroke: var(--admin-primary) !important;
}

.ql-snow.ql-toolbar button:hover .ql-fill,
.ql-snow .ql-toolbar button:hover .ql-fill,
.ql-snow.ql-toolbar button.ql-active .ql-fill,
.ql-snow .ql-toolbar button.ql-active .ql-fill,
.ql-snow.ql-toolbar .ql-picker-label:hover .ql-fill,
.ql-snow .ql-toolbar .ql-picker-label:hover .ql-fill,
.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill,
.ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-fill {
  fill: var(--admin-primary) !important;
}
`;

  fs.writeFileSync('client/src/styles/admin.css', content + overrides);
}

addQuillOverrides();
