const db = require('../database/connection');

/**
 * Audit logging middleware
 * Automatically logs admin actions to the audit_logs table
 */
const auditLogger = (module) => {
  return async (req, res, next) => {
    // Store original json and send methods
    const originalJson = res.json.bind(res);
    const originalSend = res.send.bind(res);
    
    let responseData = null;
    let statusCode = null;

    // Override res.json to capture response data
    res.json = function(data) {
      responseData = data;
      statusCode = res.statusCode;
      return originalJson(data);
    };

    // Override res.send to capture response data
    res.send = function(data) {
      responseData = data;
      statusCode = res.statusCode;
      return originalSend(data);
    };

    // Continue to next middleware/route handler
    res.on('finish', async () => {
      try {
        // Only log successful operations (2xx status codes)
        if (statusCode >= 200 && statusCode < 300) {
          const method = req.method.toLowerCase();
          const path = req.path;
          
          // Determine action based on HTTP method
          let action = 'view';
          if (method === 'post') action = 'create';
          else if (method === 'put' || method === 'patch') action = 'update';
          else if (method === 'delete') action = 'delete';

          // Extract entity ID from path or request body
          let entityId = null;
          let entityType = module;
          
          // Try to extract ID from URL path
          const idMatch = path.match(/\/(\d+)/);
          if (idMatch) {
            entityId = idMatch[1];
          }

          // Get user information
          const userId = req.user?.id || null;
          const userName = req.user?.name || 'System';
          const userEmail = req.user?.email || '';

          // Get IP address
          const ipAddress = req.ip || req.connection.remoteAddress || null;
          
          // Get user agent
          const userAgent = req.get('user-agent') || null;

          // Prepare old and new values (simplified)
          const oldValues = req.body ? { ...req.body } : null;
          const newValues = responseData || null;

          // Insert audit log
          const insertQuery = `
            INSERT INTO audit_logs (
              user_id,
              action,
              module,
              entity_id,
              entity_type,
              old_values,
              new_values,
              ip_address,
              user_agent,
              created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
          `;

          await db.execute(insertQuery, [
            userId,
            action,
            module,
            entityId,
            entityType,
            oldValues ? JSON.stringify(oldValues) : null,
            newValues ? JSON.stringify(newValues) : null,
            ipAddress,
            userAgent
          ]);
        }
      } catch (error) {
        // Log error but don't break the request
        console.error('Audit logging error:', error);
      }
    });

    next();
  };
};

module.exports = auditLogger;
