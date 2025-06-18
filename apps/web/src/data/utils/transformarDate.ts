export function transformarDatas(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(transformarDatas);
  }

  if (obj !== null && typeof obj === "object") {
    const novoObj: any = {};
    for (const chave in obj) {
      const valor = obj[chave];
      if (
        typeof valor === "string" &&
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(valor)
      ) {
        novoObj[chave] = new Date(valor);
      } else {
        novoObj[chave] = transformarDatas(valor);
      }
    }
    return novoObj;
  }

  return obj;
}
