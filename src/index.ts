import {ConfigDefaults, CsvConfigConst, DataItem, Options} from "./constants";

declare global {
	interface Navigator {
		msSaveBlob: (blobOrBase64: Blob | string, filename: string) => void;
	}
}

export class SimpleCsv {
	public fileName: string | undefined;
	public labels: Array<String> | undefined;
	public data: DataItem[];

	private readonly _options: Options;
	private csv = "";

	constructor(DataJSON: DataItem[], filename: string, options?: Partial<Options>) {
		let config = options || {};

		this.data = typeof DataJSON != "object" ? JSON.parse(DataJSON) : DataJSON;

		this._options = objectAssign({}, ConfigDefaults, config);

		if (this._options.filename) {
			this._options.filename = filename;
		}

		this.generateCsv();
	}

	/**
	 * Generate and Download Csv
	 */
	private generateCsv(): any {
		if (this._options.useBom) {
			this.csv += CsvConfigConst.BOM;
		}

		if (this._options.showTitle) {
			this.csv += this._options.title + "\r\n\n";
		}

		if (this._options.useObjHeader && Object.keys(this._options.objHeader).length > 0) {
			this.getHeaderFromObj();
			this.getBodyAccordingHeader();
		} else {
			this.getHeaders();
			this.getBody();
		}

		if (this.csv == "") {
			console.log("Invalid data");
			return;
		}

		if (this._options.noDownload) {
			return this.csv;
		}

		let blob: Blob = new Blob([this.csv], {type: "text/csv;charset=utf8;"});

		if (navigator.msSaveBlob) {
			let filename = this._options.filename.replace(/ /g, "_") + ".csv";
			navigator.msSaveBlob(blob, filename);
		} else {
			let link = document.createElement("a");

			// @ts-ignore
			link.href = URL.createObjectURL(blob);

			link.setAttribute("target", "_blank");
			link.setAttribute("visibility", "hidden");
			link.download = this._options.filename.replace(/ /g, "_") + ".csv";

			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}
	}

	/**
	 * Create Headers
	 */
	getHeaders(): void {
		if (this._options.headers.length > 0) {
			const {headers} = this._options;
			let row = headers.reduce((headerRow, header) => {
				return headerRow + header + this._options.fieldSeparator;
			}, "");
			row = row.slice(0, -1);
			this.csv += row + CsvConfigConst.EOL;
		}
	}

	/**
	 * Create Header from Object
	 */
	getHeaderFromObj(): void {
		if (Object.keys(this._options.objHeader).length > 0) {
			let row = '';
			Object.keys(this._options.objHeader).forEach(key => {
				row += this._options.objHeader[key] + this._options.fieldSeparator;
			})
			row = row.slice(0, -1);
			this.csv += row + CsvConfigConst.EOL;
		}
	}

	/**
	 * Create Body according to obj header
	 */
	getBodyAccordingHeader(): void {
		for (let i = 0; i < this.data.length; i++) {
			let row = "";
			if (this._options.useObjHeader && Object.keys(this._options.objHeader).length > 0) {
				Object.keys(this._options.objHeader).forEach(key => {
					row += this.formatData(this.data[i][key]) + this._options.fieldSeparator;
				})
			}
			row = row.slice(0, -1);
			this.csv += row + CsvConfigConst.EOL;
		}
	}

	/**
	 * Create Body
	 */
	getBody() {
		for (let i = 0; i < this.data.length; i++) {
			let row = "";
			if (this._options.useHeader && this._options.headers.length > 0) {
				for (const index of this._options.headers) {
					row +=
						this.formatData(this.data[i][index]) + this._options.fieldSeparator;
				}
			} else {
				for (const index in this.data[i]) {
					row +=
						this.formatData(this.data[i][index]) + this._options.fieldSeparator;
				}
			}
			row = row.slice(0, -1);
			this.csv += row + CsvConfigConst.EOL;
		}
	}

	/**
	 * Format Data
	 * @param {any} data
	 */
	formatData(data: any) {
		if (
			this._options.decimalSeparator === "locale" &&
			SimpleCsv.isFloat(data)
		) {
			return data.toLocaleString();
		}

		if (this._options.decimalSeparator !== "." && SimpleCsv.isFloat(data)) {
			return data.toString().replace(".", this._options.decimalSeparator);
		}

		if (typeof data === "string") {
			data = data.replace(/"/g, '""');
			if (
				this._options.quoteStrings ||
				data.indexOf(",") > -1 ||
				data.indexOf("\n") > -1 ||
				data.indexOf("\r") > -1
			) {
				data = this._options.quoteStrings + data + this._options.quoteStrings;
			}
			return data;
		}

		if (this._options.nullToEmptyString) {
			if (data === null) {
				return ("");
			}
			return data;
		}

		if (typeof data === "boolean") {
			return data ? "TRUE" : "FALSE";
		}
		return data;
	}

	/**
	 * Check if is Float
	 * @param {any} input
	 */
	static isFloat(input: any) {
		return +input === input && (!isFinite(input) || Boolean(input % 1));
	}
}

let hasOwnProperty = Object.prototype.hasOwnProperty;
let propIsEnumerable = Object.prototype.propertyIsEnumerable;

/**
 * Convert to Object
 * @param {any} val
 */
function toObject(val: any) {
	if (val === null || val === undefined) {
		throw new TypeError(
			"Object.assign cannot be called with null or undefined"
		);
	}
	return Object(val);
}

/**
 * Assign data  to new Object
 * @param {any}   target
 * @param {any[]} _source
 */
function objectAssign(target: any, ..._source: any[]) {
	let from: any;
	let to = toObject(target);
	let symbols: any;

	for (let s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (const key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if ((<any>Object).getOwnPropertySymbols) {
			symbols = (<any>Object).getOwnPropertySymbols(from);
			for (let i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}
	return to;
}
