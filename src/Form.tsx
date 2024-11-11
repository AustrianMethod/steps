import { useState } from "react";

interface Form {
    date: string;
    distance: number;
}

export function Form() {
    const [list, setList] = useState<Form[]>([]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const date = formData.get("date") as string;
        const distance = parseFloat(formData.get("distance") as string);

        const newEvent: Form = { date, distance };
        setList((prevList) => ([
            ...prevList,
            newEvent
        ]))
        e.currentTarget.reset();
    }

    return (
        <>
          <form className="form" autoComplete="off" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="date">Дата (ДД.ММ.ГГ)</label>
              <input id="date" name="date" type="text"/>
            </div>
            <div>
              <label htmlFor="distance">Пройдено км</label>
              <input id="distance" name="date" type="text" />
            </div>
            <button type="submit">Ок</button>
          </form>
          <div className="table">
            {list.map(
                (item, index) => (
                    <div key={index} className="table-row">
                        <span>{item.date}</span>
                        <span>{item.distance}</span>
                    </div>
                )
            )}
          </div>
        </> 
    )
}