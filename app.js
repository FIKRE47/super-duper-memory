// Wait for everything to load
window.addEventListener('load', function() {
    // Initialize Supabase with your credentials
    const supabase = supabase.createClient(
        'https://vvbqipmmzqfyzjmepocp.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2YnFpcG1tenFmeXpqbWVwb2NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3ODE0NDIsImV4cCI6MjA3MDM1NzQ0Mn0.76hWUm-gkDPwBSvqrxdmdQnMGzV4VtLfuhgZzY0YcT0'
    );

    // Function to load restaurants
    async function loadRestaurants() {
        console.log('Loading restaurants...');
        
        const { data, error } = await supabase
            .from('restaurants')
            .select('*');
        
        if (error) {
            console.error('Error loading restaurants:', error);
            document.getElementById('restaurant-list').innerHTML = 
                '<p>Error loading restaurants. Please check the console.</p>';
            return;
        }

        console.log('Restaurants loaded:', data);
        
        const restaurantList = document.getElementById('restaurant-list');
        restaurantList.innerHTML = '';

        if (data && data.length > 0) {
            data.forEach(restaurant => {
                const restaurantCard = document.createElement('div');
                restaurantCard.className = 'restaurant-card';
                restaurantCard.innerHTML = `
                    <h3>${restaurant.name}</h3>
                    <p><strong>Address:</strong> ${restaurant.address}</p>
                    <p><strong>Phone:</strong> ${restaurant.phone}</p>
                    <p><strong>Currency:</strong> ${restaurant.currency}</p>
                    <button onclick="viewMenu('${restaurant.id}')">View Menu</button>
                `;
                restaurantList.appendChild(restaurantCard);
            });
        } else {
            restaurantList.innerHTML = '<p>No restaurants found.</p>';
        }
    }

    // Load restaurants
    loadRestaurants();

    // Placeholder function for viewing menu
    window.viewMenu = function(restaurantId) {
        alert(`Viewing menu for restaurant ${restaurantId} - we'll build this next!`);
    };

    // Placeholder functions for auth buttons
    document.getElementById('signup-btn').addEventListener('click', () => {
        alert('Sign up form coming soon!');
    });

    document.getElementById('login-btn').addEventListener('click', () => {
        alert('Login form coming soon!');
    });
});