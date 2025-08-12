// Your Supabase credentials
const SUPABASE_URL = 'https://vvbqipmmzqfyzjmepocp.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2YnFpcG1tenFmeXpqbWVwb2NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3ODE0NDIsImV4cCI6MjA3MDM1NzQ0Mn0.76hWUm-gkDPwBSvqrxdmdQnMGzV4VtLfuhgZzY0YcT0';

// Create Supabase client from the global object
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Function to load restaurants from Supabase
async function loadRestaurants() {
  const { data: restaurants, error } = await supabaseClient
    .from('restaurants')
    .select('*');

  const container = document.querySelector('#restaurant-list');

  if (error) {
    console.error('Error fetching restaurants:', error);
    container.innerHTML = `<p style="color:red;">Error loading restaurants</p>`;
    return;
  }

  if (!restaurants.length) {
    container.innerHTML = `<p>No restaurants found.</p>`;
    return;
  }

  // Build restaurant HTML
  let html = '';
  restaurants.forEach(restaurant => {
    const menuItems = Array.isArray(restaurant.menu)
      ? restaurant.menu.map(item => `<li>${item.dish} - ${item.price} ZAR</li>`).join('')
      : '<li>No menu available</li>';

    html += `
      <div class="restaurant-card">
        <h2>${restaurant.name}</h2>
        <p><strong>Location:</strong> ${restaurant.location || 'N/A'}</p>
        <p><strong>Phone:</strong> ${restaurant.phone || 'N/A'}</p>
        <h3>Menu:</h3>
        <ul>${menuItems}</ul>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Setup auth button click events (placeholder alerts for now)
function setupAuthButtons() {
  document.querySelector('#signup-btn').addEventListener('click', async () => {
    alert('Signup clicked! Authentication logic will be added soon.');
  });

  document.querySelector('#login-btn').addEventListener('click', async () => {
    alert('Login clicked! Authentication logic will be added soon.');
  });
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  loadRestaurants();
  setupAuthButtons();
});
