import { FC, useState } from "react";
import { Col, Row } from "antd";

import ClientTable from "./_components/ClientTable";
import CreateModalClient from "./_components/CreateModalClient";
import { Button } from "components/shared";
import { AddIcon, FIlterIcon } from "components/svg";
import FilterClientsModal from "./_components/FilterClientsModal";

import classes from "./Clients.module.scss";
import ClientStudentCreateModal from "./_components/ClientStudentCreateModal";

interface Props { }

const Clients: FC<Props> = () => {
  const [createModal, setCreateModal] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [createStudentModal, setCreateStudentModal] = useState(false)
  const [selectedClient, setSelectedClient] = useState<any>()

  return (
    <main>
      <Row align="middle" justify="space-between" className="nav">
        <h1>Mijozlar</h1>
        <Row gutter={8}>
          <Col>
            <Button
              type="primary"
              size="large"
              filter
              icon={<FIlterIcon />}
              onClick={() => setFilterModal((prev) => !prev)}
            >
              Filter qilish
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              size="large"
              addMode
              icon={<AddIcon />}
              // loading={state.isLoading}
              onClick={() => setCreateModal(true)}
            >
              Mijoz qo'shish
            </Button>
          </Col>
        </Row>
      </Row>

      <ClientTable setVisible={setCreateStudentModal} setSelectedClient={setSelectedClient} />
      <FilterClientsModal visible={filterModal} setVisible={setFilterModal} />
      <CreateModalClient visible={createModal} setVisible={setCreateModal} />
      <ClientStudentCreateModal
        selectedClient={selectedClient}
        visible={createStudentModal}
        setVisible={setCreateStudentModal}
      />
    </main>
  );
};

export default Clients;
