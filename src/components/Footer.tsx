
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                MC
              </div>
              <span className="text-xl font-semibold text-white">Monte Carlo Insight Hub</span>
            </div>
            <p className="text-gray-400 mb-4">
              Uma plataforma dedicada a explorar e explicar o método de Monte Carlo e suas aplicações
              em estatística, finanças, engenharia e ciência.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-medium text-lg mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#explanation" className="text-gray-400 hover:text-primary transition-colors">
                  O que é Monte Carlo
                </a>
              </li>
              <li>
                <a href="#simulator" className="text-gray-400 hover:text-primary transition-colors">
                  Simulador
                </a>
              </li>
              <li>
                <a href="#statistics" className="text-gray-400 hover:text-primary transition-colors">
                  Estatísticas
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-medium text-lg mb-4">Recursos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Bibliografia
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Calculadoras
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Sobre
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Monte Carlo Insight Hub. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
