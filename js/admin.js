// Admin Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Toggle sidebar on mobile
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.admin-sidebar');
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }
    
    // Menu item activation
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            if (!item.href.includes('#')) return;
            
            e.preventDefault();
            const targetId = item.getAttribute('href').substring(1);
            
            // Update active menu item
            menuItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            // Update page title
            const pageTitle = document.querySelector('.admin-header h1');
            if (pageTitle) {
                pageTitle.textContent = getPageTitle(targetId);
            }
            
            // Load content (simulated)
            loadSectionContent(targetId);
        });
    });
    
    // Admin logout
    const adminLogout = document.getElementById('adminLogout');
    if (adminLogout) {
        adminLogout.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                alert('Logging out...');
                window.location.href = 'index.html';
                
                // Clear admin session
                localStorage.removeItem('adminLoggedIn');
            }
        });
    }
    
    // Quick action buttons
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.querySelector('span').textContent;
            alert(`Action: ${action}\nThis would open the appropriate form/modal.`);
        });
    });
    
    // Edit buttons in tables
    document.querySelectorAll('.btn-icon.edit').forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            const name = row.cells[0].textContent;
            alert(`Edit user: ${name}`);
        });
    });
    
    // Delete buttons
    document.querySelectorAll('.btn-icon.delete, .btn-sm.delete').forEach(btn => {
        btn.addEventListener('click', function() {
            if (confirm('Are you sure you want to delete this item?')) {
                const row = this.closest('tr') || this.closest('.destination-item');
                if (row) {
                    row.style.opacity = '0.5';
                    setTimeout(() => {
                        row.remove();
                        alert('Item deleted successfully');
                    }, 300);
                }
            }
        });
    });
    
    // Search functionality
    const adminSearch = document.querySelector('.admin-search input');
    if (adminSearch) {
        adminSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            // Search in tables (simplified)
            document.querySelectorAll('.admin-table tbody tr').forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });
    }
    
    // Modal handling
    const modal = document.getElementById('addDestinationModal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (modal) modal.style.display = 'none';
        });
    });
    
    // Destination form
    const addDestinationForm = document.getElementById('addDestinationForm');
    if (addDestinationForm) {
        addDestinationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('destName').value;
            const category = document.getElementById('destCategory').value;
            const description = document.getElementById('destDescription').value;
            
            alert(`Destination "${name}" added successfully!`);
            modal.style.display = 'none';
            addDestinationForm.reset();
        });
    }
    
    // Notification bell
    const notification = document.querySelector('.notification');
    if (notification) {
        notification.addEventListener('click', () => {
            alert('You have 3 unread notifications:\n1. New user registration\n2. Destination review pending\n3. System update available');
            notification.querySelector('.badge').style.display = 'none';
        });
    }
    
    // Simulate admin authentication
    checkAdminAuth();
});

// Helper functions
function getPageTitle(sectionId) {
    const titles = {
        'dashboard': 'Dashboard Overview',
        'users': 'User Management',
        'destinations': 'Destinations Management',
        'content': 'Content Management',
        'media': 'Media Library',
        'bookings': 'Booking Management',
        'reviews': 'Review Management',
        'analytics': 'Analytics Dashboard',
        'settings': 'System Settings'
    };
    
    return titles[sectionId] || 'Admin Panel';
}

function loadSectionContent(sectionId) {
    const contentArea = document.querySelector('.admin-content');
    if (!contentArea) return;
    
    // In a real application, this would load content via AJAX
    console.log(`Loading content for: ${sectionId}`);
    
    // Simulate loading
    const originalContent = contentArea.innerHTML;
    contentArea.innerHTML = `
        <div style="text-align: center; padding: 50px;">
            <i class="fas fa-spinner fa-spin fa-2x" style="color: #3498db;"></i>
            <p>Loading ${getPageTitle(sectionId)}...</p>
        </div>
    `;
    
    setTimeout(() => {
        // Load sample content based on section
        contentArea.innerHTML = getSectionContent(sectionId);
    }, 500);
}

function getSectionContent(sectionId) {
    switch(sectionId) {
        case 'users':
            return `
                <h2>User Management</h2>
                <p>Manage all registered users, tour guides, and business accounts.</p>
                <button class="btn-primary">Add New User</button>
            `;
        case 'destinations':
            return `
                <h2>Destinations Management</h2>
                <p>Add, edit, or remove tourist destinations from the website.</p>
                <button class="btn-primary" onclick="document.getElementById('addDestinationModal').style.display='flex'">
                    Add New Destination
                </button>
            `;
        default:
            return `
                <h2>${getPageTitle(sectionId)}</h2>
                <p>This section is under development. Full functionality coming soon.</p>
            `;
    }
}

function checkAdminAuth() {
    // In a real application, this would check authentication token
    const isAdmin = localStorage.getItem('adminLoggedIn') === 'true';
    
    if (!isAdmin && !window.location.href.includes('login.html')) {
        // Redirect to login if not authenticated
        alert('Please login as admin first');
        window.location.href = 'login.html';
    }
}

// Make functions available globally
window.loadSectionContent = loadSectionContent;
window.getPageTitle = getPageTitle;