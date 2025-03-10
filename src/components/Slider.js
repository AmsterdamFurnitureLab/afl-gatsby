import React from "react";
import PropTypes from "prop-types";
import { withStyles, makeStyles } from "tss-react/mui";
import { Tooltip, Slider } from "@mui/material";

const useStyles = makeStyles((theme) => ({
	root: {
		width: 300 + theme.spacing(3) * 2,
	},
	margin: {
		height: theme.spacing(3),
	},
}));

function ValueLabelComponent(props) {
	const { children, open, value } = props;

	return (
		<Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
			{children}
		</Tooltip>
	);
}

ValueLabelComponent.propTypes = {
	children: PropTypes.element.isRequired,
	open: PropTypes.bool.isRequired,
	value: PropTypes.number.isRequired,
};

const marks = [
	{
		value: 0,
	},
	{
		value: 20,
	},
	{
		value: 37,
	},
	{
		value: 100,
	},
];

const PrettoSlider = withStyles(Slider, (theme, props) => ({
	root: {
		color: "#52af77",
		height: 8,
	},
	thumb: {
		height: 24,
		width: 24,
		backgroundColor: "#fff",
		border: "2px solid currentColor",
		marginTop: -8,
		marginLeft: -12,
		"&:focus,&:hover,&$active": {
			boxShadow: "inherit",
		},
	},
	active: {},
	valueLabel: {
		left: "calc(-50% + 4px)",
	},
	track: {
		height: 8,
		borderRadius: 4,
	},
	rail: {
		height: 8,
		borderRadius: 4,
	},
}));

export default () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<p id="vertical-slider">This is my super awesome SLIDER made with Gatsby!</p>
			<PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={20} />
			<div className={classes.margin} />
		</div>
	);
};
