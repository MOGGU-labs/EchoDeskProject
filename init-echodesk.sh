#!/bin/bash

set -e  # Exit on error

echo "Starting EchoDesk full project initialization..."

# Root folder
ROOT_DIR=$(pwd)

# --- Backend setup ---

echo "Creating backend folder..."
mkdir -p backend
cd backend

echo "Initializing npm for backend..."
npm init -y

echo "Installing backend dependencies..."
npm install express@5 cors dotenv helmet jsonwebtoken prisma @prisma/client bcrypt zod mysql2

echo "Installing backend dev dependencies..."
npm install -D typescript ts-node nodemon @types/node @types/express @types/cors @types/jsonwebtoken @types/bcrypt jest @types/jest ts-jest supertest @types/supertest

echo "Initializing Prisma..."
npx prisma init

echo "Creating backend tsconfig.json..."
cat > tsconfig.json <<EOL
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
EOL

echo "Creating backend nodemon.json..."
cat > nodemon.json <<EOL
{
  "watch": ["src"],
  "ext": "ts",
  "exec": "ts-node ./src/index.ts"
}
EOL

echo "Creating backend folder structure..."
mkdir -p src
cat > src/index.ts <<EOL
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from EchoDesk backend!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(\`Server running on port \${port}\`);
});
EOL

echo "Creating .env.example for backend..."
cat > .env.example <<EOL
DATABASE_URL="mysql://user:password@localhost:3306/echodesk"
JWT_SECRET="your_jwt_secret"
EOL

cd $ROOT_DIR

# --- Frontend setup ---

echo "Creating frontend folder..."
mkdir -p frontend
cd frontend

echo "Creating React app with Vite (TypeScript template)..."
npm create vite@latest . -- --template react-ts

echo "Installing frontend dependencies..."
npm install react-router-dom
npm install -D @types/react-router-dom @testing-library/react @testing-library/jest-dom @testing-library/user-event

echo "Creating frontend .env.example..."
cat > .env.example <<EOL
VITE_API_URL=http://localhost:3000/api
EOL

cd $ROOT_DIR

# --- Git setup ---

echo "Creating .gitignore..."
cat > .gitignore <<EOL
# Node
node_modules
dist
.env
.env.local
.env.*.local

# Logs
logs
*.log
npm-debug.log*

# OS
.DS_Store

# Vite
frontend/node_modules
frontend/dist

# Prisma
backend/node_modules
backend/prisma/generated
EOL

echo "Project initialization complete!"
