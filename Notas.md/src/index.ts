import { AppDataSource } from './data-source';
import { menuPrincipal } from './menu';

AppDataSource.initialize().then(() => {
  console.log('📦 Banco conectado com sucesso.');
  menuPrincipal();
}).catch((err) => {
  console.error('Erro ao conectar no banco:', err);
});