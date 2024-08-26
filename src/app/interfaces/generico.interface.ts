export interface IEmpresa{
  emprId: number;
  razonSocial: string;
  ruc: string;
  representante: string;
  empleadoList?: Array<IEmpleado>,
  fechaCreacion?: string;
  estado: number;
}

export interface IEmpleado{
  emplId: number;
  nombre: string;
  email: string;
  direccion: string;
  telefono: string;
  empresa?: IEmpresa;
  rolesList?: Array<IRol>;
  Usuario?: IUsuario;
}

export interface IRol{
  id: number;
  nombre: string;
  empleadoList?: Array<IEmpleado>;
}

export interface IUsuario{
  usuId: number;
  username: string;
  password: string;
  empleado?: IEmpleado;
}

export interface IResponseDTO {
  success: boolean;
  message?: string;
}

export interface ILoginDto {
  user: string;
  password: string;
}

