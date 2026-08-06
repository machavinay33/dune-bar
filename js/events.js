// Supabase client is initialized in js/supabase-config.js
// and available globally as 'supabase'

document.addEventListener('DOMContentLoaded', () => {
    fetchEvents();
    
    const bookingForm = document.getElementById('eventBookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBooking);
    }
});

async function fetchEvents() {
    const eventsList = document.getElementById('eventsList');
    try {
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .order('date', { ascending: true });

        if (error) throw error;

        eventsList.innerHTML = '';
        if (data.length === 0) {
            eventsList.innerHTML = '<p class="text-center w-100">No upcoming events at the moment. Stay tuned!</p>';
            return;
        }

        data.forEach(event => {
            const card = document.createElement('div');
            card.className = 'event-card';
            card.innerHTML = `
                <img src="${event.image_url || 'images/hero-interior.jpg'}" alt="${event.title}" class="event-img">
                <div class="event-info">
                    <h3 class="event-title">${event.title}</h3>
                    <div class="event-meta">
                        <span><strong>Date:</strong> ${new Date(event.date).toLocaleDateString()}</span>
                        <span><strong>Time:</strong> ${event.time}</span>
                        <span><strong>Location:</strong> ${event.location}</span>
                    </div>
                    <p style="margin-bottom: 20px; font-size: 0.9rem; color: #aaa;">${event.description || ''}</p>
                    <button onclick="openBookingModal('${event.id}', '${event.title}')" class="btn btn-primary btn-book">Book Now</button>
                </div>
            `;
            eventsList.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching events:', error);
        eventsList.innerHTML = '<p class="text-center w-100">Error loading events. Please try again later.</p>';
    }
}

function openBookingModal(id, title) {
    document.getElementById('bookingEventId').value = id;
    document.getElementById('modalEventTitle').innerText = title;
    document.getElementById('bookingModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('bookingModal').style.display = 'none';
}

async function handleBooking(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.disabled = true;
    btn.innerText = 'Processing...';

    const bookingData = {
        event_id: document.getElementById('bookingEventId').value,
        name: document.getElementById('b_name').value,
        email: document.getElementById('b_email').value,
        phone: document.getElementById('b_phone').value,
        guests: parseInt(document.getElementById('b_guests').value)
    };

    try {
        const { error } = await supabase
            .from('bookings')
            .insert([bookingData]);

        if (error) throw error;

        alert('Booking successful! We look forward to seeing you.');
        closeModal();
        e.target.reset();
    } catch (error) {
        console.error('Error saving booking:', error);
        alert('There was an error processing your booking. Please try again.');
    } finally {
        btn.disabled = false;
        btn.innerText = 'Confirm Booking';
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('bookingModal');
    if (event.target == modal) {
        closeModal();
    }
}
