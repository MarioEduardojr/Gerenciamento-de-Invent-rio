import { ValidadorEntrada } from '../types';

export class Validator {
    static numero: ValidadorEntrada<number> = (valor: unknown): number | null => {
        if (typeof valor === 'string') {
            const numero = Number(valor);
            return !isNaN(numero) ? numero : null;
        }
        return null;
    }

    static numeroPositivo: ValidadorEntrada<number> = (valor: unknown): number | null => {
        const numero = this.numero(valor);
        return numero !== null && numero > 0 ? numero : null;
    }

    static texto: ValidadorEntrada<string> = (valor: unknown): string | null => {
        if (typeof valor === 'string' && valor.trim().length > 0) {
            return valor.trim();
        }
        return null;
    }

    static validarEntradaNumero(mensagem: string, obrigatorio: boolean = true): Promise<number | null> {
        return new Promise((resolve) => {
            const valor = prompt(mensagem);
            
            if (!obrigatorio && !valor) {
                resolve(null);
                return;
            }

            const numero = this.numeroPositivo(valor);
            if (numero === null) {
                console.log('Por favor, insira um número válido maior que zero.');
                resolve(this.validarEntradaNumero(mensagem, obrigatorio));
                return;
            }

            resolve(numero);
        });
    }

    static validarEntradaTexto(mensagem: string, obrigatorio: boolean = true): Promise<string | null> {
        return new Promise((resolve) => {
            const valor = prompt(mensagem);
            
            if (!obrigatorio && !valor) {
                resolve(null);
                return;
            }

            const texto = this.texto(valor);
            if (texto === null) {
                console.log('Por favor, insira um texto válido.');
                resolve(this.validarEntradaTexto(mensagem, obrigatorio));
                return;
            }

            resolve(texto);
        });
    }
} 
