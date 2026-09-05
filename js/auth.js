window.Auth = {
    login(email, password, role) {
        const users = Store.getTable('users');
        const user = users.find(u => u.email === email && u.password === password && u.role === role);
        
        if (user) {
            // Also fetch specific role profile mapping
            let profileId = null;
            if (role === 'student') {
                const p = Store.getTable('students').find(s => s.userId === user.id);
                if (p) profileId = p.id;
            } else if (role === 'teacher') {
                const p = Store.getTable('teachers').find(t => t.userId === user.id);
                if (p) profileId = p.id;
            }
            
            const sessionData = { ...user, profileId };
            sessionStorage.setItem('cc_session', JSON.stringify(sessionData));
            return true;
        }
        return false;
    },
    
    logout() {
        sessionStorage.removeItem('cc_session');
        window.location.href = 'index.html';
    },
    
    getCurrentUser() {
        const data = sessionStorage.getItem('cc_session');
        return data ? JSON.parse(data) : null;
    },
    
    isLoggedIn() {
        return !!this.getCurrentUser();
    },
    
    requireAuth() {
        if (!this.isLoggedIn()) {
            window.location.href = 'index.html';
        }
    },
    
    requireRole(role) {
        const user = this.getCurrentUser();
        if (!user || user.role !== role) {
            window.location.hash = '#dashboard';
            return false;
        }
        return true;
    }
};
