// Menu Management for Admin Dashboard
// Handles CRUD operations for menu items

let allMenuItems = [];
let currentEditingId = null;

// Initialize menu management
async function initMenuManagement() {
    await fetchMenuItems();
    setupMenuForm();
}

// Fetch all menu items from Supabase
async function fetchMenuItems() {
    try {
        const { data, error } = await supabase
            .from('menu_items')
            .select('*')
            .order('category', { ascending: true })
            .order('name', { ascending: true });

        if (error) throw error;
        allMenuItems = data || [];
        renderMenuTable();
    } catch (error) {
        console.error('Error fetching menu items:', error);
        showMenuNotification('Error loading menu items', 'error');
    }
}

// Setup menu form event listeners
function setupMenuForm() {
    const menuForm = document.getElementById('menuForm');
    if (menuForm) {
        menuForm.addEventListener('submit', handleMenuSubmit);
    }
}

// Render menu items in table
function renderMenuTable() {
    const tbody = document.getElementById('menuTableBody');
    if (!tbody) return;

    if (allMenuItems.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; color: var(--color-text-dim);">No menu items found.</td></tr>';
        return;
    }

    // Group by category for better display
    const grouped = {};
    allMenuItems.forEach(item => {
        if (!grouped[item.category]) {
            grouped[item.category] = [];
        }
        grouped[item.category].push(item);
    });

    tbody.innerHTML = '';
    Object.keys(grouped).sort().forEach(category => {
        grouped[category].forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index === 0 ? category : ''}</td>
                <td>${item.name}</td>
                <td>
                    <input type="text" class="price-input" value="${item.price}" data-id="${item.id}" placeholder="e.g., 555 or 555/585">
                </td>
                <td>
                    <button onclick="saveItemPrice('${item.id}')" class="btn btn-primary btn-small">Save</button>
                    <button onclick="editMenuItem('${item.id}')" class="btn btn-outline btn-small">Edit</button>
                    <button onclick="deleteMenuItem('${item.id}')" class="btn btn-danger btn-small">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    });
}

// Save item price
async function saveItemPrice(itemId) {
    const input = document.querySelector(`input[data-id="${itemId}"]`);
    if (!input) return;

    const newPrice = input.value.trim();
    if (!newPrice) {
        showMenuNotification('Price cannot be empty', 'error');
        return;
    }

    try {
        const { error } = await supabase
            .from('menu_items')
            .update({ price: newPrice, updated_at: new Date().toISOString() })
            .eq('id', itemId);

        if (error) throw error;
        showMenuNotification('Price updated successfully!', 'success');
        await fetchMenuItems();
    } catch (error) {
        console.error('Error updating price:', error);
        showMenuNotification('Error updating price', 'error');
    }
}

// Edit menu item
async function editMenuItem(itemId) {
    const item = allMenuItems.find(i => i.id === itemId);
    if (!item) return;

    currentEditingId = itemId;
    document.getElementById('menuItemId').value = item.id;
    document.getElementById('menuCategory').value = item.category;
    document.getElementById('menuName').value = item.name;
    document.getElementById('menuPrice').value = item.price;
    document.getElementById('menuDescription').value = item.description || '';
    
    document.getElementById('menuFormTitle').innerText = 'Edit Menu Item';
    document.getElementById('menuSubmitBtn').textContent = 'Update Item';
    
    window.scrollTo(0, 0);
}

// Delete menu item
async function deleteMenuItem(itemId) {
    if (!confirm('Are you sure you want to delete this menu item?')) return;

    try {
        const { error } = await supabase
            .from('menu_items')
            .delete()
            .eq('id', itemId);

        if (error) throw error;
        showMenuNotification('Menu item deleted successfully!', 'success');
        await fetchMenuItems();
    } catch (error) {
        console.error('Error deleting item:', error);
        showMenuNotification('Error deleting item', 'error');
    }
}

// Handle menu form submission
async function handleMenuSubmit(e) {
    e.preventDefault();
    
    const id = document.getElementById('menuItemId').value;
    const category = document.getElementById('menuCategory').value.trim();
    const name = document.getElementById('menuName').value.trim();
    const price = document.getElementById('menuPrice').value.trim();
    const description = document.getElementById('menuDescription').value.trim();

    if (!category || !name || !price) {
        showMenuNotification('Please fill in all required fields', 'error');
        return;
    }

    const submitBtn = document.getElementById('menuSubmitBtn');
    submitBtn.disabled = true;
    submitBtn.textContent = id ? 'Updating...' : 'Adding...';

    try {
        const itemData = {
            category,
            name,
            price,
            description,
            updated_at: new Date().toISOString()
        };

        let error;
        if (id) {
            ({ error } = await supabase
                .from('menu_items')
                .update(itemData)
                .eq('id', id));
        } else {
            ({ error } = await supabase
                .from('menu_items')
                .insert([itemData]));
        }

        if (error) throw error;

        showMenuNotification(id ? 'Menu item updated!' : 'Menu item added!', 'success');
        resetMenuForm();
        await fetchMenuItems();
    } catch (error) {
        console.error('Error saving menu item:', error);
        showMenuNotification('Error saving menu item', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = id ? 'Update Item' : 'Add Item';
    }
}

// Reset menu form
function resetMenuForm() {
    document.getElementById('menuForm').reset();
    document.getElementById('menuItemId').value = '';
    currentEditingId = null;
    document.getElementById('menuFormTitle').innerText = 'Add New Menu Item';
    document.getElementById('menuSubmitBtn').textContent = 'Add Item';
}

// Show notification
function showMenuNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `menu-notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#4ade80' : type === 'error' ? '#f87171' : '#60a5fa'};
        color: white;
        border-radius: 8px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    .price-input {
        padding: 8px 12px;
        border: 1px solid var(--color-border);
        border-radius: 4px;
        font-size: 0.9rem;
        width: 120px;
    }
    .price-input:focus {
        outline: none;
        border-color: var(--color-accent);
        box-shadow: 0 0 0 3px rgba(209, 169, 69, 0.1);
    }
`;
document.head.appendChild(style);
