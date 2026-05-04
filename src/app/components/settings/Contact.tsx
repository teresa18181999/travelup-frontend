import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, MessageCircle, Mail, Send } from 'lucide-react';

export default function Contact() {
  const navigate = useNavigate();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simular envío de mensaje
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      navigate('/settings');
    }, 3000);
  };

  return (
    <div className="size-full bg-[#FFF9F7] overflow-y-auto">
      <div className="max-w-md md:max-w-3xl lg:max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="px-6 py-4 md:py-6 flex items-center gap-4">
            <button
              onClick={() => navigate('/settings')}
              className="text-gray-400 hover:text-gray-600"
            >
              <ArrowLeft className="w-6 h-6 md:w-7 md:h-7" />
            </button>
            <h1 className="text-xl md:text-2xl">Contactar soporte</h1>
          </div>
        </div>

        {/* Contact form */}
        <div className="p-6 md:p-8 lg:p-10">
          {showSuccess ? (
            <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
              <div className="bg-green-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Send className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl mb-2">¡Mensaje enviado!</h2>
              <p className="text-gray-600">
                Nuestro equipo te responderá en breve.
              </p>
            </div>
          ) : (
            <>
              <div className="bg-[#E8F2FF] rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <MessageCircle className="w-8 h-8 text-[#92C0E8]" />
                  <h2 className="text-xl text-gray-900">Envíanos un mensaje</h2>
                </div>
                <p className="text-gray-600 text-sm">
                  Describe tu consulta y te responderemos lo antes posible.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">
                      Asunto
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="¿Cuál es tu consulta?"
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#92C0E8]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm mb-2 text-gray-700">
                      Mensaje
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe tu consulta o problema..."
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#92C0E8] resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#92C0E8] text-white py-3 rounded-xl hover:bg-[#7eb3df] transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    <span>Enviar mensaje</span>
                  </button>
                </div>
              </form>

              <div className="mt-6 bg-white rounded-2xl p-4 shadow-sm">
                <p className="text-sm text-gray-600 text-center">
                  También puedes escribirnos a{' '}
                  <a href="mailto:soporte@travelup.com" className="text-[#92C0E8] hover:underline">
                    soporte@travelup.com
                  </a>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
