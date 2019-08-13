import React, { useState, useEffect } from 'react';
import Buscador from './components/Buscador';
import ListadoImagenes from './components/ListadoImagenes';

function App()
{
  const [busqueda, guardarBusqueda] = useState('');
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaActual, guardarPaginaActual] = useState(1);
  const [totalPaginas, guardarTotalPaginas] = useState(1);


  useEffect(() =>
  {
    if (busqueda === '') return;

    const consultarApi = async () =>
    {
      const imagenesPorPagina = 30;
      const key = '13305752-1c3c1f378dd95dac384d98744';
      const url = `https://pixabay.com/api/?key=${ key }&q=${ busqueda }&per_page=${ imagenesPorPagina }&page=${ paginaActual }`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      guardarImagenes(resultado.hits);
      
      //Calcular el total de paginas
      guardarTotalPaginas(Math.ceil(resultado.totalHits / imagenesPorPagina));

      //Mover pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron');

      jumbotron.scrollIntoView({behavior:'smooth', block:'end'});
    }

    consultarApi();
  }, [busqueda, paginaActual]);

  const paginaAnterior = () =>
  {
    let nuevaPaginaActual = paginaActual - 1;

    guardarPaginaActual(nuevaPaginaActual);
  }

  const paginaSiguiente = () =>
  {
    let nuevaPaginaActual = paginaActual + 1;

    guardarPaginaActual(nuevaPaginaActual);
  }

  return (
    <div className="app container">
      <div className="jumbotron">
        <p className="lead text-center">Buscado de Imagenes</p>

        <Buscador
          guardarBusqueda={guardarBusqueda}
        />
      </div>

      <div className="row justify-content-center">
        <ListadoImagenes
          imagenes={imagenes}
        />

        {(paginaActual === 1) ? null : (<button onClick={paginaAnterior} type="button" className="btn btn-info">&laquo; Anterior</button>)}
        {(paginaActual === totalPaginas) ? null : (<button onClick={paginaSiguiente} type="button" className="btn btn-info">Siguiente &raquo;</button>)}
      </div>
    </div>
  );
}

export default App;