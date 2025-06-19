import { Loader } from "@/components";
import styles from "./Confirming.module.scss";

export const Confirming = () => {
  return (
    <>
      <Loader className={styles.mr10} width={32} height={32} />
      Confirming...
    </>
  );
};
