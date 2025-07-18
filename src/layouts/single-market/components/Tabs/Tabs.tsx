import React, { Fragment } from "react";
import styles from "./Tabs.module.scss";
import { Tabs as CustomTabs, Section } from "@/components";
import { Deposit } from "./Deposit";
import { Borrow } from "./Borrow";
import { Withdraw } from "./Withdraw";
import { Repay } from "./Repay";

const tabs = {
  deposit: "deposit",
  borrow: "borrow",
  withdraw: "withdraw",
  repay: "repay",
} as const;

type Tab = keyof typeof tabs;

type TabsProps = {
  isModal?: boolean;
  defaultTab?: number;
};
export const Tabs: React.FC<TabsProps> = ({ isModal, defaultTab }) => {
  const [activeTab, setActiveTab] = React.useState<Tab>(
    defaultTab ? (Object.keys(tabs)[defaultTab] as Tab) : tabs.deposit,
  );
  const Wrapper = isModal ? Fragment : Section;

  return (
    <Wrapper className={styles.section} containerClassName={styles.container}>
      <CustomTabs className={styles.tabs}>
        {Object.entries(tabs).map(([key, val]) => (
          <CustomTabs.Item
            onClick={() => setActiveTab(key as Tab)}
            isActive={activeTab === key}
            key={key}
          >
            {val}
          </CustomTabs.Item>
        ))}
      </CustomTabs>
      <div className={styles.content}>
        {(() => {
          switch (activeTab) {
            case tabs.deposit:
              return <Deposit />;
            case tabs.borrow:
              return <Borrow />;
            case tabs.withdraw:
              return <Withdraw />;
            case tabs.repay:
              return <Repay />;
            default:
              console.warn("Unreachable branch:", activeTab);
              break;
          }
        })()}
      </div>
    </Wrapper>
  );
};
