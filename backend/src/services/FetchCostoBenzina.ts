import axios from "axios";
import fs from "fs";
import path from "path";
import { readFile } from "fs/promises";

export const jsonDataFile = path.join(
  __dirname,
  "../../",
  "prezzi-benzina.json",
);

type PrezzoInfo = {
  prezzo: string;
  self: string;
  data: string;
};

type Distributore = {
  gestore: string;
  indirizzo: string;
  latitudine: string;
  longitudine: string;
  prezzi: Record<string, PrezzoInfo>;
};

export const fetchAndCombineCSVData = async (
  outputPath: string,
): Promise<void> => {
  const anagraficaUrl =
    "https://www.mimit.gov.it/images/exportCSV/anagrafica_impianti_attivi.csv";
  const prezziUrl =
    "https://www.mimit.gov.it/images/exportCSV/prezzo_alle_8.csv";

  return await axios.get(anagraficaUrl).then(async (anagrafica) => {
    await axios.get(prezziUrl).then((prezzi) => {
      const anagraficaRows = anagrafica.data.split("\n");
      const prezziRows = prezzi.data.split("\n");
      const result: Record<string, Distributore> = {};

      for (const row of anagraficaRows) {
        const columns = row.split(";");
        if (columns.length >= 9) {
          const key = columns[0];
          if (!isNaN(parseInt(key))) {
            const value = columns.slice(1);
            result[key] = {
              gestore: value[1],
              indirizzo: `${value[4]} ${value[5]} ${value[6]}`,
              latitudine: value[7],
              longitudine: value[8],
              prezzi: {},
            };
          }
        }
      }

      for (const row of prezziRows) {
        const columns = row.split(";");
        if (columns.length >= 4) {
          const key = columns[0];
          const carburante = columns[1].toLowerCase();
          const prezzo = columns[2];
          const self = columns[3];
          const data = columns[4];

          if (result[key]) {
            const existing = result[key].prezzi[carburante];
            if (!existing || parseFloat(prezzo) < parseFloat(existing.prezzo)) {
              result[key].prezzi[carburante] = { prezzo, self, data };
            }
          }
        }
      }

      fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
    });
  });
};

export function getPriceByStationId(
  data: Record<string, Distributore>,
  id: number,
): string {
  const station = data[id];
  const prezzo = station.prezzi["benzina"];
  return prezzo.prezzo;
}

export function hasFileBeenUpdatedWithin24Hours(filePath: string): boolean {
  try {
    const stats = fs.statSync(filePath);
    const diff = Date.now() - stats.mtime.getTime();
    return diff < 24 * 60 * 60 * 1000;
  } catch (err) {
    console.error(`Stat error: ${err}`);
    return false;
  }
}

export const getCurrentBenzinaPrice = async (): Promise<number> => {
  const DISTRIBUTORE_ID = 57411;

  if (
    !fs.existsSync(jsonDataFile) ||
    !hasFileBeenUpdatedWithin24Hours(jsonDataFile)
  ) {
    console.log("Updating JSON file...");
    await fetchAndCombineCSVData(jsonDataFile);
  }

  const content = await readFile(jsonDataFile, "utf8");

  const parsed = JSON.parse(content);
  const station = parsed[DISTRIBUTORE_ID];
  const prezzo =
    station.prezzi["benzina"].self != "0"
      ? parseFloat(station.prezzi["benzina"].self)
      : parseFloat(station.prezzi["benzina"].prezzo);

  return typeof prezzo === "number" && !Number.isNaN(prezzo) ? prezzo : 0;
};
