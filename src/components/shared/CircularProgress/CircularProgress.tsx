import React from "react";
import cx from "classnames";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styles from "./CircularProgress.module.scss";

type Props = {
	percentage: number;
	className?: string;
};
export const CircularProgress: React.FC<Props> = ({ percentage, className }) => {
	return (
		<CircularProgressbar
			className={cx(styles.base, className)}
			styles={buildStyles({
				trailColor: "rgba(42, 38, 54, 1)",
				pathTransitionDuration: 0.5,
				pathColor: "rgba(153, 105, 255, 1)",
			})}
			value={percentage}
			minValue={0}
			maxValue={100}
			strokeWidth={14}
		/>
	);
};
