// Supabase client is initialized in js/supabase-config.js
// and available globally as 'supabase'

const STORAGE_BUCKET = 'event-covers';
let uploadedImageUrl = '';
let currentFile = null;

document.addEventListener('DOMContentLoaded', async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
        showDashboard();
    }

    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('eventForm').addEventListener('submit', handleEventSubmit);

    // File upload handling
    setupFileUpload();
    
    // Initialize menu management
    initMenuManagement();
});

async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPassword').value;

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        alert('Login failed: ' + error.message);
    } else {
        showDashboard();
    }
}

async function handleLogout() {
    await supabase.auth.signOut();
    location.reload();
}

function showDashboard() {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('dashboardSection').style.display = 'block';
    fetchMenuItems();
    fetchEvents();
    fetchBookings();
}

function switchTab(tab) {
    document.querySelectorAll('.admin-nav-item').forEach(el => el.classList.remove('active'));
    document.getElementById('menuTab').style.display = 'none';
    document.getElementById('eventsTab').style.display = 'none';
    document.getElementById('bookingsTab').style.display = 'none';

    if (tab === 'menu') {
        document.getElementById('menuTab').style.display = 'block';
        document.querySelectorAll('.admin-nav-item')[0].classList.add('active');
    } else if (tab === 'events') {
        document.getElementById('eventsTab').style.display = 'block';
        document.querySelectorAll('.admin-nav-item')[1].classList.add('active');
    } else {
        document.getElementById('bookingsTab').style.display = 'block';
        document.querySelectorAll('.admin-nav-item')[2].classList.add('active');
    }
}

async function fetchEvents() {
    const { data, error } = await supabase.from('events').select('*').order('date', { ascending: true });
    if (error) return console.error(error);

    const tbody = document.getElementById('eventsTableBody');
    if (!data || data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; color: var(--color-text-dim);">No events yet. Create your first event above.</td></tr>';
        return;
    }
    tbody.innerHTML = data.map(event => `
        <tr>
            <td>${event.title}</td>
            <td>${event.date}<br><small style="color: var(--color-text-dim);">${event.time}</small></td>
            <td>${event.location}</td>
            <td>
                <button onclick="editEvent('${event.id}')" class="btn btn-outline btn-small">Edit</button>
                <button onclick="deleteEvent('${event.id}')" class="btn btn-danger btn-small">Delete</button>
            </td>
        </tr>
    `).join('');
}

async function fetchBookings() {
    const { data, error } = await supabase
        .from('bookings')
        .select('*, events(title)')
        .order('created_at', { ascending: false });
    
    if (error) return console.error(error);

    const tbody = document.getElementById('bookingsTableBody');
    if (!data || data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; color: var(--color-text-dim);">No bookings yet.</td></tr>';
        return;
    }
    tbody.innerHTML = data.map(b => `
        <tr>
            <td>${b.events ? b.events.title : 'Deleted Event'}</td>
            <td>${b.name}</td>
            <td>${b.email}<br><small style="color: var(--color-text-dim);">${b.phone}</small></td>
            <td>${b.guests}</td>
            <td>${new Date(b.created_at).toLocaleDateString()}</td>
        </tr>
    `).join('');
}

// ========================================
// File Upload to Supabase Storage
// ========================================

function setupFileUpload() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('imageFile');

    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        if (e.dataTransfer.files.length) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    });

    // File input change
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length) {
            handleFileSelect(e.target.files[0]);
        }
    });
}

async function handleFileSelect(file) {
    // Validate
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

    if (!allowedTypes.includes(file.type)) {
        showUploadStatus('Please select a JPG, PNG, or WebP image.', 'error');
        return;
    }
    if (file.size > maxSize) {
        showUploadStatus('File is too large. Maximum size is 5MB.', 'error');
        return;
    }

    currentFile = file;

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
        document.getElementById('previewImg').src = e.target.result;
        document.getElementById('imagePreview').style.display = 'block';
    };
    reader.readAsDataURL(file);

    // Upload to Supabase Storage
    await uploadToStorage(file);
}

async function uploadToStorage(file) {
    const progressBar = document.getElementById('progressBar');
    const progressContainer = document.getElementById('uploadProgress');
    const statusEl = document.getElementById('uploadStatus');

    progressContainer.style.display = 'block';
    progressBar.style.width = '0%';
    showUploadStatus('Uploading image...', 'uploading');

    try {
        // Generate unique filename
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 10)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { data, error } = await supabase.storage
            .from(STORAGE_BUCKET)
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false
            });

        if (error) throw error;

        // Get public URL
        const { data: urlData } = supabase.storage
            .from(STORAGE_BUCKET)
            .getPublicUrl(filePath);

        uploadedImageUrl = urlData.publicUrl;
        document.getElementById('image_url').value = uploadedImageUrl;

        // Show success
        progressBar.style.width = '100%';
        showUploadStatus('Image uploaded successfully!', 'success');

        // Hide progress after delay
        setTimeout(() => {
            progressContainer.style.display = 'none';
            statusEl.style.display = 'none';
        }, 3000);

    } catch (error) {
        console.error('Upload error:', error);
        showUploadStatus('Upload failed: ' + error.message, 'error');
        progressContainer.style.display = 'none';
        uploadedImageUrl = '';
        document.getElementById('image_url').value = '';
    }
}

function showUploadStatus(message, type) {
    const statusEl = document.getElementById('uploadStatus');
    statusEl.textContent = message;
    statusEl.className = 'upload-status ' + type;
    statusEl.style.display = 'block';
}

function removeImage() {
    document.getElementById('imagePreview').style.display = 'none';
    document.getElementById('previewImg').src = '';
    document.getElementById('imageFile').value = '';
    document.getElementById('uploadProgress').style.display = 'none';
    document.getElementById('uploadStatus').style.display = 'none';
    uploadedImageUrl = '';
    document.getElementById('image_url').value = '';
    currentFile = null;
}

async function handleEventSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('eventId').value;
    const submitBtn = document.getElementById('submitBtn');

    // Use uploaded image URL or existing URL
    let finalImageUrl = document.getElementById('image_url').value;
    
    // If no new image uploaded, check if there's an existing URL for edit mode
    if (!finalImageUrl) {
        finalImageUrl = document.getElementById('existing_image_url').value || '';
    }

    const eventData = {
        title: document.getElementById('title').value,
        image_url: finalImageUrl,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        location: document.getElementById('location').value,
        description: document.getElementById('description').value
    };

    submitBtn.disabled = true;
    submitBtn.textContent = 'Saving...';

    let error;
    if (id) {
        ({ error } = await supabase.from('events').update(eventData).eq('id', id));
    } else {
        ({ error } = await supabase.from('events').insert([eventData]));
    }

    if (error) {
        alert('Error saving event: ' + error.message);
        submitBtn.disabled = false;
        submitBtn.textContent = 'Save Event';
    } else {
        resetForm();
        fetchEvents();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Save Event';
    }
}

async function editEvent(id) {
    const { data, error } = await supabase.from('events').select('*').eq('id', id).single();
    if (error) return alert(error.message);

    document.getElementById('eventId').value = data.id;
    document.getElementById('title').value = data.title;
    document.getElementById('date').value = data.date;
    document.getElementById('time').value = data.time;
    document.getElementById('location').value = data.location;
    document.getElementById('description').value = data.description || '';
    
    // Show existing image
    if (data.image_url) {
        document.getElementById('existing_image_url').value = data.image_url;
        document.getElementById('previewImg').src = data.image_url;
        document.getElementById('imagePreview').style.display = 'block';
    }

    document.getElementById('formTitle').innerText = 'Edit Event';
    window.scrollTo(0, 0);
}

async function deleteEvent(id) {
    if (confirm('Are you sure you want to delete this event?')) {
        const { error } = await supabase.from('events').delete().eq('id', id);
        if (error) alert(error.message);
        else fetchEvents();
    }
}

function resetForm() {
    document.getElementById('eventForm').reset();
    document.getElementById('eventId').value = '';
    document.getElementById('image_url').value = '';
    document.getElementById('existing_image_url').value = '';
    document.getElementById('formTitle').innerText = 'Add New Event';
    removeImage();
}
