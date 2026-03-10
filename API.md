## API Documentation

### Base URL

```
http://localhost:5000/api
```

### Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

---

## Endpoints

### Authentication

#### Register User

```http
POST /auth/register
```

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201):**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "64f8a1b2c3d4e5f6g7h8i9j0",
      "name": "John Doe",
      "email": "john@example.com",
      "avatar": "https://ui-avatars.com/api/?background=6366f1&color=fff&name=John+Doe"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Login User

```http
POST /auth/login
```

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "64f8a1b2c3d4e5f6g7h8i9j0",
      "name": "John Doe",
      "email": "john@example.com",
      "avatar": "https://ui-avatars.com/api/?background=6366f1&color=fff&name=John+Doe"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Get Current User

```http
GET /auth/me
Authorization: Bearer <token>
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "64f8a1b2c3d4e5f6g7h8i9j0",
      "name": "John Doe",
      "email": "john@example.com",
      "avatar": "https://ui-avatars.com/api/?background=6366f1&color=fff&name=John+Doe",
      "savedListings": ["listing_id_1", "listing_id_2"]
    }
  }
}
```

---

### Listings

#### Get All Listings

```http
GET /listings?page=1&limit=9&search=bali
```

**Query Parameters:**

- `page` (optional, default: 1): Page number
- `limit` (optional, default: 9): Items per page
- `search` (optional): Search term for title, location, or description

**Response (200):**

```json
{
  "success": true,
  "data": {
    "listings": [
      {
        "_id": "64f8a1b2c3d4e5f6g7h8i9j0",
        "title": "Sunset Boat Tour",
        "location": "Bali, Indonesia",
        "description": "Enjoy a beautiful sunset while sailing along the coastline.",
        "price": 45,
        "image": "https://example.com/image.jpg",
        "creator": {
          "_id": "creator_id",
          "name": "John Doe",
          "email": "john@example.com",
          "avatar": "https://ui-avatars.com/api/?background=6366f1&color=fff&name=John+Doe"
        },
        "likes": ["user_id_1", "user_id_2"],
        "likesCount": 2,
        "createdAt": "2024-01-15T10:30:00.000Z",
        "updatedAt": "2024-01-15T10:30:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 9,
      "total": 25,
      "pages": 3
    }
  }
}
```

#### Get Single Listing

```http
GET /listings/:id
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "listing": {
      "_id": "64f8a1b2c3d4e5f6g7h8i9j0",
      "title": "Sunset Boat Tour",
      "location": "Bali, Indonesia",
      "description": "Enjoy a beautiful sunset while sailing along the coastline.",
      "price": 45,
      "image": "https://example.com/image.jpg",
      "creator": {
        "_id": "creator_id",
        "name": "John Doe",
        "email": "john@example.com",
        "avatar": "https://ui-avatars.com/api/?background=6366f1&color=fff&name=John+Doe"
      },
      "likes": ["user_id_1", "user_id_2"],
      "likesCount": 2,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

#### Create Listing

```http
POST /listings
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "title": "Sunset Boat Tour",
  "location": "Bali, Indonesia",
  "description": "Enjoy a beautiful sunset while sailing along the coastline.",
  "price": 45,
  "image": "https://example.com/image.jpg"
}
```

**Response (201):**

```json
{
  "success": true,
  "data": {
    "listing": {
      "_id": "64f8a1b2c3d4e5f6g7h8i9j0",
      "title": "Sunset Boat Tour",
      "location": "Bali, Indonesia",
      "description": "Enjoy a beautiful sunset while sailing along the coastline.",
      "price": 45,
      "image": "https://example.com/image.jpg",
      "creator": {
        "_id": "creator_id",
        "name": "John Doe",
        "email": "john@example.com",
        "avatar": "https://ui-avatars.com/api/?background=6366f1&color=fff&name=John+Doe"
      },
      "likes": [],
      "likesCount": 0,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

#### Update Listing

```http
PUT /listings/:id
Authorization: Bearer <token>
```

**Request Body:** (Same as Create Listing)

**Response (200):**

```json
{
  "success": true,
  "data": {
    "listing": {
      /* updated listing object */
    }
  }
}
```

#### Delete Listing

```http
DELETE /listings/:id
Authorization: Bearer <token>
```

**Response (200):**

```json
{
  "success": true,
  "message": "Listing deleted successfully"
}
```

#### Like/Unlike Listing

```http
POST /listings/:id/like
Authorization: Bearer <token>
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "isLiked": true,
    "likesCount": 5
  }
}
```

#### Save/Unsave Listing

```http
POST /listings/:id/save
Authorization: Bearer <token>
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "isSaved": true
  }
}
```

#### Upload Image

```http
POST /listings/upload/image
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:**

- `image`: File (max 5MB, images only)

**Response (200):**

```json
{
  "success": true,
  "data": {
    "imageUrl": "/uploads/listing-1705315800000-123456789.jpg"
  }
}
```

---

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error message description"
}
```

### Common Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (not logged in or invalid token)
- `403` - Forbidden (not authorized to perform action)
- `404` - Not Found
- `500` - Internal Server Error

---

## Example Usage (JavaScript/Axios)

### Login and Create Listing

```javascript
import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Login
const login = async () => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email: "john@example.com",
    password: "password123",
  });

  const token = response.data.data.token;
  localStorage.setItem("token", token);
  return token;
};

// Create Listing
const createListing = async (token) => {
  const response = await axios.post(
    `${API_URL}/listings`,
    {
      title: "Sunset Boat Tour",
      location: "Bali, Indonesia",
      description: "Beautiful sunset sailing experience",
      price: 45,
      image: "https://example.com/image.jpg",
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data.data.listing;
};

// Usage
const token = await login();
const listing = await createListing(token);
console.log(listing);
```

### Search and Filter Listings

```javascript
// Search for "bali" experiences, page 1, 9 per page
const searchListings = async (search = "", page = 1, limit = 9) => {
  const response = await axios.get(`${API_URL}/listings`, {
    params: { search, page, limit },
  });

  return response.data.data;
};

// Usage
const results = await searchListings("bali", 1, 9);
console.log(results.listings);
console.log(results.pagination);
```

---

## Rate Limiting

Currently no rate limiting is implemented. In production, consider:

- 100 requests per 15 minutes per IP for auth endpoints
- 1000 requests per 15 minutes per IP for listing endpoints

---

## CORS Configuration

The API accepts requests from:

- `http://localhost:3000` (development)

In production, update `CLIENT_URL` in `.env` to your frontend domain.
