export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TravelXP API',
      version: '1.0.0',
      description: 'Travel Experience Listing Platform - RESTful API Documentation',
      contact: {
        name: 'API Support',
        email: 'support@travelxp.com',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
      {
        url: 'https://api.travelxp.com',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', format: 'email', example: 'john@example.com' },
            avatar: { type: 'string', example: 'https://ui-avatars.com/api/?name=John+Doe' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Listing: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            title: { type: 'string', example: 'Sunset Beach Yoga' },
            location: { type: 'string', example: 'Bali, Indonesia' },
            description: {
              type: 'string',
              example: 'Experience tranquility with sunset yoga on the beach',
            },
            price: { type: 'number', example: 45.99 },
            image: { type: 'string', example: 'https://example.com/image.jpg' },
            creator: { $ref: '#/components/schemas/User' },
            likes: { type: 'array', items: { type: 'string' } },
            likesCount: { type: 'number', example: 12 },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Error message' },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to API routes with JSDoc comments
};
