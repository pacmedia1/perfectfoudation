# Perfect Foundation Academy Website

A complete school management website with backend form processing, email notifications, and file upload capabilities.

## Features

### Frontend
- **Responsive Design**: Mobile-first approach with modern UI/UX
- **Interactive Forms**: Admission applications, contact forms, newsletter signup
- **File Upload**: Document submission with drag-and-drop support
- **Form Validation**: Real-time client-side validation
- **Animations**: Scroll-triggered animations and smooth transitions
- **Social Media Integration**: Sharing buttons and floating social links

### Backend
- **Form Processing**: Secure handling of admissions and contact forms
- **Email System**: Automated confirmation and notification emails
- **File Management**: Secure file upload with validation and storage
- **Database Integration**: MySQL database with proper schema
- **Security**: CSRF protection, input validation, and sanitization

## Installation

### Prerequisites
- PHP 7.4 or higher
- MySQL 5.7 or higher
- Web server (Apache/Nginx)
- Composer (for dependencies)

### Setup Steps

1. **Clone/Download the project**
   ```bash
   # Place files in your web server directory
   ```

2. **Install Dependencies**
   ```bash
   composer install
   ```

3. **Database Configuration**
   - Create a MySQL database
   - Update `backend/config.php` with your database credentials:
   ```php
   define('DB_HOST', 'localhost');
   define('DB_NAME', 'perfect_foundation_db');
   define('DB_USER', 'your_username');
   define('DB_PASS', 'your_password');
   ```

4. **Email Configuration**
   - Update email settings in `backend/config.php`:
   ```php
   define('SMTP_HOST', 'smtp.gmail.com');
   define('SMTP_USERNAME', 'your-email@gmail.com');
   define('SMTP_PASSWORD', 'your-app-password');
   define('SMTP_FROM_EMAIL', 'admissions@perfectfoundationacademy.com');
   ```

5. **Run Installation Script**
   - Visit: `http://yoursite.com/backend/install.php`
   - This will create database tables and set up directories

6. **Set Permissions**
   ```bash
   chmod 755 uploads/
   chmod 644 backend/*.php
   ```

## File Structure

```
PerfectFoundation/
├── backend/
│   ├── config.php              # Configuration settings
│   ├── database.php            # Database handler
│   ├── email.php               # Email handler with templates
│   ├── file-handler.php        # File upload manager
│   ├── process-admission.php   # Admission form processor
│   ├── process-contact.php     # Contact form processor
│   ├── process-newsletter.php  # Newsletter subscription
│   └── install.php             # Database setup script
├── css/
│   ├── style.css              # Main stylesheet
│   └── responsive.css         # Responsive styles
├── js/
│   └── script.js              # Main JavaScript
├── uploads/                   # File upload directory
│   ├── admissions/           # Admission documents
│   ├── documents/            # General documents
│   └── temp/                 # Temporary files
├── *.html                    # Website pages
└── composer.json             # Dependencies
```

## Form Processing

### Admission Form
- **Endpoint**: `backend/process-admission.php`
- **Method**: POST with multipart/form-data
- **Features**:
  - Student and parent information collection
  - Document upload (birth certificate, photos, IDs)
  - Email confirmations to parents and admin
  - Database storage with unique application IDs

### Contact Form
- **Endpoint**: `backend/process-contact.php`
- **Method**: POST
- **Features**:
  - General inquiries and visit requests
  - Email notifications
  - Response tracking

### Newsletter
- **Endpoint**: `backend/process-newsletter.php`
- **Method**: POST
- **Features**:
  - Email subscription management
  - Welcome email automation
  - Duplicate prevention

## Email Templates

The system includes professional HTML email templates for:
- **Admission Confirmation**: Sent to parents with application details
- **Admission Notification**: Sent to admin with complete application info
- **Contact Confirmation**: Acknowledgment of inquiries
- **Contact Notification**: Admin notification of new inquiries
- **Newsletter Welcome**: Welcome message for new subscribers

## Security Features

- **CSRF Protection**: Tokens prevent cross-site request forgery
- **Input Validation**: Server-side validation of all form data
- **File Upload Security**: Type and size validation, secure storage
- **SQL Injection Prevention**: Prepared statements
- **XSS Protection**: Output sanitization

## Database Schema

### Tables Created
- `admissions`: Student application data
- `contact_inquiries`: Contact form submissions
- `newsletter_subscriptions`: Email subscriptions
- `file_uploads`: File upload tracking

## Customization

### Adding New Form Fields
1. Update HTML form
2. Modify database schema
3. Update PHP processor
4. Add validation rules

### Email Template Customization
- Edit templates in `backend/email.php`
- Modify styling and content as needed
- Test with different email clients

### File Upload Configuration
- Adjust file size limits in `backend/config.php`
- Modify allowed file types
- Update storage directories

## Troubleshooting

### Common Issues

1. **Email Not Sending**
   - Check SMTP credentials
   - Verify firewall settings
   - Test with different email providers

2. **File Upload Errors**
   - Check directory permissions
   - Verify PHP upload limits
   - Ensure adequate disk space

3. **Database Connection Issues**
   - Verify credentials in config.php
   - Check MySQL service status
   - Confirm database exists

4. **Form Submission Errors**
   - Check browser console for JavaScript errors
   - Verify form action URLs
   - Test with browser developer tools

## Maintenance

### Regular Tasks
- **Database Backups**: Schedule regular MySQL backups
- **File Cleanup**: Remove old temporary files
- **Log Monitoring**: Check error logs regularly
- **Security Updates**: Keep PHP and dependencies updated

### Performance Optimization
- Enable PHP OPcache
- Optimize database queries
- Compress static assets
- Use CDN for external resources

## Support

For technical support or customization requests, refer to the development documentation or contact the development team.

## License

This project is proprietary software developed for Perfect Foundation Academy.
