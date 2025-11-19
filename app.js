// HairSalon Pro - FIXED TIME SELECTION VERSION
class HairSalonPro {
    constructor() {
        this.currentLanguage = 'en';
        this.currentDate = new Date();
        this.deferredPrompt = null;
        this.selectedCalendarDate = null;
        this.editingClientId = null;
        this.editingInventoryId = null;
        this.editingAppointmentId = null;
        
        // Search debounce timeouts
        this.clientSearchTimeout = null;
        this.appointmentSearchTimeout = null;
        this.inventorySearchTimeout = null;
        
        // Current inventory category filter
        this.currentInventoryCategory = 'all';
        
        // Navigation history for back button management
        this.currentSection = 'dashboard';
        this.navigationHistory = [];
        
        // No currency settings - just numbers
        this.currencies = {
            'en': { symbol: '', code: '', rate: 1 },
            'es': { symbol: '', code: '', rate: 1 },
            'ru': { symbol: '', code: '', rate: 1 },
            'he': { symbol: '', code: '', rate: 1 }
        };
        
        // Initialize data
        this.clients = [];
        this.appointments = [];
        this.inventory = [];
        this.usageHistory = [];
        
        // Initialize settings with defaults
        this.settings = {
            businessName: 'HairSalon Pro',
            currencySymbol: '',
            defaultDuration: 60,
            lowStockDefault: 5,
            openTime: '09:00',
            closeTime: '18:00',
            workingDays: {
                mon: true,
                tue: true,
                wed: true,
                thu: true,
                fri: true,
                sat: false,
                sun: false
            },
            theme: 'dark',
            timeFormat: '12',
            dateFormat: 'MM/DD/YYYY',
            showToasts: true
        };
        
        // Load data from localStorage with error handling
        this.loadFromLocalStorage();
        
        // Complete translations
        this.translations = {
            'en': {
                'app_name': 'HairSalon Pro',
                'tagline': 'Professional Hairdresser Management System',
                'dashboard': 'Dashboard',
                'clients': 'Clients',
                'appointments': 'Appointments',
                'upcoming_sessions': 'Upcoming Sessions',
                'calendar': 'Calendar',
                'inventory': 'Inventory',
                'export_data': 'Export Data',
                'settings': 'Settings',
                'business_name': 'Business Name',
                'currency_symbol': 'Currency Symbol',
                'default_appointment_duration': 'Default Appointment Duration',
                'default_low_stock_threshold': 'Default Low Stock Threshold',
                'business_hours': 'Business Hours',
                'working_days': 'Working Days',
                'reset_defaults': 'Reset to Defaults',
                'save_settings': 'Save Settings',
                'settings_saved': 'Settings saved successfully',
                'settings_reset': 'Settings reset to defaults',
                'main_navigation': 'Main Navigation',
                'quick_actions': 'Quick Actions',
                'add_client': 'Add Client',
                'schedule_appointment': 'Schedule Appointment',
                'install_app': 'Install App',
                'total_clients': 'Total Clients',
                'total_appointments': 'Total Appointments',
                'upcoming_appointments': 'Upcoming',
                'low_stock_items': 'Low Stock Items',
                'month_revenue': 'Month Revenue',
                'year_revenue': 'Year Revenue',
                'recent_appointments': 'Recent Appointments',
                'no_clients_yet': 'No clients yet',
                'build_client_database': 'Start building your client database by adding your first client.',
                'add_first_client': 'Add First Client',
                'no_appointments_yet': 'No appointments yet',
                'schedule_first_appointment': 'Schedule your first appointment to get started.',
                'add_first_appointment': 'Schedule First Appointment',
                'no_upcoming_sessions': 'No upcoming sessions',
                'no_inventory_items': 'No inventory items',
                'add_inventory_items': 'Add inventory items to track your salon supplies.',
                'add_first_item': 'Add First Item',
                'client_name': 'Client Name',
                'phone_number': 'Phone Number',
                'email_address': 'Email Address',
                'notes': 'Notes',
                'cancel': 'Cancel',
                'save_client': 'Save Client',
                'select_client': 'Select Client',
                'date': 'Date',
                'time': 'Time',
                'service': 'Service',
                'price': 'Price',
                'save_appointment': 'Save Appointment',
                'item_name': 'Item Name',
                'category': 'Category',
                'quantity': 'Quantity',
                'low_stock_threshold': 'Low Stock Threshold',
                'save_item': 'Save Item',
                'all_items': 'All Items',
                'hair_products': 'Hair Products',
                'styling_tools': 'Styling Tools',
                'color_products': 'Color Products',
                'accessories': 'Accessories',
                'other': 'Other',
                'export_description': 'Export your salon data for backup or analysis purposes.',
                'export_clients': 'Export Clients',
                'export_clients_desc': 'CSV format',
                'export_appointments': 'Export Appointments',
                'export_appointments_desc': 'CSV format',
                'export_inventory': 'Export Inventory',
                'export_inventory_desc': 'CSV format',
                'install_prompt': 'Install HairSalon Pro for better experience',
                'install': 'Install',
                'dismiss': 'Dismiss',
                'client_saved': 'Client saved successfully',
                'appointment_saved': 'Appointment scheduled successfully',
                'inventory_saved': 'Inventory item saved successfully',
                'edit_client': 'Edit Client',
                'update_client': 'Update Client',
                'client_updated': 'Client updated successfully',
                'edit_inventory_item': 'Edit Inventory Item',
                'update_item': 'Update Item',
                'inventory_updated': 'Inventory item updated successfully',
                'edit_appointment': 'Edit Appointment',
                'update_appointment': 'Update Appointment',
                'appointment_updated': 'Appointment updated successfully',
                'low_stock_warning': 'Low Stock Warning',
                'delete': 'Delete',
                'delete_confirmation': 'Are you sure you want to delete this item?',
                'item_deleted': 'Item deleted successfully',
                'products_used': 'Products Used',
                'view_usage_history': 'View Usage History',
                'no_usage_history': 'No usage history for this product',
                'used_in_appointment': 'Used in appointment with',
                'quantity_used': 'Quantity Used',
                'insufficient_stock': 'Insufficient stock for product',
                'click_to_create_session': 'Click to create session on this date',
                'click_to_view_appointments': 'Click to view appointments on this date',
                'create_appointment_for': 'Create Appointment for',
                'appointments_for': 'Appointments for',
                'add_appointment': 'Add Appointment',
                'add_inventory_item': 'Add Inventory Item',
                'add_new_client': 'Add New Client',
                'appearance': 'Appearance',
                'time_format': 'Time Format',
                'date_format': 'Date Format',
                'notifications': 'Notifications',
                'search_clients_placeholder': 'Search clients by name, phone or email...',
                'search_appointments_placeholder': 'Search appointments by client, service...',
                'search_inventory_placeholder': 'Search inventory by name or category...',
                'enter_salon_name_placeholder': 'Enter your salon name',
                'currency_placeholder': '$ or € or £',
                'enter_client_name_placeholder': 'Enter client full name',
                'phone_placeholder': '+1 234 567 8900',
                'email_placeholder': 'client@example.com',
                'notes_placeholder': 'Hair preferences, allergies, etc.',
                'leave_empty_currency': 'Leave empty for no currency symbol',
                'applied_new_inventory': 'Applied when adding new inventory items',
                'opening_time': 'Opening Time',
                'closing_time': 'Closing Time',
                'monday': 'Monday',
                'tuesday': 'Tuesday',
                'wednesday': 'Wednesday',
                'thursday': 'Thursday',
                'friday': 'Friday',
                'saturday': 'Saturday',
                'sunday': 'Sunday',
                'dark_mode': 'Dark Mode',
                'light_mode': 'Light Mode',
                '12_hour': '12-hour (AM/PM)',
                '24_hour': '24-hour',
                'show_toast_notifications': 'Show toast notifications',
                'backup_all_data': 'Backup All Data',
                'json_format': 'JSON format',
                'restore_data': 'Restore Data',
                'from_backup_file': 'From backup file',
                'select_products_used': 'Select products used during this appointment:',
                'available_units': 'Available',
                'units': 'units',
                'qty_label': 'Qty:',
                'no_data_to_export': 'No data to export',
                'data_exported_successfully': 'Data exported successfully',
                'backup_created_successfully': 'Backup created successfully',
                'data_restored_successfully': 'Data restored successfully',
                'failed_to_restore': 'Failed to restore backup. Invalid file format.',
                'failed_to_save': 'Failed to save data. Storage might be full.',
                'products_used_label': 'Products used:',
                'try_adjusting_search': 'Try adjusting your search query',
                'try_adjusting_search_category': 'Try adjusting your search query or selecting a different category',
                'no_items_found_in': 'No items found in',
                'category_word': 'category',
                'no_inventory_available': 'No inventory items available',
                'offline_message': 'You are offline',
                'please_enter_client_name': 'Please enter a client name',
                'please_enter_valid_phone': 'Please enter a valid phone number',
                'please_enter_valid_email': 'Please enter a valid email address',
                'please_select_client': 'Please select a client',
                'please_select_date': 'Please select a date',
                'please_select_time': 'Please select a time for the appointment',
                'please_enter_service': 'Please enter a service name',
                'please_enter_valid_price': 'Please enter a valid price',
                'please_select_valid_date': 'Please select a valid date (today or future)',
                'please_enter_item_name': 'Please enter an item name',
                'please_enter_valid_quantity': 'Please enter a valid quantity',
                'please_enter_valid_threshold': 'Please enter a valid low stock threshold'
            },
            'es': {
                'app_name': 'HairSalon Pro',
                'tagline': 'Sistema Profesional de Gestión de Peluquería',
                'dashboard': 'Panel',
                'clients': 'Clientes',
                'appointments': 'Citas',
                'upcoming_sessions': 'Próximas Sesiones',
                'calendar': 'Calendario',
                'inventory': 'Inventario',
                'export_data': 'Exportar Datos',
                'settings': 'Configuración',
                'business_name': 'Nombre del Negocio',
                'currency_symbol': 'Símbolo de Moneda',
                'default_appointment_duration': 'Duración Predeterminada de Cita',
                'default_low_stock_threshold': 'Umbral Predeterminado de Stock Bajo',
                'business_hours': 'Horario de Negocio',
                'working_days': 'Días Laborables',
                'reset_defaults': 'Restablecer Valores Predeterminados',
                'save_settings': 'Guardar Configuración',
                'settings_saved': 'Configuración guardada con éxito',
                'settings_reset': 'Configuración restablecida',
                'main_navigation': 'Navegación Principal',
                'quick_actions': 'Acciones Rápidas',
                'add_client': 'Agregar Cliente',
                'schedule_appointment': 'Programar Cita',
                'install_app': 'Instalar App',
                'total_clients': 'Clientes Totales',
                'total_appointments': 'Citas Totales',
                'upcoming_appointments': 'Próximas',
                'low_stock_items': 'Artículos Bajos',
                'month_revenue': 'Ingresos del Mes',
                'year_revenue': 'Ingresos del Año',
                'recent_appointments': 'Citas Recientes',
                'no_clients_yet': 'Aún no hay clientes',
                'build_client_database': 'Comience a construir su base de datos de clientes agregando su primer cliente.',
                'add_first_client': 'Agregar Primer Cliente',
                'no_appointments_yet': 'Aún no hay citas',
                'schedule_first_appointment': 'Programe su primera cita para comenzar.',
                'add_first_appointment': 'Programar Primera Cita',
                'no_upcoming_sessions': 'No hay sesiones próximas',
                'no_inventory_items': 'No hay artículos en inventario',
                'add_inventory_items': 'Agregue artículos de inventario para realizar un seguimiento de los suministros de su salón.',
                'add_first_item': 'Agregar Primer Artículo',
                'client_name': 'Nombre del Cliente',
                'phone_number': 'Número de Teléfono',
                'email_address': 'Correo Electrónico',
                'notes': 'Notas',
                'cancel': 'Cancelar',
                'save_client': 'Guardar Cliente',
                'select_client': 'Seleccionar Cliente',
                'date': 'Fecha',
                'time': 'Hora',
                'service': 'Servicio',
                'price': 'Precio',
                'save_appointment': 'Guardar Cita',
                'item_name': 'Nombre del Artículo',
                'category': 'Categoría',
                'quantity': 'Cantidad',
                'low_stock_threshold': 'Umbral de Stock Bajo',
                'save_item': 'Guardar Artículo',
                'all_items': 'Todos los Artículos',
                'hair_products': 'Productos para el Cabello',
                'styling_tools': 'Herramientas de Estilismo',
                'color_products': 'Productos de Color',
                'accessories': 'Accesorios',
                'other': 'Otro',
                'export_description': 'Exporte los datos de su salón para copia de seguridad o análisis.',
                'export_clients': 'Exportar Clientes',
                'export_clients_desc': 'Formato CSV',
                'export_appointments': 'Exportar Citas',
                'export_appointments_desc': 'Formato CSV',
                'export_inventory': 'Exportar Inventario',
                'export_inventory_desc': 'Formato CSV',
                'install_prompt': 'Instale HairSalon Pro para una mejor experiencia',
                'install': 'Instalar',
                'dismiss': 'Descartar',
                'client_saved': 'Cliente guardado exitosamente',
                'appointment_saved': 'Cita programada exitosamente',
                'inventory_saved': 'Artículo de inventario guardado exitosamente',
                'edit_client': 'Editar Cliente',
                'update_client': 'Actualizar Cliente',
                'client_updated': 'Cliente actualizado exitosamente',
                'edit_inventory_item': 'Editar Artículo de Inventario',
                'update_item': 'Actualizar Artículo',
                'inventory_updated': 'Artículo de inventario actualizado exitosamente',
                'edit_appointment': 'Editar Cita',
                'update_appointment': 'Actualizar Cita',
                'appointment_updated': 'Cita actualizada exitosamente',
                'low_stock_warning': 'Advertencia de Stock Bajo',
                'delete': 'Eliminar',
                'delete_confirmation': '¿Está seguro de que desea eliminar este elemento?',
                'item_deleted': 'Elemento eliminado exitosamente',
                'products_used': 'Productos Utilizados',
                'view_usage_history': 'Ver Historial de Uso',
                'no_usage_history': 'No hay historial de uso para este producto',
                'used_in_appointment': 'Usado en cita con',
                'quantity_used': 'Cantidad Usada',
                'insufficient_stock': 'Stock insuficiente para el producto',
                'click_to_create_session': 'Haga clic para crear sesión en esta fecha',
                'click_to_view_appointments': 'Haga clic para ver las citas en esta fecha',
                'create_appointment_for': 'Crear cita para',
                'appointments_for': 'Citas para',
                'add_appointment': 'Agregar Cita',
                'add_inventory_item': 'Agregar Artículo de Inventario',
                'add_new_client': 'Agregar Nuevo Cliente',
                'appearance': 'Apariencia',
                'time_format': 'Formato de Hora',
                'date_format': 'Formato de Fecha',
                'notifications': 'Notificaciones',
                'search_clients_placeholder': 'Buscar clientes por nombre, teléfono o correo...',
                'search_appointments_placeholder': 'Buscar citas por cliente, servicio...',
                'search_inventory_placeholder': 'Buscar inventario por nombre o categoría...',
                'enter_salon_name_placeholder': 'Ingrese el nombre de su salón',
                'currency_placeholder': '$ o € o £',
                'enter_client_name_placeholder': 'Ingrese el nombre completo del cliente',
                'phone_placeholder': '+1 234 567 8900',
                'email_placeholder': 'cliente@ejemplo.com',
                'notes_placeholder': 'Preferencias de cabello, alergias, etc.',
                'leave_empty_currency': 'Dejar vacío para ningún símbolo de moneda',
                'applied_new_inventory': 'Aplicado al agregar nuevos artículos de inventario',
                'opening_time': 'Hora de Apertura',
                'closing_time': 'Hora de Cierre',
                'monday': 'Lunes',
                'tuesday': 'Martes',
                'wednesday': 'Miércoles',
                'thursday': 'Jueves',
                'friday': 'Viernes',
                'saturday': 'Sábado',
                'sunday': 'Domingo',
                'dark_mode': 'Modo Oscuro',
                'light_mode': 'Modo Claro',
                '12_hour': '12 horas (AM/PM)',
                '24_hour': '24 horas',
                'show_toast_notifications': 'Mostrar notificaciones emergentes',
                'backup_all_data': 'Respaldar Todos los Datos',
                'json_format': 'Formato JSON',
                'restore_data': 'Restaurar Datos',
                'from_backup_file': 'Desde archivo de respaldo',
                'select_products_used': 'Seleccione los productos utilizados durante esta cita:',
                'available_units': 'Disponible',
                'units': 'unidades',
                'qty_label': 'Cant:',
                'no_data_to_export': 'No hay datos para exportar',
                'data_exported_successfully': 'Datos exportados con éxito',
                'backup_created_successfully': 'Respaldo creado con éxito',
                'data_restored_successfully': 'Datos restaurados con éxito',
                'failed_to_restore': 'Error al restaurar respaldo. Formato de archivo inválido.',
                'failed_to_save': 'Error al guardar datos. El almacenamiento puede estar lleno.',
                'products_used_label': 'Productos utilizados:',
                'try_adjusting_search': 'Intente ajustar su consulta de búsqueda',
                'try_adjusting_search_category': 'Intente ajustar su búsqueda o seleccionar una categoría diferente',
                'no_items_found_in': 'No se encontraron elementos en',
                'category_word': 'categoría',
                'no_inventory_available': 'No hay artículos de inventario disponibles',
                'offline_message': 'Estás desconectado',
                'please_enter_client_name': 'Por favor ingrese un nombre de cliente',
                'please_enter_valid_phone': 'Por favor ingrese un número de teléfono válido',
                'please_enter_valid_email': 'Por favor ingrese una dirección de correo válida',
                'please_select_client': 'Por favor seleccione un cliente',
                'please_select_date': 'Por favor seleccione una fecha',
                'please_select_time': 'Por favor seleccione una hora para la cita',
                'please_enter_service': 'Por favor ingrese un nombre de servicio',
                'please_enter_valid_price': 'Por favor ingrese un precio válido',
                'please_select_valid_date': 'Por favor seleccione una fecha válida (hoy o futuro)',
                'please_enter_item_name': 'Por favor ingrese un nombre de artículo',
                'please_enter_valid_quantity': 'Por favor ingrese una cantidad válida',
                'please_enter_valid_threshold': 'Por favor ingrese un umbral de stock bajo válido'
            },
            'ru': {
                'app_name': 'HairSalon Pro',
                'tagline': 'Профессиональная система управления салоном красоты',
                'dashboard': 'Панель управления',
                'clients': 'Клиенты',
                'appointments': 'Записи',
                'upcoming_sessions': 'Ближайшие сеансы',
                'calendar': 'Календарь',
                'inventory': 'Инвентарь',
                'export_data': 'Экспорт данных',
                'settings': 'Настройки',
                'business_name': 'Название бизнеса',
                'currency_symbol': 'Символ валюты',
                'default_appointment_duration': 'Продолжительность записи по умолчанию',
                'default_low_stock_threshold': 'Порог низкого запаса по умолчанию',
                'business_hours': 'Часы работы',
                'working_days': 'Рабочие дни',
                'reset_defaults': 'Сбросить по умолчанию',
                'save_settings': 'Сохранить настройки',
                'settings_saved': 'Настройки сохранены успешно',
                'settings_reset': 'Настройки сброшены',
                'main_navigation': 'Основная навигация',
                'quick_actions': 'Быстрые действия',
                'add_client': 'Добавить клиента',
                'schedule_appointment': 'Запланировать запись',
                'install_app': 'Установить приложение',
                'total_clients': 'Всего клиентов',
                'total_appointments': 'Всего записей',
                'upcoming_appointments': 'Ближайшие',
                'low_stock_items': 'Товары с низким запасом',
                'month_revenue': 'Доход за месяц',
                'year_revenue': 'Доход за год',
                'recent_appointments': 'Недавние записи',
                'no_clients_yet': 'Пока нет клиентов',
                'build_client_database': 'Начните создавать свою базу данных клиентов, добавив первого клиента.',
                'add_first_client': 'Добавить первого клиента',
                'no_appointments_yet': 'Пока нет записей',
                'schedule_first_appointment': 'Запланируйте свою первую запись, чтобы начать.',
                'add_first_appointment': 'Запланировать первую запись',
                'no_upcoming_sessions': 'Нет предстоящих сеансов',
                'no_inventory_items': 'Нет товаров в инвентаре',
                'add_inventory_items': 'Добавьте товары в инвентарь для отслеживания поставок вашего салона.',
                'add_first_item': 'Добавить первый товар',
                'client_name': 'Имя клиента',
                'phone_number': 'Номер телефона',
                'email_address': 'Адрес электронной почты',
                'notes': 'Заметки',
                'cancel': 'Отмена',
                'save_client': 'Сохранить клиента',
                'select_client': 'Выбрать клиента',
                'date': 'Дата',
                'time': 'Время',
                'service': 'Услуга',
                'price': 'Цена',
                'save_appointment': 'Сохранить запись',
                'item_name': 'Название товара',
                'category': 'Категория',
                'quantity': 'Количество',
                'low_stock_threshold': 'Порог низкого запаса',
                'save_item': 'Сохранить товар',
                'all_items': 'Все товары',
                'hair_products': 'Средства для волос',
                'styling_tools': 'Инструменты для укладки',
                'color_products': 'Красящие средства',
                'accessories': 'Аксессуары',
                'other': 'Другое',
                'export_description': 'Экспортируйте данные вашего салона для резервного копирования или анализа.',
                'export_clients': 'Экспорт клиентов',
                'export_clients_desc': 'Формат CSV',
                'export_appointments': 'Экспорт записей',
                'export_appointments_desc': 'Формат CSV',
                'export_inventory': 'Экспорт инвентаря',
                'export_inventory_desc': 'Формат CSV',
                'install_prompt': 'Установите HairSalon Pro для лучшего опыта',
                'install': 'Установить',
                'dismiss': 'Отклонить',
                'client_saved': 'Клиент успешно сохранен',
                'appointment_saved': 'Запись успешно запланирована',
                'inventory_saved': 'Товар инвентаря успешно сохранен',
                'edit_client': 'Редактировать клиента',
                'update_client': 'Обновить клиента',
                'client_updated': 'Клиент успешно обновлен',
                'edit_inventory_item': 'Редактировать товар инвентаря',
                'update_item': 'Обновить товар',
                'inventory_updated': 'Товар инвентаря успешно обновлен',
                'edit_appointment': 'Редактировать запись',
                'update_appointment': 'Обновить запись',
                'appointment_updated': 'Запись успешно обновлена',
                'low_stock_warning': 'Предупреждение о низком запасе',
                'delete': 'Удалить',
                'delete_confirmation': 'Вы уверены, что хотите удалить этот элемент?',
                'item_deleted': 'Элемент успешно удален',
                'products_used': 'Использованные продукты',
                'view_usage_history': 'Просмотреть историю использования',
                'no_usage_history': 'Нет истории использования для этого продукта',
                'used_in_appointment': 'Использовано в записи с',
                'quantity_used': 'Количество использовано',
                'insufficient_stock': 'Недостаточно запасов для продукта',
                'click_to_create_session': 'Нажмите, чтобы создать сеанс на эту дату',
                'click_to_view_appointments': 'Нажмите, чтобы просмотреть записи на эту дату',
                'create_appointment_for': 'Создать запись на',
                'appointments_for': 'Записи на',
                'add_appointment': 'Добавить запись',
                'add_inventory_item': 'Добавить товар в инвентарь',
                'add_new_client': 'Добавить нового клиента',
                'appearance': 'Внешний вид',
                'time_format': 'Формат времени',
                'date_format': 'Формат даты',
                'notifications': 'Уведомления',
                'search_clients_placeholder': 'Поиск клиентов по имени, телефону или email...',
                'search_appointments_placeholder': 'Поиск записей по клиенту, услуге...',
                'search_inventory_placeholder': 'Поиск в инвентаре по названию или категории...',
                'enter_salon_name_placeholder': 'Введите название вашего салона',
                'currency_placeholder': '₽ или $ или €',
                'enter_client_name_placeholder': 'Введите полное имя клиента',
                'phone_placeholder': '+7 900 123 45 67',
                'email_placeholder': 'клиент@пример.ру',
                'notes_placeholder': 'Предпочтения по прическе, аллергии и т.д.',
                'leave_empty_currency': 'Оставьте пустым для отсутствия символа валюты',
                'applied_new_inventory': 'Применяется при добавлении новых товаров в инвентарь',
                'opening_time': 'Время открытия',
                'closing_time': 'Время закрытия',
                'monday': 'Понедельник',
                'tuesday': 'Вторник',
                'wednesday': 'Среда',
                'thursday': 'Четверг',
                'friday': 'Пятница',
                'saturday': 'Суббота',
                'sunday': 'Воскресенье',
                'dark_mode': 'Темный режим',
                'light_mode': 'Светлый режим',
                '12_hour': '12-часовой (AM/PM)',
                '24_hour': '24-часовой',
                'show_toast_notifications': 'Показывать всплывающие уведомления',
                'backup_all_data': 'Резервная копия всех данных',
                'json_format': 'Формат JSON',
                'restore_data': 'Восстановить данные',
                'from_backup_file': 'Из файла резервной копии',
                'select_products_used': 'Выберите продукты, использованные во время этой записи:',
                'available_units': 'Доступно',
                'units': 'единиц',
                'qty_label': 'Кол-во:',
                'no_data_to_export': 'Нет данных для экспорта',
                'data_exported_successfully': 'Данные успешно экспортированы',
                'backup_created_successfully': 'Резервная копия успешно создана',
                'data_restored_successfully': 'Данные успешно восстановлены',
                'failed_to_restore': 'Не удалось восстановить резервную копию. Неверный формат файла.',
                'failed_to_save': 'Не удалось сохранить данные. Возможно, хранилище заполнено.',
                'products_used_label': 'Использованные продукты:',
                'try_adjusting_search': 'Попробуйте изменить поисковый запрос',
                'try_adjusting_search_category': 'Попробуйте изменить запрос или выбрать другую категорию',
                'no_items_found_in': 'Товары не найдены в категории',
                'category_word': 'категория',
                'no_inventory_available': 'Нет доступных товаров в инвентаре',
                'offline_message': 'Вы не в сети',
                'please_enter_client_name': 'Пожалуйста, введите имя клиента',
                'please_enter_valid_phone': 'Пожалуйста, введите действительный номер телефона',
                'please_enter_valid_email': 'Пожалуйста, введите действительный адрес электронной почты',
                'please_select_client': 'Пожалуйста, выберите клиента',
                'please_select_date': 'Пожалуйста, выберите дату',
                'please_select_time': 'Пожалуйста, выберите время для записи',
                'please_enter_service': 'Пожалуйста, введите название услуги',
                'please_enter_valid_price': 'Пожалуйста, введите действительную цену',
                'please_select_valid_date': 'Пожалуйста, выберите действительную дату (сегодня или будущее)',
                'please_enter_item_name': 'Пожалуйста, введите название товара',
                'please_enter_valid_quantity': 'Пожалуйста, введите действительное количество',
                'please_enter_valid_threshold': 'Пожалуйста, введите действительный порог низкого запаса'
            },
            'he': {
                'app_name': 'HairSalon Pro',
                'tagline': 'מערכת ניהול מקצועית למספרות',
                'dashboard': 'לוח בקרה',
                'clients': 'לקוחות',
                'appointments': 'תורים',
                'upcoming_sessions': 'פגישות קרובות',
                'calendar': 'לוח שנה',
                'inventory': 'מלאי',
                'export_data': 'ייצוא נתונים',
                'settings': 'הגדרות',
                'business_name': 'שם העסק',
                'currency_symbol': 'סמל מטבע',
                'default_appointment_duration': 'משך תור ברירת מחדל',
                'default_low_stock_threshold': 'סף מלאי נמוך ברירת מחדל',
                'business_hours': 'שעות פעילות',
                'working_days': 'ימי עבודה',
                'reset_defaults': 'אפס להגדרות ברירת מחדל',
                'save_settings': 'שמור הגדרות',
                'settings_saved': 'ההגדרות נשמרו בהצלחה',
                'settings_reset': 'ההגדרות אופסו',
                'main_navigation': 'ניווט ראשי',
                'quick_actions': 'פעולות מהירות',
                'add_client': 'הוסף לקוח',
                'schedule_appointment': 'קבע תור',
                'install_app': 'התקן אפליקציה',
                'total_clients': 'סה"כ לקוחות',
                'total_appointments': 'סה"כ תורים',
                'upcoming_appointments': 'קרובים',
                'low_stock_items': 'פריטים במלאי נמוך',
                'month_revenue': 'הכנסה חודשית',
                'year_revenue': 'הכנסה שנתית',
                'recent_appointments': 'תורים אחרונים',
                'no_clients_yet': 'אין עדיין לקוחות',
                'build_client_database': 'התחל לבנות את מסד הנתונים של הלקוחות שלך על ידי הוספת הלקוח הראשון שלך.',
                'add_first_client': 'הוסף לקוח ראשון',
                'no_appointments_yet': 'אין עדיין תורים',
                'schedule_first_appointment': 'קבע את התור הראשון שלך כדי להתחיל.',
                'add_first_appointment': 'קבע תור ראשון',
                'no_upcoming_sessions': 'אין פגישות קרובות',
                'no_inventory_items': 'אין פריטים במלאי',
                'add_inventory_items': 'הוסף פריטי מלאי כדי לעקוב אחר האספקה של הסלון שלך.',
                'add_first_item': 'הוסף פריט ראשון',
                'client_name': 'שם הלקוח',
                'phone_number': 'מספר טלפון',
                'email_address': 'כתובת אימייל',
                'notes': 'הערות',
                'cancel': 'ביטול',
                'save_client': 'שמור לקוח',
                'select_client': 'בחר לקוח',
                'date': 'תאריך',
                'time': 'שעה',
                'service': 'שירות',
                'price': 'מחיר',
                'save_appointment': 'שמור תור',
                'item_name': 'שם הפריט',
                'category': 'קטגוריה',
                'quantity': 'כמות',
                'low_stock_threshold': 'סף מלאי נמוך',
                'save_item': 'שמור פריט',
                'all_items': 'כל הפריטים',
                'hair_products': 'מוצרי שיער',
                'styling_tools': 'כלי עיצוב',
                'color_products': 'מוצרי צבע',
                'accessories': 'אקססוריז',
                'other': 'אחר',
                'export_description': 'ייצא את נתוני הסלון שלך למטרות גיבוי או ניתוח.',
                'export_clients': 'ייצא לקוחות',
                'export_clients_desc': 'פורמט CSV',
                'export_appointments': 'ייצא תורים',
                'export_appointments_desc': 'פורמט CSV',
                'export_inventory': 'ייצא מלאי',
                'export_inventory_desc': 'פורמט CSV',
                'install_prompt': 'התקן את HairSalon Pro לחוויה טובה יותר',
                'install': 'התקן',
                'dismiss': 'התעלם',
                'client_saved': 'הלקוח נשמר בהצלחה',
                'appointment_saved': 'התור נקבע בהצלחה',
                'inventory_saved': 'פריט המלאי נשמר בהצלחה',
                'edit_client': 'ערוך לקוח',
                'update_client': 'עדכן לקוח',
                'client_updated': 'הלקוח עודכן בהצלחה',
                'edit_inventory_item': 'ערוך פריט מלאי',
                'update_item': 'עדכן פריט',
                'inventory_updated': 'פריט המלאי עודכן בהצלחה',
                'edit_appointment': 'ערוך תור',
                'update_appointment': 'עדכן תור',
                'appointment_updated': 'התור עודכן בהצלחה',
                'low_stock_warning': 'אזהרת מלאי נמוך',
                'delete': 'מחק',
                'delete_confirmation': 'האם אתה בטוח שברצונך למחוק פריט זה?',
                'item_deleted': 'הפריט נמחק בהצלחה',
                'products_used': 'מוצרים בשימוש',
                'view_usage_history': 'צפה בהיסטוריית שימוש',
                'no_usage_history': 'אין היסטוריית שימוש למוצר זה',
                'used_in_appointment': 'שומש בתור עם',
                'quantity_used': 'כמות משומשת',
                'insufficient_stock': 'מלאי לא מספיק למוצר',
                'click_to_create_session': 'לחץ כדי ליצור פגישה בתאריך זה',
                'click_to_view_appointments': 'לחץ כדי לצפות בתורים בתאריך זה',
                'create_appointment_for': 'צור תור עבור',
                'appointments_for': 'תורים עבור',
                'add_appointment': 'הוסף תור',
                'add_inventory_item': 'הוסף פריט מלאי',
                'add_new_client': 'הוסף לקוח חדש',
                'appearance': 'מראה',
                'time_format': 'פורמט שעה',
                'date_format': 'פורמט תאריך',
                'notifications': 'התראות',
                'search_clients_placeholder': 'חפש לקוחות לפי שם, טלפון או אימייל...',
                'search_appointments_placeholder': 'חפש תורים לפי לקוח, שירות...',
                'search_inventory_placeholder': 'חפש במלאי לפי שם או קטגוריה...',
                'enter_salon_name_placeholder': 'הזן את שם הסלון שלך',
                'currency_placeholder': '₪ או $ או €',
                'enter_client_name_placeholder': 'הזן את השם המלא של הלקוח',
                'phone_placeholder': '+972 50 123 4567',
                'email_placeholder': 'לקוח@דוגמה.com',
                'notes_placeholder': 'העדפות שיער, אלרגיות וכו\'.',
                'leave_empty_currency': 'השאר ריק ללא סמל מטבע',
                'applied_new_inventory': 'מוחל בעת הוספת פריטי מלאי חדשים',
                'opening_time': 'שעת פתיחה',
                'closing_time': 'שעת סגירה',
                'monday': 'שני',
                'tuesday': 'שלישי',
                'wednesday': 'רביעי',
                'thursday': 'חמישי',
                'friday': 'שישי',
                'saturday': 'שבת',
                'sunday': 'ראשון',
                'dark_mode': 'מצב כהה',
                'light_mode': 'מצב בהיר',
                '12_hour': '12 שעות (AM/PM)',
                '24_hour': '24 שעות',
                'show_toast_notifications': 'הצג התראות קופצות',
                'backup_all_data': 'גיבוי כל הנתונים',
                'json_format': 'פורמט JSON',
                'restore_data': 'שחזר נתונים',
                'from_backup_file': 'מקובץ גיבוי',
                'select_products_used': 'בחר מוצרים בשימוש במהלך תור זה:',
                'available_units': 'זמין',
                'units': 'יחידות',
                'qty_label': 'כמות:',
                'no_data_to_export': 'אין נתונים לייצוא',
                'data_exported_successfully': 'הנתונים יוצאו בהצלחה',
                'backup_created_successfully': 'הגיבוי נוצר בהצלחה',
                'data_restored_successfully': 'הנתונים שוחזרו בהצלחה',
                'failed_to_restore': 'שחזור הגיבוי נכשל. פורמט קובץ לא חוקי.',
                'failed_to_save': 'שמירת הנתונים נכשלה. ייתכן שהאחסון מלא.',
                'products_used_label': 'מוצרים בשימוש:',
                'try_adjusting_search': 'נסה להתאים את שאילתת החיפוש',
                'try_adjusting_search_category': 'נסה להתאים את החיפוש או לבחור קטגוריה אחרת',
                'no_items_found_in': 'לא נמצאו פריטים ב',
                'category_word': 'קטגוריה',
                'no_inventory_available': 'אין פריטי מלאי זמינים',
                'offline_message': 'אתה לא מחובר',
                'please_enter_client_name': 'אנא הזן שם לקוח',
                'please_enter_valid_phone': 'אנא הזן מספר טלפון תקף',
                'please_enter_valid_email': 'אנא הזן כתובת אימייל תקפה',
                'please_select_client': 'אנא בחר לקוח',
                'please_select_date': 'אנא בחר תאריך',
                'please_select_time': 'אנא בחר שעה לתור',
                'please_enter_service': 'אנא הזן שם שירות',
                'please_enter_valid_price': 'אנא הזן מחיר תקף',
                'please_select_valid_date': 'אנא בחר תאריך תקף (היום או עתיד)',
                'please_enter_item_name': 'אנא הזן שם פריט',
                'please_enter_valid_quantity': 'אנא הזן כמות תקפה',
                'please_enter_valid_threshold': 'אנא הזן סף מלאי נמוך תקף'
            }
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupLanguage();
        this.applyTheme();
        this.updateDashboard();
        this.renderCalendar();
        this.checkInstallPrompt();
        this.setupMobileMenu();
        this.updateOnlineStatus();
        this.setupBackButtonPrevention();
        
        console.log('💇‍♀️ HairSalon Pro - Enhanced Version Loaded');
    }
    
    applyTheme() {
        // Apply saved theme on page load
        if (this.settings.theme === 'light') {
            document.body.classList.add('light-mode');
        } else {
            document.body.classList.remove('light-mode');
        }
    }
    
    setupEventListeners() {
        // Navigation (sidebar)
        document.querySelectorAll('.nav-link[data-section]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.showSection(e.currentTarget.getAttribute('data-section'));
            });
        });
        
        // Bottom navigation (mobile)
        document.querySelectorAll('.bottom-nav-item[data-section]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.showSection(e.currentTarget.getAttribute('data-section'));
            });
        });
        
        // Quick actions
        document.getElementById('quickAddClient').addEventListener('click', () => {
            this.openModal('addClientModal');
        });
        
        document.getElementById('quickAddAppointment').addEventListener('click', () => {
            this.openModal('addAppointmentModal');
        });
        
        // Forms
        document.getElementById('addClientForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveClient();
        });
        
        document.getElementById('addAppointmentForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveAppointment();
        });
        
        document.getElementById('addInventoryForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveInventoryItem();
        });
        
        document.getElementById('settingsForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveSettings();
        });
        
        // Language selector
        document.getElementById('languageSelect').addEventListener('change', (e) => {
            this.changeLanguage(e.target.value);
        });
        
        // Calendar navigation
        document.getElementById('prevMonth').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            this.renderCalendar();
        });
        
        document.getElementById('nextMonth').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            this.renderCalendar();
        });
        
        // Install button
        document.getElementById('installButton').addEventListener('click', () => {
            this.installApp();
        });
        
        // Install prompt
        document.getElementById('installPromptButton').addEventListener('click', () => {
            this.installApp();
        });
        
        document.getElementById('dismissInstallPrompt').addEventListener('click', () => {
            this.hideInstallPrompt();
        });
        
        // Close modals when clicking outside
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal.id);
                }
            });
        });
        
        // Handle back button on mobile
        window.addEventListener('popstate', (event) => {
            this.handleBackButton(event);
        });
        
        // Before install prompt
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            this.showInstallButton();
        });
        
        // Online/Offline detection
        window.addEventListener('online', () => {
            this.updateOnlineStatus();
        });
        
        window.addEventListener('offline', () => {
            this.updateOnlineStatus();
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Only trigger if no modal is open and not in an input field
            if (document.querySelector('.modal.show') || e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }
            
            // Ctrl/Cmd + N = New Client
            if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
                e.preventDefault();
                this.openModal('addClientModal');
            }
            
            // Ctrl/Cmd + A = New Appointment
            if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
                e.preventDefault();
                this.openModal('addAppointmentModal');
            }
            
            // Ctrl/Cmd + I = New Inventory Item
            if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
                e.preventDefault();
                this.openModal('addInventoryModal');
            }
        });
    }
    
    setupLanguage() {
        const savedLanguage = localStorage.getItem('hairsalon_language') || 'en';
        this.changeLanguage(savedLanguage);
        document.getElementById('languageSelect').value = savedLanguage;
    }
    
    changeLanguage(lang) {
        this.currentLanguage = lang;
        localStorage.setItem('hairsalon_language', lang);
        this.translatePage();
        
        // Update all dynamic content that might have been rendered
        this.updateDashboard();
        this.renderClients();
        this.renderAppointments();
        this.renderUpcomingSessions();
        this.renderInventory();
        this.renderCalendar();
    }
    
    translatePage() {
        // Translate text content
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.translate(key);
            if (translation !== key) {
                element.textContent = translation;
            }
        });
        
        // Translate placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            const translation = this.translate(key);
            if (translation !== key) {
                element.placeholder = translation;
            }
        });
    }
    
    translate(key) {
        return this.translations[this.currentLanguage]?.[key] || key;
    }
    
    showSection(sectionId, skipHistory = false) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Remove active class from all nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Remove active class from all bottom nav items
        document.querySelectorAll('.bottom-nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Show selected section
        document.getElementById(sectionId).classList.add('active');
        
        // Add active class to clicked nav link (both sidebar and bottom nav)
        document.querySelectorAll(`[data-section="${sectionId}"]`).forEach(link => {
            link.classList.add('active');
        });
        
        // Push history state for navigation (unless we're navigating via back button)
        if (!skipHistory && sectionId !== this.currentSection) {
            history.pushState({ section: sectionId }, '', `#${sectionId}`);
        }
        
        // Update current section
        this.currentSection = sectionId;
        
        // Update section-specific content
        switch(sectionId) {
            case 'dashboard':
                this.updateDashboard();
                break;
            case 'clients':
                this.renderClients();
                break;
            case 'appointments':
                this.renderAppointments();
                break;
            case 'upcoming':
                this.renderUpcomingSessions();
                break;
            case 'inventory':
                this.renderInventory();
                break;
            case 'calendar':
                this.renderCalendar();
                break;
            case 'settings':
                this.loadSettings();
                break;
        }
    }
    
    /**
     * Setup back button prevention to keep app from closing on Android
     */
    setupBackButtonPrevention() {
        // Push initial state to history
        history.pushState({ section: 'dashboard' }, '', '#dashboard');
    }
    
    /**
     * Handle back button press
     * @param {PopStateEvent} event - The popstate event
     */
    handleBackButton(event) {
        // First, check if any modals are open and close them
        const openModal = document.querySelector('.modal.show');
        if (openModal) {
            this.closeAllModals();
            // Push current section back to history so we stay in the app
            history.pushState({ section: this.currentSection }, '', `#${this.currentSection}`);
            return;
        }
        
        // If we're not on dashboard, navigate to dashboard
        if (this.currentSection !== 'dashboard') {
            this.showSection('dashboard', true);
            return;
        }
        
        // If we're on dashboard, push state again to prevent app from closing
        history.pushState({ section: 'dashboard' }, '', '#dashboard');
    }
    
    updateDashboard() {
        // Update stats
        document.getElementById('totalClients').textContent = this.clients.length;
        document.getElementById('totalAppointments').textContent = this.appointments.length;
        
        const upcoming = this.appointments.filter(apt => 
            new Date(apt.date + ' ' + apt.time) > new Date()
        ).length;
        document.getElementById('upcomingAppointments').textContent = upcoming;
        
        const lowStock = this.inventory.filter(item => item.quantity <= item.lowStock).length;
        document.getElementById('lowStockItems').textContent = lowStock;
        
        // Calculate and update revenue stats
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        
        // Calculate month revenue
        const monthRevenue = this.appointments
            .filter(apt => {
                const aptDate = new Date(apt.date);
                return aptDate.getMonth() === currentMonth && aptDate.getFullYear() === currentYear;
            })
            .reduce((total, apt) => total + apt.price, 0);
        
        // Calculate year revenue
        const yearRevenue = this.appointments
            .filter(apt => {
                const aptDate = new Date(apt.date);
                return aptDate.getFullYear() === currentYear;
            })
            .reduce((total, apt) => total + apt.price, 0);
        
        // Update revenue displays - NO CURRENCY SYMBOLS
        document.getElementById('monthRevenue').textContent = monthRevenue.toFixed(2);
        document.getElementById('yearRevenue').textContent = yearRevenue.toFixed(2);
        
        // Update recent appointments
        this.renderRecentAppointments();
    }
    
    renderRecentAppointments() {
        const container = document.getElementById('recentAppointmentsList');
        const recentAppointments = this.appointments
            .sort((a, b) => new Date(b.date + ' ' + b.time) - new Date(a.date + ' ' + a.time))
            .slice(0, 5);
        
        if (recentAppointments.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-calendar-times"></i>
                    <h3 data-i18n="no_appointments_yet">${this.translate('no_appointments_yet')}</h3>
                    <p data-i18n="schedule_first_appointment">${this.translate('schedule_first_appointment')}</p>
                    <button class="btn btn-primary" onclick="HairSalonApp.openModal('addAppointmentModal')">
                        <i class="fas fa-plus"></i> <span data-i18n="add_first_appointment">${this.translate('add_first_appointment')}</span>
                    </button>
                </div>
            `;
            this.translatePage();
            return;
        }
        
        container.innerHTML = '';
        recentAppointments.forEach(appointment => {
            const client = this.clients.find(c => c.id === appointment.clientId);
            const appointmentElement = document.createElement('div');
            appointmentElement.className = 'data-item appointment-item';
            
            appointmentElement.innerHTML = `
                <div class="data-item-content">
                    <h4>${appointment.service}</h4>
                    <p><i class="fas fa-user"></i> ${client ? client.name : 'Unknown Client'}</p>
                    <p><i class="fas fa-calendar"></i> ${new Date(appointment.date).toLocaleDateString()} at ${appointment.time}</p>
                    <p><i class="fas fa-tag"></i> ${appointment.price.toFixed(2)}</p>
                    ${appointment.notes ? `<p><i class="fas fa-sticky-note"></i> ${appointment.notes}</p>` : ''}
                </div>
                <div class="data-item-actions">
                    <button class="btn btn-outline btn-sm" onclick="HairSalonApp.editAppointment('${appointment.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="HairSalonApp.deleteAppointment('${appointment.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            
            container.appendChild(appointmentElement);
        });
    }
    
    renderClients(searchQuery = '') {
        const container = document.getElementById('clientsList');
        
        // Filter clients based on search query
        let filteredClients = this.clients;
        if (searchQuery) {
            filteredClients = this.clients.filter(client => 
                client.name.toLowerCase().includes(searchQuery) ||
                client.phone.toLowerCase().includes(searchQuery) ||
                (client.email && client.email.toLowerCase().includes(searchQuery))
            );
        }
        
        if (this.clients.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-users"></i>
                    <h3 data-i18n="no_clients_yet">${this.translate('no_clients_yet')}</h3>
                    <p data-i18n="build_client_database">${this.translate('build_client_database')}</p>
                    <button class="btn btn-primary" onclick="HairSalonApp.openModal('addClientModal')">
                        <i class="fas fa-plus"></i> <span data-i18n="add_first_client">${this.translate('add_first_client')}</span>
                    </button>
                </div>
            `;
            this.translatePage();
            return;
        }
        
        if (filteredClients.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-search"></i>
                    <h3>${this.translate('no_clients_yet')}</h3>
                    <p>${this.translate('try_adjusting_search')}</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = '';
        filteredClients.forEach(client => {
            const clientElement = document.createElement('div');
            clientElement.className = 'data-item';
            
            clientElement.innerHTML = `
                <div class="data-item-content">
                    <h4>${client.name}</h4>
                    <p><i class="fas fa-phone"></i> ${client.phone}</p>
                    ${client.email ? `<p><i class="fas fa-envelope"></i> ${client.email}</p>` : ''}
                    ${client.notes ? `<p><i class="fas fa-sticky-note"></i> ${client.notes}</p>` : ''}
                </div>
                <div class="data-item-actions">
                    <button class="btn btn-outline btn-sm" onclick="HairSalonApp.editClient('${client.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="HairSalonApp.deleteClient('${client.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            
            container.appendChild(clientElement);
        });
    }
    
    renderAppointments(searchQuery = '') {
        const container = document.getElementById('appointmentsList');
        
        // Filter appointments based on search query
        let filteredAppointments = this.appointments;
        if (searchQuery) {
            filteredAppointments = this.appointments.filter(apt => {
                const client = this.clients.find(c => c.id === apt.clientId);
                const clientName = client ? client.name.toLowerCase() : '';
                return apt.service.toLowerCase().includes(searchQuery) ||
                       clientName.includes(searchQuery) ||
                       apt.date.includes(searchQuery);
            });
        }
        
        if (this.appointments.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-calendar-times"></i>
                    <h3 data-i18n="no_appointments_yet">${this.translate('no_appointments_yet')}</h3>
                    <p data-i18n="schedule_first_appointment">${this.translate('schedule_first_appointment')}</p>
                    <button class="btn btn-primary" onclick="HairSalonApp.openModal('addAppointmentModal')">
                        <i class="fas fa-plus"></i> <span data-i18n="add_first_appointment">${this.translate('add_first_appointment')}</span>
                    </button>
                </div>
            `;
            this.translatePage();
            return;
        }
        
        if (filteredAppointments.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-search"></i>
                    <h3>${this.translate('no_appointments_yet')}</h3>
                    <p>${this.translate('try_adjusting_search')}</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = '';
        filteredAppointments
            .sort((a, b) => new Date(b.date + ' ' + b.time) - new Date(a.date + ' ' + a.time))
            .forEach(appointment => {
                const client = this.clients.find(c => c.id === appointment.clientId);
                const appointmentElement = document.createElement('div');
                appointmentElement.className = 'data-item appointment-item';
                
                appointmentElement.innerHTML = `
                    <div class="data-item-content">
                        <h4>${appointment.service}</h4>
                        <p><i class="fas fa-user"></i> ${client ? client.name : 'Unknown Client'}</p>
                        <p><i class="fas fa-calendar"></i> ${new Date(appointment.date).toLocaleDateString()} at ${appointment.time}</p>
                        <p><i class="fas fa-tag"></i> ${appointment.price.toFixed(2)}</p>
                        ${appointment.notes ? `<p><i class="fas fa-sticky-note"></i> ${appointment.notes}</p>` : ''}
                        ${appointment.inventoryUsage && appointment.inventoryUsage.length > 0 ? 
                            `<p><i class="fas fa-box-open"></i> ${this.translate('products_used_label')} ${appointment.inventoryUsage.map(item => `${item.itemName} (${item.quantity})`).join(', ')}</p>` : ''}
                    </div>
                    <div class="data-item-actions">
                        <button class="btn btn-outline btn-sm" onclick="HairSalonApp.editAppointment('${appointment.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="HairSalonApp.deleteAppointment('${appointment.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
                
                container.appendChild(appointmentElement);
            });
    }
    
    renderUpcomingSessions() {
        const container = document.getElementById('upcomingSessionsList');
        const upcomingAppointments = this.appointments
            .filter(apt => new Date(apt.date + ' ' + apt.time) > new Date())
            .sort((a, b) => new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time));
        
        if (upcomingAppointments.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-clock"></i>
                    <h3 data-i18n="no_upcoming_sessions">${this.translate('no_upcoming_sessions')}</h3>
                    <button class="btn btn-primary" onclick="HairSalonApp.openModal('addAppointmentModal')">
                        <i class="fas fa-plus"></i> <span data-i18n="schedule_appointment">${this.translate('schedule_appointment')}</span>
                    </button>
                </div>
            `;
            this.translatePage();
            return;
        }
        
        container.innerHTML = '';
        upcomingAppointments.forEach(appointment => {
            const client = this.clients.find(c => c.id === appointment.clientId);
            const appointmentElement = document.createElement('div');
            appointmentElement.className = 'data-item appointment-item';
            
            appointmentElement.innerHTML = `
                <div class="data-item-content">
                    <h4>${appointment.service}</h4>
                    <p><i class="fas fa-user"></i> ${client ? client.name : 'Unknown Client'}</p>
                    <p><i class="fas fa-calendar"></i> ${new Date(appointment.date).toLocaleDateString()} at ${appointment.time}</p>
                    <p><i class="fas fa-tag"></i> ${appointment.price.toFixed(2)}</p>
                    ${appointment.notes ? `<p><i class="fas fa-sticky-note"></i> ${appointment.notes}</p>` : ''}
                    ${appointment.inventoryUsage && appointment.inventoryUsage.length > 0 ? 
                        `<p><i class="fas fa-box-open"></i> ${this.translate('products_used_label')} ${appointment.inventoryUsage.map(item => `${item.itemName} (${item.quantity})`).join(', ')}</p>` : ''}
                </div>
                <div class="data-item-actions">
                    <button class="btn btn-outline btn-sm" onclick="HairSalonApp.editAppointment('${appointment.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="HairSalonApp.deleteAppointment('${appointment.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            
            container.appendChild(appointmentElement);
        });
    }
    
    renderInventory(searchQuery = '', category = 'all') {
        const container = document.getElementById('inventoryList');
        
        // Filter inventory based on category and search query
        let filteredInventory = this.inventory;
        
        // Apply category filter
        if (category !== 'all') {
            filteredInventory = filteredInventory.filter(item => item.category === category);
        }
        
        // Apply search filter
        if (searchQuery) {
            filteredInventory = filteredInventory.filter(item => 
                item.name.toLowerCase().includes(searchQuery) ||
                item.category.toLowerCase().includes(searchQuery)
            );
        }
        
        if (this.inventory.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-boxes"></i>
                    <h3 data-i18n="no_inventory_items">${this.translate('no_inventory_items')}</h3>
                    <p data-i18n="add_inventory_items">${this.translate('add_inventory_items')}</p>
                    <button class="btn btn-primary" onclick="HairSalonApp.openModal('addInventoryModal')">
                        <i class="fas fa-plus"></i> <span data-i18n="add_first_item">${this.translate('add_first_item')}</span>
                    </button>
                </div>
            `;
            this.translatePage();
            return;
        }
        
        if (filteredInventory.length === 0) {
            const message = category !== 'all' 
                ? `${this.translate('no_items_found_in')} ${this.translate(category)} ${this.translate('category_word')}` 
                : this.translate('no_inventory_items');
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-search"></i>
                    <h3>${message}</h3>
                    <p>${this.translate('try_adjusting_search_category')}</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = '';
        filteredInventory.forEach(item => {
            const isLowStock = item.quantity <= item.lowStock;
            const itemElement = document.createElement('div');
            itemElement.className = `data-item inventory-item ${isLowStock ? 'low-stock' : ''}`;
            
            itemElement.innerHTML = `
                <div class="data-item-content">
                    <h4>${item.name}</h4>
                    <p><i class="fas fa-tag"></i> ${this.translate(item.category)}</p>
                    <p><i class="fas fa-box"></i> ${item.quantity} units</p>
                    <p><i class="fas fa-exclamation-triangle"></i> Low stock alert: ${item.lowStock} units</p>
                    ${item.notes ? `<p><i class="fas fa-sticky-note"></i> ${item.notes}</p>` : ''}
                    ${isLowStock ? `<span style="color: var(--danger);"><i class="fas fa-exclamation-circle"></i> ${this.translate('low_stock_warning')}</span>` : ''}
                </div>
                <div class="data-item-actions">
                    <button class="btn btn-outline btn-sm" onclick="HairSalonApp.editInventoryItem('${item.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-outline btn-sm" onclick="HairSalonApp.viewUsageHistory('${item.id}')">
                        <i class="fas fa-history"></i>
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="HairSalonApp.deleteInventoryItem('${item.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            
            container.appendChild(itemElement);
        });
    }
    
    renderCalendar() {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        
        const currentMonth = this.currentDate.getMonth();
        const currentYear = this.currentDate.getFullYear();
        
        // Update month/year display
        document.getElementById('currentMonthYear').textContent = 
            `${monthNames[currentMonth]} ${currentYear}`;
        
        // Get first day of month and number of days
        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();
        
        const calendarGrid = document.getElementById('calendarGrid');
        calendarGrid.innerHTML = '';
        
        // Add day headers
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayNames.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-day-header';
            dayHeader.textContent = day;
            calendarGrid.appendChild(dayHeader);
        });
        
        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day other-month';
            calendarGrid.appendChild(emptyDay);
        }
        
        // Add days of the month
        const today = new Date();
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            
            // Check if this is today
            if (day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
                dayElement.classList.add('today');
            }
            
            // Check for appointments on this day
            const currentDate = new Date(currentYear, currentMonth, day);
            const dateString = currentDate.toISOString().split('T')[0];
            const dayAppointments = this.appointments.filter(apt => apt.date === dateString);
            
            if (dayAppointments.length > 0) {
                dayElement.classList.add('has-events');
            }
            
            dayElement.innerHTML = `
                <div class="calendar-day-number">${day}</div>
                <div class="calendar-events">
                    ${dayAppointments.slice(0, 3).map(apt => {
                        const client = this.clients.find(c => c.id === apt.clientId);
                        return `<div class="calendar-event" title="${client ? client.name : 'Unknown'}: ${apt.service}">${apt.service}</div>`;
                    }).join('')}
                </div>
            `;
            
            // Add click event - show appointments if they exist, otherwise create new
            dayElement.addEventListener('click', () => {
                if (dayAppointments.length > 0) {
                    this.showDateAppointments(dateString, dayAppointments);
                } else {
                    this.createAppointmentForDate(dateString);
                }
            });
            
            // Add tooltip
            if (dayAppointments.length > 0) {
                dayElement.title = this.translate('click_to_view_appointments');
            } else {
                dayElement.title = this.translate('click_to_create_session');
            }
            
            calendarGrid.appendChild(dayElement);
        }
    }
    
    createAppointmentForDate(dateString) {
        this.selectedCalendarDate = dateString;
        this.openModal('addAppointmentModal');
        
        // Set the date in the appointment form
        document.getElementById('appointmentDate').value = dateString;
        
        // Update modal title to show selected date
        const modalTitle = document.querySelector('#addAppointmentModal .modal-title span');
        modalTitle.textContent = `${this.translate('create_appointment_for')} ${new Date(dateString).toLocaleDateString()}`;
    }
    
    showDateAppointments(dateString, appointments) {
        this.selectedCalendarDate = dateString;
        
        // Update modal title
        const title = document.getElementById('dateAppointmentsTitle');
        title.textContent = `${this.translate('appointments_for')} ${new Date(dateString).toLocaleDateString()}`;
        
        // Render appointments
        const container = document.getElementById('dateAppointmentsList');
        container.innerHTML = '';
        
        appointments
            .sort((a, b) => a.time.localeCompare(b.time))
            .forEach(appointment => {
                const client = this.clients.find(c => c.id === appointment.clientId);
                const appointmentElement = document.createElement('div');
                appointmentElement.className = 'data-item appointment-item';
                
                appointmentElement.innerHTML = `
                    <div class="data-item-content">
                        <h4>${appointment.service}</h4>
                        <p><i class="fas fa-user"></i> ${client ? client.name : 'Unknown Client'}</p>
                        <p><i class="fas fa-clock"></i> ${appointment.time}</p>
                        <p><i class="fas fa-tag"></i> ${appointment.price.toFixed(2)}</p>
                        ${appointment.notes ? `<p><i class="fas fa-sticky-note"></i> ${appointment.notes}</p>` : ''}
                        ${appointment.inventoryUsage && appointment.inventoryUsage.length > 0 ? 
                            `<p><i class="fas fa-box-open"></i> ${this.translate('products_used_label')} ${appointment.inventoryUsage.map(item => `${item.itemName} (${item.quantity})`).join(', ')}</p>` : ''}
                    </div>
                    <div class="data-item-actions">
                        <button class="btn btn-outline btn-sm" onclick="HairSalonApp.editAppointment('${appointment.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="HairSalonApp.deleteAppointment('${appointment.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
                
                container.appendChild(appointmentElement);
            });
        
        // Open the modal
        this.openModal('viewDateAppointmentsModal');
    }
    
    addAppointmentForSelectedDate() {
        // Close the date appointments modal
        this.closeModal('viewDateAppointmentsModal');
        // Open the add appointment modal with the selected date
        this.createAppointmentForDate(this.selectedCalendarDate);
    }
    
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Populate client dropdown for appointment modal
        if (modalId === 'addAppointmentModal') {
            this.populateClientDropdown();
            this.populateInventoryForAppointment();
            
            // Set default time to current time + 1 hour
            const now = new Date();
            now.setHours(now.getHours() + 1);
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            document.getElementById('appointmentTime').value = `${hours}:${minutes}`;
        }
        
        // Set today's date as default for appointment date if no date selected from calendar
        if (modalId === 'addAppointmentModal' && !this.selectedCalendarDate) {
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('appointmentDate').value = today;
        }
        
        // Focus on first input field
        setTimeout(() => {
            const firstInput = modal.querySelector('input:not([type="hidden"]), textarea, select');
            if (firstInput) {
                firstInput.focus();
            }
        }, 100);
        
        // Trap focus within modal
        this.trapFocus(modal);
    }
    
    closeModal(modalId) {
        document.getElementById(modalId).classList.remove('show');
        document.body.style.overflow = 'auto';
        this.resetForms();
    }
    
    closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('show');
        });
        document.body.style.overflow = 'auto';
        this.resetForms();
    }
    
    resetForms() {
        document.getElementById('addClientForm').reset();
        document.getElementById('addAppointmentForm').reset();
        document.getElementById('addInventoryForm').reset();
        this.editingClientId = null;
        this.editingInventoryId = null;
        this.editingAppointmentId = null;
        this.selectedCalendarDate = null;
        
        // Reset inventory selection for appointment modal
        const inventoryGrid = document.getElementById('appointmentInventoryItems');
        if (inventoryGrid) {
            inventoryGrid.innerHTML = '';
        }
        
        // Reset modal titles and buttons
        this.translatePage();
    }
    
    populateClientDropdown() {
        const dropdown = document.getElementById('appointmentClient');
        dropdown.innerHTML = '<option value="" data-i18n="select_client">Select Client</option>';
        
        this.clients.forEach(client => {
            const option = document.createElement('option');
            option.value = client.id;
            option.textContent = client.name;
            dropdown.appendChild(option);
        });
        
        this.translatePage();
    }
    
    populateInventoryForAppointment() {
        const container = document.getElementById('appointmentInventoryItems');
        container.innerHTML = '';
        
        if (this.inventory.length === 0) {
            container.innerHTML = `<p>${this.translate('no_inventory_available')}</p>`;
            return;
        }
        
        this.inventory.forEach(item => {
            const isLowStock = item.quantity <= item.lowStock;
            const itemElement = document.createElement('div');
            itemElement.className = `inventory-item-select ${isLowStock ? 'low-stock' : ''}`;
            itemElement.dataset.id = item.id;
            
            itemElement.innerHTML = `
                <h4>${item.name}</h4>
                <p>${this.translate(item.category)}</p>
                <p>${this.translate('available_units')}: ${item.quantity} ${this.translate('units')}</p>
                <div class="inventory-quantity-input">
                    <label>${this.translate('qty_label')}</label>
                    <input type="number" min="0" max="${item.quantity}" value="0" data-id="${item.id}">
                </div>
            `;
            
            container.appendChild(itemElement);
        });
    }
    
    saveClient() {
        const name = this.sanitizeInput(document.getElementById('clientName').value.trim());
        const phone = this.sanitizeInput(document.getElementById('clientPhone').value.trim());
        const email = this.sanitizeInput(document.getElementById('clientEmail').value.trim());
        const notes = this.sanitizeInput(document.getElementById('clientNotes').value.trim());
        
        // Validation
        if (!name) {
            this.showToast(this.translate('please_enter_client_name'));
            return;
        }
        
        if (!this.validatePhone(phone)) {
            this.showToast(this.translate('please_enter_valid_phone'));
            return;
        }
        
        if (email && !this.validateEmail(email)) {
            this.showToast(this.translate('please_enter_valid_email'));
            return;
        }
        
        // Disable save button during save operation
        const saveButton = document.querySelector('#addClientForm button[type="submit"]');
        const originalButtonText = saveButton.innerHTML;
        saveButton.disabled = true;
        saveButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
        
        try {
            if (this.editingClientId) {
                // Update existing client
                const clientIndex = this.clients.findIndex(c => c.id === this.editingClientId);
                if (clientIndex !== -1) {
                    this.clients[clientIndex] = {
                        ...this.clients[clientIndex],
                        name,
                        phone,
                        email,
                        notes
                    };
                }
                this.showToast(this.translate('client_updated'));
            } else {
                // Add new client
                const newClient = {
                    id: this.generateId(),
                    name,
                    phone,
                    email,
                    notes,
                    createdAt: new Date().toISOString()
                };
                this.clients.push(newClient);
                this.showToast(this.translate('client_saved'));
            }
            
            this.saveToLocalStorage();
            this.closeModal('addClientModal');
            this.renderClients();
            this.updateDashboard();
        } catch (error) {
            console.error('Error saving client:', error);
            this.showToast('Failed to save client. Please try again.');
        } finally {
            // Re-enable save button
            saveButton.disabled = false;
            saveButton.innerHTML = originalButtonText;
        }
    }
    
    saveAppointment() {
        const clientId = document.getElementById('appointmentClient').value;
        const date = document.getElementById('appointmentDate').value;
        const time = document.getElementById('appointmentTime').value;
        const service = this.sanitizeInput(document.getElementById('appointmentService').value.trim());
        const price = parseFloat(document.getElementById('appointmentPrice').value);
        const notes = this.sanitizeInput(document.getElementById('appointmentNotes').value.trim());
        
        // Validation
        if (!clientId) {
            this.showToast(this.translate('please_select_client'));
            return;
        }
        
        if (!date) {
            this.showToast(this.translate('please_select_date'));
            return;
        }
        
        if (!time) {
            this.showToast(this.translate('please_select_time'));
            return;
        }
        
        if (!service) {
            this.showToast(this.translate('please_enter_service'));
            return;
        }
        
        if (!this.validatePrice(price)) {
            this.showToast(this.translate('please_enter_valid_price'));
            return;
        }
        
        if (!this.validateDateTime(date, time)) {
            this.showToast(this.translate('please_select_valid_date'));
            return;
        }
        
        // When editing, temporarily restore old inventory before validation
        let oldAppointment = null;
        if (this.editingAppointmentId) {
            const appointmentIndex = this.appointments.findIndex(a => a.id === this.editingAppointmentId);
            if (appointmentIndex !== -1) {
                oldAppointment = this.appointments[appointmentIndex];
                
                // Temporarily restore previously used inventory for proper validation
                if (oldAppointment.inventoryUsage && oldAppointment.inventoryUsage.length > 0) {
                    oldAppointment.inventoryUsage.forEach(usage => {
                        const itemIndex = this.inventory.findIndex(i => i.id === usage.itemId);
                        if (itemIndex !== -1) {
                            this.inventory[itemIndex].quantity += usage.quantity;
                        }
                    });
                }
            }
        }
        
        // Get inventory usage
        const inventoryUsage = [];
        const quantityInputs = document.querySelectorAll('#appointmentInventoryItems input[type="number"]');
        let hasInsufficientStock = false;
        
        quantityInputs.forEach(input => {
            const quantity = parseInt(input.value);
            if (quantity > 0) {
                const itemId = input.dataset.id;
                const item = this.inventory.find(i => i.id === itemId);
                
                if (item && quantity > item.quantity) {
                    hasInsufficientStock = true;
                    this.showToast(`${this.translate('insufficient_stock')}: ${item.name}`);
                    return;
                }
                
                inventoryUsage.push({
                    itemId,
                    itemName: item.name,
                    quantity
                });
            }
        });
        
        if (hasInsufficientStock) {
            return; // Don't save appointment if insufficient stock
        }
        
        if (this.editingAppointmentId) {
            // Update existing appointment
            const appointmentIndex = this.appointments.findIndex(a => a.id === this.editingAppointmentId);
            if (appointmentIndex !== -1) {
                // Remove usage history records for old inventory usage (already restored above)
                if (oldAppointment.inventoryUsage && oldAppointment.inventoryUsage.length > 0) {
                    this.usageHistory = this.usageHistory.filter(record => record.appointmentId !== this.editingAppointmentId);
                }
                
                // Update appointment
                this.appointments[appointmentIndex] = {
                    ...this.appointments[appointmentIndex],
                    clientId,
                    date,
                    time,
                    service,
                    price,
                    notes,
                    inventoryUsage
                };
                
                // Deduct new inventory usage
                if (inventoryUsage.length > 0) {
                    this.deductInventory(inventoryUsage, this.editingAppointmentId);
                }
                
                // Save to localStorage after inventory changes
                this.saveToLocalStorage();
            }
            this.showToast(this.translate('appointment_updated'));
        } else {
            // Add new appointment
            const newAppointment = {
                id: this.generateId(),
                clientId,
                date,
                time,
                service,
                price,
                notes,
                inventoryUsage,
                createdAt: new Date().toISOString()
            };
            this.appointments.push(newAppointment);
            this.showToast(this.translate('appointment_saved'));
            
            // Deduct inventory items
            this.deductInventory(inventoryUsage, newAppointment.id);
        }
        
        this.saveToLocalStorage();
        this.closeModal('addAppointmentModal');
        this.renderAppointments();
        this.renderUpcomingSessions();
        this.updateDashboard();
        this.renderCalendar();
        this.renderInventory();
    }
    
    deductInventory(inventoryUsage, appointmentId) {
        const appointment = this.appointments.find(a => a.id === appointmentId);
        const client = this.clients.find(c => c.id === appointment.clientId);
        
        inventoryUsage.forEach(usage => {
            const itemIndex = this.inventory.findIndex(i => i.id === usage.itemId);
            if (itemIndex !== -1) {
                // Deduct the quantity
                this.inventory[itemIndex].quantity -= usage.quantity;
                
                // Record usage history
                const usageRecord = {
                    id: this.generateId(),
                    itemId: usage.itemId,
                    itemName: usage.itemName,
                    appointmentId: appointmentId,
                    clientName: client ? client.name : 'Unknown',
                    service: appointment.service,
                    quantity: usage.quantity,
                    date: new Date().toISOString()
                };
                
                this.usageHistory.push(usageRecord);
            }
        });
        
        this.saveToLocalStorage();
    }
    
    restoreInventory(inventoryUsage, appointmentId) {
        inventoryUsage.forEach(usage => {
            const itemIndex = this.inventory.findIndex(i => i.id === usage.itemId);
            if (itemIndex !== -1) {
                // Restore the quantity
                this.inventory[itemIndex].quantity += usage.quantity;
            }
        });
        
        // Remove usage history records for this appointment
        this.usageHistory = this.usageHistory.filter(record => record.appointmentId !== appointmentId);
        
        this.saveToLocalStorage();
    }
    
    saveInventoryItem() {
        const name = this.sanitizeInput(document.getElementById('inventoryName').value.trim());
        const category = document.getElementById('inventoryCategory').value;
        const quantity = parseInt(document.getElementById('inventoryQuantity').value);
        const lowStock = parseInt(document.getElementById('inventoryLowStock').value);
        const notes = this.sanitizeInput(document.getElementById('inventoryNotes').value.trim());
        
        // Validation
        if (!name) {
            this.showToast(this.translate('please_enter_item_name'));
            return;
        }
        
        if (isNaN(quantity) || quantity < 0) {
            this.showToast(this.translate('please_enter_valid_quantity'));
            return;
        }
        
        if (isNaN(lowStock) || lowStock < 0) {
            this.showToast(this.translate('please_enter_valid_threshold'));
            return;
        }
        
        if (this.editingInventoryId) {
            // Update existing inventory item
            const inventoryIndex = this.inventory.findIndex(i => i.id === this.editingInventoryId);
            if (inventoryIndex !== -1) {
                this.inventory[inventoryIndex] = {
                    ...this.inventory[inventoryIndex],
                    name,
                    category,
                    quantity,
                    lowStock,
                    notes
                };
            }
            this.showToast(this.translate('inventory_updated'));
        } else {
            // Add new inventory item
            const newInventoryItem = {
                id: this.generateId(),
                name,
                category,
                quantity,
                lowStock,
                notes,
                createdAt: new Date().toISOString()
            };
            this.inventory.push(newInventoryItem);
            this.showToast(this.translate('inventory_saved'));
        }
        
        this.saveToLocalStorage();
        this.closeModal('addInventoryModal');
        this.renderInventory();
        this.updateDashboard();
    }
    
    editClient(clientId) {
        const client = this.clients.find(c => c.id === clientId);
        if (client) {
            document.getElementById('clientName').value = client.name;
            document.getElementById('clientPhone').value = client.phone;
            document.getElementById('clientEmail').value = client.email || '';
            document.getElementById('clientNotes').value = client.notes || '';
            
            this.editingClientId = clientId;
            this.openModal('addClientModal');
            
            // Update modal title
            const modalTitle = document.querySelector('#addClientModal .modal-title span');
            modalTitle.textContent = this.translate('edit_client');
            
            // Update button text
            const submitButton = document.querySelector('#addClientForm button[type="submit"]');
            submitButton.textContent = this.translate('update_client');
        }
    }
    
    editAppointment(appointmentId) {
        const appointment = this.appointments.find(a => a.id === appointmentId);
        if (appointment) {
            this.editingAppointmentId = appointmentId;
            this.openModal('addAppointmentModal');
            
            // Set form values after modal is opened
            document.getElementById('appointmentClient').value = appointment.clientId;
            document.getElementById('appointmentDate').value = appointment.date;
            document.getElementById('appointmentTime').value = appointment.time;
            document.getElementById('appointmentService').value = appointment.service;
            document.getElementById('appointmentPrice').value = appointment.price;
            document.getElementById('appointmentNotes').value = appointment.notes || '';
            
            // Pre-fill inventory usage after modal inventory items are populated
            if (appointment.inventoryUsage && appointment.inventoryUsage.length > 0) {
                appointment.inventoryUsage.forEach(usage => {
                    const input = document.querySelector(`#appointmentInventoryItems input[data-id="${usage.itemId}"]`);
                    if (input) {
                        input.value = usage.quantity;
                    }
                });
            }
            
            // Update modal title
            const modalTitle = document.querySelector('#addAppointmentModal .modal-title span');
            modalTitle.textContent = this.translate('edit_appointment');
            
            // Update button text
            const submitButton = document.querySelector('#addAppointmentForm button[type="submit"]');
            submitButton.textContent = this.translate('update_appointment');
        }
    }
    
    editInventoryItem(inventoryId) {
        const item = this.inventory.find(i => i.id === inventoryId);
        if (item) {
            document.getElementById('inventoryName').value = item.name;
            document.getElementById('inventoryCategory').value = item.category;
            document.getElementById('inventoryQuantity').value = item.quantity;
            document.getElementById('inventoryLowStock').value = item.lowStock;
            document.getElementById('inventoryNotes').value = item.notes || '';
            
            this.editingInventoryId = inventoryId;
            this.openModal('addInventoryModal');
            
            // Update modal title
            const modalTitle = document.querySelector('#addInventoryModal .modal-title span');
            modalTitle.textContent = this.translate('edit_inventory_item');
            
            // Update button text
            const submitButton = document.querySelector('#addInventoryForm button[type="submit"]');
            submitButton.textContent = this.translate('update_item');
        }
    }
    
    viewUsageHistory(inventoryId) {
        const item = this.inventory.find(i => i.id === inventoryId);
        if (!item) return;
        
        const container = document.getElementById('usageHistoryList');
        const itemUsage = this.usageHistory.filter(usage => usage.itemId === inventoryId);
        
        container.innerHTML = `
            <h4>${this.translate('view_usage_history')}: ${item.name}</h4>
        `;
        
        if (itemUsage.length === 0) {
            container.innerHTML += `
                <div class="empty-state">
                    <i class="fas fa-history"></i>
                    <h3>${this.translate('no_usage_history')}</h3>
                </div>
            `;
        } else {
            itemUsage.forEach(usage => {
                const usageElement = document.createElement('div');
                usageElement.className = 'usage-history-item';
                
                usageElement.innerHTML = `
                    <div class="usage-history-info">
                        <h4>${this.translate('used_in_appointment')}: ${usage.clientName}</h4>
                        <p>Service: ${usage.service}</p>
                        <p>Date: ${new Date(usage.date).toLocaleDateString()}</p>
                    </div>
                    <div class="usage-quantity">
                        -${usage.quantity} ${this.translate('quantity_used')}
                    </div>
                `;
                
                container.appendChild(usageElement);
            });
        }
        
        this.openModal('viewUsageModal');
    }
    
    deleteClient(clientId) {
        const client = this.clients.find(c => c.id === clientId);
        if (!client) return;
        
        this.showConfirmDialog(
            'Delete Client',
            `Are you sure you want to delete ${client.name}? This action cannot be undone.`,
            () => {
                this.clients = this.clients.filter(c => c.id !== clientId);
                this.saveToLocalStorage();
                this.renderClients();
                this.updateDashboard();
                this.showToast(this.translate('item_deleted'));
            }
        );
    }
    
    deleteAppointment(appointmentId) {
        const appointment = this.appointments.find(a => a.id === appointmentId);
        if (!appointment) return;
        
        this.showConfirmDialog(
            'Delete Appointment',
            `Are you sure you want to delete this appointment for ${appointment.service}? This action cannot be undone.`,
            () => {
                this.appointments = this.appointments.filter(a => a.id !== appointmentId);
                this.saveToLocalStorage();
                this.renderAppointments();
                this.renderUpcomingSessions();
                this.updateDashboard();
                this.renderCalendar();
                this.showToast(this.translate('item_deleted'));
            }
        );
    }
    
    deleteInventoryItem(inventoryId) {
        const item = this.inventory.find(i => i.id === inventoryId);
        if (!item) return;
        
        this.showConfirmDialog(
            'Delete Inventory Item',
            `Are you sure you want to delete ${item.name}? This action cannot be undone.`,
            () => {
                this.inventory = this.inventory.filter(i => i.id !== inventoryId);
                this.saveToLocalStorage();
                this.renderInventory();
                this.updateDashboard();
                this.showToast(this.translate('item_deleted'));
            }
        );
    }
    
    /**
     * Load settings into the form
     */
    loadSettings() {
        document.getElementById('settingsBusinessName').value = this.settings.businessName;
        document.getElementById('settingsCurrency').value = this.settings.currencySymbol;
        document.getElementById('settingsDefaultDuration').value = this.settings.defaultDuration;
        document.getElementById('settingsLowStockDefault').value = this.settings.lowStockDefault;
        document.getElementById('settingsOpenTime').value = this.settings.openTime;
        document.getElementById('settingsCloseTime').value = this.settings.closeTime;
        
        // Load working days
        document.getElementById('workingDayMon').checked = this.settings.workingDays.mon;
        document.getElementById('workingDayTue').checked = this.settings.workingDays.tue;
        document.getElementById('workingDayWed').checked = this.settings.workingDays.wed;
        document.getElementById('workingDayThu').checked = this.settings.workingDays.thu;
        document.getElementById('workingDayFri').checked = this.settings.workingDays.fri;
        document.getElementById('workingDaySat').checked = this.settings.workingDays.sat;
        document.getElementById('workingDaySun').checked = this.settings.workingDays.sun;
        
        // Load theme
        if (this.settings.theme === 'light') {
            document.getElementById('themeLight').checked = true;
            document.body.classList.add('light-mode');
        } else {
            document.getElementById('themeDark').checked = true;
            document.body.classList.remove('light-mode');
        }
        
        // Load time format
        document.getElementById('settingsTimeFormat').value = this.settings.timeFormat;
        
        // Load date format
        document.getElementById('settingsDateFormat').value = this.settings.dateFormat;
        
        // Load notification settings
        document.getElementById('settingsShowToasts').checked = this.settings.showToasts;
    }
    
    /**
     * Save settings from the form
     */
    saveSettings() {
        this.settings.businessName = this.sanitizeInput(document.getElementById('settingsBusinessName').value.trim()) || 'HairSalon Pro';
        this.settings.currencySymbol = this.sanitizeInput(document.getElementById('settingsCurrency').value.trim());
        this.settings.defaultDuration = parseInt(document.getElementById('settingsDefaultDuration').value) || 60;
        this.settings.lowStockDefault = parseInt(document.getElementById('settingsLowStockDefault').value) || 5;
        this.settings.openTime = document.getElementById('settingsOpenTime').value;
        this.settings.closeTime = document.getElementById('settingsCloseTime').value;
        
        // Save working days
        this.settings.workingDays = {
            mon: document.getElementById('workingDayMon').checked,
            tue: document.getElementById('workingDayTue').checked,
            wed: document.getElementById('workingDayWed').checked,
            thu: document.getElementById('workingDayThu').checked,
            fri: document.getElementById('workingDayFri').checked,
            sat: document.getElementById('workingDaySat').checked,
            sun: document.getElementById('workingDaySun').checked
        };
        
        // Save theme
        const selectedTheme = document.querySelector('input[name="theme"]:checked').value;
        this.settings.theme = selectedTheme;
        
        // Apply theme immediately
        if (selectedTheme === 'light') {
            document.body.classList.add('light-mode');
        } else {
            document.body.classList.remove('light-mode');
        }
        
        // Save time format
        this.settings.timeFormat = document.getElementById('settingsTimeFormat').value;
        
        // Save date format
        this.settings.dateFormat = document.getElementById('settingsDateFormat').value;
        
        // Save notification settings
        this.settings.showToasts = document.getElementById('settingsShowToasts').checked;
        
        // Save to localStorage
        localStorage.setItem('hairsalon_settings', JSON.stringify(this.settings));
        
        // Update the app name in header if changed
        const headerLogo = document.querySelector('.app-header .logo span');
        if (headerLogo) {
            headerLogo.textContent = this.settings.businessName;
        }
        
        this.showToast(this.translate('settings_saved'));
    }
    
    /**
     * Reset settings to defaults
     */
    resetSettings() {
        this.showConfirmDialog(
            'Reset Settings',
            'Are you sure you want to reset all settings to their default values?',
            () => {
                this.settings = {
                    businessName: 'HairSalon Pro',
                    currencySymbol: '',
                    defaultDuration: 60,
                    lowStockDefault: 5,
                    openTime: '09:00',
                    closeTime: '18:00',
                    workingDays: {
                        mon: true,
                        tue: true,
                        wed: true,
                        thu: true,
                        fri: true,
                        sat: false,
                        sun: false
                    },
                    theme: 'dark',
                    timeFormat: '12',
                    dateFormat: 'MM/DD/YYYY',
                    showToasts: true
                };
                
                localStorage.setItem('hairsalon_settings', JSON.stringify(this.settings));
                this.loadSettings();
                
                // Update the app name in header
                const headerLogo = document.querySelector('.app-header .logo span');
                if (headerLogo) {
                    headerLogo.textContent = this.settings.businessName;
                }
                
                // Apply theme
                document.body.classList.remove('light-mode');
                
                this.showToast(this.translate('settings_reset'));
            }
        );
    }
    
    exportData(type) {
        let data, filename, headers;
        
        switch(type) {
            case 'clients':
                data = this.clients;
                filename = 'hairsalon_clients.csv';
                headers = ['Name', 'Phone', 'Email', 'Notes', 'Created At'];
                break;
            case 'appointments':
                data = this.appointments.map(apt => {
                    const client = this.clients.find(c => c.id === apt.clientId);
                    return {
                        ...apt,
                        clientName: client ? client.name : 'Unknown'
                    };
                });
                filename = 'hairsalon_appointments.csv';
                headers = ['Client', 'Service', 'Date', 'Time', 'Price', 'Notes', 'Created At'];
                break;
            case 'inventory':
                data = this.inventory;
                filename = 'hairsalon_inventory.csv';
                headers = ['Name', 'Category', 'Quantity', 'Low Stock Threshold', 'Notes', 'Created At'];
                break;
            default:
                return;
        }
        
        if (data.length === 0) {
            this.showToast(this.translate('no_data_to_export'));
            return;
        }
        
        let csvContent = headers.join(',') + '\n';
        
        data.forEach(item => {
            let row = [];
            switch(type) {
                case 'clients':
                    row = [item.name, item.phone, item.email || '', `"${item.notes || ''}"`, item.createdAt];
                    break;
                case 'appointments':
                    row = [item.clientName, item.service, item.date, item.time, item.price, `"${item.notes || ''}"`, item.createdAt];
                    break;
                case 'inventory':
                    row = [item.name, item.category, item.quantity, item.lowStock, `"${item.notes || ''}"`, item.createdAt];
                    break;
            }
            csvContent += row.join(',') + '\n';
        });
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.showToast(this.translate('data_exported_successfully'));
    }
    
    /**
     * Backup all data to a JSON file
     */
    backupAllData() {
        const backupData = {
            version: '1.0',
            timestamp: new Date().toISOString(),
            clients: this.clients,
            appointments: this.appointments,
            inventory: this.inventory,
            usageHistory: this.usageHistory
        };
        
        const dataStr = JSON.stringify(backupData, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        const filename = `hairsalon_backup_${new Date().toISOString().split('T')[0]}.json`;
        
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.showToast(this.translate('backup_created_successfully'));
    }
    
    /**
     * Restore data from a backup file
     * @param {File} file - The backup file to restore from
     */
    restoreData(file) {
        if (!file) return;
        
        this.showConfirmDialog(
            'Restore Data',
            'This will replace all current data with the backup. Are you sure you want to continue? This action cannot be undone.',
            () => {
                this.performRestore(file);
            }
        );
    }
    
    /**
     * Perform the actual restore operation
     * @param {File} file - The backup file to restore from
     */
    performRestore(file) {
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const backupData = JSON.parse(e.target.result);
                
                // Validate backup data structure
                if (!backupData.clients || !backupData.appointments || !backupData.inventory) {
                    throw new Error('Invalid backup file format');
                }
                
                // Restore data
                this.clients = backupData.clients;
                this.appointments = backupData.appointments;
                this.inventory = backupData.inventory;
                this.usageHistory = backupData.usageHistory || [];
                
                // Save to localStorage
                this.saveToLocalStorage();
                
                // Refresh all views
                this.updateDashboard();
                this.renderClients();
                this.renderAppointments();
                this.renderUpcomingSessions();
                this.renderInventory();
                this.renderCalendar();
                
                this.showToast(this.translate('data_restored_successfully'));
            } catch (error) {
                console.error('Failed to restore backup:', error);
                this.showToast(this.translate('failed_to_restore'));
            }
        };
        reader.readAsText(file);
        
        // Reset the file input
        document.getElementById('restoreFileInput').value = '';
    }
    
    showToast(message) {
        // Check if toasts are enabled in settings
        if (!this.settings.showToasts) {
            return;
        }
        
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
    
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    
    /**
     * Sanitize user input to prevent XSS attacks
     * @param {string} input - The input string to sanitize
     * @returns {string} - Sanitized string
     */
    sanitizeInput(input) {
        if (typeof input !== 'string') return input;
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    }
    
    /**
     * Validate email format
     * @param {string} email - The email to validate
     * @returns {boolean} - True if valid
     */
    validateEmail(email) {
        if (!email) return true; // Email is optional
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    /**
     * Validate phone format
     * @param {string} phone - The phone to validate
     * @returns {boolean} - True if valid
     */
    validatePhone(phone) {
        if (!phone) return false; // Phone is required
        // Remove all non-digit characters except +
        const cleaned = phone.replace(/[^\d+]/g, '');
        // Must have at least 5 digits (min valid phone number)
        // and at most 15 digits (international standard)
        const digitsOnly = cleaned.replace(/\+/g, '');
        return digitsOnly.length >= 5 && digitsOnly.length <= 15;
    }
    
    /**
     * Validate price format
     * @param {number} price - The price to validate
     * @returns {boolean} - True if valid
     */
    validatePrice(price) {
        return !isNaN(price) && price >= 0;
    }
    
    /**
     * Validate date is not in the past
     * @param {string} date - Date in YYYY-MM-DD format
     * @param {string} time - Time in HH:MM format
     * @returns {boolean} - True if valid
     */
    validateDateTime(date, time) {
        if (!date || !time) return false;
        
        const appointmentDateTime = new Date(`${date}T${time}`);
        const now = new Date();
        
        // Allow appointments from today onwards
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const appointmentDate = new Date(appointmentDateTime.getFullYear(), appointmentDateTime.getMonth(), appointmentDateTime.getDate());
        
        return appointmentDate >= today;
    }
    
    /**
     * Filter clients by search query with debouncing
     * @param {string} query - The search query
     */
    filterClients(query) {
        if (this.clientSearchTimeout) {
            clearTimeout(this.clientSearchTimeout);
        }
        this.clientSearchTimeout = setTimeout(() => {
            this.renderClients(query.toLowerCase());
        }, 300);
    }
    
    /**
     * Filter appointments by search query with debouncing
     * @param {string} query - The search query
     */
    filterAppointments(query) {
        if (this.appointmentSearchTimeout) {
            clearTimeout(this.appointmentSearchTimeout);
        }
        this.appointmentSearchTimeout = setTimeout(() => {
            this.renderAppointments(query.toLowerCase());
        }, 300);
    }
    
    /**
     * Filter inventory by category
     * @param {string} category - The category to filter by
     */
    filterInventoryByCategory(category) {
        this.currentInventoryCategory = category;
        
        // Update active tab
        const tabs = document.querySelectorAll('.category-tab');
        tabs.forEach(tab => {
            if (tab.dataset.category === category) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
        
        // Clear search input and render with category filter
        const searchInput = document.getElementById('inventorySearch');
        if (searchInput) {
            searchInput.value = '';
        }
        
        this.renderInventory('', category);
    }
    
    /**
     * Filter inventory by search query with debouncing
     * @param {string} query - The search query
     */
    filterInventory(query) {
        if (this.inventorySearchTimeout) {
            clearTimeout(this.inventorySearchTimeout);
        }
        this.inventorySearchTimeout = setTimeout(() => {
            this.renderInventory(query.toLowerCase(), this.currentInventoryCategory);
        }, 300);
    }
    
    saveToLocalStorage() {
        try {
            localStorage.setItem('hairsalon_clients', JSON.stringify(this.clients));
            localStorage.setItem('hairsalon_appointments', JSON.stringify(this.appointments));
            localStorage.setItem('hairsalon_inventory', JSON.stringify(this.inventory));
            localStorage.setItem('hairsalon_usage_history', JSON.stringify(this.usageHistory));
        } catch (error) {
            console.error('Failed to save to localStorage:', error);
            // Check if it's a quota exceeded error
            if (error.name === 'QuotaExceededError' || error.code === 22) {
                this.showToast('Storage quota exceeded. Please export and clear old data.');
            } else {
                this.showToast(this.translate('failed_to_save'));
            }
        }
    }
    
    /**
     * Load data from localStorage with error handling
     */
    loadFromLocalStorage() {
        try {
            const clients = localStorage.getItem('hairsalon_clients');
            const appointments = localStorage.getItem('hairsalon_appointments');
            const inventory = localStorage.getItem('hairsalon_inventory');
            const usageHistory = localStorage.getItem('hairsalon_usage_history');
            const settings = localStorage.getItem('hairsalon_settings');
            
            if (clients) this.clients = JSON.parse(clients);
            if (appointments) this.appointments = JSON.parse(appointments);
            if (inventory) this.inventory = JSON.parse(inventory);
            if (usageHistory) this.usageHistory = JSON.parse(usageHistory);
            if (settings) this.settings = JSON.parse(settings);
        } catch (error) {
            console.error('Failed to load from localStorage:', error);
            this.showToast('Failed to load saved data. Starting fresh.');
        }
    }
    
    setupMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const sidebar = document.getElementById('sidebar');
        
        mobileMenuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('mobile-open');
        });
        
        // Close sidebar when clicking on a nav link on mobile
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('mobile-open');
                }
            });
        });
    }
    
    checkInstallPrompt() {
        if (this.deferredPrompt) {
            this.showInstallButton();
        }
    }
    
    showInstallButton() {
        document.getElementById('installButton').style.display = 'inline-flex';
    }
    
    installApp() {
        if (this.deferredPrompt) {
            this.deferredPrompt.prompt();
            this.deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                } else {
                    console.log('User dismissed the install prompt');
                }
                this.deferredPrompt = null;
            });
        }
    }
    
    hideInstallPrompt() {
        document.getElementById('installPrompt').classList.remove('show');
    }
    
    /**
     * Update online/offline status indicator
     */
    updateOnlineStatus() {
        const offlineIndicator = document.getElementById('offlineIndicator');
        if (navigator.onLine) {
            offlineIndicator.classList.remove('show');
        } else {
            offlineIndicator.classList.add('show');
        }
    }
    
    /**
     * Show confirmation dialog
     * @param {string} title - Dialog title
     * @param {string} message - Dialog message
     * @param {Function} onConfirm - Callback function when confirmed
     */
    showConfirmDialog(title, message, onConfirm) {
        const dialog = document.getElementById('confirmDialog');
        const backdrop = document.getElementById('confirmBackdrop');
        const confirmTitle = document.getElementById('confirmTitle');
        const confirmMessage = document.getElementById('confirmMessage');
        const confirmOk = document.getElementById('confirmOk');
        const confirmCancel = document.getElementById('confirmCancel');
        
        confirmTitle.textContent = title;
        confirmMessage.textContent = message;
        
        dialog.classList.add('show');
        backdrop.style.display = 'flex';
        backdrop.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Focus on cancel button for safety
        confirmCancel.focus();
        
        // Remove previous event listeners
        const newConfirmOk = confirmOk.cloneNode(true);
        const newConfirmCancel = confirmCancel.cloneNode(true);
        confirmOk.parentNode.replaceChild(newConfirmOk, confirmOk);
        confirmCancel.parentNode.replaceChild(newConfirmCancel, confirmCancel);
        
        // Add new event listeners
        newConfirmOk.addEventListener('click', () => {
            this.hideConfirmDialog();
            onConfirm();
        });
        
        newConfirmCancel.addEventListener('click', () => {
            this.hideConfirmDialog();
        });
        
        // ESC key to cancel
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                this.hideConfirmDialog();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    }
    
    /**
     * Hide confirmation dialog
     */
    hideConfirmDialog() {
        const dialog = document.getElementById('confirmDialog');
        const backdrop = document.getElementById('confirmBackdrop');
        
        dialog.classList.remove('show');
        backdrop.classList.remove('show');
        backdrop.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    /**
     * Trap focus within a modal for accessibility
     * @param {HTMLElement} modal - The modal element
     */
    trapFocus(modal) {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;
        
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        
        const handleTabKey = (e) => {
            if (e.key !== 'Tab') return;
            
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        };
        
        modal.addEventListener('keydown', handleTabKey);
    }
    
    /**
     * Get statistics for the dashboard
     * @returns {Object} - Statistics object
     */
    getStatistics() {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        
        return {
            totalClients: this.clients.length,
            totalAppointments: this.appointments.length,
            upcomingAppointments: this.appointments.filter(apt => 
                new Date(apt.date + ' ' + apt.time) > new Date()
            ).length,
            lowStockItems: this.inventory.filter(item => item.quantity <= item.lowStock).length,
            monthRevenue: this.appointments
                .filter(apt => {
                    const aptDate = new Date(apt.date);
                    return aptDate.getMonth() === currentMonth && aptDate.getFullYear() === currentYear;
                })
                .reduce((total, apt) => total + apt.price, 0),
            yearRevenue: this.appointments
                .filter(apt => {
                    const aptDate = new Date(apt.date);
                    return aptDate.getFullYear() === currentYear;
                })
                .reduce((total, apt) => total + apt.price, 0)
        };
    }
    
    /**
     * Format currency value (no symbol, just number)
     * @param {number} value - The value to format
     * @returns {string} - Formatted value
     */
    formatCurrency(value) {
        return value.toFixed(2);
    }
    
    /**
     * Format date for display
     * @param {string} dateString - Date string
     * @returns {string} - Formatted date
     */
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString(this.currentLanguage === 'en' ? 'en-US' : 
                                      this.currentLanguage === 'es' ? 'es-ES' : 
                                      this.currentLanguage === 'ru' ? 'ru-RU' : 'he-IL');
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    window.HairSalonApp = new HairSalonPro();
});

// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./service-worker.js')
      .then(function(registration) {
        console.log('✅ Service Worker registered with scope:', registration.scope);
      })
      .catch(function(error) {
        console.log('❌ Service Worker registration failed:', error);
      });
  });
}
