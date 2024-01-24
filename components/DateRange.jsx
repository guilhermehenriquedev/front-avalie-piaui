import React, { Fragment } from "react";
import Box from "@mui/material/Box";
import DateAdapter from "@mui/lab/AdapterMoment";
import TextField from "@mui/material/TextField";
import DateRangePicker from "@mui/lab/DateRangePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

export default function DateRange(props) {
	return (
		<>
			<LocalizationProvider dateAdapter={DateAdapter}>
				<DateRangePicker
					startText={props.startText}
					endText={props.endText}
					value={props.value}
					onChange={(newValue) => {
						props.onChange(newValue);
					}}
					renderInput={(startProps, endProps) => (
						<Fragment>
							<TextField {...startProps} size="small" />
							<Box sx={{ mx: 2 }}> à </Box>
							<TextField {...endProps} size="small" />
						</Fragment>
					)}></DateRangePicker>
			</LocalizationProvider>
		</>
	);
}
