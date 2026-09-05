window.StudentViews = {
    renderDashboard(container) {
        const user = Auth.getCurrentUser();
        const profile = Store.getTable('students').find(s => s.userId === user.id);
        const attendance = Store.getTable('attendance').filter(a => a.studentId === profile.id);
        
        let presentCount = attendance.filter(a => a.status === 'present').length;
        let totalClasses = attendance.length;
        let attPercentage = totalClasses ? Math.round((presentCount / totalClasses) * 100) : 0;

        container.innerHTML = `
            <div class="page-header">
                <h2>Welcome back, ${user.name}!</h2>
                <p>Student ID: ${profile.rollNumber} • Semester: ${profile.semester}</p>
            </div>
            
            <div class="grid-cards">
                <div class="stat-card">
                    <div class="stat-icon primary"><i class="fas fa-calendar-check"></i></div>
                    <div class="stat-details">
                        <h3>${attPercentage}%</h3>
                        <p>Overall Attendance</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon success"><i class="fas fa-chart-line"></i></div>
                    <div class="stat-details">
                        <h3>8.5</h3>
                        <p>Current CGPA</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon warning"><i class="fas fa-tasks"></i></div>
                    <div class="stat-details">
                        <h3>2</h3>
                        <p>Pending Assignments</p>
                    </div>
                </div>
            </div>

            <div class="grid-2">
                <div class="card">
                    <div class="card-header">
                        <h3>Recent Announcements</h3>
                        <a href="#announcements">View all</a>
                    </div>
                    <div id="recentAnnouncements"></div>
                </div>
                <div class="card">
                    <div class="card-header">
                        <h3>Today's Classes</h3>
                    </div>
                    <div class="table-responsive">
                        <table>
                            <thead><tr><th>Time</th><th>Subject</th><th>Room</th></tr></thead>
                            <tbody id="todayClassesBody"></tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;

        // Populate dynamic data
        const announcements = Store.getTable('announcements').slice(0, 3);
        const annContainer = document.getElementById('recentAnnouncements');
        annContainer.innerHTML = announcements.map(a => `<div class="mb-2"><strong>${a.title}</strong><br><small class="text-muted">${a.date}</small></div>`).join('');

        const timetable = Store.getTable('timetable');
        const ttBody = document.getElementById('todayClassesBody');
        ttBody.innerHTML = timetable.map(t => `<tr><td>${t.startTime}</td><td>${Store.getTable('subjects').find(s=>s.id===t.subjectId)?.name}</td><td>${t.room}</td></tr>`).join('');
    },

    renderProfile(container) {
        const user = Auth.getCurrentUser();
        const profile = Store.getTable('students').find(s => s.userId === user.id);
        const course = Store.getTable('courses').find(c => c.id === profile.courseId);

        container.innerHTML = `
            <div class="page-header"><h2>My Profile</h2></div>
            <div class="card">
                <div style="display:flex; gap: 30px; align-items: flex-start;">
                    <img src="${user.avatar}" alt="Avatar" style="width:150px; border-radius:12px;">
                    <div>
                        <h3 class="mb-2">${user.name}</h3>
                        <p class="mb-1"><strong>Email:</strong> ${user.email}</p>
                        <p class="mb-1"><strong>Roll No:</strong> ${profile.rollNumber}</p>
                        <p class="mb-1"><strong>Course:</strong> ${course?.name}</p>
                        <p class="mb-1"><strong>Semester:</strong> ${profile.semester}</p>
                        <p class="mb-1"><strong>Phone:</strong> ${profile.phone}</p>
                        <button class="btn btn-primary mt-3"><i class="fas fa-edit"></i> Edit Contact Info</button>
                    </div>
                </div>
            </div>
        `;
    },

    renderAttendance(container) {
        const user = Auth.getCurrentUser();
        const profile = Store.getTable('students').find(s => s.userId === user.id);
        const attendance = Store.getTable('attendance').filter(a => a.studentId === profile.id);
        
        container.innerHTML = `
            <div class="page-header"><h2>Attendance Details</h2></div>
            <div class="card">
                <div class="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Subject</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${attendance.map(a => `
                                <tr>
                                    <td>${Store.getTable('subjects').find(s=>s.id===a.subjectId)?.name}</td>
                                    <td>${a.date}</td>
                                    <td><span class="status-badge status-${a.status}">${a.status.toUpperCase()}</span></td>
                                </tr>
                            `).join('') || '<tr><td colspan="3">No records found</td></tr>'}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    },
    
    renderMarks(container) {
        const user = Auth.getCurrentUser();
        const profile = Store.getTable('students').find(s => s.userId === user.id);
        const marks = Store.getTable('marks').filter(m => m.studentId === profile.id);
        
        container.innerHTML = `
            <div class="page-header">
                <h2>Marks & Results</h2>
                <button class="btn btn-primary" onclick="window.print()"><i class="fas fa-print"></i> Print Report</button>
            </div>
            <div class="card">
                <div class="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Subject</th>
                                <th>Exam Type</th>
                                <th>Marks Obtained</th>
                                <th>Total Marks</th>
                                <th>Percentage</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${marks.map(m => {
                                const subject = Store.getTable('subjects').find(s=>s.id===m.subjectId)?.name;
                                const perc = Math.round((m.marks / m.total) * 100);
                                return `
                                <tr>
                                    <td>${subject}</td>
                                    <td><span style="text-transform:capitalize">${m.examType}</span></td>
                                    <td>${m.marks}</td>
                                    <td>${m.total}</td>
                                    <td><strong>${perc}%</strong></td>
                                </tr>
                                `;
                            }).join('') || '<tr><td colspan="5">No marks published yet.</td></tr>'}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    },

    renderTimetable(container) {
        const timetable = Store.getTable('timetable');
        container.innerHTML = `
            <div class="page-header"><h2>Weekly Class Schedule</h2></div>
            <div class="card">
                <div class="table-responsive">
                    <table>
                        <thead><tr><th>Day</th><th>Time</th><th>Subject</th><th>Room</th></tr></thead>
                        <tbody>
                            ${timetable.map(t => `
                                <tr>
                                    <td><strong>${t.day}</strong></td>
                                    <td>${t.startTime} - ${t.endTime}</td>
                                    <td>${Store.getTable('subjects').find(s=>s.id===t.subjectId)?.name}</td>
                                    <td>${t.room}</td>
                                </tr>
                            `).join('') || '<tr><td colspan="4">No classes scheduled.</td></tr>'}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    },

    renderAssignments(container) {
        const assignments = Store.getTable('assignments');
        container.innerHTML = `
            <div class="page-header"><h2>Assignments</h2></div>
            <div class="card">
                <div class="table-responsive">
                    <table>
                        <thead><tr><th>Title</th><th>Subject</th><th>Due Date</th><th>Status</th><th>Action</th></tr></thead>
                        <tbody>
                            ${assignments.map(a => `
                                <tr>
                                    <td><strong>${a.title}</strong><br><small>${a.description}</small></td>
                                    <td>${Store.getTable('subjects').find(s=>s.id===a.subjectId)?.name}</td>
                                    <td>${a.dueDate}</td>
                                    <td><span class="status-badge status-pending">Pending</span></td>
                                    <td><button class="btn btn-primary" onclick="UI.showToast('Assignment submitted successfully!')">Submit</button></td>
                                </tr>
                            `).join('') || '<tr><td colspan="5">No assignments found.</td></tr>'}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    },

    renderLeave(container) {
        const user = Auth.getCurrentUser();
        const profile = Store.getTable('students').find(s => s.userId === user.id);
        const leaves = Store.getTable('leaves').filter(l => l.studentId === profile.id);

        container.innerHTML = `
            <div class="page-header"><h2>Leave Requests</h2></div>
            <div class="grid-2">
                <div class="card">
                    <div class="card-header"><h3>Apply for Leave</h3></div>
                    <form id="leaveForm">
                        <div class="form-group">
                            <label>From Date</label>
                            <input type="date" id="lFrom" required style="width:100%; padding:8px; border:1px solid var(--border-color); border-radius:6px;">
                        </div>
                        <div class="form-group">
                            <label>To Date</label>
                            <input type="date" id="lTo" required style="width:100%; padding:8px; border:1px solid var(--border-color); border-radius:6px;">
                        </div>
                        <div class="form-group">
                            <label>Reason</label>
                            <textarea id="lReason" required rows="4" style="width:100%; padding:8px; border:1px solid var(--border-color); border-radius:6px;"></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit Request</button>
                    </form>
                </div>
                <div class="card">
                    <div class="card-header"><h3>My History</h3></div>
                    <div class="table-responsive">
                        <table>
                            <thead><tr><th>Dates</th><th>Reason</th><th>Status</th></tr></thead>
                            <tbody>
                                ${leaves.map(l => `
                                    <tr>
                                        <td><small>${l.fromDate} to ${l.toDate}</small></td>
                                        <td>${l.reason}</td>
                                        <td><span class="status-badge status-${l.status}">${l.status.toUpperCase()}</span></td>
                                    </tr>
                                `).join('') || '<tr><td colspan="3">No leave requests.</td></tr>'}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('leaveForm').addEventListener('submit', (e) => {
            e.preventDefault();
            Store.addRecord('leaves', {
                studentId: profile.id,
                fromDate: document.getElementById('lFrom').value,
                toDate: document.getElementById('lTo').value,
                reason: document.getElementById('lReason').value,
                status: 'pending'
            });
            UI.showToast('Leave request submitted!');
            this.renderLeave(container);
        });
    }
};
