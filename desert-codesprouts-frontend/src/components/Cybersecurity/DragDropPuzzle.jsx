import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./DragDropPuzzle.css";

const initialItems = [
  { id: "1", content: "Two-Factor Authentication" },
  { id: "2", content: "password123" },
  { id: "3", content: "Using HTTPS" },
  { id: "4", content: "Clicking random email links" },
];

const correctZones = {
  secure: ["1", "3"],
  insecure: ["2", "4"],
};

const DragDropPuzzle = ({ onFinish }) => {
  const [columns, setColumns] = useState({
    items: initialItems,
    secure: [],
    insecure: [],
  });

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    // Clone the dragged item
    const sourceList = Array.from(columns[source.droppableId]);
    const destList = Array.from(columns[destination.droppableId]);
    const [movedItem] = sourceList.splice(source.index, 1);
    destList.splice(destination.index, 0, movedItem);

    setColumns((prev) => ({
      ...prev,
      [source.droppableId]: sourceList,
      [destination.droppableId]: destList,
    }));
  };

  const checkAnswer = () => {
    const secureIds = columns.secure.map((item) => item.id).sort();
    const insecureIds = columns.insecure.map((item) => item.id).sort();
    const isCorrect =
      JSON.stringify(secureIds) === JSON.stringify(correctZones.secure.sort()) &&
      JSON.stringify(insecureIds) === JSON.stringify(correctZones.insecure.sort());

    onFinish(isCorrect);
  };

  return (
    <div className="drag-puzzle">
      <h2>🔐 Sort Secure vs Insecure Items</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="drag-grid">
          {["items", "secure", "insecure"].map((zone) => (
            <Droppable droppableId={zone} key={zone}>
              {(provided) => (
                <div
                  className={`droppable ${zone === "items" ? "source" : ""}`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h3>
                    {zone === "items"
                      ? "Unsorted Items"
                      : zone.charAt(0).toUpperCase() + zone.slice(1)}
                  </h3>
                  {columns[zone].map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="drag-item"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      <button className="next-btn" onClick={checkAnswer}>
        Check Answer
      </button>
    </div>
  );
};

export default DragDropPuzzle;