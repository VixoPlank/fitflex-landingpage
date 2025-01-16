export const prerender = false;

import { useState } from 'react';

const Contact = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      setStatus(response.ok ? '¡Correo enviado!' : result.message);
    } catch (error) {
      console.log(error);
      setStatus('Error al enviar el correo. Intenta nuevamente.');
    }
  };

  return (
    <div id='contacto' className='flex justify-center px-2 bg-gray-900'>
      <div className='max-w-2xl px-3 py-5 rounded-2xl md:px-8 md:py-7'>
        <h4 className='text-2xl font-semibold tracking-wide text-white lg:text-3xl'>
          No te pierdas el lanzamiento de FitFlex
        </h4>
        <p className='max-w-xl mt-2 leading-relaxed text-blue-100 lg:text-lg'>
          Deja tu correo y sé de los primeros en conocer la plataforma que
          revolucionará el fitness y la nutrición.
        </p>
        <form
          onSubmit={handleSubmit}
          className='my-4 sm:flex sm:flex-row sm:justify-evenly'
        >
          <input
            className='block w-full px-4 py-3 mt-3 text-gray-800 placeholder-gray-500 bg-white border border-gray-300 rounded-md appearance-none sm:max-w-xs focus:outline-none focus:ring focus:ring-blue-50 focus:border-blue-300'
            type='email'
            placeholder='Ingresa tu email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type='submit'
            className='bg-blue-300 hover:bg-blue-200 block w-full py-3 mt-3 font-bold tracking-wide rounded shadow sm:ml-3 md:w-52 text-gray-900 focus'
          >
            <span className='block'>Enviar</span>
          </button>
        </form>
        {status && <p className='mt-2 text-white'>{status}</p>}
      </div>
    </div>
  );
};

export default Contact;
