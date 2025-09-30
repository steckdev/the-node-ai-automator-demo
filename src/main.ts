import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

const PORT_DEFAULT = 3000;

const openApiSpec = {
  openapi: '3.0.0',
  info: {
    title: 'NY Node AI Presentation API',
    description: 'Demo API for AI-Accelerated Node.js Development presentation',
    version: '1.0.0',
  },
  paths: {},
} as const;

export function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  // Swagger UI mounted at /api
  app.use('/api', swaggerUi.serve, swaggerUi.setup(openApiSpec as any));
  return app;
}

async function bootstrap() {
  const app = createApp();
  const port = Number(process.env.PORT) || PORT_DEFAULT;
  app.listen(port, () => {
    console.log(`🚀 Application is running on: http://localhost:${port}`);
    console.log(`📚 API docs: http://localhost:${port}/api`);
  });
}

if (require.main === module) {
  // Only start server when running as entrypoint, not when imported in tests
  bootstrap();
}
