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
  const [items, setItems] = useState(initialItems);
  const [zones, setZones] = useState({
    secure: [],
    insecure: [],
  });

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const getList = (id) =>
      id === "items" ? items : zones[id] || [];

    const sourceList = getList(source.droppableId);
    const destinationList = getList(destination.droppableId);
    const [movedItem] = sourceList.splice(source.index, 1);

    if (source.droppableId === "items") {
      setItems((prev) =>
        prev.filter((item) => item.id !== movedItem.id)
      );
    } else {
      setZones((prev) => ({
        ...prev,
        [source.droppableId]: prev[source.droppableId].filter(
          (i) => i.id !== movedItem.id
        ),
      }));
    }

    if (destination.droppableId === "items") {
      setItems((prev) => {
        const updated = [...prev];
        updated.splice(destination.index, 0, movedItem);
        return updated;
      });
    } else {
      setZones((prev) => ({
        ...prev,
        [destination.droppableId]: [...prev[destination.droppableId], movedItem],
      }));
    }
  };

  const checkAnswer = () => {
    const isCorrect =
      JSON.stringify(zones.secure.map((i) => i.id).sort()) ===
      JSON.stringify(correctZones.secure.sort()) &&
      JSON.stringify(zones.insecure.map((i) => i.id).sort()) ===
      JSON.stringify(correctZones.insecure.sort());

    onFinish(isCorrect);
  };

  return (
    <div className="drag-puzzle">
      <h2>🔐 Sort Secure vs Insecure Items</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="drag-grid">
          <Droppable droppableId="items">
            {(provided) => (
              <div
                className="droppable source"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h3>Unsorted Items</h3>
                {items.map((item, index) => (
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

          {["secure", "insecure"].map((zone) => (
            <Droppable key={zone} droppableId={zone}>
              {(provided) => (
                <div
                  className="droppable"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h3>{zone.charAt(0).toUpperCase() + zone.slice(1)}</h3>
                  {zones[zone].map((item, index) => (
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
