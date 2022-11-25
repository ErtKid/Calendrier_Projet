import { format } from "date-fns";
import { useState } from "react";
import Calendar from "./Calendrier/Calendrier";
import Button from "./components/Button";

const App = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleSetToday = () => setCurrentDate(new Date());

  return (
    <div className="mt-16 flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-4">
        <p>
          <strong>Selection date: </strong>
          {format(currentDate, "dd LLLL yyyy")}
        </p>

        <Button onClick={handleSetToday}>Aujourd hui</Button>
      </div>

      <Calendar value={currentDate} onChange={setCurrentDate} />
    </div>
  );
};

export default App;
