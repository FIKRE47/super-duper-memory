// Initialize Supabase (just copy this exactly)
const supabaseUrl = 'https://vvbqipmmzqfyzjmepocp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2YnFpcG1tenFmeXpqbWVwb2NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ2NjgxNTksImV4cCI6MjAzMDI0NDE1OX0.6aklR1ORa6mTHJT3mX5JX4XUzWzY7HZv5jK5XJvqZkE';
const supabase = createClient(supabaseUrl, supabaseKey);

console.log("Supabase is ready!"); // This will show in the browser console

// Load Restaurants (copy this too)
async function loadRestaurants() {
  console.log("Trying to load restaurants..."); // Debug message
  
  const { data, error } = await supabase
    .from('restaurants')
    .select('*');

  if (error) {
    console.error("Error loading restaurants:", error.message); // Shows error details
    showError("Could not load restaurants. Please try again later.");
    return;
  }

  console.log("Restaurants loaded:", data); // Shows data if successful
  displayRestaurants(data);
}

// Display Restaurants (copy this)
function displayRestaurants(restaurants) {
  const container = document.getElementById('restaurants-container');
  container.innerHTML = ''; // Clear old content

  restaurants.forEach(restaurant => {
    const card = document.createElement('div');
    card.innerHTML = `
      <h3>${restaurant.name}</h3>
      <p>${restaurant.cuisine || 'Ethiopian'}</p>
    `;
    container.appendChild(card);
  });
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', loadRestaurants);
