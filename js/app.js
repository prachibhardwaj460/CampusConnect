document.addEventListener('DOMContentLoaded', () => {
    // 1. Auth Check
    Auth.requireAuth();
    const user = Auth.getCurrentUser();
    if (!user) return;

    // 2. Initialize UI Shell
    initShell(user);

    // 3. Setup Routing
    window.addEventListener('hashchange', handleRoute);
    
    // Trigger initial route
    if (!window.location.hash) {
        window.location.hash = '#dashboard';
    } else {
        handleRoute();
    }
});

function initShell(user) {
    // Populate User Info
    document.getElementById('topbarName').textContent = user.name;
    document.getElementById('topbarAvatar').src = user.avatar;
    
    const sidebarUser = document.getElementById('sidebarUser');
    sidebarUser.innerHTML = `
        <img src="${user.avatar}" alt="User">
        <div class="sidebar-user-info">
            <p>${user.name}</p>
            <span>${user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
        </div>
    `;

    // Render Sidebar based on Role
    const nav = document.getElementById('sidebarNav');
    let links = '';
    
    if (user.role === 'student') {
        links = `
            <ul>
                <li><a href="#dashboard" class="nav-link"><i class="fas fa-home"></i> Dashboard</a></li>
                <li><a href="#profile" class="nav-link"><i class="fas fa-user"></i> My Profile</a></li>
                <li><a href="#attendance" class="nav-link"><i class="fas fa-calendar-check"></i> Attendance</a></li>
                <li><a href="#marks" class="nav-link"><i class="fas fa-chart-bar"></i> Marks & Results</a></li>
                <li><a href="#timetable" class="nav-link"><i class="fas fa-clock"></i> Timetable</a></li>
                <li><a href="#assignments" class="nav-link"><i class="fas fa-tasks"></i> Assignments</a></li>
                <li><a href="#announcements" class="nav-link"><i class="fas fa-bullhorn"></i> Announcements</a></li>
                <li><a href="#leave" class="nav-link"><i class="fas fa-envelope-open-text"></i> Leave Request</a></li>
            </ul>
        `;
    } else if (user.role === 'teacher') {
        links = `
            <ul>
                <li><a href="#dashboard" class="nav-link"><i class="fas fa-home"></i> Dashboard</a></li>
                <li><a href="#mystudents" class="nav-link"><i class="fas fa-users"></i> My Students</a></li>
                <li><a href="#attendance" class="nav-link"><i class="fas fa-calendar-check"></i> Attendance</a></li>
                <li><a href="#marks" class="nav-link"><i class="fas fa-chart-bar"></i> Marks</a></li>
                <li><a href="#assignments" class="nav-link"><i class="fas fa-tasks"></i> Assignments</a></li>
                <li><a href="#announcements" class="nav-link"><i class="fas fa-bullhorn"></i> Announcements</a></li>
                <li><a href="#leaves" class="nav-link"><i class="fas fa-envelope-open-text"></i> Leave Requests</a></li>
            </ul>
        `;
    } else if (user.role === 'admin') {
        links = `
            <ul>
                <li><a href="#dashboard" class="nav-link"><i class="fas fa-home"></i> Dashboard</a></li>
                <li><a href="#students" class="nav-link"><i class="fas fa-user-graduate"></i> Students</a></li>
                <li><a href="#teachers" class="nav-link"><i class="fas fa-chalkboard-teacher"></i> Teachers</a></li>
                <li><a href="#subjects" class="nav-link"><i class="fas fa-book"></i> Subjects</a></li>
                <li><a href="#announcements" class="nav-link"><i class="fas fa-bullhorn"></i> Announcements</a></li>
            </ul>
        `;
    }
    nav.innerHTML = links;

    // Events
    document.getElementById('logoutBtn').addEventListener('click', () => Auth.logout());
    
    // Theme
    const themeBtn = document.getElementById('themeToggle');
    themeBtn.addEventListener('click', () => {
        const body = document.body;
        const current = body.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', next);
        localStorage.setItem('cc_theme', next);
        themeBtn.innerHTML = next === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
    const savedTheme = localStorage.getItem('cc_theme');
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
        themeBtn.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }

    // Mobile Sidebar
    const sidebar = document.getElementById('sidebar');
    document.getElementById('menuToggle').addEventListener('click', () => sidebar.classList.add('active'));
    document.getElementById('mobileClose').addEventListener('click', () => sidebar.classList.remove('active'));

    // Dropdowns
    const profileToggle = document.getElementById('profileToggle');
    const profileMenu = document.getElementById('profileMenu');
    profileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        profileMenu.classList.toggle('show');
    });

    document.addEventListener('click', () => {
        profileMenu.classList.remove('show');
    });
}

function handleRoute() {
    const hash = window.location.hash.substring(1) || 'dashboard';
    const user = Auth.getCurrentUser();
    const contentArea = document.getElementById('appContent');
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    const activeLink = document.querySelector(`.nav-link[href="#${hash}"]`);
    if(activeLink) activeLink.classList.add('active');

    contentArea.innerHTML = '<div class="loader">Loading...</div>';

    // Route logic
    setTimeout(() => {
        if (user.role === 'student') {
            if (hash === 'dashboard') StudentViews.renderDashboard(contentArea);
            else if (hash === 'profile') StudentViews.renderProfile(contentArea);
            else if (hash === 'attendance') StudentViews.renderAttendance(contentArea);
            else if (hash === 'marks') StudentViews.renderMarks(contentArea);
            else if (hash === 'timetable') StudentViews.renderTimetable(contentArea);
            else if (hash === 'assignments') StudentViews.renderAssignments(contentArea);
            else if (hash === 'leave') StudentViews.renderLeave(contentArea);
            else if (hash === 'announcements') SharedViews.renderAnnouncements(contentArea);
            else contentArea.innerHTML = '<h2>404 Not Found</h2>';
        } 
        else if (user.role === 'teacher') {
            if (hash === 'dashboard') TeacherViews.renderDashboard(contentArea);
            else if (hash === 'mystudents') TeacherViews.renderMyStudents(contentArea);
            else if (hash === 'attendance') TeacherViews.renderAttendance(contentArea);
            else if (hash === 'marks') TeacherViews.renderMarks(contentArea);
            else if (hash === 'assignments') TeacherViews.renderAssignments(contentArea);
            else if (hash === 'leaves') TeacherViews.renderLeaveRequests(contentArea);
            else if (hash === 'announcements') SharedViews.renderAnnouncements(contentArea);
            else contentArea.innerHTML = '<h2>404 Not Found</h2>';
        }
        else if (user.role === 'admin') {
            if (hash === 'dashboard') AdminViews.renderDashboard(contentArea);
            else if (hash === 'students') AdminViews.renderStudents(contentArea);
            else if (hash === 'teachers') AdminViews.renderTeachers(contentArea);
            else if (hash === 'subjects') AdminViews.renderSubjects(contentArea);
            else if (hash === 'announcements') SharedViews.renderAnnouncements(contentArea);
            else contentArea.innerHTML = '<h2>404 Not Found</h2>';
        }
    }, 100);
}

// Global UI Utility
window.UI = {
    showToast(message, type = 'success') {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle text-success' : 'exclamation-circle text-danger'}"></i> <span>${message}</span>`;
        container.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }
};

window.SharedViews = {
    renderAnnouncements(container) {
        const announcements = Store.getTable('announcements');
        let html = `<div class="page-header"><h2>Announcements</h2></div><div class="grid-cards">`;
        announcements.forEach(a => {
            html += `
                <div class="card">
                    <div class="mb-2"><span class="badge badge-info">${a.category}</span></div>
                    <h3>${a.title}</h3>
                    <p class="text-muted mb-2">${a.date} • By ${a.authorRole}</p>
                    <p>${a.description}</p>
                </div>
            `;
        });
        html += `</div>`;
        container.innerHTML = html;
    }
};
