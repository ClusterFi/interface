import * as React from "react";
import { ModalLayout } from "@/components/Modals/ModalLayout/ModalLayout";
import { Button, ModalProps, Text, CurrencyIcon, Icon } from "@/components";
import styles from "./Details.module.scss";
import cx from "classnames";
import { AmountInput } from "@/components/AmountInput/AmountInput";

export type DetailsProps = {};

type Details = ModalProps & {
  props: DetailsProps;
};

export const Details: React.FC<Details> = ({ props, ...rest }) => {
  return (
    <ModalLayout
      title="Reserve status & configuration"
      isSwipeable
      modalClassName={styles.modal}
      {...rest}
    >
      <div className={styles.content}>
        <Text size={16} theme={600} className={styles.title}>
          Reserve status & configuration
        </Text>

        <div className={styles.flex}>
          <div className={styles.side}>
            <Text size={14} theme={600} className={styles.label}>
              Supply Info
            </Text>
          </div>
          <div className={styles.main}>
            <div></div>
            <div></div>
            <div>
              <div className={styles.infoLabel}>
                <Text size={14} theme={600} className={styles.label}>
                  Collateral usage
                </Text>
                <Text size={14} theme={600} className={styles.infoLabelCheck}>
                  <Icon glyph={"Check"} width={20} height={20} />
                  Can be collateral
                </Text>
              </div>
              <div className={styles.info}>
                <Button
                  title="Some info"
                  as="div"
                  size="custom"
                  variant={"stroke"}
                  className={styles.infoItem}
                >
                  <Text size={14} theme={400}>
                    Max LTV <Icon glyph={"Info"} width={12} height={12} />
                  </Text>
                  <Text size={14} theme={500}>
                    80.50%
                  </Text>
                </Button>
                <Button
                  title="Some info"
                  as="div"
                  size="custom"
                  variant={"stroke"}
                  className={styles.infoItem}
                >
                  <Text size={14} theme={400}>
                    Liquidation threshold
                    <Icon glyph={"Info"} width={12} height={12} />
                  </Text>
                  <Text size={14} theme={500}>
                    83.00%
                  </Text>
                </Button>
                <Button
                  title="Some info"
                  as="div"
                  size="custom"
                  variant="stroke"
                  className={styles.infoItem}
                >
                  <Text size={14} theme={400}>
                    Liquidation penalty
                    <Icon glyph={"Info"} width={12} height={12} />
                  </Text>
                  <Text size={14} theme={500}>
                    5.00%
                  </Text>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalLayout>
  );
};
