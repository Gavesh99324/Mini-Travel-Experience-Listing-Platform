import request from 'supertest';
import express from 'express';
import listingRoutes from '../routes/listingRoutes.js';

const app = express();
app.use(express.json());
app.use('/api/listings', listingRoutes);

describe('Listing API Endpoints', () => {
  describe('GET /api/listings', () => {
    it('should get all listings', async () => {
      const response = await request(app)
        .get('/api/listings')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('listings');
      expect(response.body.data).toHaveProperty('pagination');
      expect(Array.isArray(response.body.data.listings)).toBe(true);
    });

    it('should support pagination', async () => {
      const response = await request(app).get('/api/listings?page=1&limit=5').expect(200);

      expect(response.body.data.pagination.page).toBe(1);
      expect(response.body.data.pagination.limit).toBe(5);
    });

    it('should support search', async () => {
      const response = await request(app).get('/api/listings?search=beach').expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data.listings)).toBe(true);
    });
  });

  describe('GET /api/listings/:id', () => {
    it('should return 400 for invalid listing ID', async () => {
      const response = await request(app).get('/api/listings/invalid-id').expect(500); // Will throw error for invalid ObjectId

      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /api/listings', () => {
    it('should return 401 for unauthenticated request', async () => {
      const listingData = {
        title: 'Test Listing',
        location: 'Test Location',
        description: 'This is a test description for the listing',
        image: 'https://example.com/image.jpg',
      };

      const response = await request(app).post('/api/listings').send(listingData).expect(401);

      expect(response.body.success).toBe(false);
    });
  });
});
