// Import Supabase client
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Your Supabase credentials
const SUPABASE_URL = 'https://vvbqipmmzqfyzjmepocp.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2YnFpcG1tenFmeXpqbWVwb2NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3ODE0NDIsImV4cCI6MjA3MDM1NzQ0Mn0.76hWUm-gkDPwBSvqrxdmdQnMGzV4VtLfuhgZzY0YcT0';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Function to load restaurants from Supabase
async function loadRestaurants() {
  const { data: restaurants, error } = await supabase
    .from('restaurants')
    .select('*');

  if (error) {
    console.error('Error fetching restaurants:', error);
    document.querySelector('#restaurant-list').innerHTML = `<p style="color:red;">Error loading restaurants</p>`;
    return;
  }

  if (!restaurants.length) {
    document.querySelector('#restaurant-list').innerHTML = `<p>No restaurants found.</p>`;
    return;
  }

  // Render each restaurant
  const container = document.querySelector('#restaurant-list');
  container.innerHTML = ''; // Clear old content

  restaurants.forEach(restaurant => {
    const menuItems = restaurant.menu
      ? restaurant.menu.map(item => `<li>${item.dish} - ${item.price} ZAR</li>`).join('')
      : '<li>No menu available</li>';

    container.innerHTML += `
      <div class="restaurant-card" style="border:1px solid #ccc; padding:10px; margin:10px;">
        <h2>${restaurant.name}</h2>
        <p><strong>Location:</strong> ${restaurant.location || 'N/A'}</p>
        <p><strong>Phone:</strong> ${restaurant.phone || 'N/A'}</p>
        <h3>Menu:</h3>
        <ul>${menuItems}</ul>
      </div>
    `;
  });
}

// Run on page load
document.addEventListener('DOMContentLoaded', loadRestaurants);
