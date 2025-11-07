# Todo List Application

Full-stack todo list application built with Spring Boot and React.

## Tech Stack

**Backend:**
- Java 17
- Spring Boot 3.2
- Spring Security (JWT Authentication)
- Spring Data JPA
- H2 Database (in-memory)
- Maven

**Frontend:**
- React 18
- TypeScript
- Vite
- React Router
- Axios
- Tailwind CSS

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- Node.js 18+
- npm 9+

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd todo-app
```

### 2. Backend Setup

```bash
# Navigate to project root (where pom.xml is)
cd todo-app

# Install dependencies and run
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
mvn clean install
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

**H2 Console:** Access at `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:todoapp`
- Username: `sa`
- Password: (leave empty)

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

The frontend will start on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Tasks
- `GET /api/tasks` - Get all tasks (auth required)
- `POST /api/tasks` - Create task (auth required)
- `GET /api/tasks/{id}` - Get specific task (auth required)
- `PUT /api/tasks/{id}` - Update task (auth required)
- `DELETE /api/tasks/{id}` - Delete task (auth required)
- `PATCH /api/tasks/{id}/toggle` - Toggle completion (auth required)

## Project Structure

```
todo-app/
├── src/                          # Backend source
│   ├── main/
│   │   ├── java/com/todoapp/
│   │   │   ├── config/          # Security, CORS configuration
│   │   │   ├── controller/      # REST controllers
│   │   │   ├── service/         # Business logic
│   │   │   ├── repository/      # Data access
│   │   │   ├── model/           # JPA entities
│   │   │   ├── dto/             # Data transfer objects
│   │   │   ├── security/        # JWT filters
│   │   │   └── exception/       # Error handling
│   │   └── resources/
│   │       └── application.properties
│   └── test/                    # Backend tests
├── frontend/                    # Frontend application
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── pages/              # Page components
│   │   ├── services/           # API services
│   │   ├── context/            # React context
│   │   └── App.tsx
│   ├── .env                    # Environment variables
│   └── package.json
├── pom.xml                     # Maven configuration
└── README.md
```

## Development Notes

- **H2 Database:** In-memory database, data is lost on restart
- **JWT Secret:** Change in production via environment variable
- **CORS:** Configured to allow `http://localhost:5173`
- **Auto DDL:** Database schema auto-created on startup

## Testing

### Backend Tests
```bash
mvn test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## Building for Production

### Backend
```bash
mvn clean package
java -jar target/backend-1.0.0.jar
```

### Frontend
```bash
cd frontend
npm run build
# Serve dist/ folder with your preferred web server
```

## License

MIT

---

Generated via CCPM workflow - [GitHub Issues](https://github.com/lionelpere/ccpm-skills-demo/issues)
