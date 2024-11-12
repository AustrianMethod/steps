import { useState } from "react";

interface Form {
    date: string;
    distance: number;
}

export function Form() {
    const [list, setList] = useState<Form[]>([]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e.currentTarget)
        const formData = new FormData(e.currentTarget);
        const date = formData.get("date") as string;
        const distance = parseFloat(formData.get("distance") as string);
        if (isNaN(distance)) {
          console.error("Invalid distance value");
          return; 
        }

        const newEvent: Form = { date, distance };
        setList((prevList) => ([
            ...prevList,
            newEvent
        ]))
        e.currentTarget.reset();
    }

    return (
        <div className="wrapper">
          <form className="form" autoComplete="off" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="date">Дата (ДД.ММ.ГГ)</label>
              <input id="date" name="date" type="text"/>
            </div>
            <div>
              <label htmlFor="distance">Пройдено км</label>
              <input id="distance" name="distance" type="text" />
            </div>
            <button type="submit">Ок</button>
          </form>
          <div className="table-row">
            <span>Дата (ДД.ММ.ГГ)</span>
            <span>Пройдено км</span>
            <span>Действия</span>
          </div>
          <div className="table">
            {list.map(
                (item, index) => (
                    <div key={index} className="table-row">
                        <span>{item.date}</span>
                        <span>{item.distance}</span>
                        <span>&times;</span>
                    </div>
                )
            )}
          </div>
        </div> 
    )
}