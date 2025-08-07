
# Employee Management System (EMS)

## Overview
The Employee Management System (EMS) is a comprehensive web application designed to help organizations efficiently manage employee records, departments, salaries, and leave requests. The system supports role-based access, providing separate dashboards for admins and employees to streamline workflow and improve productivity.

## Features
- **User Authentication:** Secure login and registration with JWT authentication.
- **Admin Dashboard:**
  - Add, edit, and view employees.
  - Manage departments.
  - Add and track salary payments.
  - Approve, reject, and track leave requests.
  - Dashboard overview with key statistics.
- **Employee Dashboard:**
  - View personal profile and salary details.
  - Apply for leaves and check leave status.
  - Change password and update account settings.
- **Password Management:** Change password and forgot password with OTP email verification.
- **RESTful API:** Backend built with Node.js, Express, MongoDB, and Mongoose.
- **Frontend:** Responsive UI built with React and Tailwind CSS.
- **File Uploads:** Support for profile pictures and documents.
- **Role-Based Access Control:** Secure route protection based on user roles.

## Technologies Used
- **Frontend:** React, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Email Service:** Nodemailer for OTP email verification
- **Version Control:** Git & GitHub

## Project Structure

```
/frontend       # React frontend application
/server         # Node.js backend API
.gitignore      # Git ignore rules
.env            # Environment variables (not included in repo)
README.md       # Project documentation
```

## Installation

### Prerequisites
- Node.js and npm installed
- MongoDB instance or MongoDB Atlas cluster
- Email account for Nodemailer (for OTP emails)

### Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   ```
4. Run the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React app:
   ```bash
   npm start
   ```

## Usage

- Open your browser and go to `http://localhost:3000`.
- Use the Admin dashboard to manage employees, departments, salaries, and leaves.
- Employees can log in to view their profile, salary, and apply for leave.
- Admins can view real-time statistics on the dashboard.

## API Endpoints

| Endpoint                 | Method | Description                   |
|--------------------------|--------|-------------------------------|
| `/api/auth/login`        | POST   | Authenticate user login       |
| `/api/auth/register`     | POST   | Register new user (admin only)|
| `/api/admin/summary`     | GET    | Fetch dashboard summary       |
| `/api/employee/:id`      | GET    | Get employee details          |
| `/api/salary`            | POST   | Add salary record             |
| `/api/leave`             | GET    | Get leave requests            |
| ...                      | ...    | ...                           |

*(Refer to code for complete list)*

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](#) or submit a pull request.

## License

This project is licensed under the MIT License.

---

### Contact

**Your Name**  
Email: your.email@example.com  
GitHub: [your-github-profile](https://github.com/yourusername)

---

Thank you for using the Employee Management System!
