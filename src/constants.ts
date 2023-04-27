export class CsvConfigConst {
	public static EOL = "\r\n";
	public static BOM = "\ufeff";

	public static DEFAULT_FIELD_SEPARATOR = ',';
	public static DEFAULT_DECIMAL_SEPARATOR = '.';
	public static DEFAULT_QUOTE = '"';
	public static DEFAULT_SHOW_TITLE = false;
	public static DEFAULT_TITLE = 'My Report';
	public static DEFAULT_FILENAME = 'mycsv.csv';
	public static DEFAULT_SHOW_LABELS = false;
	public static DEFAULT_USE_BOM = true;
	public static DEFAULT_HEADER: any[] = [];
	public static DEFAULT_OBJ_HEADER = {};
	public static DEFAULT_USE_OBJ_HEADER = false;
	public static DEFAULT_USE_HEADER = false;
	public static DEFAULT_NO_DOWNLOAD = false;
	public static DEFAULT_NULL_TO_EMPTY_STRING = true;
}

export const ConfigDefaults: Options = {
	filename: CsvConfigConst.DEFAULT_FILENAME,
	fieldSeparator: CsvConfigConst.DEFAULT_FIELD_SEPARATOR,
	quoteStrings: CsvConfigConst.DEFAULT_QUOTE,
	decimalSeparator: CsvConfigConst.DEFAULT_DECIMAL_SEPARATOR,
	showLabels: CsvConfigConst.DEFAULT_SHOW_LABELS,
	showTitle: CsvConfigConst.DEFAULT_SHOW_TITLE,
	title: CsvConfigConst.DEFAULT_TITLE,
	useBom: CsvConfigConst.DEFAULT_USE_BOM,
	headers: CsvConfigConst.DEFAULT_HEADER,
	objHeader: CsvConfigConst.DEFAULT_OBJ_HEADER,
	useObjHeader: CsvConfigConst.DEFAULT_USE_OBJ_HEADER,
	useHeader: CsvConfigConst.DEFAULT_USE_HEADER,
	noDownload: CsvConfigConst.DEFAULT_NO_DOWNLOAD,
	nullToEmptyString: CsvConfigConst.DEFAULT_NULL_TO_EMPTY_STRING
};

export interface Options {
	filename: string;
	fieldSeparator: string;
	quoteStrings: string;
	decimalSeparator: string;
	showLabels: boolean;
	showTitle: boolean;
	title: string;
	useBom: boolean;
	headers: string[];
	objHeader: any;
	noDownload: boolean;
	useObjHeader: boolean;
	useHeader: boolean;
	nullToEmptyString: boolean;
}

export interface DataItem {
	[key: string]: string | number | boolean | Date | null;
}
