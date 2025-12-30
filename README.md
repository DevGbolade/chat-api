# Chatty Backend API

A full-featured social media and real-time chat backend API built with Node.js, Express, TypeScript, and Socket.IO. This API powers a modern social networking platform with features like user authentication, posts, reactions, comments, real-time messaging, notifications, and more.

## What Does This Project Do?

Chatty Backend is a comprehensive REST API and WebSocket server that provides the backend infrastructure for a social media application. It handles:

- **User Management**: Registration, authentication, profile management
- **Social Features**: Posts, reactions (likes), comments, and follower/following relationships
- **Real-time Chat**: One-on-one messaging with Socket.IO
- **Notifications**: Real-time notifications for user interactions
- **Media Management**: Image uploads and storage with Cloudinary integration
- **Email Services**: Email notifications via SendGrid
- **Job Queues**: Background job processing with Bull/BullMQ
- **Monitoring**: API performance monitoring and health checks

## Key Features

### Authentication & User Management
- User registration and login with JWT authentication
- Secure session management with encrypted cookies
- Password reset and email verification
- User profiles with customizable avatars

### Social Networking
- Create, read, update, and delete posts
- React to posts (likes, love, happy, sad, angry, etc.)
- Comment on posts with nested threading support
- Follow/unfollow other users
- View follower and following lists

### Real-time Messaging
- One-on-one chat functionality
- WebSocket-based real-time message delivery
- Message history and conversation lists
- Typing indicators and read receipts

### Notifications
- Real-time notifications for:
  - New followers
  - Post reactions
  - Comments on posts
  - New messages
- Mark notifications as read/unread
- Delete notifications

### Media Management
- Upload profile pictures and post images
- Cloudinary integration for cloud storage
- Image optimization and transformation
- Base64 and URL-based uploads

## Technology Stack

### Core Technologies
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Cache/Session Store**: Redis
- **Real-time**: Socket.IO with Redis adapter

### Security & Middleware
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Security Headers**: Helmet
- **CORS**: Cross-origin resource sharing
- **Session Management**: cookie-session
- **HTTP Parameter Pollution Protection**: hpp
- **Request Compression**: compression

### External Services
- **Email**: SendGrid and Nodemailer
- **Cloud Storage**: Cloudinary
- **Job Queues**: Bull and BullMQ with Redis

### Development Tools
- **Linting**: ESLint with TypeScript support
- **Formatting**: Prettier
- **Testing**: Jest with ts-jest
- **API Monitoring**: swagger-stats
- **Process Management**: PM2
- **Logging**: Bunyan

### Infrastructure
- **Deployment**: AWS (EC2, Load Balancer, Route53, ElastiCache, S3, CodeDeploy)
- **IaC**: Terraform configurations included

## Project Structure

```
src/
├── app.ts                 # Application entry point
├── config.ts              # Configuration management
├── setupServer.ts         # Express server setup
├── setupDatabase.ts       # MongoDB connection setup
├── routes.ts              # Main route configuration
├── features/              # Feature modules
│   ├── auth/             # Authentication & authorization
│   ├── user/             # User management
│   ├── post/             # Post management
│   ├── reactions/        # Post reactions
│   ├── comments/         # Post comments
│   ├── followers/        # Follow/unfollow functionality
│   ├── chat/             # Real-time messaging
│   ├── notifications/    # User notifications
│   └── images/           # Image uploads
├── shared/               # Shared utilities and helpers
└── mocks/                # Test mocks
```

Each feature module typically contains:
- `controllers/` - Request handlers
- `routes/` - Route definitions
- `models/` - Database schemas
- `schemes/` - Validation schemas
- `services/` - Business logic
- `interfaces/` - TypeScript interfaces

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB
- Redis
- Cloudinary account (for image storage)
- SendGrid account (for email services)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd chat-api
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.development.example .env
```

Edit `.env` with your configuration:
```env
DATABASE_URL=mongodb://localhost:27017/chatty_db
JWT_TOKEN=your_jwt_secret
NODE_ENV=development
SECRET_KEY_ONE=your_secret_key_1
SECRET_KEY_TWO=your_secret_key_2
CLIENT_URL=http://localhost:3000
REDIS_HOST=redis://localhost:6379
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_key
CLOUD_API_SECRET=your_cloudinary_secret
SENDGRID_API_KEY=your_sendgrid_key
SENDGRID_SENDER=your_email@example.com
```

4. Build the project:
```bash
npm run build
```

5. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:5080`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server with PM2
- `npm test` - Run tests with coverage
- `npm run lint:check` - Check code for linting errors
- `npm run lint:fix` - Fix linting errors
- `npm run prettier:check` - Check code formatting
- `npm run prettier:fix` - Fix code formatting
- `npm run redis` - Start Redis commander
- `npm run seeds:dev` - Seed database with test data

## API Endpoints

### Authentication
- `POST /api/v1/signup` - Register a new user
- `POST /api/v1/signin` - Login user
- `GET /api/v1/signout` - Logout user

### User Management
- `GET /api/v1/user/all/:page` - Get all users (paginated)
- `GET /api/v1/user/profile` - Get current user profile
- `GET /api/v1/user/profile/:userId` - Get user profile by ID
- `PUT /api/v1/user/profile` - Update user profile

### Posts
- `GET /api/v1/post/all/:page` - Get all posts (paginated)
- `GET /api/v1/post/:postId` - Get single post
- `POST /api/v1/post` - Create a new post
- `PUT /api/v1/post/:postId` - Update post
- `DELETE /api/v1/post/:postId` - Delete post

### Reactions
- `GET /api/v1/post/reactions/:postId` - Get post reactions
- `POST /api/v1/post/reaction` - Add reaction to post
- `DELETE /api/v1/post/reaction/:postId/:reaction` - Remove reaction

### Comments
- `GET /api/v1/post/comments/:postId` - Get post comments
- `POST /api/v1/post/comment` - Add comment to post
- `PUT /api/v1/post/comment/:commentId` - Update comment
- `DELETE /api/v1/post/comment/:postId/:commentId` - Delete comment

### Followers
- `GET /api/v1/user/following` - Get users you follow
- `GET /api/v1/user/followers/:userId` - Get user's followers
- `PUT /api/v1/user/follow/:followerId` - Follow/unfollow user

### Chat
- `GET /api/v1/chat/message/conversation-list` - Get conversation list
- `GET /api/v1/chat/message/user/:receiverId` - Get messages with user
- `POST /api/v1/chat/message` - Send message
- `DELETE /api/v1/chat/message/:messageId` - Delete message

### Notifications
- `GET /api/v1/notifications` - Get all notifications
- `PUT /api/v1/notification/:notificationId` - Mark as read
- `DELETE /api/v1/notification/:notificationId` - Delete notification

### Images
- `GET /api/v1/images/:userId` - Get user images
- `POST /api/v1/images/profile` - Upload profile image
- `POST /api/v1/images/background` - Upload background image
- `DELETE /api/v1/images/:imageId` - Delete image

### Health & Monitoring
- `GET /health` - Health check endpoint
- `GET /env` - Environment information
- `GET /fibo/:num` - Fibonacci calculator (for testing)
- `GET /queues` - Bull Board queue monitoring UI

## WebSocket Events

The application uses Socket.IO for real-time features:

### Chat Events
- `message` - New message received
- `message read` - Message marked as read
- `typing` - User is typing

### Notification Events
- `notification` - New notification received
- `notification read` - Notification marked as read

### Post Events
- `post created` - New post created
- `post updated` - Post updated
- `post deleted` - Post deleted

### User Events
- `user online` - User came online
- `user offline` - User went offline

## Testing

Run the test suite:
```bash
npm test
```

The project uses Jest for testing with coverage reporting. Test files are located alongside the source files with `.test.ts` extension.

## Monitoring

- **API Stats**: Available at `/api-stats` (provided by swagger-stats)
- **Queue Dashboard**: Available at `/queues` (Bull Board)
- **Health Check**: Available at `/health`

## Deployment

The project includes Terraform configurations for AWS deployment:

- VPC and networking setup
- EC2 instances with Auto Scaling Groups
- Application Load Balancer
- ElastiCache for Redis
- Route53 for DNS
- S3 for storage
- CodeDeploy for CI/CD

See the `deployment/` directory for infrastructure as code.

## Security Features

- JWT-based authentication
- Encrypted session cookies
- Password hashing with bcrypt
- HTTP security headers (Helmet)
- CORS protection
- HPP (HTTP Parameter Pollution) protection
- Request validation and sanitization
- Rate limiting via API gateway

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

ISC

## Author

DevGbolade

## Support

For issues, questions, or contributions, please open an issue on GitHub.
