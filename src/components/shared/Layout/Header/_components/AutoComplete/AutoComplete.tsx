import React, { useState, useCallback } from "react";
import { BookIcon, CourseTypeIcon, NavSearchIcon, PriceIcon, TeacherIcon, TopUpBalanceIcon, PhoneIcon, GroupIcon, ClientsIcon, LocationIcon } from "components/svg";
import { useDebounce } from "react-use";
import { FormElements } from "components/shared";
import { separateNumberThousands } from "utils";
import RenderItem from "../RenderItems/RenderItems";
import BackgroundContainer from "components/shared/BackgroundContainer";
import _ from "lodash";
import { globalSearchAPI } from "../../../../../../fakeAPI/fakeAPI";


import "./AutoComplete.scss";


export type Props = {};
const AutoComplete = React.memo(({ }: Props) => {
  const [text, setText] = useState("");
  const [visible, setVisible] = useState(false);

  const [debouncedText, setDebouncedText] = useState("");

  useDebounce(() => text && setDebouncedText(text), 500, [text]);

  const groupsData = globalSearchAPI?.groups?.map((item) =>
  ({
    type: 'group', name: item.name, img: item?.photo?.file, id: item.id, info:
      [{ text: item.teacher.full_name, icon: <TeacherIcon /> }, { text: item.course.name, icon: <CourseTypeIcon /> }]
  }));

  const teachersData = globalSearchAPI?.teachers?.map((item) =>
  ({
    type: 'teacher', name: item.full_name, img: item?.photo?.file, id: item.id,
    info: [{ text: item.phone_number, icon: <PhoneIcon /> }, { text: `${separateNumberThousands(item.salary)} so'm`, icon: <TopUpBalanceIcon /> }]
  }));

  const coursesData = globalSearchAPI?.courses?.map((item) =>
  ({
    type: 'courses', name: item.name, img: item?.photo?.file, id: item.id,
    info: [{ text: `${separateNumberThousands(item.price)} so'm`, icon: <PriceIcon /> }, { text: `${item.direction.name}`, icon: <BookIcon /> }]
  }));

  const roomsData = globalSearchAPI?.rooms?.map((item) =>
  ({
    type: 'rooms', name: item.name, img: item?.photo?.file, id: item.id,
    info: [{ text: `sig'im ${item.capacity} ta`, icon: <ClientsIcon color="#B0B7C3" /> }, { text: item.branch.name, icon: <LocationIcon /> }]
  }));

  const usersData = globalSearchAPI?.users?.map((item) =>
  ({
    type: 'users', name: item.full_name, img: item?.photo?.file, id: item.id,
    info: [{ text: item.phone_number, icon: <PhoneIcon /> },
    { text: `${item.groups_count} ta guruh`, icon: <GroupIcon color="#B0B7C3" /> }]
  }));


  const fullData = [groupsData, teachersData, coursesData, roomsData, usersData];

  const filtredData = _.sortBy(fullData, (item) => item?.length).reverse();
  const isEmpty = fullData.map(item => item?.length).every((elem => elem === 0))


  return (
    <div className="autoComplete">
      <div className={"autoComplete__search"}>
        <FormElements.Input
          onClick={() => setVisible(true)}
          placeholder="Enter the name of the group, teacher, student, or client"
          onChange={useCallback((e) => {
            setText(e.target.value);
          }, [])}
        />
        <NavSearchIcon classname={"icon"} />
      </div>


      {/* modal contend */}
      <div className={`autoComplete__content ${visible ? 'open' : 'close'}`}>
        {
          filtredData.map((item) => {
            return <RenderItem data={item} setVisible={setVisible}  />
          })
        }
      </div>

      {visible &&
        <BackgroundContainer onClick={() => setVisible(false)} />
      }
    </div>

  );
})

export default AutoComplete;
