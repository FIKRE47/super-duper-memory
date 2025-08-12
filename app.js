const { createClient } = Supabase;
const SUPABASE_URL = 'https://vvbqipmmzqfyzjmepocp.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2YnFpcG1tenFmeXpqbWVwb2NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3ODE0NDIsImV4cCI6MjA3MDM1NzQ0Mn0.76hWUm-gkDPwBSvqrxdmdQnMGzV4VtLfuhgZzY0YcT0';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

async function fetchRestaurants() {
    try {
        const { data, error } = await supabaseClient.from('restaurants').select('*');
        if (error) throw error;
        const restaurantList = document.getElementById('restaurant-list');
        restaurantList.innerHTML = '';
        data.forEach(restaurant => {
            const card = document.createElement('div');
            card.className = 'restaurant-card';
            card.innerHTML = `
                <h3>${restaurant.name}</h3>
                <p>Location: ${restaurant.location}</p>
                <p>Menu: ${restaurant.menu}</p>
                <button>Order Now</button>
            `;
            restaurantList.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching restaurants:', error);
        document.getElementById('restaurant-list').innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
}

document.getElementById('restaurant-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('rest-name').value;
    const location = document.getElementById('rest-location').value;
    const menu = document.getElementById('rest-menu').value;
    try {
        const { error } = await supabaseClient.from('restaurants').insert([{ name, location, menu }]);
        if (error) throw error;
        document.getElementById('signup-error').innerText = 'Success! Restaurant added! 🎉';
        document.getElementById('restaurant-form').reset(); // Clear form
        fetchRestaurants(); // Refresh restaurant list
    } catch (error) {
        document.getElementById('signup-error').innerText = `Error: ${error.message}`;
    }
});

fetchRestaurants();
