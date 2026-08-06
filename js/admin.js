// Supabase client is initialized in js/supabase-config.js
// and available globally as 'supabase'

document.addEventListener('DOMContentLoaded', async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
        showDashboard();
    }

    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('eventForm').addEventListener('submit', handleEventSubmit);
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
    fetchEvents();
    fetchBookings();
}

function switchTab(tab) {
    document.querySelectorAll('.admin-nav-item').forEach(el => el.classList.remove('active'));
    document.getElementById('eventsTab').style.display = 'none';
    document.getElementById('bookingsTab').style.display = 'none';

    if (tab === 'events') {
        document.getElementById('eventsTab').style.display = 'block';
        document.querySelectorAll('.admin-nav-item')[0].classList.add('active');
    } else {
        document.getElementById('bookingsTab').style.display = 'block';
        document.querySelectorAll('.admin-nav-item')[1].classList.add('active');
    }
}

async function fetchEvents() {
    const { data, error } = await supabase.from('events').select('*').order('date', { ascending: true });
    if (error) return console.error(error);

    const tbody = document.getElementById('eventsTableBody');
    tbody.innerHTML = data.map(event => `
        <tr>
            <td>${event.title}</td>
            <td>${event.date} at ${event.time}</td>
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
    tbody.innerHTML = data.map(b => `
        <tr>
            <td>${b.events ? b.events.title : 'Deleted Event'}</td>
            <td>${b.name}</td>
            <td>${b.email}<br>${b.phone}</td>
            <td>${b.guests}</td>
            <td>${new Date(b.created_at).toLocaleDateString()}</td>
        </tr>
    `).join('');
}

async function handleEventSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('eventId').value;
    const eventData = {
        title: document.getElementById('title').value,
        image_url: document.getElementById('image_url').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        location: document.getElementById('location').value,
        description: document.getElementById('description').value
    };

    let error;
    if (id) {
        ({ error } = await supabase.from('events').update(eventData).eq('id', id));
    } else {
        ({ error } = await supabase.from('events').insert([eventData]));
    }

    if (error) {
        alert('Error saving event: ' + error.message);
    } else {
        resetForm();
        fetchEvents();
    }
}

async function editEvent(id) {
    const { data, error } = await supabase.from('events').select('*').eq('id', id).single();
    if (error) return alert(error.message);

    document.getElementById('eventId').value = data.id;
    document.getElementById('title').value = data.title;
    document.getElementById('image_url').value = data.image_url;
    document.getElementById('date').value = data.date;
    document.getElementById('time').value = data.time;
    document.getElementById('location').value = data.location;
    document.getElementById('description').value = data.description;
    
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
    document.getElementById('formTitle').innerText = 'Add New Event';
}
