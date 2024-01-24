import replaceAllInserter from "string.prototype.replaceall";

import Stack from "@mui/material/Stack";
import Chip from '@mui/material/Chip';

replaceAllInserter.shim();

export function render_datetime(data, type, row, meta) {
	if (data === undefined || data === null) {
		return "";
	}
	return data.substring(0, 10).split("-").reverse().join("/") + " " + data.substring(11, 19);
}

export function render_date(data, type, row, meta) {
	if (data === undefined || data === null) {
		return "";
	}
	return data.substring(0, 10).split("-").reverse().join("/");
}

export function render_cpf(data, type, row, meta) {
	if (data === undefined || data === null) {
		return "";
	}
	return data.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export function render_fone_fixo(data, type, row, meta) {
	if (data === undefined || data === null) {
		return "";
	}
	return data.replace(/^(\d\d)(\d{4})(\d{4}).*/, "($1) $2-$3");
}

export function render_fone(value) {
	if (value === undefined || value === null) {
		return "";
	} else if (value.length == 11) {
		return value.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
	} else if (value.length == 10) {
		return value.replace(/^(\d\d)(\d{4})(\d{4}).*/, "($1) $2-$3");
	}
}

export function render_null_date(_field) {
	if (_field == null) {
		return "NÃO INFORMADO";
	} else {
		return _field;
	}
}

export function render_valor(value) {
	var formatter = new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
	});
	var data = formatter.format(value);
	return data;
}

export function render_horario(value) {
	if (!value) {
		return "";
	} else {
		return value.replace(/(\d{2})(\d{2})(\d{2})/, "$1:$2:$3");
	}
}

export function render_cep(value) {
	if (!value) {
		return "";
	} else {
		return value.replace(/^([\d]{2})\.?([\d]{3})\-?([\d]{3})/, "$1.$2-$3");
	}
}

export function toPascalCase(value) {
	let data = value.replaceAll("-", " ");

	let pascal = data
		.split(" ")
		.map((w) => w[0].toUpperCase() + w.substring(1).toLowerCase())
		.join(" ");

	return pascal;
}

export function render_percentage(value) {
	if (value == 0) {
		return "0%";
	} else if (value == 1) {
		return "100%";
	} else if (value.toString().substring(2, 3) == 0) {
		return `${value.toFixed(2).substring(3, 4).toString()}%`;
	} else {
		return `${value.toFixed(2).substring(2, 4).toString()}%`;
	}
}

export function subtractDate(data, dias, operador = false) {
	let inicial = new Date(data.toISOString().slice(0, 10));
	let milissegundos_dia = 1000 * 60 * 60 * 24;

	if (operador) {
		var data_final = new Date(inicial.getTime() + dias * milissegundos_dia);
	} else {
		var data_final = new Date(inicial.getTime() - dias * milissegundos_dia);
	}

	return data_final.toISOString().slice(0, 10);
}


export function format_datetime(value) {
	var date = value.substring(0, 10).split("-").reverse().join("/");
	var hour = value.substring(11, 19);

	return `${date} às ${hour}`;
}

export function datetime_now() {
	let today = new Date().toISOString().slice(0, 10);
	let time = new Date().toLocaleTimeString("pt-BR", {
		hour12: false,
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
	});

	let data = today + " " + time;

	return data;
}

export function render_true_false(data, type, row, meta) {

	let status, color = ''

	if (data) {
		status = 'ATIVO'
		color = 'success'
	} else {
		status = 'INATIVO'
		color = 'warning'
	}
	return (
		<Stack>
			<Stack direction="row" spacing={1}>
				<Chip label={status} color={color} />
			</Stack>
		</Stack>
	)
}

export function getDataHoraAtual() {
	const dataAtual = new Date();
	const dia = String(dataAtual.getDate()).padStart(2, '0');
	const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
	const ano = dataAtual.getFullYear();
	const horas = String(dataAtual.getHours()).padStart(2, '0');
	const minutos = String(dataAtual.getMinutes()).padStart(2, '0');
	const segundos = String(dataAtual.getSeconds()).padStart(2, '0');

	return `${ano}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
}

