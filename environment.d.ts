export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
        MONGODB_SRV:string,
        SECRET_KEY:string
      ENV: 'test' | 'dev' | 'prod';
    }
  }
}
