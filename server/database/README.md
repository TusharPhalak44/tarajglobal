# Database Setup

This folder contains the database schema and setup files for the Taraj Global project.

## Database: tarajglobal

### Tables

1. **users** - User accounts and authentication
2. **services** - Service offerings
3. **blogs** - Blog posts and articles
4. **contacts** - Contact form submissions
5. **industries** - Industry information
6. **careers** - Job listings
7. **settings** - Site configuration settings

## Setup Instructions

### Using XAMPP/phpMyAdmin

1. Start XAMPP and ensure MySQL is running
2. Open phpMyAdmin (http://localhost/phpmyadmin)
3. Import the `tarajglobal.sql` file
4. The database will be created automatically

### Using MySQL Command Line

```bash
mysql -u root -p < tarajglobal.sql
```

### Default Admin User

- **Email:** admin@tarajglobal.com
- **Password:** admin123 (change this in production)

## Environment Configuration

Update the `.env` file in the server directory:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=tarajglobal
DB_PORT=3306
```

## Backup and Restore

### Backup
```bash
mysqldump -u root -p tarajglobal > backup.sql
```

### Restore
```bash
mysql -u root -p tarajglobal < backup.sql
```

## Notes

- All tables use InnoDB engine for transaction support
- UTF-8 encoding (utf8mb4) for full Unicode support
- Timestamps for created_at and updated_at fields
- Indexes on frequently queried fields
