import { FC } from "react";

interface IPassTextArea {
  requirements: {
    firstReq: string;
    secondReq: string;
    thirdReq: string;
    fourthReq: string;
    fifthReq: string;
  };
}
const PassTextArea: FC<IPassTextArea> = ({ requirements }) => {
  const { firstReq, secondReq, thirdReq, fourthReq, fifthReq } = requirements;
  return (
    <ol>
      <li>{firstReq}</li>
      <li>{secondReq}</li>
      <li>{thirdReq}</li>
      <li>{fourthReq}</li>
      <li>{fifthReq}</li>
    </ol>
  );
};
export default PassTextArea;
