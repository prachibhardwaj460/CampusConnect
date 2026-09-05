window.AdminViews = {
    renderDashboard(container) {
        const users = Store.getTable('users');
        const students = Store.getTable('students');
        const teachers = Store.getTable('teachers');
        const subjects = Store.getTable('subjects');

        container.innerHTML = `
            <div class="page-header">
                <h2>Admin Dashboard</h2>
                <p>System Overview</p>
            </div>
            
            <div class="grid-cards">
                <div class="stat-card">
                    <div class="stat-icon primary"><i class="fas fa-user-graduate"></i></div>
                    <div class="stat-details">
                        <h3>${students.length}</h3>
                        <p>Total Students</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon warning"><i class="fas fa-chalkboard-teacher"></i></div>
                    <div class="stat-details">
                        <h3>${teachers.length}</h3>
                        <p>Total Teachers</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon success"><i class="fas fa-book"></i></div>
                    <div class="stat-details">
                        <h3>${subjects.length}</h3>
                        <p>Total Subjects</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon danger"><i class="fas fa-users"></i></div>
                    <div class="stat-details">
                        <h3>${users.length}</h3>
                        <p>System Users</p>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h3>Recent System Activity</h3>
                </div>
                <p class="text-muted">No recent activity detected.</p>
            </div>
        `;
    },

    renderStudents(container) {
        const students = Store.getTable('students');
        const users = Store.getTable('users');
        
        container.innerHTML = `
            <div class="page-header">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <h2>Manage Students</h2>
                    <button class="btn btn-primary" onclick="UI.showToast('Add Student Dialog')"><i class="fas fa-plus"></i> Add New Student</button>
                </div>
            </div>
            <div class="card">
                <div class="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Roll No</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Semester</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${students.map(s => {
                                const u = users.find(usr => usr.id === s.userId);
                                return `
                                <tr>
                                    <td>${s.rollNumber}</td>
                                    <td><strong>${u?.name}</strong></td>
                                    <td>${u?.email}</td>
                                    <td>${s.semester}</td>
                                    <td>
                                        <button class="btn" style="background:var(--warning); color:white; padding:5px 10px"><i class="fas fa-edit"></i></button>
                                        <button class="btn" style="background:var(--danger); color:white; padding:5px 10px"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    },

    renderTeachers(container) {
        const teachers = Store.getTable('teachers');
        const users = Store.getTable('users');
        
        container.innerHTML = `
            <div class="page-header">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <h2>Manage Teachers</h2>
                    <button class="btn btn-primary" onclick="UI.showToast('Add Teacher Dialog')"><i class="fas fa-plus"></i> Add New Teacher</button>
                </div>
            </div>
            <div class="card">
                <div class="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Department</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${teachers.map(t => {
                                const u = users.find(usr => usr.id === t.userId);
                                return `
                                <tr>
                                    <td><strong>${u?.name}</strong></td>
                                    <td>${u?.email}</td>
                                    <td>${t.department}</td>
                                    <td>
                                        <button class="btn" style="background:var(--warning); color:white; padding:5px 10px"><i class="fas fa-edit"></i></button>
                                        <button class="btn" style="background:var(--danger); color:white; padding:5px 10px"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    },

    renderSubjects(container) {
        const subjects = Store.getTable('subjects');
        
        container.innerHTML = `
            <div class="page-header">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <h2>Manage Subjects</h2>
                    <button class="btn btn-primary" onclick="UI.showToast('Add Subject Dialog')"><i class="fas fa-plus"></i> Add Subject</button>
                </div>
            </div>
            <div class="card">
                <div class="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Name</th>
                                <th>Credits</th>
                                <th>Semester</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${subjects.map(s => `
                                <tr>
                                    <td><strong>${s.code}</strong></td>
                                    <td>${s.name}</td>
                                    <td>${s.credits}</td>
                                    <td>${s.semester}</td>
                                    <td>
                                        <button class="btn" style="background:var(--warning); color:white; padding:5px 10px"><i class="fas fa-edit"></i></button>
                                        <button class="btn" style="background:var(--danger); color:white; padding:5px 10px"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }
};
