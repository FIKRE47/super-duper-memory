// Wait for everything to load
window.addEventListener('load', function() {
    console.log('HabeshaEats app starting...');
    
    // Initialize Supabase with your credentials
    const supabase = supabase.createClient(
        'https://vvbqipmmzqfyzjmepocp.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2YnFpcG1tenFmeXpqbWVwb2NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3ODE0NDIsImV4cCI6MjA3MDM1NzQ0Mn0.76hWUm-gkDPwBSvqrxdmdQnMGzV4VtLfuhgZzY0YcT0'
    );

    console.log('Supabase initialized');

    // Function to load restaurants
    async function loadRestaurants() {
        console.log('Loading restaurants...');
        
        // Show loading message
        const restaurantList = document.getElementById('restaurant-list');
        if (!restaurantList) {
            console.error('Restaurant list element not found!');
            return;
        }
        
        restaurantList.innerHTML = '<p>Loading restaurants...</p>';
        
        try {
            console.log('Attempting to fetch from Supabase...');
            const { data, error } = await supabase
                .from('restaurants')
                .select('*');
            
            console.log('Supabase response:', { data, error });
            
            if (error) {
                console.error('Supabase error:', error);
                restaurantList.innerHTML = `<p>Error: ${error.message}</p>`;
                return;
            }

            console.log('Restaurants data:', data);
            
            if (data && data.length > 0) {
                restaurantList.innerHTML = '';
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
                console.log('Restaurant cards created:', data.length);
            } else {
                restaurantList.innerHTML = '<p>No restaurants found.</p>';
            }
        } catch (err) {
            console.error('Network/JavaScript error:', err);
            restaurantList.innerHTML = `<p>Network Error: ${err.message}</p>`;
        }
    }

    // Load restaurants when page loads
    loadRestaurants();

    // Placeholder function for viewing menu
    window.viewMenu = function(restaurantId) {
        alert(`Viewing menu for restaurant ${restaurantId} - we'll build this next!`);
    };

    // Placeholder functions for auth buttons
    const signupBtn = document.getElementById('signup-btn');
    const loginBtn = document.getElementById('login-btn');

    if (signupBtn) {
        signupBtn.addEventListener('click', () => {
            alert('Sign up form coming soon!');
        });
    } else {
        console.error('Signup button not found');
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            alert('Login form coming soon!');
        });
    } else {
        console.error('Login button not found');
    }

    console.log('HabeshaEats app initialized successfully');
});
