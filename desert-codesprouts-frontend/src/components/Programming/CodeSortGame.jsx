import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styles from "./ProgrammingModule.module.css";

const initialCode = [
  "let sum = 0;",
  "for (let i = 0; i < 3; i++) {",
  "  sum += i;",
  "}",
  "console.log(sum);"
];

const correctOrder = [...initialCode];

const SortableItem = ({ id }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={styles.codeLine}>
      {id}
    </div>
  );
};

const CodeSortGame = () => {
  const [items, setItems] = useState(() => {
    const shuffled = [...initialCode];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  });

  const [isCorrect, setIsCorrect] = useState(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);
      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);
      setIsCorrect(null);
    }
  };

  const handleCheck = () => {
    const correct = items.every((line, idx) => line === correctOrder[idx]);
    setIsCorrect(correct);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2> Drag to Sort the Code</h2>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            <div className={styles.codeList}>
              {items.map((line) => (
                <SortableItem key={line} id={line} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
        <button onClick={handleCheck}>Check</button>
        {isCorrect === true && <p>✅ Correct Order!</p>}
        {isCorrect === false && <p>❌ Try Again.</p>}
      </div>
    </div>
  );
};

export default CodeSortGame;
