# HairSalon Pro

A professional Progressive Web App (PWA) for managing hair salon operations, including client management, appointment scheduling, and inventory tracking.

## Features

### Core Functionality
- 📋 **Client Management**: Store and manage client information including contact details and notes
- 📅 **Appointment Scheduling**: Schedule and track appointments with calendar view
- 📦 **Inventory Management**: Track products and supplies with low stock alerts
- 📊 **Dashboard**: Overview of key metrics including revenue tracking
- 🗓️ **Calendar View**: Visual calendar with appointment indicators

### Advanced Features
- 🔍 **Search & Filter**: Quick search across clients, appointments, and inventory
- 💾 **Data Backup/Restore**: Export and import all data in JSON format
- 📤 **Data Export**: Export clients, appointments, or inventory to CSV
- 🌐 **Offline Support**: Works offline with service worker caching
- 📱 **PWA Support**: Install as an app on any device
- 🌍 **Multi-language**: English, Spanish, Russian, and Hebrew

### User Experience
- ⚡ **Real-time Updates**: Dashboard updates automatically
- 🎨 **Modern Dark Theme**: Professional gradient-based design
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile
- ♿ **Accessibility**: ARIA labels, keyboard navigation, focus management
- ⌨️ **Keyboard Shortcuts**:
  - `Ctrl/Cmd + N`: Add new client
  - `Ctrl/Cmd + A`: Schedule new appointment
  - `Ctrl/Cmd + I`: Add inventory item

### Security & Validation
- 🔒 **Input Sanitization**: Protection against XSS attacks
- ✅ **Form Validation**: Email, phone, and data validation
- 🛡️ **Error Handling**: Graceful error handling with user feedback
- 💬 **Confirmation Dialogs**: Prevent accidental deletions

## Installation

### As a Web App
1. Visit the website in your browser
2. Click the "Install App" button when prompted
3. The app will be installed on your device

### Development Setup
```bash
# Clone the repository
git clone https://github.com/vovkez11/hairsalon-pro.git

# Navigate to the directory
cd hairsalon-pro

# Open in browser
# Simply open index.html in a modern web browser
# Or use a local server:
python -m http.server 8000
# Then visit http://localhost:8000
```

## Usage

### Managing Clients
1. Click "Add Client" or press `Ctrl/Cmd + N`
2. Fill in client details (name and phone are required)
3. Save the client

### Scheduling Appointments
1. Click "Schedule Appointment" or press `Ctrl/Cmd + A`
2. Select a client from the dropdown
3. Choose date, time, and service
4. Optionally select products used from inventory
5. Save the appointment

### Managing Inventory
1. Click "Add Inventory Item" or press `Ctrl/Cmd + I`
2. Enter item details and low stock threshold
3. Track usage automatically through appointments

### Backup & Restore
1. Go to "Export Data" section
2. Click "Backup All Data" to download JSON backup
3. Click "Restore Data" to upload a backup file

## Data Storage

All data is stored locally in your browser's localStorage:
- `hairsalon_clients`: Client information
- `hairsalon_appointments`: Appointment records
- `hairsalon_inventory`: Inventory items
- `hairsalon_usage_history`: Product usage tracking
- `hairsalon_language`: Language preference

**Security Note**: This is a client-side-only application that stores data in the browser's localStorage. The data is not encrypted at rest, which is acceptable for this use case as it's meant for personal/local business use. For sensitive business information or multi-user scenarios, consider implementing server-side storage with proper encryption.

## Browser Support

- Chrome/Edge: ✅ Fully supported
- Firefox: ✅ Fully supported
- Safari: ✅ Fully supported
- Opera: ✅ Fully supported

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **JavaScript**: Vanilla ES6+ JavaScript
- **Service Worker**: Offline support and caching
- **PWA**: Progressive Web App features
- **LocalStorage**: Client-side data persistence
- **Font Awesome**: Icon library

## Project Structure

```
hairsalon-pro/
├── index.html           # Main application file
├── manifest.json        # PWA manifest
├── service-worker.js    # Service worker for offline support
├── icons/              # App icons
│   ├── icon-192.png
│   └── icon-512.png
└── README.md           # This file
```

## Performance Optimizations

- ⚡ Debounced search operations (300ms delay)
- 🎯 Cache-first strategy for static resources
- 🌐 Network-first strategy for HTML updates
- ⏰ Cache expiration (24 hours)
- 🔄 Lazy rendering for large datasets

## Security Best Practices

- Input sanitization using DOM API
- Email and phone validation
- XSS protection through content sanitization
- Secure localStorage operations with error handling
- Confirmation dialogs for destructive actions

## Accessibility Features

- ARIA labels on all interactive elements
- Keyboard navigation support
- Focus management in modals
- Focus trapping for better keyboard access
- Screen reader friendly
- High contrast color scheme

## Future Enhancements

- [ ] Pagination for large datasets
- [ ] Advanced time slot management in calendar
- [ ] Email/SMS notifications
- [ ] Multi-user support
- [ ] Cloud sync
- [ ] Reports and analytics
- [ ] Appointment reminders
- [ ] Client history tracking

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

Created by vovkez11

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Note**: This app stores all data locally in your browser. Make sure to backup your data regularly using the backup feature.
