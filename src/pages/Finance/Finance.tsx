import { useState } from "react";
import { Row } from "antd";
import { useHistory } from "react-router-dom";

import { AddIcon, Calculator, FIlterIcon } from "components/svg";
import { Button, Tabs } from "components/shared";
import { useAppDispatch } from "store/hooks";

import {
  setOpenCalculator,
  setOpenCostsFilterModal,
  setOpenPaymentFilterModal,
} from "store/slices/finances";

import IncomeStatistics from "./_components/IncomeStatistics";
import PaymentsTable from "./_components/PaymentsTable";
import SalariesTable from "./_components/SalariesTable";
import DebtorsTable from "./_components/DebtorsTable";
import CostsTable from "./_components/CostsTable";

import classes from "./Finance.module.scss";

const Finance = () => {
  const [createCost, setCreateCost] = useState(false);
  const history = useHistory();
  const dispatch = useAppDispatch();

  const tabs = [
    {
      key: 1,
      title: `Income statistics`,
      panel: <IncomeStatistics />,
    },
    {
      key: 2,
      title: `Payments`,
      panel: <PaymentsTable />,
    },
    {
      key: 3,
      title: `Costs`,
      panel: (
        <CostsTable createCost={createCost} setCreateCost={setCreateCost} />
      ),
    },
    {
      key: 4,
      title: `Salaries`,
      panel: <SalariesTable />,
    },
    {
      key: 5,
      title: `Qarzdorlar`,
      panel: <DebtorsTable />,
    },
  ];

  function AddButtonRender() {
    if (history.location.search.includes("tab=3")) {
      return (
        <Button
          type="primary"
          size="large"
          addMode
          icon={<AddIcon />}
          onClick={() => setCreateCost(true)}
        >
          Add cost
        </Button>
      );
    }
  }

  let tabExtraContent;
  if (history.location.search.includes("tab=2")) {
    tabExtraContent = (
      <Button
        iconMode
        size="large"
        icon={<FIlterIcon color="#B0B7C3" />}
        className={classes.darkButton}
        onClick={() => dispatch(setOpenPaymentFilterModal(true))}
      >
        Filtering
      </Button>
    );
  } else if (history.location.search.includes("tab=3")) {
    tabExtraContent = (
      <Button
        iconMode
        size="large"
        icon={<FIlterIcon color="#B0B7C3" />}
        className={classes.darkButton}
        onClick={() => dispatch(setOpenCostsFilterModal(true))}
      >
        Filtering
      </Button>
    );
  } else if (history.location.search.includes("tab=4")) {
    tabExtraContent = (
      <Button
        iconMode
        size="large"
        icon={<Calculator />}
        className={classes.darkButton}
        onClick={() => dispatch(setOpenCalculator(true))}
      >
        Calculator
      </Button>
    );
  }

  return (
    <div className={classes.finance}>
      <Row align="middle" justify="space-between" className="nav">
        <h1>Finance</h1>
        {AddButtonRender()}
      </Row>

      <Tabs
        data={tabs}
        onChange={(e) => history.push(`/admin/finance?tab=${e}`)}
        defaultActiveKey={history.location.search.split("")[5]}
        tabBarExtraContent={tabExtraContent}
      />
    </div>
  );
};

export default Finance;
