// Mock Data for Initial Setup
const INITIAL_DATA = {
    users: [
        { id: 'u1', name: 'Admin Manager', email: 'admin@campusconnect.local', password: 'admin123', role: 'admin', avatar: 'https://ui-avatars.com/api/?name=Admin+Manager' },
        { id: 'u2', name: 'Dr. John Smith', email: 'teacher@campusconnect.local', password: 'teacher123', role: 'teacher', avatar: 'https://ui-avatars.com/api/?name=John+Smith' },
        { id: 'u3', name: 'Jane Doe', email: 'student@campusconnect.local', password: 'student123', role: 'student', avatar: 'https://ui-avatars.com/api/?name=Jane+Doe' }
    ],
    students: [
        { id: 's1', userId: 'u3', rollNumber: 'CS2023001', courseId: 'c1', semester: 3, sectionId: 'sec1', dob: '2002-05-14', phone: '555-0101' }
    ],
    teachers: [
        { id: 't1', userId: 'u2', department: 'Computer Science', subjectIds: ['sub1', 'sub2'], sectionIds: ['sec1'] }
    ],
    courses: [
        { id: 'c1', name: 'B.Tech Computer Science', code: 'BTECH-CS' }
    ],
    sections: [
        { id: 'sec1', name: 'A', courseId: 'c1', semester: 3 }
    ],
    subjects: [
        { id: 'sub1', name: 'Data Structures', code: 'CS201', teacherId: 't1', credits: 4, semester: 3 },
        { id: 'sub2', name: 'Database Systems', code: 'CS202', teacherId: 't1', credits: 3, semester: 3 }
    ],
    attendance: [
        { id: 'a1', studentId: 's1', subjectId: 'sub1', date: '2023-10-01', status: 'present' },
        { id: 'a2', studentId: 's1', subjectId: 'sub2', date: '2023-10-01', status: 'absent' }
    ],
    marks: [
        { id: 'm1', studentId: 's1', subjectId: 'sub1', examType: 'midterm', marks: 85, total: 100 },
        { id: 'm2', studentId: 's1', subjectId: 'sub2', examType: 'midterm', marks: 92, total: 100 }
    ],
    assignments: [
        { id: 'as1', title: 'Binary Trees Implementation', subjectId: 'sub1', teacherId: 't1', sectionId: 'sec1', dueDate: '2023-11-15', description: 'Implement BST in C++' }
    ],
    submissions: [],
    announcements: [
        { id: 'an1', title: 'Midterm Exam Schedule', description: 'Exams begin next Monday.', date: '2023-10-25', category: 'Exam', priority: 'High', authorRole: 'admin' }
    ],
    leaves: [
        { id: 'l1', studentId: 's1', fromDate: '2023-11-01', toDate: '2023-11-03', reason: 'Fever', status: 'pending' }
    ],
    events: [
        { id: 'e1', title: 'TechFest 2023', date: '2023-12-05', location: 'Main Auditorium', description: 'Annual Tech Festival' }
    ],
    timetable: [
        { id: 'tt1', day: 'Monday', startTime: '09:00', endTime: '10:00', subjectId: 'sub1', teacherId: 't1', sectionId: 'sec1', room: 'Room 301' }
    ]
};

window.Store = {
    init() {
        if (!localStorage.getItem('cc_initialized')) {
            this.saveAll(INITIAL_DATA);
            localStorage.setItem('cc_initialized', 'true');
        }
    },
    
    getAll() {
        return JSON.parse(localStorage.getItem('cc_data')) || INITIAL_DATA;
    },
    
    saveAll(data) {
        localStorage.setItem('cc_data', JSON.stringify(data));
    },
    
    getTable(tableName) {
        const data = this.getAll();
        return data[tableName] || [];
    },
    
    saveTable(tableName, tableData) {
        const data = this.getAll();
        data[tableName] = tableData;
        this.saveAll(data);
    },
    
    addRecord(tableName, record) {
        const table = this.getTable(tableName);
        record.id = Date.now().toString(); // simple ID generation
        table.push(record);
        this.saveTable(tableName, table);
        return record;
    },
    
    updateRecord(tableName, id, updates) {
        const table = this.getTable(tableName);
        const index = table.findIndex(r => r.id === id);
        if (index !== -1) {
            table[index] = { ...table[index], ...updates };
            this.saveTable(tableName, table);
            return table[index];
        }
        return null;
    }
};
