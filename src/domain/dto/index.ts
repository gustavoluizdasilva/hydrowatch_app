interface IData {
    id_greenshouse: number;
    temperature: number;
    humidity: number;
    flowrate: number;
  }

  interface ITemperature {
    max: number | undefined;
    min: number | undefined;
  }
  interface IHumidity {
    max: number | undefined;
    min: number | undefined;
  }

  interface IFlowrate {
    max: number | undefined;
    min: number | undefined;
  }

  interface IEstufa {
    ID: string;
    id_sensor: number;
    greenhouse: string;
    cultivar: string;
    temperature: ITemperature;
    humidity: IHumidity;
    flowrate: IFlowrate;
    temp: number;
    flow: number;
    humi: number;
  }

  interface IEstufaCfg {
    ID: string;
    id_sensor: number;
    greenhouse: string;
    cultivar: string;
    temperature: ITemperature;
    humidity: IHumidity;
    flowrate: IFlowrate;
  }

  interface SensorData {
    _id: string;
    avgFlowrate: number;
    avgHumidity: number;
    avgTemperature: number;
  }
