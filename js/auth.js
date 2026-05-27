
document.addEventListener('DOMContentLoaded', function() {

    const tabs = document.querySelectorAll('.auth-tab');
    const forms = document.querySelectorAll('.auth-form');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            
            
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
           
            forms.forEach(form => {
                form.classList.remove('active');
                if (form.id === `${tabId}Form`) {
                    form.classList.add('active');
                }
            });
        });
    });
    
   
    const toggleLoginPassword = document.getElementById('toggleLoginPassword');
    const loginPassword = document.getElementById('loginPassword');
    const toggleSignupPassword = document.getElementById('toggleSignupPassword');
    const signupPassword = document.getElementById('signupPassword');
    
    if (toggleLoginPassword) {
        toggleLoginPassword.addEventListener('click', () => {
            const type = loginPassword.getAttribute('type') === 'password' ? 'text' : 'password';
            loginPassword.setAttribute('type', type);
            toggleLoginPassword.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        });
    }
    
    if (toggleSignupPassword) {
        toggleSignupPassword.addEventListener('click', () => {
            const type = signupPassword.getAttribute('type') === 'password' ? 'text' : 'password';
            signupPassword.setAttribute('type', type);
            toggleSignupPassword.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        });
    }
    
    const forgotPasswordLink = document.querySelector('.forgot-password');
    const forgotPasswordModal = document.getElementById('forgotPasswordModal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    
    if (forgotPasswordLink && forgotPasswordModal) {
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            forgotPasswordModal.style.display = 'flex';
        });
    }
    
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            forgotPasswordModal.style.display = 'none';
        });
    });
    
   
    window.addEventListener('click', (e) => {
        if (e.target === forgotPasswordModal) {
            forgotPasswordModal.style.display = 'none';
        }
    });
    
    
    const loginForm = document.getElementById('loginFormElement');
    const signupForm = document.getElementById('signupFormElement');
    
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const rememberMe = document.getElementById('rememberMe').checked;
            
            if (!email || !password) {
                alert('Please fill in all fields');
                return;
            }
            
            
            simulateLogin(email, password, rememberMe);
        });
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const userType = document.getElementById('userType').value;
            const agreeTerms = document.getElementById('agreeTerms').checked;
            
           
            if (!firstName || !lastName || !email || !password || !confirmPassword || !userType) {
                alert('Please fill in all required fields');
                return;
            }
            
            if (!agreeTerms) {
                alert('You must agree to the terms and conditions');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            if (password.length < 8) {
                alert('Password must be at least 8 characters long');
                return;
            }
            
           
            simulateSignup(firstName, lastName, email, password, userType);
        });
    }
    
    
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('resetEmail').value;
            
            if (!email) {
                alert('Please enter your email address');
                return;
            }
            

            alert(`Password reset link has been sent to ${email}`);
            forgotPasswordModal.style.display = 'none';
        });
    }
    

    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const platform = this.classList.contains('google') ? 'Google' : 'Facebook';
            alert(`${platform} login integration would be implemented here`);
        });
    });
});


function simulateLogin(email, password, rememberMe) {
    
    console.log('Login attempt:', { email, password, rememberMe });
    
    
    const loginBtn = document.querySelector('#loginFormElement .auth-btn');
    const originalText = loginBtn.innerHTML;
    loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
    loginBtn.disabled = true;
    
    
    setTimeout(() => {
        
        if (email === 'admin@discoversrilanka.lk' && password === 'admin123') {
            alert('Login successful! Redirecting to admin panel...');
            
            
            localStorage.setItem('adminLoggedIn', 'true');
            localStorage.setItem('adminEmail', email);
            localStorage.setItem('userType', 'admin');
            
            
            localStorage.removeItem('userLoggedIn');
            localStorage.removeItem('userEmail');
            
            window.location.href = 'admin.html';
        } else if (email && password) {
           
            alert('Login successful! Redirecting to home page...');
            window.location.href = 'index.html';
            
            
            localStorage.setItem('userLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userType', 'user');
            
           
            localStorage.removeItem('adminLoggedIn');
            localStorage.removeItem('adminEmail');
        } else {
            alert('Invalid email or password');
            loginBtn.innerHTML = originalText;
            loginBtn.disabled = false;
        }
    }, 1500);
}


function simulateSignup(firstName, lastName, email, password, userType) {
    console.log('Signup attempt:', { firstName, lastName, email, password, userType });
    
    const signupBtn = document.querySelector('#signupFormElement .auth-btn');
    const originalText = signupBtn.innerHTML;
    signupBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';
    signupBtn.disabled = true;
    
    setTimeout(() => {
        alert('Account created successfully! You can now login.');
        
        
        document.querySelector('[data-tab="login"]').click();
        
        
        document.getElementById('loginEmail').value = email;
        
        signupBtn.innerHTML = originalText;
        signupBtn.disabled = false;
    }, 1500);
}