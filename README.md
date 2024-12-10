## Installation Guidelines

### Prerequisites
- Node.js (v16 or higher)
- npm/yarn
- MongoDB (local or Atlas URI)

### Installation Steps

1. Clone the repository
```bash
git clone [repository-url]
```

2. Install dependencies and run project
```bash
# Frontend dependencies
cd [repository]
npm install
npm run dev
```

3. Set up environment variables:
Create `.env` files in both frontend and backend directories:

Frontend `.env`:
```env
DB_URL=mongodb-url
JWT_ACCESS_SECRET=your_jwt_secret
JWT_ACCESS_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your_jwt_secret
JWT_REFRESH_EXPIRES_IN=1y
BCRYPT_SALT_ROUNDS=your_rounds
PORT=5000
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PAYMENT_URL=https://sandbox.aamarpay.com/jsonpost.php
STORE_ID=your_store_id
SIGNETURE_KEY=your_signeture_key
PAYMENT_VERIFY_URL=https://sandbox.aamarpay.com/api/v1/trxcheck/request.php
BASE_URL =http://localhost:5000
```

4. Access the application at `http://localhost:5000`