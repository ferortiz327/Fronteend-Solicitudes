export interface IActividadComercialRef {
  name: string;
  type: string;
  link: string;
  storageIds: number[];
  storageIds_string: string[];
}

export interface ITaskContext {
  actividadComercial_ref: IActividadComercialRef;
}
