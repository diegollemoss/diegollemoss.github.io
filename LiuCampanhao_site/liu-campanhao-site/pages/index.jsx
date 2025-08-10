import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'

const slides = [
  { id: 1, title: 'Treinos', subtitle: 'Crianças e jovens', img: 'https://images.unsplash.com/photo-1526406915897-5b18c6f18f67?auto=format&fit=crop&w=1200&q=60' },
  { id: 2, title: 'Competição', subtitle: 'Preparação e disciplina', img: 'https://images.unsplash.com/photo-1558611848-73f7eb4001d2?auto=format&fit=crop&w=1200&q=60' },
  { id: 3, title: 'Comunidade', subtitle: 'Evento e confraternização', img: 'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1200&q=60' }
];

const plans = [
  { id: 'bronze', name: 'Plano Mensal', price: 'R$ 80', bullets: ['Acesso 3x por semana','Uniforme não incluso','Matrícula grátis'] },
  { id: 'prata', name: 'Plano Bimestral', price: 'R$ 220', bullets: ['Acesso ilimitado','1 aula particular/mês','Desconto na loja'] },
  { id: 'ouro', name: 'Plano Anual', price: 'R$ 1200', bullets: ['Melhor preço','Prioridade em seminários','Kit inicial: faixa + patch'] }
];

const products = [
  { id: 'kimono1', name: "Kimono Rex Troodon", price: 'R$ 180', img: 'https://images.unsplash.com/photo-1600180758894-6c80407c5aa7?auto=format&fit=crop&w=800&q=60' },
  { id: 'shirt1', name: 'Camiseta Treino', price: 'R$ 45', img: 'https://images.unsplash.com/photo-1520975912226-8f8e7df0d9b3?auto=format&fit=crop&w=800&q=60' },
  { id: 'shorts1', name: 'Shorts Treino', price: 'R$ 60', img: 'https://images.unsplash.com/photo-1542293787938-c9e299b8800a?auto=format&fit=crop&w=800&q=60' }
];

export default function Home() {
  const [tab, setTab] = useState('home');
  const [index, setIndex] = useState(0);
  const autoplayRef = useRef();
  const whatsappPhone = '5573998245391';

  useEffect(() => { autoplayRef.current = () => setIndex(i => (i + 1) % slides.length) }, []);

  useEffect(() => {
    const id = setInterval(() => autoplayRef.current(), 5000);
    return () => clearInterval(id);
  }, []);

  function prev() { setIndex(i => (i - 1 + slides.length) % slides.length) }
  function next() { setIndex(i => (i + 1) % slides.length) }

  function buyOnWhatsApp(product) {
    const text = encodeURIComponent(`Olá, quero comprar: ${product.name} - ${product.price}. Me informem por favor.`);
    return `https://wa.me/${whatsappPhone}?text=${text}`;
  }

  return (
    <div className="min-h-screen antialiased">
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 relative">
                <Image src="/logo.png" alt="Escola Liu" fill style={{objectFit:'contain'}} />
              </div>
              <div>
                <div className="font-bold">Escola Liu Campanhão</div>
                <div className="text-xs text-gray-600">Jiu-Jitsu • Formação • Comunidade</div>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <button onClick={() => setTab('home')} className={`py-2 ${tab==='home'?'text-indigo-600 font-semibold':''}`}>Home</button>
              <button onClick={() => setTab('planos')} className={`py-2 ${tab==='planos'?'text-indigo-600 font-semibold':''}`}>Planos</button>
              <button onClick={() => setTab('loja')} className={`py-2 ${tab==='loja'?'text-indigo-600 font-semibold':''}`}>Loja</button>
              <a href={`https://wa.me/${whatsappPhone}`} target="_blank" rel="noreferrer" className="py-2 px-4 rounded-md bg-green-500 text-white text-sm">Contato (WhatsApp)</a>
            </nav>

            <div className="md:hidden">
              <select className="border rounded-md p-2" value={tab} onChange={(e) => setTab(e.target.value)}>
                <option value="home">Home</option>
                <option value="planos">Planos</option>
                <option value="loja">Loja</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {tab === 'home' && (
          <section>
            <div className="grid md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-2">
                <div className="relative overflow-hidden rounded-2xl shadow-lg">
                  <div className="h-72 md:h-96 relative">
                    {slides.map((s,i) => (
                      <div key={s.id} className={`absolute inset-0 transition-transform duration-700 ${i===index? 'translate-x-0':'translate-x-full'}`} style={{backgroundImage:`url(${s.img})`, backgroundSize:'cover', backgroundPosition:'center'}}>
                        <div className="bg-black bg-opacity-30 h-full flex items-end p-6 rounded-2xl">
                          <div className="text-white">
                            <h2 className="text-2xl md:text-4xl font-bold">{s.title}</h2>
                            <p className="mt-1">{s.subtitle}</p>
                          </div>
                        </div>
                      </div>
                    ))}

                    <button aria-label="Anterior" onClick={prev} className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow">‹</button>
                    <button aria-label="Próximo" onClick={next} className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow">›</button>

                    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
                      {slides.map((_, i) => (<button key={i} onClick={() => setIndex(i)} className={`w-3 h-3 rounded-full ${i===index? 'bg-white':'bg-white/40'}`}></button>))}
                    </div>
                  </div>
                </div>
              </div>

              <aside className="space-y-4">
                <div className="rounded-xl bg-white p-4 shadow">
                  <h3 className="font-bold">Próxima aula</h3>
                  <p className="text-sm text-gray-600">Quinta a Domingo — 19:00 às 22:00</p>
                  <a href={`https://wa.me/${whatsappPhone}`} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm bg-green-500 text-white py-2 px-3 rounded">Reservar vaga</a>
                </div>

                <div className="rounded-xl bg-white p-4 shadow">
                  <h3 className="font-bold">Local</h3>
                  <p className="text-sm text-gray-600">Sede principal - Triângulo Leal</p>
                </div>

                <div className="rounded-xl bg-white p-4 shadow text-sm">
                  <strong>Contato:</strong>
                  <div className="mt-2">Diego Lemos — <a href={`tel:+5573998245391`} className="text-indigo-600">(73) 99824-5391</a></div>
                </div>
              </aside>
            </div>

            <div className="mt-8 grid md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-lg shadow"><h4 className="font-bold">Treinos para todas as idades</h4><p className="text-sm text-gray-600 mt-2">Aulas para crianças e jovens (7–15 anos) com ensino progressivo.</p></div>
              <div className="bg-white p-5 rounded-lg shadow"><h4 className="font-bold">Projeto social</h4><p className="text-sm text-gray-600 mt-2">Parceria com NetCenter e foco na comunidade do Triângulo Leal.</p></div>
              <div className="bg-white p-5 rounded-lg shadow"><h4 className="font-bold">Eventos & Seminários</h4><p className="text-sm text-gray-600 mt-2">Seminários com professores convidados e atividades para família.</p></div>
            </div>
          </section>
        )}

        {tab === 'planos' && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Nossos Planos</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {plans.map(p => (
                <div key={p.id} className="bg-white rounded-xl p-6 shadow">
                  <div className="flex items-center justify-between"><h3 className="font-bold text-lg">{p.name}</h3><div className="text-indigo-600 font-semibold">{p.price}</div></div>
                  <ul className="mt-4 text-sm space-y-2 text-gray-600">{p.bullets.map((b,i)=>(<li key={i}>• {b}</li>))}</ul>
                  <a href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(`Olá, tenho interesse no ${p.name} - ${p.price}`)}`} className="mt-6 inline-block w-full text-center bg-indigo-600 text-white py-2 rounded">Quero este plano</a>
                </div>
              ))}
            </div>
            <div className="mt-6 text-sm text-gray-600"><p>Validade do atestado médico: 6 meses. Para matrícula, trazer documento de identificação e comprovante de residência.</p></div>
          </section>
        )}

        {tab === 'loja' && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Loja</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {products.map(prod => (
                <div key={prod.id} className="bg-white rounded-xl p-4 shadow">
                  <div className="h-40 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center"><img src={prod.img} alt={prod.name} className="object-cover h-full w-full"/></div>
                  <div className="mt-3"><h3 className="font-semibold">{prod.name}</h3><div className="text-indigo-600 font-bold mt-1">{prod.price}</div>
                    <div className="mt-4 flex gap-2"><a href={buyOnWhatsApp(prod)} target="_blank" rel="noreferrer" className="flex-1 text-center bg-green-500 text-white py-2 rounded">Comprar</a><button className="flex-1 border rounded py-2">Adicionar ao carrinho</button></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>

      <footer className="bg-white border-t mt-12">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-start gap-6">
          <div><div className="font-bold">Escola de Artes Marciais Liu Campanhão</div><div className="text-sm text-gray-600 mt-1">Triângulo Leal — Projeto social com NetCenter</div></div>
          <div className="text-sm"><div>Contato: <a href={`https://wa.me/5573998245391`} className="text-indigo-600">WhatsApp</a></div><div className="mt-2">© {new Date().getFullYear()} Escola Liu Campanhão</div></div>
        </div>
      </footer>
    </div>
  )
}
