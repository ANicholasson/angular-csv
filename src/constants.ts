export class CsvConfigConsts {
  public static EOL = "\r\n";
  public static BOM = "\ufeff";
  public static DEFAULT_FIELD_SEPARATOR = ",";
  public static DEFAULT_DECIMAL_SEPARATOR = ".";
  public static DEFAULT_QUOTE = '"';
  public static DEFAULT_SHOW_TITLE = false;
  public static DEFAULT_TITLE = "My Report";
  public static DEFAULT_FILENAME = "mycsv.csv";
  public static DEFAULT_SHOW_LABELS = false;
  public static DEFAULT_USE_BOM = true;
  public static DEFAULT_HEADER: any[] = [];
  public static DEFAULT_USE_HEADER = false;
  public static DEFAULT_NO_DOWNLOAD = false;
  public static DEFAULT_NULL_TO_EMPTY_STRING = false;
}

export const ConfigDefaults: Options = {
  filename: CsvConfigConsts.DEFAULT_FILENAME,
  fieldSeparator: CsvConfigConsts.DEFAULT_FIELD_SEPARATOR,
  quoteStrings: CsvConfigConsts.DEFAULT_QUOTE,
  decimalseparator: CsvConfigConsts.DEFAULT_DECIMAL_SEPARATOR,
  showLabels: CsvConfigConsts.DEFAULT_SHOW_LABELS,
  showTitle: CsvConfigConsts.DEFAULT_SHOW_TITLE,
  title: CsvConfigConsts.DEFAULT_TITLE,
  useBom: CsvConfigConsts.DEFAULT_USE_BOM,
  headers: CsvConfigConsts.DEFAULT_HEADER,
  useHeader: CsvConfigConsts.DEFAULT_USE_HEADER,
  noDownload: CsvConfigConsts.DEFAULT_NO_DOWNLOAD,
  nullToEmptyString: CsvConfigConsts.DEFAULT_NULL_TO_EMPTY_STRING,
};

export interface Options {
  filename: string;
  fieldSeparator: string;
  quoteStrings: string;
  decimalseparator: string;
  showLabels: boolean;
  showTitle: boolean;
  title: string;
  useBom: boolean;
  headers: string[];
  noDownload: boolean;
  useHeader: boolean;
  nullToEmptyString: boolean;
}
