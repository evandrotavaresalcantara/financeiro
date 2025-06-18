export default interface RespostaApi {
  sucesso: boolean;
  status: number;
  json: any;
  erros?: string[];
}
