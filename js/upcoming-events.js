// Upcoming Events - Load on homepage
document.addEventListener('DOMContentLoaded', () => {
    loadUpcomingEvents();
});

async function loadUpcomingEvents() {
    const grid = document.getElementById('upcomingEventsGrid');
    try {
        // Fetch upcoming events (future events only, max 3)
        const today = new Date().toISOString().split('T')[0];
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .gte('date', today)
            .order('date', { ascending: true })
            .limit(3);

        if (error) throw error;

        grid.innerHTML = '';

        if (!data || data.length === 0) {
            grid.innerHTML = `
                <div class="no-events-message">
                    <p>No upcoming events at the moment. Stay tuned for exciting announcements!</p>
                    <a href="events.html" class="btn btn-outline btn-small">Check Events Page</a>
                </div>
            `;
            return;
        }

        data.forEach((event, index) => {
            const card = document.createElement('div');
            card.className = 'upcoming-event-card reveal-up';
            card.style.animationDelay = `${index * 0.15}s`;

            const eventDate = new Date(event.date);
            const month = eventDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
            const day = eventDate.getDate();
            const formattedDate = eventDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });

            card.innerHTML = `
                <div class="event-card-image">
                    <img src="${event.image_url || 'images/hero-interior.jpg'}" alt="${event.title}" loading="lazy">
                    <div class="event-date-badge">
                        <span class="event-month">${month}</span>
                        <span class="event-day">${day}</span>
                    </div>
                </div>
                <div class="event-card-content">
                    <h3 class="event-card-title">${event.title}</h3>
                    <div class="event-card-meta">
                        <span class="event-time">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                            ${event.time}
                        </span>
                        <span class="event-location">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                            ${event.location}
                        </span>
                    </div>
                    ${event.description ? `<p class="event-card-desc">${event.description.substring(0, 120)}${event.description.length > 120 ? '...' : ''}</p>` : ''}
                    <a href="events.html" class="event-card-link">View Details &rarr;</a>
                </div>
            `;
            grid.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading upcoming events:', error);
        grid.innerHTML = `
            <div class="no-events-message">
                <p>Unable to load events. Please try again later.</p>
            </div>
        `;
    }
}
