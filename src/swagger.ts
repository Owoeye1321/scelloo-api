import path from 'path'
const routesPath = path.resolve(__dirname, './routes/*.ts')
export const swaggerOptions = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Scelloo API with Swagger',
      version: '0.1.0',
      description: 'This is Scelloo-api project documented with Swagger',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html'
      },
      contact: {
        name: 'Owoeye Samuel',
        url: '#',
        email: 'owoeye1321@email.com'
      }
    },
    servers: [
      {
        url: process.env.API_URL
      }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT' // Indicate it's a JWT token
        }
      }
    }
    // security: [
    //   {
    //     BearerAuth: [] as string[]
    //   }
    // ]
  },
  apis: [routesPath]
}
