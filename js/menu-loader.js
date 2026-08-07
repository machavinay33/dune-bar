// Menu Loader - Loads menu prices from Supabase
// This replaces the static menu data with dynamic pricing

let menuData = [];

// Load menu from Supabase on page load
document.addEventListener('DOMContentLoaded', async () => {
    await loadMenuFromSupabase();
});

async function loadMenuFromSupabase() {
    try {
        const { data, error } = await supabase
            .from('menu_items')
            .select('*')
            .order('category', { ascending: true })
            .order('name', { ascending: true });

        if (error) throw error;

        if (data && data.length > 0) {
            // Transform Supabase data to match the expected menu structure
            menuData = transformMenuData(data);
            
            // Re-render the menu if renderMenu function is available
            if (typeof renderMenu === 'function') {
                renderMenu();
            }
        }
    } catch (error) {
        console.error('Error loading menu from Supabase:', error);
        // Fallback to static menu if Supabase fails
        console.log('Falling back to static menu data');
    }
}

// Transform flat Supabase data into category-grouped structure
function transformMenuData(items) {
    const grouped = {};
    
    items.forEach(item => {
        if (!grouped[item.category]) {
            grouped[item.category] = {
                category: item.category,
                items: []
            };
        }
        
        grouped[item.category].items.push({
            id: item.id,
            name: item.name,
            price: item.price,
            description: item.description || ''
        });
    });
    
    // Return as array sorted by category
    return Object.values(grouped).sort((a, b) => a.category.localeCompare(b.category));
}

// Export for use in other scripts if needed
window.loadMenuFromSupabase = loadMenuFromSupabase;
