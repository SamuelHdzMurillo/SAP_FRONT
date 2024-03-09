import { useNavigate } from "react-router-dom";
import { DistrictA } from "../store";
import DropDownC from "@/components/DropDownC";

interface DropDownDistrictsProps {
  record: DistrictA;
}
const DropDownDistricts = ({ record }: DropDownDistrictsProps) => {
  const naviagate = useNavigate();
  const handleGetItemsDropdown = (record: DistrictA) => {
    return [
      {
        key: "2",
        label: "Detalles",
        onClick: () => naviagate(`/distritos/${record.id}`),
      },
    ];
  };

  return (
    <DropDownC
      handleGetItemsDropdown={handleGetItemsDropdown}
      record={record}
    />
  );
};
export default DropDownDistricts;
