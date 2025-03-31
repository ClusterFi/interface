import React from "react";
import styles from "./Header.module.scss";
import { Text } from "@/components/shared";

export const Status: React.FC = () => {
	return (
		<Text size={14} theme={500} className={styles.status}>
			General
		</Text>
	);
};
