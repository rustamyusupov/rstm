import main from './main.js';

const controllers = [main];

export default app => controllers.forEach(f => f(app));
