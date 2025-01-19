import React, { useState } from 'react';
import { Toaster, toast } from 'sonner';

export default function Contact() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/sendemail.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(
          data.message ||
            '¡Registro exitoso! Revisa tu correo para más información.'
        );
        setEmail('');
      } else {
        toast.error(
          data.error ||
            'Error al enviar el correo. Por favor, intenta de nuevo.'
        );
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al enviar el correo. Por favor, intenta de nuevo.');
    } finally {
      setStatus('idle');
    }
  };

  return (
    <div id='contacto' className='flex justify-center px-2 bg-gray-900'>
      <Toaster
        position='top-center'
        toastOptions={{
          style: {
            background: 'rgb(17 24 39)',
            color: '#fff',
            border: '1px solid rgb(55 65 81)',
          },
        }}
      />
      <div className='max-w-2xl w-full px-3 py-5 rounded-2xl md:px-8 md:py-7'>
        <h4 className='text-2xl font-semibold tracking-wide text-white lg:text-3xl'>
          No te pierdas el lanzamiento de FitFlex
        </h4>
        <p className='max-w-xl mt-2 leading-relaxed text-blue-100 lg:text-lg'>
          Deja tu correo y sé de los primeros en conocer la plataforma que
          revolucionará el fitness y la nutrición.
        </p>
        <form
          onSubmit={handleSubmit}
          className='my-4 sm:flex sm:flex-row sm:gap-3'
        >
          <input
            className='block w-full px-4 py-3 mt-3 text-gray-800 placeholder-gray-500 bg-white border border-gray-300 rounded-md appearance-none sm:mt-0 sm:max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200'
            type='email'
            placeholder='Ingresa tu email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading'}
            required
          />
          <button
            type='submit'
            className={`
              block w-full sm:w-auto px-6 py-3 mt-3 sm:mt-0 font-bold tracking-wide rounded-md
              transition-all duration-200
              ${
                status === 'loading'
                  ? 'bg-blue-200 cursor-not-allowed'
                  : 'bg-blue-300 hover:bg-blue-200 active:bg-blue-400'
              }
              text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-gray-900
            `}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <span className='flex items-center justify-center gap-2'>
                <svg className='animate-spin h-5 w-5' viewBox='0 0 24 24'>
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                    fill='none'
                  />
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  />
                </svg>
                Enviando...
              </span>
            ) : (
              'Enviar'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
