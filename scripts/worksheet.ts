/**
 * The cost model, as a spreadsheet.
 *
 * Kept apart from the download script so it can be unit-tested: a worksheet
 * that quietly disagrees with `estimate()` would be worse than no worksheet,
 * because a reader would trust it more.
 *
 * The output carries **formulas, not values**. A reader is meant to type their
 * own numbers over the example and watch the answers move, offline, in
 * whatever spreadsheet they already have. Every formula below mirrors one line
 * of `src/lib/learning/cost.ts`.
 */
import ExcelJS from 'exceljs';
import { EQUITY_MODELS, LIMITS } from '../src/lib/learning/cost.ts';

const INK = 'FF1C3A2E';
const PAPER = 'FFF5F2EA';
const RULE = 'FFD9D4C7';

/** Cells the reader is meant to change, marked so they can find them. */
function asInput(cell: ExcelJS.Cell) {
	cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFF8DC' } };
	cell.border = {
		top: { style: 'thin', color: { argb: RULE } },
		left: { style: 'thin', color: { argb: RULE } },
		bottom: { style: 'thin', color: { argb: RULE } },
		right: { style: 'thin', color: { argb: RULE } }
	};
	cell.protection = { locked: false };
}

function asHeading(cell: ExcelJS.Cell, size = 11) {
	cell.font = { bold: true, size, color: { argb: INK } };
}

export function buildWorkbook(guideTitle: string, generatedAt: Date): ExcelJS.Workbook {
	const wb = new ExcelJS.Workbook();
	wb.creator = 'EcoHubs Community';
	wb.created = generatedAt;

	/* ── Sheet 1: the model ────────────────────────────────────────────────── */
	const s = wb.addWorksheet('Cost model', {
		views: [{ showGridLines: false }],
		pageSetup: { paperSize: 9, orientation: 'portrait' }
	});
	s.columns = [
		{ width: 4 },
		{ width: 42 },
		{ width: 18 },
		{ width: 44 }
	];

	s.getCell('B2').value = 'What joining a community costs';
	asHeading(s.getCell('B2'), 16);
	s.getCell('B3').value = guideTitle;
	s.getCell('B3').font = { size: 10, color: { argb: 'FF6B6B60' } };

	s.getCell('B5').value =
		'Type your own numbers into the shaded cells. Everything else is calculated. This is a model, not a quote — take it to the community and ask them to correct it.';
	s.getCell('B5').alignment = { wrapText: true, vertical: 'top' };
	s.mergeCells('B5:D5');
	s.getRow(5).height = 30;

	/* Inputs */
	s.getCell('B7').value = 'Your numbers';
	asHeading(s.getCell('B7'), 12);

	const inputs: [string, string, ExcelJS.CellValue, string, string?][] = [
		['B8', 'C8', 300000, 'What you pay to move in', '#,##0'],
		['B9', 'C9', 250, 'Monthly dues or service charge', '#,##0'],
		['B10', 'C10', 10, 'Years you expect to stay', '0'],
		[
			'B11',
			'C11',
			0,
			'Yearly appreciation you assume — starts at zero, because we will not guess your housing market',
			'0.0%'
		],
		['B12', 'C12', 'market', 'Equity model — market, clt, par or none'],
		[
			'B13',
			'C13',
			0.25,
			'If a land trust: the share of appreciation your ground lease lets you keep',
			'0%'
		]
	];

	for (const [labelRef, valueRef, value, label, format] of inputs) {
		s.getCell(labelRef).value = label;
		s.getCell(labelRef).alignment = { wrapText: true, vertical: 'middle' };
		const cell = s.getCell(valueRef);
		cell.value = value;
		if (format) cell.numFmt = format;
		asInput(cell);
	}

	// The model cell is a dropdown rather than free text, so a typo cannot
	// silently fall through to the market branch.
	s.getCell('C12').dataValidation = {
		type: 'list',
		allowBlank: false,
		formulae: [`"${EQUITY_MODELS.map((m) => m.id).join(',')}"`],
		showErrorMessage: true,
		errorTitle: 'Pick one of the four',
		error: EQUITY_MODELS.map((m) => `${m.id} — ${m.label}`).join('\n')
	};

	// Bounds mirrored from LIMITS so the sheet and the site agree.
	s.getCell('C10').dataValidation = {
		type: 'whole',
		operator: 'between',
		formulae: [LIMITS.years[0], LIMITS.years[1]],
		allowBlank: false,
		showErrorMessage: true,
		errorTitle: 'Years',
		error: `Between ${LIMITS.years[0]} and ${LIMITS.years[1]}.`
	};

	/* Results */
	s.getCell('B15').value = 'What that comes to';
	asHeading(s.getCell('B15'), 12);

	const rows: [string, string, string, string?][] = [
		['B16', 'C16', 'C8', 'Paid to move in'],
		['B17', 'C17', 'C9*12*C10', 'Dues over the period'],
		['B18', 'C18', 'C8*(1+C11)^C10', 'What the home would then be worth'],
		['B19', 'C19', 'MAX(0,C18-C8)', 'Appreciation to share'],
		[
			'B20',
			'C20',
			'IF(C12="none",0,IF(C12="par",C8,IF(C12="clt",C8+C13*C19,C18)))',
			'Comes back when you leave'
		],
		['B21', 'C21', 'C16+C17-C20', 'The years cost you — negative means you come out ahead'],
		['B22', 'C22', 'C21/(C10*12)', 'Which is, per month']
	];

	for (const [labelRef, valueRef, formula, label] of rows) {
		s.getCell(labelRef).value = label;
		s.getCell(labelRef).alignment = { wrapText: true, vertical: 'middle' };
		const cell = s.getCell(valueRef);
		cell.value = { formula, date1904: false };
		cell.numFmt = '#,##0';
		cell.font = { bold: valueRef === 'C21', color: { argb: INK } };
	}

	s.getRow(21).border = { top: { style: 'thin', color: { argb: RULE } } };

	s.getCell('B24').value =
		'It ignores the cost of selling, mortgage interest, tax, inflation and any special levy raised while you live there — and it assumes the dues never rise, which they will.';
	s.getCell('B24').alignment = { wrapText: true, vertical: 'top' };
	s.getCell('B24').font = { size: 9, italic: true, color: { argb: 'FF6B6B60' } };
	s.mergeCells('B24:D24');
	s.getRow(24).height = 28;

	/* ── Sheet 2: the models, in words ─────────────────────────────────────── */
	const m = wb.addWorksheet('What comes back', { views: [{ showGridLines: false }] });
	m.columns = [{ width: 4 }, { width: 12 }, { width: 46 }, { width: 62 }, { width: 62 }];

	m.getCell('B2').value = 'What comes back when you leave, by equity model';
	asHeading(m.getCell('B2'), 14);

	const header = m.getRow(4);
	header.getCell(2).value = 'Use';
	header.getCell(3).value = 'Model';
	header.getCell(4).value = 'What it means';
	header.getCell(5).value = 'Where that comes from';
	header.eachCell((cell) => {
		cell.font = { bold: true, color: { argb: INK } };
		cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: PAPER } };
	});

	EQUITY_MODELS.forEach((model, i) => {
		const row = m.getRow(5 + i);
		row.getCell(2).value = model.id;
		row.getCell(3).value = model.label;
		row.getCell(4).value = model.rule;
		row.getCell(5).value = model.source;
		row.alignment = { wrapText: true, vertical: 'top' };
		row.height = 46;
	});

	return wb;
}
