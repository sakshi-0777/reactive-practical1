import React, { useEffect, useState } from "react";
import {
  of,
  from,
  merge,
  zip,
  concat
} from "rxjs";
import {
  map,
  filter,
  mergeMap,
  reduce
} from "rxjs/operators";

export default function ReactiveDemo() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const output = [];

    // 1️⃣ MAP Operator
    from([1, 2, 3, 4])
      .pipe(map(x => x * 2))
      .subscribe(val => output.push(`MAP → ${val}`));

    // 2️⃣ FILTER Operator
    from([10, 15, 20, 25, 30])
      .pipe(filter(x => x > 20))
      .subscribe(val => output.push(`FILTER → ${val}`));

    // 3️⃣ FLATMAP (mergeMap) Operator
    from(["A", "B", "C"])
      .pipe(mergeMap(letter => from([`${letter}1`, `${letter}2`])))
      .subscribe(val => output.push(`FLATMAP → ${val}`));

    // 4️⃣ REDUCE Operator
    from([1, 2, 3, 4])
      .pipe(reduce((acc, val) => acc + val, 0))
      .subscribe(val => output.push(`REDUCE (Sum) → ${val}`));

    // 5️⃣ MERGE Operator
    merge(from(["X", "Y"]), from(["1", "2"]))
      .subscribe(val => output.push(`MERGE → ${val}`));

    // 6️⃣ ZIP Operator
    zip(from(["A", "B", "C"]), from([1, 2, 3]))
      .subscribe(([a, b]) => output.push(`ZIP → ${a} ${b}`));

    // 7️⃣ CONCAT Operator
    concat(from(["M", "N"]), from(["3", "4"]))
      .subscribe(val => output.push(`CONCAT → ${val}`));

    setResults(output);
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>  Reactive Streams Operators (RxJS)</h2>
      <ul>
        {results.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ul>
    </div>
  );
}
