// Supabase config
const SUPABASE_URL = 'https://vvbqipmmzqfyzjmepocp.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2YnFpcG1tenFmeXpqbWVwb2NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3ODE0NDIsImV4cCI6MjA3MDM1NzQ0Mn0.76hWUm-gkDPwBSvqrxdmdQnMGzV4VtLfuhgZzY0YcT0';

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Elements
const signupBtn = document.getElementById('signup-btn');
const loginBtn = document.getElementById('login-btn');
const restaurantList = document.getElementById('restaurant-list');

// Create a simple modal form for signup/login
function createModalForm(type) {
  return `
    <div id="auth-modal" style="position:fixed;top:0;left:0;right:0;bottom:0;
      background:rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; z-index:9999;">
      <div style="background:#fff; padding:20px; border-radius:8px; width:300px; box-shadow:0 2px 10px rgba(0,0,0,0.3);">
        <h2>${type === 'signup' ? 'Sign Up' : 'Login'}</h2>
        <input type="email" id="auth-email" placeholder="Email" style="width:100%; padding:8px; margin-bottom:10px;" />
        <input type="password" id="auth-password" placeholder="Password" style="width:100%; padding:8px; margin-bottom:10px;" />
        <button id="auth-submit" style="width:100%; padding:10px; background:#28a745; color:#fff; border:none; border-radius:4px; cursor:pointer;">
          ${type === 'signup' ? 'Create Account' : 'Log In'}
        </button>
        <button id="auth-cancel" style="width:100%; padding:10px; margin-top:10px; background:#dc3545; color:#fff; border:none; border-radius:4px; cursor:pointer;">
          Cancel
        </button>
        <p id="auth-message" style="color:red; margin-top:10px;"></p>
      </div>
    </div>
  `;
}

// Show modal
function showModal(type) {
  if (document.getElementById('auth-modal')) return; // prevent multiple modals
  document.body.insertAdjacentHTML('beforeend', createModalForm(type));

  const submitBtn = document.getElementById('auth-submit');
  const cancelBtn = document.getElementById('auth-cancel');
  const emailInput = document.getElementById('auth-email');
  const passwordInput = document.getElementById('auth-password');
  const messageP = document.getElementById('auth-message');

  cancelBtn.onclick = () => {
    document.getElementById('auth-modal').remove();
  };

  submitBtn.onclick = async () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    messageP.textContent = '';

    if (!email || !password) {
      messageP.textContent = 'Please fill out both fields.';
      return;
    }

    if (type === 'signup') {
      // Sign up user
      const { user, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        messageP.textContent = error.message;
      } else {
        messageP.style.color = 'green';
        messageP.textContent = 'Check your email for confirmation link!';
      }
    } else {
      // Log in user
      const { user, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        messageP.textContent = error.message;
      } else {
        document.getElementById('auth-modal').remove();
        onLogin(user);
      }
    }
  };
}

// Show logged-in user info + logout
function showUser(user) {
  let userInfoDiv = document.getElementById('user-info');
  if (!userInfoDiv) {
    userInfoDiv = document.createElement('div');
    userInfoDiv.id = 'user-info';
    userInfoDiv.style.textAlign = 'right';
    userInfoDiv.style.marginBottom = '15px';
    document.body.insertBefore(userInfoDiv, document.body.firstChild);
  }
  userInfoDiv.innerHTML = `
    Logged in as <strong>${user.email}</strong>
    <button id="logout-btn" style="margin-left: 15px; padding:5px 10px; background:#dc3545; color:white; border:none; border-radius:4px; cursor:pointer;">Logout</button>
  `;

  document.getElementById('logout-btn').onclick = async () => {
    await supabase.auth.signOut();
    userInfoDiv.remove();
    loadRestaurants(); // reload restaurants for public or empty state
  };
}

// Load restaurants (public access)
async function loadRestaurants() {
  const { data: restaurants, error } = await supabase
    .from('restaurants')
    .select('*');

  if (error) {
    restaurantList.innerHTML = `<p style="color:red;">Error loading restaurants: ${error.message}</p>`;
    return;
  }

  if (!restaurants.length) {
    restaurantList.innerHTML = `<p>No restaurants found.</p>`;
    return;
  }

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

  restaurantList.innerHTML = html;
}

// Called on successful login
function onLogin(user) {
  showUser(user);
  loadRestaurants();
}

// Check user session on page load
async function checkUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session && session.user) {
    onLogin(session.user);
  } else {
    loadRestaurants();
  }
}

// Setup buttons
signupBtn.onclick = () => showModal('signup');
loginBtn.onclick = () => showModal('login');

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  checkUser();
});
