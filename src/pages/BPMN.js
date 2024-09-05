import React, { useEffect, useRef } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import BpmnViewer from 'bpmn-js';

const Bpmn = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const viewer = new BpmnViewer({
      container: containerRef.current
    });

    // Carga el archivo BPMN usando fetch
      fetch('/assets/resources/pizza-collaboration.bpmn')
      .then(response => response.text())
      .then(bpmnXML => {
        viewer.importXML(bpmnXML).then(function(result) {
          const { warnings } = result;
          console.log('success !', warnings);
          viewer.get('canvas').zoom('fit-viewport');
        }).catch(function(err) {
          const { warnings, message } = err;
          console.log('something went wrong:', warnings, message);
        });
      })
      .catch(err => {
        console.error('Error fetching BPMN file:', err);
      });

    return () => viewer.destroy();
  }, []);

  return (
    <div>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div ref={containerRef} ></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Bpmn;
