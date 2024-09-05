declare module 'bpmn-js' {
    class Viewer {
      constructor(options: any);
      importXML(xml: string): Promise<{ warnings: Array<any> }>;
      get(component: string): any;
      destroy(): void;
    }
  
    class Modeler extends Viewer {
      // Puedes agregar métodos y propiedades específicos del modelador aquí si es necesario
    }
  
    export default Viewer;
    export { Modeler };
}