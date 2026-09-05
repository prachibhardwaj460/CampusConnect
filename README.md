# 🎓 CampusConnect — College Management Portal

A modern, responsive **College Management Portal** built using **HTML5, CSS3, and Vanilla JavaScript**.

CampusConnect provides separate dashboards and role-based functionality for **Students, Teachers, and Administrators**. The project uses **Browser LocalStorage** instead of a traditional database, making it lightweight and easy to run locally.

> ⚠️ This project is intended for learning, demonstration, and local development purposes. It is not designed for production use because authentication and data are stored on the client side.

---

## ✨ Features

### 👨‍🎓 Student Portal

Students can:

* View personal profile
* Check attendance
* View marks and grades
* View GPA/performance
* Check class timetable
* View enrolled subjects
* View assignments
* Update assignment status
* Access study materials
* Read announcements
* View college events
* Submit leave requests
* View leave request status
* View notifications
* Send/view messages
* Submit feedback
* Switch between light and dark mode

---

### 👨‍🏫 Teacher Portal

Teachers can:

* View teacher profile
* View assigned students
* Filter students by section
* Search students
* View student details
* Take student attendance
* Update attendance
* Enter student marks
* Automatically calculate grades
* Create assignments
* Manage study materials
* Post announcements
* Review leave requests
* Approve/reject leave requests
* View reports
* Check class schedules
* View attendance and performance statistics

Teachers only see students belonging to their assigned sections/subjects.

---

### 👨‍💼 Admin Portal

Administrators can manage:

* Students
* Teachers
* Courses
* Departments
* Subjects
* Sections
* Timetable
* Announcements
* Events
* Attendance
* Marks
* Assignments
* Leave requests
* Reports

The admin dashboard also provides overall college statistics and analytics.

---

## 📊 Dashboard

The dashboards contain useful information such as:

* Total students
* Total teachers
* Total subjects
* Attendance percentage
* Student performance
* GPA
* Pending assignments
* Upcoming classes
* Recent announcements
* Notifications
* Upcoming events

Charts and statistics are generated dynamically from the stored data.

---

## 🗂️ Project Structure

```text
campusconnect-college-management-portal/
│
├── index.html
├── dashboard.html
├── README.md
│
├── css/
│   └── style.css
│
├── js/
│   ├── app.js
│   ├── auth.js
│   ├── store.js
│   └── views/
│       ├── admin.js
│       ├── student.js
│       └── teacher.js
│
└── assets/
    ├── images/
    └── icons/
```

The exact folder structure may change as the project develops.

---

## 🛠️ Technologies Used

| Technology            | Purpose                       |
| --------------------- | ----------------------------- |
| HTML5                 | Application structure         |
| CSS3                  | Styling and responsive design |
| JavaScript            | Application logic             |
| LocalStorage          | Local data persistence        |
| Chart.js              | Data visualization            |
| Lucide / Font Awesome | Icons                         |

No traditional backend or SQL database is required.

---

## 💾 Data Storage

CampusConnect uses the browser's **LocalStorage API**.

Data such as:

* Users
* Students
* Teachers
* Subjects
* Attendance
* Marks
* Assignments
* Announcements
* Events
* Leave requests
* Notifications
* Messages

is stored locally in the browser.

The application automatically creates demo data when it is opened for the first time.

### Important

LocalStorage is browser-specific.

This means:

* Data does not automatically sync between computers.
* Clearing browser storage will remove the application data.
* Different browsers can have different data.
* This system should not be used for real student information.

---

# 🔐 Demo Login Credentials

Use these accounts to test the different dashboards.

### 👨‍💼 Admin

```text
Email: admin@campusconnect.local
Password: admin123
```

### 👨‍🏫 Teacher

```text
Email: teacher@campusconnect.local
Password: teacher123
```

### 👨‍🎓 Student

```text
Email: student@campusconnect.local
Password: student123
```

These credentials are for demonstration purposes only.

---

# 🚀 How to Run

## Option 1 — VS Code + Live Server

### Step 1

Clone the repository:

```bash
git clone https://github.com/YOUR-USERNAME/campusconnect-college-management-portal.git
```

### Step 2

Open the project:

```bash
cd campusconnect-college-management-portal
```

### Step 3

Open the folder in VS Code.

### Step 4

Install the **Live Server** extension in VS Code.

### Step 5

Right-click:

```text
index.html
```

and select:

```text
Open with Live Server
```

The application should open at an address similar to:

```text
http://127.0.0.1:5500/
```

---

## Option 2 — Open Directly

You can also double-click:

```text
index.html
```

and open it in your browser.

However, **Live Server is recommended** because some browsers may restrict certain local JavaScript/file operations when using the `file://` protocol.

---

# 🔄 Reset Demo Data

If you want to start with a fresh set of demo data, use the reset functionality provided by the application if available.

Alternatively, open the browser Developer Tools:

```text
F12
```

Go to:

```text
Application → Local Storage
```

Select the CampusConnect site and clear its LocalStorage.

Then refresh the page.

The application should initialize the default demo data again.

---

# 🔑 Role-Based Access

CampusConnect uses role-based access control.

There are three roles:

```text
admin
teacher
student
```

Each role receives a different dashboard and set of permissions.

### Student

Can view personal academic information.

### Teacher

Can manage academic information for assigned students/sections.

### Admin

Can manage the overall system.

---

# 📈 Automatic Calculations

The application dynamically calculates information such as:

### Attendance

```text
Attendance % = Present Classes / Total Classes × 100
```

### Percentage

```text
Percentage = Obtained Marks / Maximum Marks × 100
```

### GPA

GPA is calculated from the subject grades/grade points stored in the application.

This prevents dashboard information from becoming disconnected from the underlying data.

---

# 🔗 Connected Data

The application is designed so that actions performed by one role can affect another role.

For example:

```text
Teacher marks student as Present
            ↓
Attendance saved to LocalStorage
            ↓
Student opens Attendance
            ↓
Updated attendance is displayed
```

Similarly:

```text
Teacher enters marks
        ↓
Marks saved
        ↓
Student opens Results
        ↓
Updated marks and grade displayed
```

And:

```text
Admin creates announcement
        ↓
Announcement saved
        ↓
Students and teachers see notification
```

---

# 📱 Responsive Design

CampusConnect is designed to work on:

* 💻 Desktop
* 🖥️ Laptop
* 📱 Mobile
* 📟 Tablet

The interface adapts automatically to different screen sizes.

---

# 🌙 Dark Mode

CampusConnect includes a light/dark theme.

The selected theme is saved using LocalStorage so the preference remains after refreshing the page.

---

# 🖨️ Print Support

Print-friendly layouts are provided for selected pages, including:

* Student results
* Attendance reports
* Timetable
* Student lists
* Reports

Browser print functionality can be used with:

```text
Ctrl + P
```

---

# 🔒 Security Notice

This project does **not** implement production-grade authentication.

The login system is designed for:

* Learning
* College projects
* Portfolio demonstrations
* Local testing
* UI/UX demonstrations

Passwords and application data are stored on the client side.

For a real college deployment, the application would need:

* Backend authentication
* Secure password hashing
* Database
* Server-side authorization
* HTTPS
* Session/token management
* Input sanitization
* Audit logs
* Backup system
* Proper access control

---

# 🎯 Future Improvements

Possible future versions could include:

* Real backend API
* MySQL/PostgreSQL database
* Secure authentication
* Email notifications
* PDF report generation
* Excel export
* Real file uploads
* Online examinations
* Library management
* Fee/payment management
* Hostel management
* Transport management
* Parent portal
* Faculty payroll
* College ID card generation
* QR-based attendance
* Advanced analytics
* Progressive Web App support

---

# 🤝 Contributing

Contributions are welcome.

To contribute:

1. Fork the repository.
2. Create a new branch.

```bash
git checkout -b feature/new-feature
```

3. Make your changes.
4. Commit your changes.

```bash
git commit -m "Add new feature"
```

5. Push the branch.

```bash
git push origin feature/new-feature
```

6. Open a Pull Request.

---

# 📄 License

This project is available for educational and personal use.

You may modify and improve the project for your own learning and portfolio.

---

# 👨‍💻 Project

**CampusConnect — College Management Portal**

Built with:

```text
HTML5
CSS3
Vanilla JavaScript
LocalStorage
```

No SQL database required.

---

⭐ If you find this project useful, consider giving the repository a star!
