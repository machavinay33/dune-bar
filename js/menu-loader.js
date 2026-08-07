// Menu Loader - Loads menu prices from Supabase with robust static fallback

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
            window.menuData = transformMenuData(data);
            
            // Re-render the menu if renderMenu function is available
            if (typeof window.renderMenu === 'function') {
                window.renderMenu();
            }
        } else {
            console.log('No menu items found in Supabase (table may be empty). Falling back to static menu.');
            await loadStaticFallback();
        }
    } catch (error) {
        console.error('Error loading menu from Supabase:', error);
        console.log('Falling back to static menu data');
        await loadStaticFallback();
    }
}

async function loadStaticFallback() {
    try {
        const module = await import('./menu.js');
        if (!window.menuData || window.menuData.length === 0) {
            window.menuData = module.default;
            if (typeof window.renderMenu === 'function') {
                window.renderMenu();
            }
        }
    } catch (err) {
        console.error('Error loading fallback menu:', err);
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
