export default () => ({
  ENV: process.env.NODE_ENV,
  PORT: Number(process.env.PORT) || 3000,
});
