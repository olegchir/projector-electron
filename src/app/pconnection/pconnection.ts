export interface Pconnection {
  // Template: http://void:8080/projector/?host=void&port=8887&blockClosing=false
  id: number;
  host: string;
  port: number;
  wsport: number;
  password: string;
}
