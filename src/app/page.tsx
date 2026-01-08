import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const agents = [
  { name: 'Order Specialist', icon: '📦', desc: 'Beheer orders automatisch' },
  { name: 'Planning Assistent', icon: '📅', desc: 'Optimaliseer je agenda' },
  { name: 'Offerte Manager', icon: '💰', desc: 'Maak offertes in no-time' },
  { name: 'Email Assistent', icon: '✉️', desc: 'Schrijf perfecte emails' },
  { name: 'LinkedIn Creator', icon: '💼', desc: 'Creëer virale posts' },
  { name: 'Klantenservice Bot', icon: '🎧', desc: 'Beantwoord vragen 24/7' },
  { name: 'Content Schrijver', icon: '✍️', desc: 'Genereer blogs & artikelen' },
  { name: 'Data Analist', icon: '📊', desc: 'Analyseer data slim' },
]

const features = [
  {
    title: '8+ AI Agents',
    description: 'Toegang tot een heel team van gespecialiseerde AI-assistenten',
    icon: '🤖',
  },
  {
    title: '50 Credits/Maand',
    description: 'Ruim voldoende voor dagelijks gebruik van al je agents',
    icon: '🎯',
  },
  {
    title: 'Direct Starten',
    description: 'Geen ingewikkelde setup - binnen 2 minuten aan de slag',
    icon: '⚡',
  },
  {
    title: 'Nederlandse AI',
    description: 'Geoptimaliseerd voor Nederlandse taal en cultuur',
    icon: '🇳🇱',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-50 to-accent-50 opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight animate-fadeIn">
              <span className="block text-gray-900">Jouw Complete</span>
              <span className="block gradient-text mt-2">AI Team</span>
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto animate-fadeIn-delay-1">
              8+ AI-assistenten voor slechts{' '}
              <span className="font-bold text-primary-600">€12/maand</span>.
              Van emails schrijven tot data analyseren - jouw virtuele team staat klaar.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn-delay-2">
              <Link
                href="/auth/register"
                className="px-8 py-4 text-lg font-semibold text-white gradient-bg rounded-full hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl"
              >
                Start Gratis Proefperiode →
              </Link>
              <Link
                href="#agents"
                className="px-8 py-4 text-lg font-semibold text-gray-700 bg-white rounded-full hover:bg-gray-50 transition-colors border border-gray-200"
              >
                Bekijk de Agents
              </Link>
            </div>
            <p className="mt-4 text-sm text-gray-500 animate-fadeIn-delay-3">
              Geen creditcard nodig · Direct aan de slag · Annuleer wanneer je wilt
            </p>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 text-6xl animate-float opacity-20">🤖</div>
        <div className="absolute top-40 right-20 text-5xl animate-float opacity-20" style={{ animationDelay: '1s' }}>💼</div>
        <div className="absolute bottom-20 left-1/4 text-4xl animate-float opacity-20" style={{ animationDelay: '2s' }}>📊</div>
      </section>

      {/* Agents Grid */}
      <section id="agents" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Maak kennis met je <span className="gradient-text">AI Team</span>
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Elk lid van je team is gespecialiseerd in een specifieke taak
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {agents.map((agent, index) => (
              <div
                key={agent.name}
                className="group p-6 bg-white rounded-2xl border border-gray-100 card-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  {agent.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {agent.name}
                </h3>
                <p className="text-gray-600">{agent.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Waarom <span className="gradient-text">Qynce</span>?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Simpele, <span className="gradient-text">Eerlijke Prijzen</span>
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Geen verborgen kosten. Geen lange contracten.
            </p>
          </div>

          <div className="max-w-lg mx-auto">
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-primary-500">
              <div className="absolute top-0 right-0 bg-primary-500 text-white px-4 py-1 text-sm font-semibold rounded-bl-xl">
                MEEST GEKOZEN
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900">Starter</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-5xl font-extrabold gradient-text">€12</span>
                  <span className="ml-2 text-gray-500">/maand</span>
                </div>
                <ul className="mt-8 space-y-4">
                  {[
                    '8+ AI Agents',
                    '50 credits per maand',
                    'Onbeperkte gesprekken',
                    'Nederlandse ondersteuning',
                    'Geen setup kosten',
                    'Maandelijks opzegbaar',
                  ].map((feature) => (
                    <li key={feature} className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/auth/register"
                  className="mt-8 block w-full py-4 text-center text-white font-semibold gradient-bg rounded-xl hover:opacity-90 transition-opacity"
                >
                  Start Nu - Eerste Week Gratis
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-500">
              Meer credits nodig?{' '}
              <Link href="/contact" className="text-primary-600 hover:underline">
                Neem contact op
              </Link>{' '}
              voor custom pakketten.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Klaar om je productiviteit te verdubbelen?
          </h2>
          <p className="mt-4 text-xl text-white/90">
            Sluit je aan bij honderden ondernemers die al werken met Qynce
          </p>
          <Link
            href="/auth/register"
            className="mt-8 inline-block px-8 py-4 text-lg font-semibold text-primary-600 bg-white rounded-full hover:bg-gray-100 transition-colors shadow-lg"
          >
            Begin Vandaag Nog →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
