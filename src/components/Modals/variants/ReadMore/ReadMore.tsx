import * as React from "react";
import { ModalLayout } from "@/components/Modals/ModalLayout/ModalLayout";
import { ModalProps } from "@/components/Modals/Modals";
import { Button, Icon, Text } from "@/components/shared";
import styles from "./ReadMore.module.scss";

export type ReadMoreProps = {
  title: string;
  content: React.ReactNode[];
};

type ReadMore = ModalProps & {
  props: ReadMoreProps;
};

export const ReadMore: React.FC<ReadMore> = ({ props, ...rest }) => {
  return (
    <ModalLayout title={props.title} {...rest}>
      <div className={styles.list}>
        {props.content.map((text, index) => (
          <Text size={14} theme={400} key={index} className={styles.text}>
            <Button
              as="span"
              size={"custom"}
              variant={"gradient-light"}
              className={styles.count}
            >
              {index === props.content.length - 1 ? (
                <Icon glyph={"Like"} />
              ) : (
                index + 1
              )}
            </Button>
            {text}
          </Text>
        ))}
      </div>
    </ModalLayout>
  );
};
