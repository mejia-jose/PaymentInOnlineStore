import React, { useEffect, useRef } from 'react';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
import '../assets/styles/Modeler.css';
import diagramXML from '../assets/resor/pizza-collaboration.bpmn';

const Modeler = () => {
  const containerRef = useRef(null);
  const modelerRef = useRef(null);

  useEffect(() => {
    // Verificar que containerRef.current esté disponible antes de inicializar el modelador
    if (containerRef.current) {
      // Inicializar el BpmnModeler usando el ref del contenedor
      modelerRef.current = new BpmnModeler({
        container: containerRef.current.querySelector('#js-canvas'), // Cambio aquí: usar el ref en lugar de un selector de string
        keyboard: { bindTo: window }
      });

      // Registro de eventos para arrastrar y soltar archivos
      if (window.FileList && window.FileReader) {
        registerFileDrop(containerRef.current, openDiagram);
      } else {
        window.alert(
          'Parece que estás usando un navegador antiguo que no soporta arrastrar y soltar. ' +
          'Intenta usar Chrome, Firefox o Internet Explorer > 10.'
        );
      }
    } else {
      console.error('containerRef.current is null');
    }

    // Limpieza al desmontar el componente
    return () => {
      if (modelerRef.current) {
        modelerRef.current.destroy();
      }
    };
  }, []);

  const openDiagram = async (xml) => {
    try {
      await modelerRef.current.importXML(xml);
      containerRef.current.classList.remove('with-error');
      containerRef.current.classList.add('with-diagram');
    } catch (err) {
      containerRef.current.classList.remove('with-diagram');
      containerRef.current.classList.add('with-error');
      const errorElement = containerRef.current.querySelector('.error pre');
      if (errorElement) {
        errorElement.textContent = err.message;
      }
      console.error(err);
    }
  };

  const createNewDiagram = async () => {
    //openDiagram(diagramXML);
   
    try {
        const response = await fetch('/assets/resources/pizza-collaboration.bpmn');
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        const xml = await response.text();
        openDiagram(xml);
    } catch (err) {
        console.error('Error fetching BPMN diagram:', err);
    }
  };

  const registerFileDrop = (container, callback) => {
    const handleFileSelect = (e) => {
      e.stopPropagation();
      e.preventDefault();
      const files = e.dataTransfer.files;
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const xml = e.target.result;
        callback(xml);
      };

      reader.readAsText(file);
    };

    const handleDragOver = (e) => {
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy'; // Mostrar explícitamente que esto es una copia
    };

    if (container) {
      container.addEventListener('dragover', handleDragOver, false);
      container.addEventListener('drop', handleFileSelect, false);
    }
  };

  const debounce = (fn, timeout) => {
    let timer;
    return function () {
      if (timer) clearTimeout(timer);
      timer = setTimeout(fn, timeout);
    };
  };

  useEffect(() => {
    const downloadLink = document.getElementById('js-download-diagram');
    const downloadSvgLink = document.getElementById('js-download-svg');

    const setEncoded = (link, name, data) => {
      const encodedData = encodeURIComponent(data);
      if (data) {
        link.classList.add('active');
        link.setAttribute('href', 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData);
        link.setAttribute('download', name);
      } else {
        link.classList.remove('active');
      }
    };

    const exportArtifacts = debounce(async () => {
      try {
        const { svg } = await modelerRef.current.saveSVG();
        setEncoded(downloadSvgLink, 'diagram.svg', svg);
      } catch (err) {
        console.error('Error al guardar SVG: ', err);
        setEncoded(downloadSvgLink, 'diagram.svg', null);
      }

      try {
        const { xml } = await modelerRef.current.saveXML({ format: true });
        setEncoded(downloadLink, 'diagram.bpmn', xml);
      } catch (err) {
        console.error('Error al guardar XML: ', err);
        setEncoded(downloadLink, 'diagram.bpmn', null);
      }
    }, 500);

    if (modelerRef.current) {
      modelerRef.current.on('commandStack.changed', exportArtifacts);
    }
  }, []);

  return (
    <div ref={containerRef} className="content" id="js-drop-zone">
      <div className="message intro">
        <div className="note">
          Drop BPMN diagram from your desktop or <a id="js-create-diagram" onClick={createNewDiagram}>Nuevo Diagrama</a>
        </div>
      </div>

      <div className="message error">
        <div className="note">
          <p>Ooops, we could not display the BPMN 2.0 diagram.</p>
          <div className="details">
            <span>Cause of the problem:</span>
            <pre></pre>
          </div>
        </div>
      </div>

      <div className="canvas" id="js-canvas"></div>

      <div className="io-import-export">

    <ul className="io-import io-control io-control-list io-horizontal">
      <li>
        <button title="open BPMN diagram from local file system" jsaction="click:bio.openLocal">
          <span className="icon-open"></span>
        </button>
      </li>
      <li className="vr"></li>
      <li>
        <button title="create new BPMN diagram" jsaction="click:bio.createNew">
          <span className="icon-plus-circled"></span>
        </button>
      </li>
    </ul>

    <ul className="io-export io-control io-control-list io-horizontal">
      <li>
        <a target="_blank" href className="download" title="Download as BPMN 2.0 file" jswidget="downloadDiagram" data-track="diagram:download-bpmn">
          <span className="icon-download"></span>
        </a>
      </li>
      <li>
        <a target="_blank" href className="download" title="Download as SVG image" jswidget="downloadSVG" data-track="diagram:download-svg">
          <span className="icon-picture"></span>
        </a>
      </li>
    </ul>
  </div>
    </div>
  );
};

export default Modeler;
