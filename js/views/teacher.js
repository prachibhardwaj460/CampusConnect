window.TeacherViews = {
    renderDashboard(container) {
        const user = Auth.getCurrentUser();
        const profile = Store.getTable('teachers').find(t => t.userId === user.id);
        
        container.innerHTML = `
            <div class="page-header">
                <h2>Welcome, ${user.name}!</h2>
                <p>Department: ${profile.department}</p>
            </div>
            
            <div class="grid-cards">
                <div class="stat-card">
                    <div class="stat-icon primary"><i class="fas fa-users"></i></div>
                    <div class="stat-details">
                        <h3>45</h3>
                        <p>Total Students</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon warning"><i class="fas fa-tasks"></i></div>
                    <div class="stat-details">
                        <h3>5</h3>
                        <p>Pending Submissions</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon success"><i class="fas fa-chalkboard"></i></div>
                    <div class="stat-details">
                        <h3>3</h3>
                        <p>Classes Today</p>
                    </div>
                </div>
            </div>
        `;
    },

    renderMyStudents(container) {
        const students = Store.getTable('students');
        const users = Store.getTable('users');

        container.innerHTML = `
            <div class="page-header"><h2>My Students</h2></div>
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
                                    <td><button class="btn btn-primary" onclick="UI.showToast('Profile viewed')">View Profile</button></td>
                                </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    },

    renderAttendance(container) {
        const subjects = Store.getTable('subjects');
        const students = Store.getTable('students');
        const users = Store.getTable('users');

        container.innerHTML = `
            <div class="page-header"><h2>Mark Attendance</h2></div>
            <div class="card mb-3">
                <div style="display:flex; gap:15px; align-items: flex-end;">
                    <div class="form-group mb-0" style="flex:1">
                        <label>Select Subject</label>
                        <select id="attSubject" style="width:100%; padding:8px; border-radius:6px; border:1px solid var(--border-color)">
                            ${subjects.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}
                        </select>
                    </div>
                    <div class="form-group mb-0" style="flex:1">
                        <label>Date</label>
                        <input type="date" id="attDate" value="${new Date().toISOString().split('T')[0]}" style="width:100%; padding:8px; border-radius:6px; border:1px solid var(--border-color)">
                    </div>
                    <button class="btn btn-primary" onclick="UI.showToast('List loaded')">Load Students</button>
                </div>
            </div>

            <div class="card">
                <div class="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Roll No</th>
                                <th>Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${students.map(s => {
                                const u = users.find(usr => usr.id === s.userId);
                                return `
                                <tr>
                                    <td>${s.rollNumber}</td>
                                    <td>${u?.name}</td>
                                    <td>
                                        <button class="btn btn-primary" style="padding: 5px 10px;" onclick="TeacherViews.markAtt('${s.id}', 'present')">Present</button>
                                        <button class="btn btn-danger" style="padding: 5px 10px; background:var(--danger)" onclick="TeacherViews.markAtt('${s.id}', 'absent')">Absent</button>
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
    
    markAtt(studentId, status) {
        Store.addRecord('attendance', {
            studentId,
            subjectId: document.getElementById('attSubject').value,
            date: document.getElementById('attDate').value,
            status
        });
        UI.showToast(`Marked ${status}`);
    },

    renderMarks(container) {
        container.innerHTML = `
            <div class="page-header"><h2>Manage Marks</h2></div>
            <div class="card">
                <p>Select subject and enter marks...</p>
                <button class="btn btn-primary mt-3" onclick="UI.showToast('Marks saved successfully')">Save Marks</button>
            </div>
        `;
    },
    
    renderAssignments(container) {
        const assignments = Store.getTable('assignments');
        container.innerHTML = `
            <div class="page-header">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <h2>Manage Assignments</h2>
                    <button class="btn btn-success" onclick="UI.showToast('Modal opened')"><i class="fas fa-plus"></i> Create New</button>
                </div>
            </div>
            <div class="card">
                <div class="table-responsive">
                    <table>
                        <thead><tr><th>Title</th><th>Due Date</th><th>Action</th></tr></thead>
                        <tbody>
                            ${assignments.map(a => `
                                <tr>
                                    <td><strong>${a.title}</strong></td>
                                    <td>${a.dueDate}</td>
                                    <td><button class="btn btn-primary">Edit</button></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    },

    renderLeaveRequests(container) {
        const leaves = Store.getTable('leaves');
        const students = Store.getTable('students');
        const users = Store.getTable('users');

        container.innerHTML = `
            <div class="page-header"><h2>Student Leave Requests</h2></div>
            <div class="card">
                <div class="table-responsive">
                    <table>
                        <thead><tr><th>Student</th><th>Dates</th><th>Reason</th><th>Status</th><th>Action</th></tr></thead>
                        <tbody>
                            ${leaves.map(l => {
                                const s = students.find(st => st.id === l.studentId);
                                const u = users.find(ur => ur.id === s?.userId);
                                return `
                                <tr>
                                    <td><strong>${u?.name}</strong><br><small>${s?.rollNumber}</small></td>
                                    <td>${l.fromDate} to ${l.toDate}</td>
                                    <td>${l.reason}</td>
                                    <td><span class="status-badge status-${l.status}">${l.status.toUpperCase()}</span></td>
                                    <td>
                                        ${l.status === 'pending' ? `
                                        <button class="btn btn-primary" onclick="TeacherViews.updateLeave('${l.id}', 'approved')">Approve</button>
                                        <button class="btn btn-danger" style="background:var(--danger)" onclick="TeacherViews.updateLeave('${l.id}', 'rejected')">Reject</button>
                                        ` : '-'}
                                    </td>
                                </tr>
                                `;
                            }).join('') || '<tr><td colspan="5">No leave requests found.</td></tr>'}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    },

    updateLeave(id, status) {
        Store.updateRecord('leaves', id, { status });
        UI.showToast(`Leave request ${status}`);
        this.renderLeaveRequests(document.getElementById('appContent'));
    }
};
