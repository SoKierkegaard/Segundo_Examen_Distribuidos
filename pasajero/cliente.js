let token = '';
const resultado = document.getElementById('resultado');

async function login() {
  token = '';
  try {
    const res = await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ email: 'admin@gmail.com', password: '123456' })
    });
    const datos = await res.json();
    if (res.ok) token = datos.token;
    resultado.textContent = res.ok ? 'Sesion iniciada' : JSON.stringify(datos, null, 2);
  } catch (error) {
    resultado.textContent = 'No se pudo conectar con Laravel';
  }
}


async function consultarSalidas() {
  token = '';
  try {
    const res = await fetch('http://localhost:8000/api/salidas', {
      method: 'GET',
    });
    const datos = await res.json();
    if (res.ok) token = datos.token;
    resultado.textContent = res.ok ? 'Sesion iniciada' : JSON.stringify(datos, null, 2);
  } catch (error) {
    resultado.textContent = 'No se pudo conectar con Laravel';
  }
}


