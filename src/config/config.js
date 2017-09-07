import def from './default';
import prod from './prod';

function getConfig(env) {
  let conf;
  switch (env) {
    case 'development':
      conf = def;
      break;
    case 'production':
      conf = prod;
      break;
    default:
      conf =  {};
      break;
  }
  return conf;
}

export default getConfig(process.env.NODE_ENV);
