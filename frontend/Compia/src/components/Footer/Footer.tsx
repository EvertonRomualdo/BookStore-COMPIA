import { 
  Truck, 
  Download, 
  CreditCard, 
  Lock,
  CircleDollarSign, 
  Brain 
} from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full flex flex-col">
      {/* Benefits apresentation*/}
      <div className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          
          <div className="flex flex-col items-center text-center gap-2">
            <Truck className="text-[#6366F1] mb-2" size={28} />
            <h4 className="font-bold text-[#111827] text-sm">Entrega Rápida</h4>
            <p className="text-gray-500 text-xs">Via Correios ou Transportadora</p>
          </div>

          <div className="flex flex-col items-center text-center gap-2">
            <Download className="text-[#6366F1] mb-2" size={28} />
            <h4 className="font-bold text-[#111827] text-sm">E-books Imediatos</h4>
            <p className="text-gray-500 text-xs">Download no ato da compra</p>
          </div>

          <div className="flex flex-col items-center text-center gap-2">
            <CreditCard className="text-[#6366F1] mb-2" size={28} />
            <h4 className="font-bold text-[#111827] text-sm">Pagamento Seguro</h4>
            <p className="text-gray-500 text-xs">PIX, Cartão e Boleto</p>
          </div>

          <div className="flex flex-col items-center text-center gap-2">
            <Lock className="text-[#6366F1] mb-2" size={28} />
            <h4 className="font-bold text-[#111827] text-sm">Privacidade</h4>
            <p className="text-gray-500 text-xs">Seus dados protegidos</p>
          </div>

        </div>
      </div>

      {/*Footer*/}
      <div className="bg-[#1E1B4B] text-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/*Logo and description*/}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 text-white">
              <Brain size={32} className="text-[#6366F1]" />
              <span className="text-2xl font-black tracking-tight">COMPIA</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed pr-4">
              Unindo o rigor técnico e a acessibilidade para formar a nova geração de profissionais de tecnologia.
            </p>
          </div>

          {/* Shop links demostration*/}
          <div>
            <h4 className="text-white font-bold mb-6">Loja</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Todos os Livros</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Lançamentos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">E-books e Kits</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Meus Pedidos</a></li>
            </ul>
          </div>

          {/* BookStore links */}
          <div>
            <h4 className="text-white font-bold mb-6">Editora</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Sobre a COMPIA</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Nossos Autores</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Seja um Autor</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contato Corporativo</a></li>
            </ul>
          </div>

          {/* payment methods*/}
          <div className="flex flex-col gap-8">
            <div>
              <h4 className="text-white font-bold mb-4">Formas de Pagamento</h4>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded bg-white/10 flex items-center justify-center">
                  <CircleDollarSign size={20} />
                </div>
                <div className="w-10 h-10 rounded bg-white/10 flex items-center justify-center">
                  <CreditCard size={20} />
                </div>
                <div className="w-10 h-10 rounded bg-white/10 flex items-center justify-center text-xs font-bold">
                  PIX
                </div>
              </div>
            </div>

            
          </div>

        </div>

        {/*Copyright*/}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 mt-16 pt-8 border-t border-white/10 text-center text-sm text-gray-500">
          <p>© 2026 COMPIA Editora - Universidade Federal de Campina Grande. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;