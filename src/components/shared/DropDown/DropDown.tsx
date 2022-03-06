import { Avatar, Row } from "antd";
import { ArrowLeft } from "components/svg";
import { useRef, useState } from "react";
import { useClickAway } from "react-use";
import textSlice from "utils/slice";

import classes from "./DropDown.module.scss";

export type Props = {
  item?: any;
  onLogout?: any;
  stayStatic?: boolean;
};

const DropDown = ({ stayStatic, item, onLogout }: Props) => {
  const [click, setClick] = useState(false);
  
  const ref = useRef(null)
  const handleSetClick = () => {
    if (!stayStatic) setClick(!click);
  };
  useClickAway(ref, ()=>setClick(false))

  return (
    <div ref={ref} onClick={handleSetClick} className={`${classes.dropDown}`}>
      <div className={classes.dropDown__row}>
        <div className={classes.dropDown__box}>
          <img src={item.img} alt="" />
          <span>{textSlice(item.full_name, 15)}</span>
        </div>

        <div className={classes.dropDown__icon}>
          {!stayStatic && (
            <ArrowLeft
              classname={`${classes.arrow}  ${click && classes.active}`}
              color={"#323B4B"}
            />
          )}
        </div>
      </div>

      {!stayStatic && (
        <div
          className={`${classes.logout}  ${click ? classes.open : classes.close
            }`}
          onClick={onLogout}
        >
          Chiqish
        </div>
      )}
    </div>
  );
};

export default DropDown;
