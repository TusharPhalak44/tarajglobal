const fs = require('fs');

function fixController() {
  let content = fs.readFileSync('server/controllers/admin/blog.controller.js', 'utf8');

  if (!content.includes('columnNames.includes(\'scheduled_at\')')) {
    // For Create
    content = content.replace(
      /if \(columnNames\.includes\('tags'\) && tags\) \{/,
      `if (columnNames.includes('scheduled_at') && scheduled_at) {
      insertColumns.push('scheduled_at')
      insertValues.push(scheduled_at)
      valuePlaceholders.push('?')
    }

    if (columnNames.includes('tags') && tags) {`
    );

    // For Update
    content = content.replace(
      /if \(columnNames\.includes\('tags'\) && tags !== undefined\) \{/,
      `if (columnNames.includes('scheduled_at') && scheduled_at !== undefined) {
      updateColumns.push('scheduled_at = ?')
      updateValues.push(scheduled_at || null)
    }

    if (columnNames.includes('tags') && tags !== undefined) {`
    );
  }

  fs.writeFileSync('server/controllers/admin/blog.controller.js', content);
}

fixController();
