import { useState, useEffect } from "react";

const useSubject = (subject) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    subject.subscribe((dt) => {
      if (dt !== null && data === null) {
        setData(dt);
        // subject.unsubscribe();
      }
    });
  });

  return data;
};

export default useSubject
