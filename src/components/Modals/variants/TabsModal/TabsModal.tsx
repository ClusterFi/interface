import * as React from "react";

import { ModalLayout } from "@/components/Modals/ModalLayout/ModalLayout";
import { ModalProps } from "@/components";
import { Tabs } from "@/layouts/single-market/components/Tabs/Tabs";

import styles from "./TabsModal.module.scss";

export type TabsModalProps = {
  activeTab: number;
};

type TabsModal = ModalProps & {
  props: TabsModalProps;
};

export const TabsModal: React.FC<TabsModal> = ({ props, ...rest }) => {
  return (
    <ModalLayout
      contentClassName={styles.content}
      title={""}
      isSwipeable
      {...rest}
    >
      <div className={styles.container}>
        <Tabs isModal defaultTab={props.activeTab} />
      </div>
    </ModalLayout>
  );
};
