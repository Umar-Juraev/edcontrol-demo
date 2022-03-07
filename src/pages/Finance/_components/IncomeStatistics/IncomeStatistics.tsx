import { useState } from "react";
import { Row, Col } from "antd";

import CardStats from "components/Cards/CardStats";
import { Badge, Button, FormElements } from "components/shared";
import { separateNumberThousands } from "utils";

import Income from "images/income.svg";
import AnnualIncome from "images/annual-income.svg";
import MonthlyIncome from "images/monthly-income.svg";

import classes from "./IncomeStatistics.module.scss";
import BarChart from "./BarChart";

const IncomeStatistics = () => {
  const [isAnnual, setIsAnnual] = useState<boolean>(false);

  // const { data: statisticsData } = usePaymentStatisticsQuery()

  const cardData = [
    {
      title: `Umumiy daromad`,
      icon: Income,
      // value: `${separateNumberThousands(statisticsData?.total_payments)} so'm`,
      value: <div>umar</div>,
      col: 8,
    },
    {
      title: `Yillik daromad`,
      icon: AnnualIncome,
      // value: `${separateNumberThousands(statisticsData?.annual_payments)} so'm`,
      value: <div>umar</div>,
      col: 8,
    },
    {
      title: `Oylik daromad`,
      icon: MonthlyIncome,
      // value: `${separateNumberThousands(statisticsData?.monthly_payments)} so'm`,
      value: <div>umar</div>,
      col: 8,
    },
  ];
  return (
    <div>
      <div className={classes.card_stats_container}>
        <Row
          gutter={[{ sm: 0, md: 5, lg: 20 }, 20]}
        >
          {cardData.map(({ title, value, icon, col }) => (
            <Col key={title} xs={24} span={col} sm={24} md={24} lg={12} xl={8}>
              <CardStats
                image={icon}
                value={value}
                types={title}
                price={true}
                pathName="/admin/finance"
              />
            </Col>
          ))}
        </Row>
      </div>

      <Row className={classes.chart_card} gutter={16}>
        <Col span={4} style={{ marginTop: 60 }}>
          <Badge text="100 000 000 сум" />
        </Col>
        <Col span={20}>
          <Row
            style={{ marginLeft: 20 }}
            justify="space-between"
            align="middle"
          >
            <Col>
              <Row gutter={8}>
                <Col>
                </Col>
                <Col>
                  <Button onClick={() => setIsAnnual(false)} className={!isAnnual ? classes.activeButton : ''}>
                    Oylik daromad
                  </Button>
                  <Button onClick={() => setIsAnnual(true)} className={isAnnual ? classes.activeButton : ''} >
                    Yillik daromad
                  </Button>
                </Col>
              </Row>
            </Col>

            <Col className={classes.rangePicker}>
              <FormElements.DateRangePicker />
            </Col>
          </Row>

          {/* <FinanceColumnChart isAnnual={isAnnual} /> */}
          <BarChart isAnnual={isAnnual} />
        </Col>
      </Row>
    </div>
  );
};

export default IncomeStatistics;
