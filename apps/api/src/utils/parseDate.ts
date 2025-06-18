export default function parseDates(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(parseDates);
  } else if (obj !== null && typeof obj === "object") {
    const parsed: any = {};
    for (const key in obj) {
      parsed[key] = parseDates(obj[key]);
    }
    return parsed;
  } else if (typeof obj === "string" && isIsoDate(obj)) {
    return new Date(obj);
  }
  return obj;
}

function isIsoDate(str: string): boolean {
  // Regex simples para detectar ISO date strings (ex: "2025-04-01T15:00:00.000Z")
  return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/.test(str);
}
