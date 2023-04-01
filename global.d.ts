declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'production' | 'development';
    OPENAI_SECRET_KEY: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    DATABASE_URL: string;
  }
}
