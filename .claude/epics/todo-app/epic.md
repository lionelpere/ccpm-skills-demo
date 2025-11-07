# Epic: Todo List Application - Spring Boot + React

**prd:** .claude/projects/todo-app.md
**created:** 2025-11-07
**status:** planning
**type:** full-stack-feature

---

## Executive Summary

Implement a full-stack Todo list application demonstrating modern web development practices. The system consists of a Spring Boot REST API backend with PostgreSQL database and a React TypeScript frontend with Tailwind CSS styling.

**Key Deliverables:**
- Secure REST API with JWT authentication
- CRUD operations for tasks with user isolation
- Responsive React frontend
- Production-ready deployment configuration

**Estimated Effort:** 40-48 hours
**Parallelization Potential:** High (backend + frontend can progress simultaneously)

---

## Technical Approach

### Architecture Decision Summary

**1. Backend Framework: Spring Boot 3.2**
- **Why:** Industry standard, excellent security, built-in features for auth, validation, data access
- **Alternatives Considered:** Express.js (rejected - requirement specifies Spring Boot)
- **Risk:** None - mature technology

**2. Database: PostgreSQL**
- **Why:** Robust ACID compliance, excellent Spring Boot integration, production-ready
- **Alternatives Considered:** H2 (rejected - not production suitable), MySQL (comparable, chose PostgreSQL for JSON support future extensibility)
- **Risk:** Low - well-supported

**3. Authentication: Spring Security + JWT**
- **Why:** Industry standard, secure by default, integrates seamlessly with Spring Boot
- **Pattern:** JWT tokens with BCrypt password hashing
- **Risk:** Medium - requires careful configuration to avoid vulnerabilities

**4. Frontend Framework: React 18 + TypeScript**
- **Why:** Component-based, type safety, large ecosystem, requirement specified
- **State Management:** Context API (sufficient for this scope, can upgrade to Redux if needed)
- **Styling:** Tailwind CSS for rapid development
- **Risk:** Low - standard stack

**5. Build Tools**
- Backend: Maven (Spring Boot standard)
- Frontend: Vite (faster than CRA, modern tooling)

### Codebase Structure Analysis

**New Project - Directory Structure:**

```
todo-app/
├── backend/                         # Spring Boot application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/todoapp/
│   │   │   │   ├── TodoAppApplication.java
│   │   │   │   ├── config/
│   │   │   │   │   ├── SecurityConfig.java
│   │   │   │   │   ├── CorsConfig.java
│   │   │   │   │   └── JwtConfig.java
│   │   │   │   ├── controller/
│   │   │   │   │   ├── AuthController.java
│   │   │   │   │   └── TaskController.java
│   │   │   │   ├── service/
│   │   │   │   │   ├── AuthService.java
│   │   │   │   │   ├── TaskService.java
│   │   │   │   │   └── JwtService.java
│   │   │   │   ├── repository/
│   │   │   │   │   ├── UserRepository.java
│   │   │   │   │   └── TaskRepository.java
│   │   │   │   ├── model/
│   │   │   │   │   ├── User.java
│   │   │   │   │   └── Task.java
│   │   │   │   ├── dto/
│   │   │   │   │   ├── LoginRequest.java
│   │   │   │   │   ├── RegisterRequest.java
│   │   │   │   │   ├── TaskRequest.java
│   │   │   │   │   ├── TaskResponse.java
│   │   │   │   │   └── ApiResponse.java
│   │   │   │   ├── security/
│   │   │   │   │   ├── JwtAuthenticationFilter.java
│   │   │   │   │   └── JwtAuthenticationEntryPoint.java
│   │   │   │   └── exception/
│   │   │   │       ├── GlobalExceptionHandler.java
│   │   │   │       └── ResourceNotFoundException.java
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── application-prod.properties
│   │   └── test/
│   │       └── java/com/todoapp/
│   │           ├── controller/
│   │           ├── service/
│   │           └── repository/
│   ├── pom.xml
│   └── README.md
│
├── frontend/                        # React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   └── RegisterForm.tsx
│   │   │   ├── tasks/
│   │   │   │   ├── TaskList.tsx
│   │   │   │   ├── TaskItem.tsx
│   │   │   │   ├── TaskForm.tsx
│   │   │   │   └── TaskFilter.tsx
│   │   │   └── common/
│   │   │       ├── Button.tsx
│   │   │       ├── Input.tsx
│   │   │       └── LoadingSpinner.tsx
│   │   ├── pages/
│   │   │   ├── HomePage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   └── NotFoundPage.tsx
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   ├── useTasks.ts
│   │   │   └── useApi.ts
│   │   ├── context/
│   │   │   └── AuthContext.tsx
│   │   ├── services/
│   │   │   ├── api.ts
│   │   │   ├── authService.ts
│   │   │   └── taskService.ts
│   │   ├── types/
│   │   │   ├── Task.ts
│   │   │   └── User.ts
│   │   ├── utils/
│   │   │   └── validation.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── public/
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── README.md
│
├── docker-compose.yml               # Local PostgreSQL
├── .env.example                     # Environment template
└── README.md                        # Root documentation
```

---

## Implementation Plan

### Dependencies & Prerequisites

**Backend Dependencies (pom.xml):**
- spring-boot-starter-web
- spring-boot-starter-data-jpa
- spring-boot-starter-security
- spring-boot-starter-validation
- postgresql
- jjwt-api, jjwt-impl, jjwt-jackson (JWT)
- lombok
- spring-boot-starter-test

**Frontend Dependencies (package.json):**
- react, react-dom
- react-router-dom
- axios
- @types/react, @types/react-dom
- typescript
- tailwindcss
- vite

**Infrastructure:**
- PostgreSQL 15+
- Java 17
- Node.js 18+

### Task Breakdown & Parallelization Strategy

**Work Streams Identified:**
1. **Database & Backend Core** (Sequential)
2. **Authentication System** (Sequential with #1)
3. **Task CRUD API** (Parallel with #4 after #2)
4. **Frontend Core & Auth UI** (Parallel with #3 after setup)
5. **Task Management UI** (Depends on #3 and #4)
6. **Testing & Integration** (Final)

**Dependency Graph:**
```
Setup (001) → DB Setup (002)
                ↓
            Auth Backend (003) → Task API (004)
                ↓                      ↓
            Frontend Setup (005)       ↓
                ↓                      ↓
            Auth UI (006) ←────────────┤
                ↓                      ↓
            Task UI (007) ←────────────┘
                ↓
            Tests (008, 009)
                ↓
            Deployment (010)
```

**Parallel Execution Opportunities:**
- Tasks 004 (Task API) and 006 (Auth UI) can run simultaneously
- Tasks 008 (Backend tests) and 009 (Frontend tests) can run simultaneously

---

## Tasks

### 001: Project Setup & Infrastructure

**Title:** Initialize project structure and development environment

**Description:**
Create the foundational project structure with backend Spring Boot application, frontend React application, and local development infrastructure.

**Acceptance Criteria:**
- [ ] Backend: Spring Boot project initialized with Maven
- [ ] Backend: Base package structure created
- [ ] Frontend: Vite + React + TypeScript project initialized
- [ ] PostgreSQL running via Docker Compose
- [ ] Environment variables configured (.env.example files)
- [ ] Both projects run successfully (empty but functional)
- [ ] README with setup instructions

**Estimated Time:** 2-3 hours
**Dependencies:** None
**Parallel-Safe:** No (foundation)

**Technical Notes:**
- Use Spring Initializr for backend
- Use `npm create vite@latest` for frontend
- Docker Compose for PostgreSQL:
  ```yaml
  services:
    postgres:
      image: postgres:15
      environment:
        POSTGRES_DB: todoapp
        POSTGRES_USER: todouser
        POSTGRES_PASSWORD: todopass
      ports:
        - "5432:5432"
  ```

---

### 002: Database Schema & Models

**Title:** Implement database schema and JPA entities

**Description:**
Create the database schema for users and tasks tables with proper relationships and constraints. Implement corresponding JPA entity classes.

**Acceptance Criteria:**
- [ ] User entity with id, email, passwordHash, createdAt
- [ ] Task entity with id, userId, title, description, completed, createdAt, updatedAt
- [ ] JPA repositories for User and Task
- [ ] Database indexes on user_id and completed
- [ ] Foreign key constraint with CASCADE delete
- [ ] Entities validated (unique email, not null constraints)
- [ ] Application connects to PostgreSQL successfully

**Estimated Time:** 2-3 hours
**Dependencies:** 001
**Parallel-Safe:** No

**Technical Notes:**
- Use @Entity, @Table, @Id, @GeneratedValue
- @OneToMany relationship from User to Tasks
- @PreUpdate for updatedAt timestamp
- Lombok @Data, @Entity annotations

---

### 003: Authentication System (Backend)

**Title:** Implement Spring Security with JWT authentication

**Description:**
Build complete authentication system including user registration, login, JWT token generation/validation, and Spring Security configuration.

**Acceptance Criteria:**
- [ ] SecurityConfig with JWT filter chain
- [ ] JwtService for token generation and validation
- [ ] AuthService with register and login methods
- [ ] Password hashing with BCrypt (cost 12)
- [ ] AuthController with /api/auth/register and /api/auth/login endpoints
- [ ] DTO classes: LoginRequest, RegisterRequest, AuthResponse
- [ ] Email validation (format check)
- [ ] Password strength validation (min 8 chars, 1 uppercase, 1 number)
- [ ] JWT tokens expire after 24 hours
- [ ] Global exception handling for auth errors
- [ ] Security: CSRF disabled for stateless API, CORS configured

**Estimated Time:** 6-8 hours
**Dependencies:** 002
**Parallel-Safe:** No

**Technical Notes:**
- JWT secret from environment variable
- Use @ControllerAdvice for exception handling
- Return consistent ApiResponse format
- Test with Postman/curl before frontend integration

---

### 004: Task CRUD API (Backend)

**Title:** Implement RESTful API for task operations

**Description:**
Create complete CRUD API for tasks with user isolation, validation, and error handling.

**Acceptance Criteria:**
- [ ] TaskController with all CRUD endpoints:
  - GET /api/tasks (list user's tasks)
  - POST /api/tasks (create task)
  - GET /api/tasks/{id} (get specific task)
  - PUT /api/tasks/{id} (update task)
  - DELETE /api/tasks/{id} (delete task)
  - PATCH /api/tasks/{id}/toggle (toggle completion)
- [ ] TaskService with business logic
- [ ] User isolation enforced (users only see/modify their tasks)
- [ ] Input validation (title required, length limits)
- [ ] DTO classes: TaskRequest, TaskResponse
- [ ] Proper HTTP status codes (200, 201, 204, 404, 400)
- [ ] Error handling for not found, unauthorized
- [ ] Pagination support for task list (optional but recommended)

**Estimated Time:** 4-6 hours
**Dependencies:** 003
**Parallel-Safe:** YES (can develop while Auth UI being built)

**Technical Notes:**
- Extract user ID from JWT token in controller
- Use @PreAuthorize if needed
- Return 404 if task not found or belongs to different user
- Consider soft delete vs hard delete (hard delete for v1)

---

### 005: Frontend Project Setup

**Title:** Initialize React app with routing and authentication context

**Description:**
Set up frontend application structure, routing, authentication context, and API client configuration.

**Acceptance Criteria:**
- [ ] React Router configured with routes:
  - / (home/dashboard - protected)
  - /login
  - /register
  - /404
- [ ] AuthContext providing authentication state
- [ ] ProtectedRoute component for auth-required routes
- [ ] Axios client configured with base URL and interceptors
- [ ] Token storage in localStorage
- [ ] Auto-attach JWT token to requests
- [ ] Redirect to login on 401 responses
- [ ] Tailwind CSS installed and configured
- [ ] Basic layout component

**Estimated Time:** 3-4 hours
**Dependencies:** 001
**Parallel-Safe:** YES (can develop while backend Auth being built)

**Technical Notes:**
- Environment variable for API URL (VITE_API_BASE_URL)
- Axios request interceptor adds Authorization header
- Axios response interceptor handles 401
- Token refresh logic placeholder (implement if time allows)

---

### 006: Authentication UI (Frontend)

**Title:** Build login and registration pages

**Description:**
Create user-friendly authentication forms with validation, error handling, and integration with backend auth API.

**Acceptance Criteria:**
- [ ] LoginPage with email/password form
- [ ] RegisterPage with email/password/confirm password
- [ ] Client-side validation (email format, password strength)
- [ ] Error messages displayed for API failures
- [ ] Loading states during API calls
- [ ] Success: redirect to home page and store token
- [ ] Form components reusable (Input, Button)
- [ ] Responsive design (mobile-friendly)
- [ ] Password visibility toggle
- [ ] Link between login/register pages

**Estimated Time:** 4-5 hours
**Dependencies:** 003, 005
**Parallel-Safe:** YES (parallel with Task API development)

**Technical Notes:**
- Use controlled components for forms
- useAuth hook from AuthContext
- authService calls API endpoints
- Show validation errors inline
- Consider react-hook-form if time allows (or manual for simplicity)

---

### 007: Task Management UI (Frontend)

**Title:** Build task list, creation, and management interface

**Description:**
Create the main task management interface with list view, add form, inline editing, and completion toggling.

**Acceptance Criteria:**
- [ ] TaskList component displaying all tasks
- [ ] TaskItem component with:
  - Checkbox for completion toggle
  - Title and description display
  - Edit and delete buttons
  - Visual distinction for completed tasks
- [ ] TaskForm for creating new tasks
- [ ] Inline editing for task updates
- [ ] Delete confirmation dialog
- [ ] Empty state when no tasks exist
- [ ] Loading state while fetching tasks
- [ ] Error handling for failed operations
- [ ] Optimistic UI updates
- [ ] Responsive layout

**Estimated Time:** 6-8 hours
**Dependencies:** 004, 005
**Parallel-Safe:** Partial (depends on Task API)

**Technical Notes:**
- useTasks hook for data fetching and mutations
- taskService for API calls
- Consider SWR or React Query for caching (or manual fetch for simplicity)
- Update local state optimistically, revert on error
- Tailwind for styling (cards, buttons, forms)

---

### 008: Backend Testing

**Title:** Write comprehensive tests for backend

**Description:**
Create unit and integration tests for services, repositories, and controllers to achieve >80% code coverage.

**Acceptance Criteria:**
- [ ] Unit tests for AuthService (register, login, validation)
- [ ] Unit tests for TaskService (CRUD operations, user isolation)
- [ ] Unit tests for JwtService (token generation, validation)
- [ ] Integration tests for AuthController endpoints
- [ ] Integration tests for TaskController endpoints
- [ ] Repository tests for User and Task
- [ ] Test coverage > 80%
- [ ] All tests pass
- [ ] Test database configuration (H2 in-memory or Testcontainers)

**Estimated Time:** 5-6 hours
**Dependencies:** 003, 004
**Parallel-Safe:** YES (parallel with Frontend tests)

**Technical Notes:**
- Use @WebMvcTest for controller tests
- Use @DataJpaTest for repository tests
- Use @SpringBootTest for integration tests
- MockMvc for HTTP testing
- Mockito for mocking dependencies
- AssertJ for fluent assertions

---

### 009: Frontend Testing

**Title:** Write tests for critical frontend paths

**Description:**
Create unit and integration tests for components and hooks to achieve >70% code coverage.

**Acceptance Criteria:**
- [ ] Tests for AuthContext and useAuth hook
- [ ] Tests for useTasks hook
- [ ] Component tests for LoginForm
- [ ] Component tests for RegisterForm
- [ ] Component tests for TaskList and TaskItem
- [ ] Component tests for TaskForm
- [ ] Integration test: full auth flow
- [ ] Integration test: task CRUD flow
- [ ] Test coverage > 70%
- [ ] All tests pass

**Estimated Time:** 4-5 hours
**Dependencies:** 006, 007
**Parallel-Safe:** YES (parallel with Backend tests)

**Technical Notes:**
- Use Vitest (comes with Vite)
- Use React Testing Library
- Mock axios for API calls
- Mock AuthContext for component tests
- userEvent for interaction testing

---

### 010: Deployment & Documentation

**Title:** Production deployment and final documentation

**Description:**
Configure production build, create deployment documentation, and prepare application for production use.

**Acceptance Criteria:**
- [ ] Backend: application-prod.properties configured
- [ ] Frontend: production build optimized
- [ ] Environment variables documented
- [ ] Docker configuration (optional)
- [ ] Deployment guide in README
- [ ] API documentation (Swagger/Postman collection)
- [ ] HTTPS configuration notes
- [ ] Database migration strategy documented
- [ ] Monitoring/logging recommendations

**Estimated Time:** 3-4 hours
**Dependencies:** 008, 009
**Parallel-Safe:** No (final step)

**Technical Notes:**
- Frontend: npm run build → dist/
- Backend: mvn clean package → target/*.jar
- Document environment variables
- Security checklist (JWT secret, CORS, HTTPS)
- Consider adding Swagger with springdoc-openapi

---

## Quality Assurance Checklist

### Security Review
- [ ] Passwords hashed with BCrypt
- [ ] JWT secret is strong and environment-based
- [ ] SQL injection protection (JPA handles this)
- [ ] XSS protection (React handles this)
- [ ] CORS properly configured
- [ ] Authentication required on all task endpoints
- [ ] User isolation enforced
- [ ] Input validation on all endpoints
- [ ] Error messages don't leak sensitive info

### Performance Review
- [ ] Database indexes on user_id and completed columns
- [ ] N+1 query problems avoided
- [ ] Pagination implemented for task list
- [ ] Frontend bundle size optimized
- [ ] Images optimized (if any added)
- [ ] API response time < 200ms for CRUD

### Usability Review
- [ ] Responsive on mobile, tablet, desktop
- [ ] Loading states for all async operations
- [ ] Error messages are user-friendly
- [ ] Form validation provides helpful feedback
- [ ] Empty states are informative
- [ ] Success feedback for actions
- [ ] Keyboard navigation works
- [ ] Basic accessibility (alt text, labels)

---

## Success Criteria

**Must Have (Blocker):**
- ✅ Users can register and login
- ✅ Users can create, read, update, delete tasks
- ✅ Users can toggle task completion
- ✅ User isolation enforced (can't see other users' tasks)
- ✅ Security: Passwords hashed, JWT auth works
- ✅ Responsive UI works on mobile and desktop
- ✅ Test coverage: Backend >80%, Frontend >70%

**Should Have (Important):**
- ✅ Loading and error states handled gracefully
- ✅ Input validation with helpful messages
- ✅ Delete confirmation
- ✅ Clean, professional UI
- ✅ Documentation complete

**Nice to Have (Optional):**
- ⚠️ Token refresh mechanism
- ⚠️ Remember me functionality
- ⚠️ Pagination for large task lists
- ⚠️ Docker compose for full stack
- ⚠️ Swagger documentation

---

## Risk Mitigation

**Risk: JWT Security Misconfiguration**
- Mitigation: Use Spring Security defaults, review configuration, test with invalid tokens

**Risk: CORS Issues in Production**
- Mitigation: Test cross-origin requests early, document CORS config

**Risk: Scope Creep**
- Mitigation: Strict adherence to this epic, defer nice-to-haves

**Risk: Testing Takes Longer Than Expected**
- Mitigation: Focus on critical paths first, achieve minimum coverage early

---

## Definition of Done

A task is considered DONE when:
1. Code is written and functional
2. Code follows language best practices
3. Tests written and passing
4. No critical security vulnerabilities
5. Peer reviewed (or self-reviewed if solo)
6. Integrated with other components
7. Documentation updated

The epic is considered DONE when:
1. All 10 tasks completed
2. All acceptance criteria met
3. Test coverage targets achieved
4. Security checklist passed
5. Application deployed and accessible
6. README and docs complete

---

**Next Step:** Decompose this epic into individual task files (001.md - 010.md) and sync to GitHub.

---

## GitHub Issues

**Epic:** https://github.com/lionelpere/ccpm-skills-demo/issues/1

**Tasks:**
- #2: Project Setup & Infrastructure
- #3: Database Schema & JPA Models
- #4: Authentication System (Backend)
- #5: Task CRUD API (Backend) - ✅ Parallel-safe
- #6: Frontend Project Setup - ✅ Parallel-safe
- #7: Authentication UI (Frontend) - ✅ Parallel-safe
- #8: Task Management UI (Frontend)
- #9: Backend Testing - ✅ Parallel-safe
- #10: Frontend Testing - ✅ Parallel-safe
- #11: Deployment & Documentation

**Parallel Execution Waves:**
- Wave 1: #2 → #3 → #4 (Sequential foundation)
- Wave 2: #5 (Backend) + #6 (Frontend) in parallel
- Wave 3: #7 (Frontend Auth UI) + #8 (Task UI)
- Wave 4: #9 (Backend Tests) + #10 (Frontend Tests) in parallel
- Wave 5: #11 (Deployment)
