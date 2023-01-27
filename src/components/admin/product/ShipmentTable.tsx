import {
  type Dispatch,
  type SetStateAction,
  useState,
  useEffect,
  useContext,
} from "react";
import { api } from "../../../utils/api";
import LanguageContext from "../../context/LanugageContext";

const shipmentCopy = {
  en: {
    europe: "Europe",
    est: "Estimated shipping time",
    cost: "Cost",

    selectEconomy: "Select economy",
    selectRegular: "Select regular",
  },
  it: {
    europe: "Europa",
    est: "Tempo di spedizione stimato",
    cost: "Costo",
    selectEconomy: "Assegna economico",
    selectRegular: "Assegna regolare",
  },
};
type ShipmentData = {
  courier: string;
  est: string;
  price: number;
};

type SelectionType = "economy" | "regular";

const ShipmentTable = ({
  setEconomyShippingData,
  setRegularShippingData,
  vid,
}: {
  setEconomyShippingData: Dispatch<SetStateAction<ShipmentData | undefined>>;
  setRegularShippingData: Dispatch<SetStateAction<ShipmentData | undefined>>;
  vid: string;
}) => {
  const { language } = useContext(LanguageContext);

  const [shipmentSelection, setShpmentSelection] =
    useState<SelectionType>("economy");

  const [economyShipping, setEconomyShipping] = useState(0);
  const [regularShipping, setRegularShipping] = useState(0);

  const { data: shipmentData } = api.cjApi.requestShipmentByVid.useQuery({
    vid: vid,
  });

  useEffect(() => {
    if (
      !economyShipping &&
      !regularShipping &&
      shipmentData &&
      shipmentData.data
    ) {
      const economy = shipmentData.data[0];
      if (economy) {
        setEconomyShippingData({
          courier: economy.logisticName,
          est: economy.logisticAging,
          price: economy.logisticPrice,
        });
        setEconomyShipping(0);
      }

      const regular = shipmentData.data[1];
      if (regular) {
        setRegularShippingData({
          courier: regular.logisticName,
          est: regular.logisticAging,
          price: regular.logisticPrice,
        });
        setRegularShipping(1);
      }
    }
  }, [
    shipmentData,
    economyShipping,
    regularShipping,
    setEconomyShippingData,
    setRegularShippingData,
  ]);

  if (!shipmentData || !shipmentData.data) {
    return <div>Loading...</div>;
  }

  const currentCopy =
    language === "english" ? shipmentCopy.en : shipmentCopy.it;

  return (
    <div className="mt-8 flex w-full flex-col px-3 md:px-12">
      <div className="mb-6 flex w-full justify-end space-x-4">
        <button
          onClick={() => setShpmentSelection("economy")}
          className={`rounded-lg border border-gray-800 ${
            shipmentSelection === "economy"
              ? "bg-gray-800 text-white"
              : "bg-transparent text-gray-800"
          } py-2 px-4 text-sm font-bold  hover:bg-gray-800 hover:text-white`}
        >
          {currentCopy.selectEconomy}
        </button>
        {shipmentData.data.length > 1 && (
          <button
            onClick={() => setShpmentSelection("regular")}
            className={`rounded-lg border ${
              shipmentSelection === "regular"
                ? "bg-blue-500 text-white"
                : "bg-transparent text-blue-500"
            } border-blue-500 py-2 px-4 text-sm font-bold  hover:bg-blue-500 hover:text-white`}
          >
            {currentCopy.selectRegular}
          </button>
        )}
      </div>
      <table className="`w-full mt-8">
        <thead className="border-b py-2 text-left">
          <tr className="p-4">
            <th className="p-4"></th>
            <th className="p-4 text-xs font-bold text-gray-800">
              {currentCopy.europe}
            </th>
            <th className="p-4  text-start text-xs font-bold text-gray-800">
              {currentCopy.est}
            </th>
            <th className="p-4 text-start text-xs font-bold text-gray-800">
              {currentCopy.cost}
            </th>
          </tr>
        </thead>
        <tbody className="text-xs">
          {shipmentData.data.map((ship, idx) => {
            return (
              <tr className="p-4" key={idx}>
                <td className="p-4">
                  {shipmentSelection === "economy" ? (
                    <input
                      onChange={() => {
                        setEconomyShipping(idx);
                        setEconomyShippingData({
                          price: ship.logisticPrice,
                          courier: ship.logisticName,
                          est: ship.logisticAging,
                        });
                      }}
                      id="disabled-radio-1"
                      name={"economy"}
                      type="radio"
                      checked={idx === economyShipping}
                      className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-blue-500 "
                    />
                  ) : (
                    <input
                      onChange={() => {
                        setRegularShipping(idx);
                        setRegularShippingData({
                          price: ship.logisticPrice,
                          courier: ship.logisticName,
                          est: ship.logisticAging,
                        });
                      }}
                      id="disabled-radio-1"
                      name={"regular"}
                      type="radio"
                      checked={idx === regularShipping}
                      className="h-4 w-4 border-gray-300 bg-gray-800 text-gray-800 focus:ring-gray-800 "
                    />
                  )}
                </td>
                <td className="p-4">{ship.logisticName}</td>
                <td className="p-4">{ship.logisticAging}</td>
                <td className="p-4">${ship.logisticPrice}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ShipmentTable;
