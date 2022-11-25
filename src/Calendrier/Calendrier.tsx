import {
    add,
    differenceInDays,
    endOfMonth,
    format,
    setDate,
    startOfMonth,
    sub,
  } from date-fns;
import React from "react";
  import Cell from "./Cell";
  
  const weeks = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
  const aujourdhui = new Date();
  const startOfMonth = new Date( aujourdhui.getFullYear(), aujourdhui.getMonth() -1 , 1 ).getDay() 
  const endOfMonth = new Date( aujourdhui.getFullYear(), aujourdhui.getMonth()  , 0 ).getDate()



  type Props = {
    value?: Date;
    onChange: (date: Date) => void;
  };
  
  const Calendrier: React.FC<Props> = ({ value = new Date(), onChange }) => {
    const startDate = startOfMonth(value);
    const endDate = endOfMonth(value);
    const numDays = differenceInDays(endDate, startDate) + 1;
  
    const prefixDays = startDate.getDay();
    const suffixDays = 6 - endDate.getDay();
  
    const prevMonth = () => onChange(sub(value, { months: 1 }));
    const nextMonth = () => onChange(add(value, { months: 1 }));
    const prevYear = () => onChange(sub(value, { years: 1 }));
    const nextYear = () => onChange(add(value, { years: 1 }));
  
    const handleClickDate = (index: number) => {
      const date = setDate(value, index);
      onChange(date);
    };
  
    return (
      <div className="w-[400px] border-t border-l">
        <div className="grid grid-cols-7 items-center justify-center text-center">
          <Cell onClick={prevYear}>{"<<"}</Cell>
          <Cell onClick={prevMonth}>{"<"}</Cell>
          <Cell className="col-span-3">{format(value, "LLLL yyyy")}</Cell>
          <Cell onClick={nextMonth}>{">"}</Cell>
          <Cell onClick={nextYear}>{">>"}</Cell>
  
          {weeks.map((week) => (
            <Cell className="text-xs font-bold uppercase">{week}</Cell>
          ))}
  
          {Array.from({ length: prefixDays }).map((_, index) => (
            <Cell key={index} />
          ))}
  
          {Array.from({ length: numDays }).map((_, index) => {
            const date = index + 1;
            const isCurrentDate = date === value.getDate();
  
            return (
              <Cell
                key={date}
                isActive={isCurrentDate}
                onClick={() => handleClickDate(date)}
              >
                {date}
              </Cell>
            );
          })}
  
          {Array.from({ length: suffixDays }).map((_, index) => (
            <Cell key={index} />
          ))}
        </div>
      </div>
    );
  };
  
  export default Calendrier;
  


  
// import { useState } from "react";

// function App() {
//   // state (calendrier, données)
//   const calendrier = [];
//   const [mois, setMonth] = useState(); // janvier = 1; fevrier = 2...
//   const [annee, setAnnee] = useState(); // 2022; 2021...

//   const aujourdhui = new Date();

//   const premierJourDuMois = new Date(
//     aujourdhui.getFullYear(),
//     aujourdhui.getMonth(),
//     1
//   ).getDay();

//   const nombreJourDuMois = new Date(
//     aujourdhui.getFullYear(),
//     aujourdhui.getMonth() + 1,
//     0
//   ).getDate();
//   console.log(premierJourDuMois, nombreJourDuMois);
//   // comportements
//   // affichage (render)

//   let dateCompteur = 1;
//   let isPrintDate = false;
//   for (let week = 0; week <= 5; week++) {
//     calendrier.push([]);
//     for (let day = 0; day < 7; day++) {
//       if (day == premierJourDuMois - 1) {
//         isPrintDate = true;
//       }
//       if (dateCompteur > nombreJourDuMois) {
//         isPrintDate = false;
//       }
//       if (isPrintDate) {
//         calendrier[week].push(dateCompteur);
//         dateCompteur++;
//       } else {
//         calendrier[week].push("");
//       }
//     }
//   }

//   return (
//     <div>
//       {" "}
//       <h1>Calendrier</h1>
//       {calendrier}
//     </div>
//   );
// }
// export default App;